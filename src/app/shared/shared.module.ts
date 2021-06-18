import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SumPipe } from './directives/sum.pipe';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {MatButtonModule} from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { EuroPipe } from './directives/euro.pipe';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

export const MY_FORMATS = {
    parse: {
        dateInput: 'LL'
    },
    display: {
        dateInput: 'YYYY-MM-DD',
        monthYearLabel: 'YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY'
    }
};

@NgModule({
  declarations: [SidebarComponent, NavbarComponent, SumPipe, EuroPipe],
  imports: [
    CommonModule,
    AutocompleteLibModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatSelectModule,
    MatCardModule,
    NgxSliderModule,
    RouterModule,
    CreditCardDirectivesModule,
    MatExpansionModule,
    MatMenuModule,
    MatIconModule
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    SumPipe,
    AutocompleteLibModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatSelectModule,
    MatCardModule,
    NgxSliderModule,
    EuroPipe,
    CreditCardDirectivesModule,
    MatExpansionModule,
    MatMenuModule,
    MatIconModule
  ],
   providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class SharedModule { }

