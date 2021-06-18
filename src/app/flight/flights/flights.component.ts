import { Travlers } from './../../models/Travlers';
import { LocationService } from './../../service/location.service';
import { Location } from './../../models/Location';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, finalize, switchMap, tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { AuthService } from 'src/app/service/auth.service';
import { StorageKeys } from 'src/app/models/StorageKeys';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {

  isReadonly = true;
  key = 'name';
  travlers: Travlers = new Travlers();
  disabled = false;
  isLoading1 = false;
  picked1 = true;
  isLoading2 = false;
  picked2 = true;
  location1: Location = new Location();
  location2: Location = new Location();
  locations: Location[] = [];
  search1 = new FormControl();
  search2 = new FormControl();
  travelClass = 'Economy';
  startDate = moment();
  endDate = moment();
  todaydate = moment();
  minCheckout: moment.Moment;
  mini = true;
  authenticated = false;
  user: User = new User();
  originLocationCode = '';
  destinationLocationCode = '';
  departureDate = '';
  adults = 1;

  constructor(private locationService: LocationService,
              private authService: AuthService,
              private router: Router,
              private activeRoute: ActivatedRoute) {
    this.endDate = moment();
    this.endDate.add(1, 'days');
    this.minCheckout = moment(this.endDate.valueOf());

  }

  ngOnInit(): void {
    // auth state
    const user = this.authService.getFromStorage(StorageKeys.USER);
    if (user !== null) {
      this.authenticated = true;
      this.user = JSON.parse(user);
    }
    this.search1.valueChanges.pipe(
      debounceTime(500),
      filter(value => !(value instanceof Object) && value !== ''),
      distinctUntilChanged(),
      tap(() => {
        this.locations = [];
        this.isLoading1 = true;
        this.location1 = new Location();
        console.log('clicked');
      }),
      switchMap(
        value => this.locationService.searchLocation(value, 'AIRPORT,CITY').pipe(
          finalize(() => {
            this.isLoading1 = false;
          }),
        )
      )
    ).subscribe({
        next: data => {
          this.locations = data;
          console.log(this.locations);
        },
        error: err => {
          console.log('error has occured while searching');
        }
      }
      );

    this.search2.valueChanges.pipe(
        debounceTime(500),
        filter(value => !(value instanceof Object) && value !== ''),
        distinctUntilChanged(),
        tap(() => {
          this.locations = [];
          this.isLoading2 = true;
          this.location2 = new Location();
          console.log('clicked');
        }),
        switchMap(
          value => this.locationService.searchLocation(value, 'AIRPORT,CITY').pipe(
            finalize(() => {
              this.isLoading2 = false;
            }),
          )
        )
      ).subscribe({
          next: data => {
            this.locations = data;
            console.log(this.locations);
          },
          error: err => {
            console.log('error has occured while searching');
          }
        }
        );
  }

  submitForm(): void {
    // if (this.location.name !== null && this.location.name !== '') {
    //   this.picked = true;
    //   const start = this.startDate.format('YYYY-MM-DD');
    //   const end = this.endDate.format('YYYY-MM-DD');
    //   const listAdult = this.listechambre.map(ch => ch.adult + ch.enfant).join(',');
    //   const destination = this.location.iataCode;
    //   this.router.navigate(['searchresult'], {
    //     queryParams: {
    //       checkInDate: start,
    //       checkOutDate: end,
    //       cityCode: destination,
    //       rooms: listAdult
    //     },
    //     relativeTo: this.activeRoute
    //   });
    // } else {
    //   this.picked = false;
    // }
  }


  select($loc: Location): void {
    console.log($loc);
  }

  plus(type: string): void {
    if (type === 'adult') {
      if (this.travlers.adults < 9) {
        this.travlers.adults++;
      }
    } else if (type === 'enfant') {
      if (this.travlers.children < 9) {
        this.travlers.children++;
      }
    } else {
      if (this.travlers.infants < 9) {
        this.travlers.infants++;
      }
    }
  }

  moin(type: string): void {
    if (type === 'adult') {
      if (this.travlers.adults > 1) {
        this.travlers.adults--;
      }
    } else if (type === 'enfant') {
      if (this.travlers.children > 0) {
        this.travlers.children--;
      }
    } else {
      if (this.travlers.infants > 0) {
        this.travlers.infants--;
      }
    }
  }

  openmodal(): void {
    // Get the button that opens the modal
    const btn = document.getElementById('myBtn') as HTMLElement;
    const modal = document.getElementById('myModal') as HTMLElement;
    const body = document.querySelector('body') as HTMLElement;
    // When the user clicks on the button, open the modal
    modal.setAttribute('style', 'display:block');
    body.setAttribute('style', 'overflow:hidden');
  }

  closemodal(): void {
    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName('close')[0] as HTMLElement;
    const modal = document.getElementById('myModal') as HTMLElement;
    const body = document.querySelector('body') as HTMLElement;
    // When the user clicks on <span> (x), close the modal
    modal.setAttribute('style', 'display:none;');
    body.setAttribute('style', 'overflow:auto;');
  }

  filter = (i: any[], e: string) => i;

  next(event: MatDatepickerInputEvent<moment.Moment>): void {
    const date = event.value;
    this.minCheckout = moment(date!.valueOf());
    this.minCheckout.add(1, 'days');
    console.log(this.minCheckout);
  }

  toggleSidebar(): void {
    if (this.mini) {
      console.log('opening sidebar');
      const mysidebar = document.getElementById('mySidebar') as HTMLElement;

      mysidebar.setAttribute('style', 'width:170px');
      const main = document.getElementById('main') as HTMLElement;
      main.setAttribute('style', 'marginLeft:170px');
      this.mini = false;
    } else {
      console.log('closing sidebar');
      const mysidebar = document.getElementById('mySidebar') as HTMLElement;
      mysidebar.setAttribute('style', 'width:50px');
      const main = document.getElementById('main') as HTMLElement;
      main.setAttribute('style', 'marginLeft:50px');
      this.mini = true;
    }
  }

  closeNav(): void {
    const element = document.getElementById('mySidebar') as HTMLElement;
    element.setAttribute('style', 'width:0px');
    const elem = document.getElementById('main') as HTMLElement;
    elem.setAttribute('style', 'marginLeft:0px');

  }

  flightType(type: string): void {
    if (type === 'retour') {
      const allerRetour = document.getElementById('allerRetour') as HTMLElement;
      const allerSimple = document.getElementById('allerSimple') as HTMLElement;
      const flight1 = document.getElementById('flight1') as HTMLElement;
      const flight2 = document.getElementById('flight2') as HTMLElement;
      const matFlex = document.getElementsByClassName('mat-form-field-flex') as HTMLCollectionOf<Element>;
      allerSimple.setAttribute('style', 'display: none;');
      allerRetour.removeAttribute('style');
      flight1.classList.add('selected-flight-type');
      flight2.classList.remove('selected-flight-type');
    } else {
      const allerRetour = document.getElementById('allerRetour') as HTMLElement;
      const allerSimple = document.getElementById('allerSimple') as HTMLElement;
      const flight1 = document.getElementById('flight1') as HTMLElement;
      const flight2 = document.getElementById('flight2') as HTMLElement;
      const matFlex = document.getElementsByClassName('mat-form-field-flex') as HTMLCollectionOf<Element>;
      const last = matFlex.length - 1;
      matFlex.item(last)?.classList.add('mat-form-override');
      allerRetour.setAttribute('style', 'display: none;');
      allerSimple.removeAttribute('style');
      flight2.classList.add('selected-flight-type');
      flight1.classList.remove('selected-flight-type');
    }
  }

  autoIcon(type: string): string {
    return type === 'CITY' ? 'location_city' : 'flight';
  }

  logout(): void {
    this.authService.logout();
  }
}
