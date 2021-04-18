import { OffreComponent } from './hotel/offre/offre.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'hotels',
    loadChildren:()=> import('./hotel/hotel.module').then(m => m.HotelModule)
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
