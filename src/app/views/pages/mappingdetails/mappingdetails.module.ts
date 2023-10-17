import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
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
import { NotifyService } from "src/app/services/notifyService";
import { DatePipe } from "@angular/common";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from "@angular/material/select";
import { MatSelectFilterModule } from "mat-select-filter";
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MappingServices } from "src/app/services/mapping.service";
import { MappingdetailsComponent } from "./mappingdetails.component";
import { MappingdetailServices } from "src/app/services/mappingdetails.service";
import { MappingComponent } from "./mapping/mapping.component";
import { MatListModule } from '@angular/material/list';
import { MomentDateTimeAdapter } from 'ng-pick-datetime/date-time/adapter/moment-adapter/moment-date-time-adapter.class';

import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule } from '@angular/material-moment-adapter';

const routes: Routes = [
  {
    path: '',
    component: MappingdetailsComponent
  },
  {
    path: ":id/:actionInfo",
    component: MappingComponent
  }
];

@NgModule({
  declarations: [MappingdetailsComponent, MappingComponent],
  providers: [
    MappingdetailServices, MappingServices
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
    MatListModule,
    MatCheckboxModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
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
    MatSelectModule,
    MatSelectFilterModule,
    MatListModule,
    MatCheckboxModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MappingDeailsModule { }
