
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { HotelRoutingModule } from './hotel-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelComponent } from './hotel/hotel.component';
import { OffreComponent } from './offre/offre.component';
import { DetailoffreComponent } from './detailoffre/detailoffre.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ReservationComponent } from './reservation/reservation.component';
import { SuccesComponent } from './succes/succes.component';





@NgModule({
  declarations: [
    HotelComponent,
    OffreComponent,
    DetailoffreComponent,
    AcceuilComponent,
    ReservationComponent,
    SuccesComponent],
  imports: [
    CommonModule,
    HotelRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatDatepickerModule,
  ]
})
export class HotelModule { }
