import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { EmployeedetailsComponent } from './employeedetails.component';
import { EmployeedetailComponent } from './employeedetail.component';
import { RouterModule, Routes } from '@angular/router';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatSelectFilterModule } from 'mat-select-filter';
import { DirectivesModule } from '../../layout/directives/directives.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
const routes: Routes = [
  {
      path: '',
      component: EmployeedetailsComponent
  },
  {
    path: ':id/:actionInfo',
    component: EmployeedetailComponent
},
]


@NgModule({
  declarations: [ EmployeedetailsComponent, EmployeedetailComponent],
  providers:[ DatePipe],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FeahterIconModule,
    NgbDropdownModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    DirectivesModule,
    MatSelectModule,
    MatSelectFilterModule,
    MatCheckboxModule,
    MatRadioModule,
    NgMultiSelectDropDownModule.forRoot(),
    // NgMultiSelectDropDownModule
  ]
})
export class EmployeedetailsModule { }
