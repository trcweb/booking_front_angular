import { LocationService } from './../../service/location.service';
import { Location } from './../../models/Location';
import { Chambre } from './../../models/Chambre';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import {debounceTime, distinctUntilChanged, filter, finalize, map, startWith, switchMap, tap} from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {

  isReadonly = true;
  key = 'name';
  listechambre: Chambre[] = [new Chambre(1, 0)];
  disabled = false;
  isLoading = false;
  picked = true;
  location: Location = new Location();
  locations: Location[] = [];
  search = new FormControl();
  startDate = moment();
  endDate = moment();
  todaydate = moment();
  minCheckout: moment.Moment;

  constructor(private locationService: LocationService,
              private router: Router,
              private activeRoute: ActivatedRoute) {
    this.endDate = moment();
    this.endDate.add(1, 'days');
    this.minCheckout = moment(this.endDate.valueOf());
  }

  ngOnInit(): void {
    this.search.valueChanges.pipe(
      debounceTime(500),
      filter(value => !(value instanceof Object) && value !== ''),
      distinctUntilChanged(),
      tap(() => {
        this.locations = [];
        this.isLoading = true;
        this.location = new Location();
        console.log('clicked');
      }),
      switchMap(
        value => this.locationService.searchLocation(value, 'CITY').pipe(
          finalize(() => {
            this.isLoading = false;
          }),
        )
      )
    )
      .subscribe({
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
    if (this.location.name !== null && this.location.name !== '') {
      this.picked = true;
      const start = this.startDate.format('YYYY-MM-DD');
      const end = this.endDate.format('YYYY-MM-DD');
      const listAdult = this.listechambre.map(ch => ch.adult + ch.enfant).join(',');
      const destination = this.location.iataCode;
      this.router.navigate(['searchresult'], { queryParams: { checkInDate: start,
                                                              checkOutDate: end,
                                                              cityCode: destination,
                                                              rooms: listAdult },
                                                relativeTo: this.activeRoute });
    } else {
      this.picked = false;
    }
  }


  select($loc: Location): void {
    console.log($loc);
    this.location = $loc;
  }

  plus(index: number, type: string): void {
    if (type === 'adult') {
      if (this.listechambre[index].adult < 9) {
        this.listechambre[index].adult++;
      }
    } else {
      if (this.listechambre[index].enfant < 9) {
        this.listechambre[index].enfant++;
      }
    }
  }

  moin(index: number, type: string): void {
    if (type === 'adult') {
      if (this.listechambre[index].adult > 1) {
        this.listechambre[index].adult--;
      }
    } else {
      if (this.listechambre[index].enfant > 0) {
        this.listechambre[index].enfant--;
      }
    }
  }

  addChamber(): void {
    if (this.listechambre.length < 9) {
      this.listechambre.push(new Chambre(1, 0));
      if (this.listechambre.length === 9) {
        this.disabled = true;
      }
    }
  }

  removeChamber(index: number): void {
    this.listechambre.splice(index, 1);
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
}
