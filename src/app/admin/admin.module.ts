import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ListeCompteComponent } from './liste-compte/liste-compte.component';
import { AjoutCompteComponent } from './ajout-compte/ajout-compte.component';
import { ModifierCompteComponent } from './modifier-compte/modifier-compte.component';
import { ListAdminComponent } from './list-admin/list-admin.component';
import { AjouterAdminComponent } from './ajouter-admin/ajouter-admin.component';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { AjoutContratComponent } from './ajout-contrat/ajout-contrat.component';
import { AjoutLocationComponent } from './ajout-location/ajout-location.component';
import { ReservAdminComponent } from './reserv-admin/reserv-admin.component';
import { ReservAgenceComponent } from './reserv-agence/reserv-agence.component';
import { SoldeComponent } from './solde/solde.component';


@NgModule({
  declarations: [AdminComponent, DashboardComponent, ListeCompteComponent, AjoutCompteComponent, ModifierCompteComponent, ListAdminComponent, AjouterAdminComponent, EditAdminComponent, AjoutContratComponent, AjoutLocationComponent, ReservAdminComponent, ReservAgenceComponent, SoldeComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
