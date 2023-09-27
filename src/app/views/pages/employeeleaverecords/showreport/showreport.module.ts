import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowreportComponent } from './showreport.component';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule, MAT_CHECKBOX_CLICK_ACTION } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { employeeleaverecordsModule } from '../employeeleaverecords.module';


export const MY_FORMATS = {
  parseInput: 'DD/MM/YYYY',
  fullPickerInput: 'DD/MM/YYYY hh:mm a',
  datePickerInput: 'DD/MM/YYYY',
  timePickerInput: 'hh:mm a',
  monthYearLabel: 'MMM-YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM-YYYY'
}


const routes = [
  {
      path: 'Showreport',
      component: ShowreportComponent
  }
];

@NgModule({
  // declarations: [ShowreportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatCheckboxModule,
    PdfViewerModule,
    NgbModule,
    MatTooltipModule,
    TranslateModule,
    //employeeleaverecordsModule
  ],
  providers: [
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_FORMATS },
    {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'}
   ],
})
export class ShowreportModule { }
