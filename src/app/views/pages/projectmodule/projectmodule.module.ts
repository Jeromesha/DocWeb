import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FeahterIconModule } from "src/app/core/feather-icon/feather-icon.module";
import { NgbDropdownModule, NgbProgressbarModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { DatePipe } from "@angular/common";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from "@angular/material/select";
import { MatSelectFilterModule } from "mat-select-filter";
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';;
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ExcelService } from 'src/app/services/excel.service';
import { ProjectmoduleComponent } from './projectmodule.component';
import { MappingServices } from 'src/app/services/mapping.service';

const routes: Routes = [
  {
    path: '',
    component: ProjectmoduleComponent
  },
  // {
  //   path: ":id/:actionInfo",
  //   component: ProjectDetailsViewComponent
  // },
];

@NgModule({
  declarations: [ProjectmoduleComponent],
  providers: [
    DatePipe,
    ExcelService,
    MappingServices
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FeahterIconModule,
    NgbDropdownModule,
    FormsModule,
    TranslateModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSelectFilterModule,
    NgbProgressbarModule,
    NgbTooltipModule,
    MatRadioModule,
    MatCheckboxModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class ProjectmoduleModule { }
