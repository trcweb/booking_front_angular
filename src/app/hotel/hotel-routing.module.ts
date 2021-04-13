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
      { path: 'offre', component: OffreComponent },
      { path: 'detailoffre/:id', component: DetailoffreComponent }
       
    ]
  },
    
  


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelRoutingModule { }