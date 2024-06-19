import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { KanbanTaskDetailsComponent } from './kanban-task-details.component';
import { RouterModule, Routes } from '@angular/router';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DateTimeAdapter, OWL_DATE_TIME_LOCALE, OWL_DATE_TIME_FORMATS, OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime/date-time/adapter/moment-adapter/moment-date-time-adapter.class';
import { NavigationService } from 'src/app/services/navigation.service';
import { NotifyService } from 'src/app/services/notifyService';
import { PerodicTaskService } from 'src/app/services/perodicTask.Service';
import { TaskService } from 'src/app/services/task.service';
import { UserSessionService } from 'src/app/services/usersession.service';
import { MY_CUSTOM_FORMATS } from '../../dashboard/timesheet/timesheet.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';

const routes: Routes = [
  {
    path: '',
    component: KanbanTaskDetailsComponent
  },
];

@NgModule({
  declarations: [KanbanTaskDetailsComponent],
  providers: [
    DatePipe,
    TaskService,
    NotifyService,
    NavigationService,
    UserSessionService,
    PerodicTaskService,
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
    MatIconModule,
    FormsModule,
    FeahterIconModule,
    NgbDropdownModule,
    FormsModule,
    TranslateModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
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
export class KanbanTaskDetailsModule { }
