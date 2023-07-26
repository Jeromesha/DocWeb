import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FeahterIconModule } from "src/app/core/feather-icon/feather-icon.module";
import { NgbDropdownModule, NgbProgressbarModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { DashboardService } from "src/app/services/dashboard.service";
import { ExcelService } from "src/app/services/excel.service";
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
import { ViewregistrationdetailsComponent } from "./viewregistrationdetails/viewregistrationdetails.component";
import { TimesheetComponent } from "./timesheet/timesheet.component";
import { TimeSheetService } from "src/app/services/timesheet.service";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


PlotlyModule.plotlyjs = PlotlyJS;



const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: ":id/:actionInfo",
    component: TimesheetComponent
  },
];

@NgModule({
  declarations: [DashboardComponent, ViewregistrationdetailsComponent, TimesheetComponent],
  providers: [
    DashboardService,
    ExcelService,
    TimeSheetService,
    NotifyService,
    DatePipe,
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
    OwlNativeDateTimeModule
  ],
})
export class DashboardModule { }
