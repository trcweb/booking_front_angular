import { SuccesComponent } from './succes/succes.component';
import { ReservationComponent } from './reservation/reservation.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { DetailoffreComponent } from './detailoffre/detailoffre.component';
import { HotelComponent } from './hotel/hotel.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OffreComponent } from './offre/offre.component';


const routes: Routes = [
  {
    path: '',
    component: HotelComponent,
    children: [
      { path: '', component: AcceuilComponent },
      { path: 'searchresult', component: OffreComponent },
      { path: 'detailresult/:id', component: DetailoffreComponent },
      { path: 'reserver/:id', component: ReservationComponent },
      { path: 'booked', component: SuccesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelRoutingModule {}
