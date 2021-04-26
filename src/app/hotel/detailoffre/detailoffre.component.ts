import { LocationService } from './../../service/location.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detailoffre',
  templateUrl: './detailoffre.component.html',
  styleUrls: ['./detailoffre.component.css']
})
export class DetailoffreComponent implements OnInit {

  searchControl: FormGroup ;

  constructor(private locationService: LocationService,
              private fb: FormBuilder) {
   this.searchControl = this.fb.group({});
    
  }

  ngOnInit(): void {
    this.searchControl = this.fb.group({
      autoComplete: ['', [Validators.required]],
      dateStart: ['', [Validators.required]],
      dateEnd: ['', [Validators.required]]
    });
  }

  submitForm(): void {
    console.log('validated');
    
  }


}
