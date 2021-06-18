
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightresultComponent } from './flightresult/flightresult.component';
import { FlightsComponent } from './flights/flights.component';
import { VolComponent } from './vol/vol.component';


const routes: Routes = [
  {
    path: '',
    component: VolComponent,
    children: [
      { path: 'flightResult', component: FlightresultComponent },
      { path: '', component: FlightsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class FlightRoutingModule { }
