import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';
import { result } from 'lodash';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ProjectdetailsService } from 'src/app/services/projectdetails.service';
import { ReportsService } from 'src/app/services/reports.service';
import { ShowreportComponent } from './showreport/showreport.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { MappingServices } from 'src/app/services/mapping.service';
import { EmployeedetailsService } from 'src/app/services/employeedetails.service';

@Component({
  selector: 'app-employeeleaverecords',
  templateUrl: './employeeleaverecords.component.html',
  styleUrls: ['./employeeleaverecords.component.scss']
})
export class EmployeeleaverecordsComponent implements OnInit {
  form: any
  projectleadlist: any;
  filterprojectleadlist: any;
  today: Date;
  startDate: Date;
  endDate: Date;
  maxEndDate: Date;
  minEndDate:Date;

  constructor(
    private formBuilder: FormBuilder,
    private reportService: ReportsService,
    private projectdetailsservice: ProjectdetailsService,
    private dashboardService: DashboardService,
    public tripDialog: MatDialog,

  ) { }



  ngOnInit(): void {
    this.form = this.formBuilder.group({
      startts: ['',Validators.required],
      endDate: ['',Validators.required],
      employeeName: ['',Validators.required],
    });
    this.getprojectLead();
    this.today = new Date();
  }

  getprojectLead() {
    debugger;
    this.projectdetailsservice.getLookup(2, true).subscribe(result => {
      this.projectleadlist = result;
      this.filterprojectleadlist = this.projectleadlist;
    })
  }
  onCancel() {

  }


  onSubmit() {
    if (this.form.valid) {
      debugger;
      let startDate = this.form.value.startts;
      let endDate = this.form.value.endDate;
      startDate = moment(startDate).format('YYYY-MM-DD');
      endDate = moment(endDate).format('YYYY-MM-DD');
      const data = {
        startTs: startDate,
        endTs: endDate,
        reportType: 1,
        downloadType: 4,
        employeeId: this.form.value.employeeName
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

  updateEndDate(event: any) {
    if (event) {
      this.startDate = new Date(event);
      this.endDate = new Date( this.startDate);
      this.endDate.setDate( this.endDate.getDate() + 30);
      if ( this.endDate > this.today) {
        this.maxEndDate = this.today;
        this.minEndDate= this.startDate;
      }
      else {
        this.minEndDate= this.startDate;
        this.maxEndDate =  this.endDate;
      }
      this.form.controls['endDate'].setValue('');
      //this.form.controls['endDate'].clearValidators();
    }
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
