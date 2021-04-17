import { SharedModule } from './../shared/shared.module';
import { HotelRoutingModule } from './hotel-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelComponent } from './hotel/hotel.component';
import { OffreComponent } from './offre/offre.component';
import { DetailoffreComponent } from './detailoffre/detailoffre.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [HotelComponent, OffreComponent, DetailoffreComponent, AcceuilComponent],
  imports: [
    CommonModule,
    HotelRoutingModule,
    SharedModule,
    FormsModule
 
  ]
})
export class HotelModule { }
