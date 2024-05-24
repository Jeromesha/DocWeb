import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { KraTaskAttachComponent } from './kra-task-attach.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbDropdownModule, NgbProgressbarModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { MatSelectFilterModule } from 'mat-select-filter';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DateTimeAdapter, OWL_DATE_TIME_LOCALE, OWL_DATE_TIME_FORMATS, OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime/date-time/adapter/moment-adapter/moment-date-time-adapter.class';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { ExcelService } from 'src/app/services/excel.service';
import { MappingServices } from 'src/app/services/mapping.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { NotifyService } from 'src/app/services/notifyService';
import { TaskService } from 'src/app/services/task.service';
import { TimeSheetService } from 'src/app/services/timesheet.service';
import { UserSessionService } from 'src/app/services/usersession.service';
import { MY_CUSTOM_FORMATS } from '../../dashboard/timesheet/timesheet.module';

const routes: Routes = [
  // {
  //   path: '',
  //   component: KraTaskAttachComponent
  // },
  {
    path: ":id/:actionInfo",
    component: KraTaskAttachComponent
  },
];

@NgModule({
  declarations: [KraTaskAttachComponent],
  providers: [
    DatePipe,
    ExcelService,
    MappingServices,
    TimeSheetService,
    TaskService,
    NotifyService,
    NavigationService,
    UserSessionService,
    DatePipe,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },

    { provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE] },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_CUSTOM_FORMATS },
    // { provide: OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS, useValue: { useUtc: false } } ,
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'ist' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: false } }
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
export class KraTaskAttachModule { }
