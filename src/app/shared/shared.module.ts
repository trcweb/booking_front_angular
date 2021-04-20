import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SumPipe } from './directives/sum.pipe';



@NgModule({
  declarations: [SidebarComponent, NavbarComponent, SumPipe],
  imports: [
    CommonModule,
    AutocompleteLibModule,
    ReactiveFormsModule
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    SumPipe,
    AutocompleteLibModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
