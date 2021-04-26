import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightRoutingModule } from './flight-routing.module';
import { FlightsComponent } from './flights/flights.component';



@NgModule({
  declarations: [FlightsComponent],
  imports: [
    CommonModule,
    FlightRoutingModule,
    SharedModule
  ]
})
export class FlightModule { }
