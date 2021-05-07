import {debounceTime, distinctUntilChanged, filter, finalize, map, startWith, switchMap, tap} from 'rxjs/operators';
import { LocationService } from '../../service/location.service';
import { Location } from '../../models/Location';
import { Chambre } from '../../models/Chambre';
import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {

  isReadonly = true;
  key = 'detailedName';
  listechambre: Chambre[] = [new Chambre(1, 0)];
  disabled = false;
  isLoading = false;
  picked = false;
  location: Location = new Location();
  locations: Location[] = [];
  todaydate: Date = new Date();
  searchControl: FormGroup;
  constructor(private locationService: LocationService,
              private fb: FormBuilder) {  this.searchControl = this.fb.group({
      autoComplete: ['', [Validators.required]],
      dateStart: ['', [Validators.required]],
      dateEnd: ['', [Validators.required]]
    }); }

  ngOnInit(): void {

     this.searchControl.get('autoComplete')?.valueChanges.pipe(
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
      }}
    );
  }


  submitForm(): void {
    console.log('validated');
  }


  select($loc: Location): void{
    console.log($loc);
  }

  onChangeSearch($event: string): void{

  }
  onFocused($event: any): void{

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
    }else {
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
    // When the user clicks on <span> (x), close the modal
    modal.setAttribute('style', 'display:none;');

  }
}
