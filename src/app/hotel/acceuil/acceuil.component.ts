import { LocationService } from './../../service/location.service';
import { Location } from './../../models/Location';
import { Chambre } from './../../models/Chambre';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, finalize, map, startWith, switchMap, tap} from 'rxjs/operators';

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
  picked = false;
  location: Location = new Location();
  locations: Location[] = [];
  ctl = new FormControl();

  constructor(private locationService: LocationService) {
  }

  ngOnInit(): void {
    this.ctl.valueChanges.pipe(
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
          console.log('....', value);
          this.isLoading = false;
        }),
       )
      )
    )
    .subscribe(
      data => {
        this.locations = data;
        console.log(this.locations);
      },
      err => {
        console.log('error has occured while searching');
      }
    );
  }


  select($event: string){
  }

  onChangeSearch($event: string){

  }
  onFocused($event: any){

  }

  plus(index: number, type: string) {
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

  moin(index: number, type: string) {
    if (type === 'adult') {
        if (this.listechambre[index].adult > 1) {
          this.listechambre[index].adult--;
      }
    }else {
      if (this.listechambre[index].enfant > 0) {
        this.listechambre[index].enfant--;
      }
    }
  }
   /* if (index == 0) {
      if (this.listechambre[index] > 1) {
        this.listechambre[index]--;
      }
    } else {
      if (this.listechambre[index] > 0) {
        this.listechambre[index]--;
      }
    }*/



  addChamber() {
    if (this.listechambre.length < 9) {
      this.listechambre.push(new Chambre(1, 0));
      if (this.listechambre.length === 9) {
        this.disabled = true;
      }
    }
  }



  removeChamber(index: number) {
    this.listechambre.splice(index, 1);
  }









  openmodal() {


    // Get the button that opens the modal
    const btn = document.getElementById('myBtn') as HTMLElement;
    const modal = document.getElementById('myModal') as HTMLElement;
    const body = document.querySelector('body') as HTMLElement;
    // When the user clicks on the button, open the modal
    modal.setAttribute('style', 'display:block');

    body.setAttribute('style', 'overflow:hidden');
  }

  closemodal() {
    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName('close')[0] as HTMLElement;
    const modal = document.getElementById('myModal') as HTMLElement;
    // When the user clicks on <span> (x), close the modal
    modal.setAttribute('style', 'display:none;');

  }


}
