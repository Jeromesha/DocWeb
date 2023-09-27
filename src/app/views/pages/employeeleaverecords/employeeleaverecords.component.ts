import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';
import { result } from 'lodash';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ProjectdetailsService } from 'src/app/services/projectdetails.service';
import { ReportsService } from 'src/app/services/reports.service';
import { ShowreportComponent } from './showreport/showreport.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-employeeleaverecords',
  templateUrl: './employeeleaverecords.component.html',
  styleUrls: ['./employeeleaverecords.component.scss']
})
export class EmployeeleaverecordsComponent implements OnInit {
  form:any
  projectleadlist: any;
  filterprojectleadlist: any;
  today:Date;
  

  constructor(
    private formBuilder: FormBuilder,
    private reportService:ReportsService,
    private projectdetailsservice: ProjectdetailsService,
    private dashboardService: DashboardService,
    public tripDialog: MatDialog

  ) {}



  ngOnInit(): void {
    this.form = this.formBuilder.group({
      startts:[],
      endDate: [],
      employeeName: []
    
    });
    this.getprojectLead();
    this.today=new Date();
  }

  getprojectLead(){
    debugger;
    this.projectdetailsservice.getLookup(2,true).subscribe(result =>{
      this.projectleadlist = result;
      this.filterprojectleadlist = this.projectleadlist;
      console.log(">/>?",result);
    })
  }
  onCancel(){

  }


  onSubmit() {
    debugger;
    let startDate = this.form.value.startts;
    let endDate = this.form.value.endDate;
    startDate = moment(startDate).format('YYYY-MM-DD');
    endDate = moment(endDate).format('YYYY-MM-DD');
    const data={
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
}
