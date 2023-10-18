import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FeahterIconModule } from "src/app/core/feather-icon/feather-icon.module";
import { NgbDropdownModule, NgbProgressbarModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { DashboardService } from "src/app/services/dashboard.service";

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
import { DashboardComponent } from "./dashboard.component";
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js-dist-min';
// import { TimesheetComponent } from "./timesheet/timesheet.component";
import { TimeSheetService } from "src/app/services/timesheet.service";
import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE, OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MomentDateTimeAdapter } from "ng-pick-datetime/date-time/adapter/moment-adapter/moment-date-time-adapter.class";
// import { MY_FORMATS } from "../employeeleaverecords/showreport/showreport.module";
import { MatCardModule } from '@angular/material/card';
import { NgApexchartsModule } from "ng-apexcharts";

PlotlyModule.plotlyjs = PlotlyJS;
export const MY_FORMATS = {
  parseInput: 'DD/MM/YYYY',
  fullPickerInput: 'DD/MM/YYYY hh:mm a',
  datePickerInput: 'DD/MM/YYYY',
  timePickerInput: 'hh:mm a',
  monthYearLabel: 'MMM-YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM-YYYY'
}


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];

@NgModule({
  declarations: [DashboardComponent],
  providers: [
    DashboardService,
    NotifyService,
    DatePipe,
    { provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE] },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_FORMATS },
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
    PlotlyModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    NgApexchartsModule


  ],
})
export class DashboardModule { }
