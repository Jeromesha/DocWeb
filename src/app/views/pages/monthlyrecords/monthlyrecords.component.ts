import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ShowreportComponent } from '../employeeleaverecords/showreport/showreport.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-monthlyrecords',
  templateUrl: './monthlyrecords.component.html',
  styleUrls: ['./monthlyrecords.component.scss']
})
export class MonthlyrecordsComponent implements OnInit {


  form: any;
  selectedyear: number;
  years: number[] = [];
  filteryears:any[]=[];
  selectedMonth: number;
  months: any[] = [];
  filterMonth:any[]=[];

  constructor(
    private formBuilder: FormBuilder,
    public tripDialog: MatDialog
  )
  {
    this.selectedyear = new Date().getFullYear();
    for (let year = this.selectedyear; year >= 2022; year--) {
      this.years.push(year);
    }
    this.selectedMonth = new Date().getMonth();
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

  generateMonthNames(): string[] {
    return [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  }
  onSubmit() {
    debugger;
    if (this.form.valid) {
    // let month = this.form.value.month;
    // let year = this.form.value.year;
    // const data={
    //   month:month,
    //   year:year,
    //   reportType: 2,
    //   downloadType: 4
    // }
    //   const dialogRef = this.tripDialog.open(ShowreportComponent, {
    //     autoFocus: false,
    //     disableClose: true,
    //     width: '100%',
    //     height: '90%',
    //     panelClass: 'mat-dialog-bookingreport',
    //     data
    //   })
    //   dialogRef.afterClosed().subscribe(() => {
    //   });
    }
    else{
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

