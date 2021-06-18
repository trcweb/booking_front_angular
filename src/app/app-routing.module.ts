import { HomeComponent } from './home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/directives/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'sign-in', component: LoginComponent},
  {
    path: 'hotels',
    loadChildren: () => import('./hotel/hotel.module').then(m => m.HotelModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'flights',
    loadChildren: () => import ('./flight/flight.module').then(m => m.FlightModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  { path: 'Admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
