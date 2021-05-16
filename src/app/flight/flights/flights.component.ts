import { LocationService } from './../../service/location.service';
import { Location } from './../../models/Location';
import { Chambre } from './../../models/Chambre';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, finalize, map, startWith, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {

  isReadonly = true;
  key = 'name';
  listechambre: Chambre[] = [new Chambre(1, 0)];
  disabled = false;
  isLoading = false;
  picked = true;
  location: Location = new Location();
  locations: Location[] = [];
  search = new FormControl();
  startDate: Date;
  endDate: Date;
  todaydate = new Date();
  minCheckout: Date;

  constructor(private locationService: LocationService,
    private router: Router) {
    this.startDate = new Date();
    let today = this.startDate.valueOf();
    today += 86400000;
    this.endDate = new Date(today);
    this.minCheckout = new Date(this.endDate.valueOf());
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
  }

  submitForm(): void {
    if (this.location.name !== null && this.location.name !== '') {
      this.picked = true;
      const start = this.startDate?.getFullYear()
        + '-'
        + this.doubleDigit(this.startDate?.getMonth())
        + '-'
        + this.doubleDigit(this.startDate?.getDay());

      const end = this.endDate?.getFullYear()
        + '-'
        + this.doubleDigit(this.endDate?.getMonth())
        + '-'
        + this.doubleDigit(this.endDate?.getDay());
      console.log(end);
    } else {
      this.picked = false;
    }
  }



  select($loc: Location): void {
    console.log($loc);
    this.location = $loc;
  }

  onChangeSearch($event: string): void {

  }
  onFocused($event: any): void {

  }

  filter = (i: any[], e: string) => i;

  doubleDigit(n: number | undefined): any {
    if (n && n < 10) {
      return '0' + n;
    }
    return n;
  }

  next(event: MatDatepickerInputEvent<Date>): void {
    const date = event.value;
    this.minCheckout = new Date(date!.valueOf() + 86400000);
    console.log(this.minCheckout);
  }



}
