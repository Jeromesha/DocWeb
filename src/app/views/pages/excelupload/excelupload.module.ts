import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ExceluploadComponent } from './excelupload.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { MatSelectFilterModule } from 'mat-select-filter';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DateTimeAdapter, OWL_DATE_TIME_LOCALE, OWL_DATE_TIME_FORMATS, OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime/date-time/adapter/moment-adapter/moment-date-time-adapter.class';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { ExcelService } from 'src/app/services/excel.service';
import { DirectivesModule } from '../../layout/directives/directives.module';
import { MY_CUSTOM_FORMATS } from '../dashboard/timesheet/timesheet.module';
import { TimeSheetService } from 'src/app/services/timesheet.service';

const routes: Routes = [
  {
      path: '',
      component: ExceluploadComponent
  },

]

@NgModule({
  declarations: [ExceluploadComponent],
    providers:[ 
      DatePipe,
      TimeSheetService,
      ExcelService,
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

  ]
})
export class ExceluploadModule { }
