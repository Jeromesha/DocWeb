import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ShowreportComponent } from '../employeeleaverecords/showreport/showreport.component';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';


@Component({
  selector: 'app-monthlyrecords',
  templateUrl: './monthlyrecords.component.html',
  styleUrls: ['./monthlyrecords.component.scss']
})
export class MonthlyrecordsComponent implements OnInit {


  form: any;
  selectedyear: number;
  years: number[] = [];
  filteryears: any[] = [];
  //selectedMonth: number;
  months: any[] = [];
  //filterMonth: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public tripDialog: MatDialog
  ) {
    this.selectedyear = new Date().getFullYear();
    for (let year = this.selectedyear; year >= 2022; year--) {
      this.years.push(year);
    }
    debugger
    //this.selectedMonth = new Date().getMonth();
    this.months = this.generateMonthNames();

  }

  ngOnInit(): void {
    this.initialValidators();
  }
  initialValidators() {
    this.form = this.formBuilder.group({
      'month': ['', Validators.required],
      'year': ['', Validators.required]
    })
  }

  generateMonthNames(): any[] {
    return [
      { key: 1, value: "January" },
      { key: 2, value: "February" },
      { key: 3, value: "March" },
      { key: 4, value: "April" },
      { key: 5, value: "May" },
      { key: 6, value: "June" },
      { key: 7, value: "July" },
      { key: 8, value: "August" },
      { key: 9, value: "September" },
      { key: 10, value: "October" },
      { key: 11, value: "November" },
      { key: 12, value: "December" }
    ];
  }
  onSubmit() {
    debugger;
    if (this.form.valid) {
      let sdate = moment(new Date()).format('YYYY-MM-DD');
      let month = this.form.value.month;
      let year = this.form.value.year;
      const data = {
        startTs: sdate,
        endTs: sdate,
        reportType: 3,
        downloadType: 4,
        employeeId: 0,
        projectId: 0,
        locationId: 0,
        month: month,
        year: year,
        showPdf: false,
        showWord:false,
      }
      const dialogRef = this.tripDialog.open(ShowreportComponent, {
        autoFocus: false,
        disableClose: true,
        width: '100%',
        height: '90%',
        panelClass: 'mat-dialog-bookingreport',
        data
      })
      dialogRef.afterClosed().subscribe(() => {
      });
    }
    else {
      this.validateFormControl();
    }

  }


  onCancel() {
  }

  validateFormControl() {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true
        });
      }
    })
  }
}

