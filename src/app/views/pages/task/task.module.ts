import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TaskComponent } from './task.component';
import { RouterModule, Routes } from '@angular/router';
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
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { ExcelService } from 'src/app/services/excel.service';
import { MappingServices } from 'src/app/services/mapping.service';
import { TimeSheetService } from 'src/app/services/timesheet.service';
import { TaskService } from 'src/app/services/task.service';
import { TaskViewComponent } from './task-view.component';
import { NotifyService } from 'src/app/services/notifyService';
import { NavigationService } from 'src/app/services/navigation.service';

const routes: Routes = [
  {
    path: '',
    component:TaskViewComponent
  },
  {
    path: ":id/:actionInfo",
    component: TaskComponent
  },
];

@NgModule({
  declarations: [
    TaskComponent,
    TaskViewComponent,
  ],
  providers: [
    DatePipe,
    ExcelService,
    MappingServices,
    TimeSheetService,
    TaskService,
    NotifyService,
    NavigationService
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
export class TaskModule { }
