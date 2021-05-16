import { HotelsService } from './../../service/hotels.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NextPage } from './../../models/NextPage';
import { HotelSearchResponse } from './../../models/HotelSearchResponse';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import {debounceTime, distinctUntilChanged, filter, finalize, map, startWith, switchMap, tap} from 'rxjs/operators';
import { LocationService } from '../../service/location.service';
import { Location } from '../../models/Location';
import { Chambre } from '../../models/Chambre';
import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeContext, Options } from '@angular-slider/ngx-slider';


@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {

  isReadonly = true;
  key = 'name';
  listechambre: Chambre[] = [new Chambre(1, 0)];
  disabled = false;
  isLoading = false;
  picked = true;
  location: Location = new Location();
  locations: Location[] = [];
  search = new FormControl();
  star1 = new FormControl();
  star2 = new FormControl();
  star3 = new FormControl();
  star4 = new FormControl();
  star5 = new FormControl();
  starList = [this.star1,
  this.star2,
  this.star3,
  this.star4,
  this.star5
  ];
  startDate = moment();
  endDate = moment();
  todaydate = moment();
  minCheckout: moment.Moment;
  minValue = 0;
  maxValue = 4000;
  options: Options = {
    floor: 0,
    ceil: 4000
  };
  isReset = false;
  firstPage: NextPage = {
    amadeusNext: null,
    localNext: 0,
    amadeusSearchable: true,
    localSearchable: true
  };
  hotelSearchResponse: HotelSearchResponse = new HotelSearchResponse();
  fetching = false;

  constructor(private locationService: LocationService,
              private hotelsService: HotelsService,
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
    this.activeRoute.queryParamMap.subscribe({
      next: params => {
        const ratings = params.get('ratings');
        this.toggleCheckbox(ratings);
        const priceRange = params.get('priceRange');
        this.toggleRange(priceRange);
        const checkInDate = params.get('checkInDate');
        const checkOutDate = params.get('checkOutDate');
        const cityCode = params.get('cityCode');
        const rooms = params.get('rooms');
        this.fetching = true;
        this.hotelsService.searchOffers(cityCode,
          checkInDate,
          checkOutDate,
          rooms,
          priceRange,
          ratings,
          this.firstPage)
          .subscribe({
            next: (response: HotelSearchResponse) => {
              this.hotelSearchResponse.commission = response.commission;
              this.hotelSearchResponse.dictionarie = response.dictionarie;
              this.hotelSearchResponse.nextPage = response.nextPage;
              this.hotelSearchResponse.hotelOffers = response.hotelOffers;
              console.log('data:', this.hotelSearchResponse);
            },
            error: (err: HttpErrorResponse) => {
              console.log('err: ', err.error.message);
            },
            complete: () => {
              this.fetching = false;
              console.log('fetch: ', this.fetching);
            }
          });
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
      this.router.navigate(['searchresult'], {
        queryParams: {
          checkInDate: start,
          checkOutDate: end,
          cityCode: destination,
          rooms: listAdult
        },
        relativeTo: this.activeRoute
      });
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

  filterStar($event: MatCheckboxChange, n: string | null): void {
    let ratings = this.activeRoute.snapshot.queryParamMap.get('ratings');
    if ($event.checked) {
      if (ratings !== null) {
        ratings = ratings + `,${ n }`;
      } else {
        ratings = `${ n }`;
      }
    } else {
      if (ratings !== null) {
        const index = ratings?.indexOf(n!);
        if (index === 0) {
          ratings = ratings!.substring(2);
        } else {
          ratings = ratings!.replace(`,${n}`, '');
        }
      }
    }
    ratings === '' ? ratings = null : ratings = ratings;
    this.router.navigate(['/hotels/searchresult'], { queryParams: { ratings }, queryParamsHandling: 'merge' });
  }

  toggleCheckbox(star: string | null): void {
    const stars = star?.split(',');
    if (stars && stars !== null) {
      stars.forEach(element => {
        const index = parseInt(element);
        if (index > 0 && index < 6) {
          this.starList[index - 1].setValue(true);
        }
      });
    }
  }

  toggleRange(rangeString: string | null): void {
    const range = rangeString?.split('-');
    if (range && range !== null) {
      this.minValue = parseInt(range[0]);
      this.maxValue = parseInt(range[1]);
    }
  }

  changeRnage(changeContext: ChangeContext): void {
    const priceRange = `${ this.minValue }-${ this.maxValue }`;
    this.isReset = true;
    this.router.navigate(['/hotels/searchresult'], { queryParams: { priceRange }, queryParamsHandling: 'merge' });
  }

  reset(): void {
    this.isReset = false;
    this.minValue = 0;
    this.maxValue = 4000;
    this.router.navigate(['/hotels/searchresult'], { queryParams: { priceRange: null }, queryParamsHandling: 'merge' });
  }

  loadMore(): void {
    const params = this.activeRoute.snapshot.queryParamMap;
    const ratings = params.get('ratings');
    this.toggleCheckbox(ratings);
    const priceRange = params.get('priceRange');
    this.toggleRange(priceRange);
    const checkInDate = params.get('checkInDate');
    const checkOutDate = params.get('checkOutDate');
    const cityCode = params.get('cityCode');
    const rooms = params.get('rooms');
    this.fetching = true;
    this.hotelsService.searchOffers(cityCode,
      checkInDate,
      checkOutDate,
      rooms,
      priceRange,
      ratings,
      this.hotelSearchResponse.nextPage)
      .subscribe({
        next: (response: HotelSearchResponse) => {
          this.hotelSearchResponse.commission = response.commission;
          this.hotelSearchResponse.dictionarie = response.dictionarie;
          this.hotelSearchResponse.nextPage = response.nextPage;
          if (response.dictionarie !== null) {
            this.hotelSearchResponse.dictionarie = response.dictionarie;
          }
          if (response.hotelOffers !== null) {
            this.hotelSearchResponse.hotelOffers = this.hotelSearchResponse.hotelOffers.concat(response.hotelOffers);
          }
          console.log('data:', this.hotelSearchResponse);
        },
        error: (err: HttpErrorResponse) => {
          console.log('err: ', err.error.message);
        },
        complete: () => {
          this.fetching = false;
          const load = document.getElementById('loadMore') as HTMLElement;
          if (!this.hotelSearchResponse.nextPage.amadeusSearchable) {
            load.setAttribute('disabled', '');
          }
        }
      });
  }

}
