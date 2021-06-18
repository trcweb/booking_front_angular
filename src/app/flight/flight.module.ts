import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightRoutingModule } from './flight-routing.module';
import { FlightsComponent } from './flights/flights.component';
import { FlightresultComponent } from './flightresult/flightresult.component';
import { VolComponent } from './vol/vol.component';



@NgModule({
  declarations: [FlightsComponent, FlightresultComponent, VolComponent],
  imports: [
    CommonModule,
    FlightRoutingModule,
    SharedModule
  ]
})
export class FlightModule { }
