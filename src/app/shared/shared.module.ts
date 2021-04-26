import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [SidebarComponent, NavbarComponent],
  imports: [
    CommonModule,
    AutocompleteLibModule
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    AutocompleteLibModule

    
  ]
})
export class SharedModule { }
