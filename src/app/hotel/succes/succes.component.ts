import { Component, OnInit } from '@angular/core';
import { Guest } from 'src/app/models/HotelBookingRequest';

@Component({
  selector: 'app-succes',
  templateUrl: './succes.component.html',
  styleUrls: ['./succes.component.css']
})
export class SuccesComponent implements OnInit {

  booking: any = null;
  guest: Guest = new Guest();
  constructor() { }

  ngOnInit(): void {
    this.booking = window.history.state.data;
    this.guest = window.history.state.guest;
  }

}
