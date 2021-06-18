import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutCompteComponent } from './ajout-compte/ajout-compte.component';
import { AjoutContratComponent } from './ajout-contrat/ajout-contrat.component';
import { AjoutLocationComponent } from './ajout-location/ajout-location.component';
import { AjouterAdminComponent } from './ajouter-admin/ajouter-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { ListAdminComponent } from './list-admin/list-admin.component';
import { ListeCompteComponent } from './liste-compte/liste-compte.component';
import { ModifierCompteComponent } from './modifier-compte/modifier-compte.component';
import { ReservAdminComponent } from './reserv-admin/reserv-admin.component';
import { ReservAgenceComponent } from './reserv-agence/reserv-agence.component';
import { SoldeComponent } from './solde/solde.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard'},
  { path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'list-agence' },
      { path: 'list-agence', component: ListeCompteComponent },
      { path: 'add-agence', component: AjoutCompteComponent },
      { path: 'edit-agence', component: ModifierCompteComponent },
      { path: 'list-admin', component: ListAdminComponent },
      { path: 'add-admin', component: AjouterAdminComponent },
      { path: 'edit-admin', component: EditAdminComponent },
      { path: 'add-hotel', component: AjoutContratComponent },
      { path: 'add-location', component: AjoutLocationComponent },
      { path: 'reservation-user', component: ReservAdminComponent },
      { path: 'reservation-agence', component: ReservAgenceComponent },
      { path: 'soldeAgence', component: SoldeComponent },



    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
