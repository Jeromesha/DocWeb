import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { result } from 'lodash';
import * as moment from 'moment';
import { AlertService } from 'src/app/services/alert.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { EmployeedetailsService } from 'src/app/services/employeedetails.service';
import { MappingServices } from 'src/app/services/mapping.service';
import { ProjectdetailsService } from 'src/app/services/projectdetails.service';
import { ReportsService } from 'src/app/services/reports.service';
import { ShowreportComponent } from '../employeeleaverecords/showreport/showreport.component';

@Component({
  selector: 'app-timesheetreport',
  templateUrl: './timesheetreport.component.html',
  styleUrls: ['./timesheetreport.component.scss']
})
export class TimesheetreportComponent implements OnInit {
  form: any
  projectleadlist: any;
  filterprojectleadlist: any;
  today: Date;
  projectSortList: any[] = [];
  filterprojectSortList: any[] = [];
  locationList: any[] = [];
  filterlocationList: any[] = [];
  mappedEmployeeList: any;
  selectedmappedlist: any;
  filtermappedEmployeeList: any;
  startDate: Date;
  endDate: Date;
  maxEndDate: Date;
  minEndDate: Date;
  proID: any = 0;
  LocationId: any = 0;


  constructor(
    private formBuilder: FormBuilder,
    private reportService: ReportsService,
    private projectdetailsservice: ProjectdetailsService,
    private empDetailsService: EmployeedetailsService,
    private dashboardService: DashboardService,
    public tripDialog: MatDialog,
    private mappingservice: MappingServices,
    private datePipe: DatePipe,
    private alertService: AlertService,
  ) { }



  ngOnInit(): void {
    this.form = this.formBuilder.group({
      startts: ['', Validators.required],
      endDate: ['', Validators.required],
      employeeName: ['',],
      project: ['',],
      locationId: ['',],
    });
    this.getprojectLead();
    this.getProject();
    this.locationLookup();
    this.today = new Date();
  }

  updateEndDate(event: any) {
    if (event) {
      this.startDate = new Date(event);
      this.endDate = new Date(this.startDate);
      this.endDate.setDate(this.endDate.getDate() + 30);
      if (this.endDate > this.today) {
        this.maxEndDate = this.today;
        this.minEndDate = this.startDate;
      }
      else {
        this.minEndDate = this.startDate;
        this.maxEndDate = this.endDate;
      }
      this.form.controls['endDate'].setValue('');
      //this.form.controls['endDate'].clearValidators();
    }
  }
  getprojectLead() {
    debugger;
    this.projectdetailsservice.getLookup(2, true).subscribe(result => {
      // this.projectleadlist = result;
      // this.filterprojectleadlist = this.projectleadlist;
      this.mappedEmployeeList = result;
      this.filtermappedEmployeeList = this.mappedEmployeeList.slice();
    })
  }
  onCancel() {
    this.getProject();
    this.getprojectLead();
    this.locationLookup();
  }


  onSubmit() {
    debugger;
    if (this.form.valid) {
      debugger;
      let startDate = this.form.value.startts;
      let endDate = this.form.value.endDate;
      let Project = this.form.value.project;
      let worklocation = this.form.value.locationId;
      let employee = this.form.value.employeeName;
      startDate = moment(startDate).format('YYYY-MM-DD');
      endDate = moment(endDate).format('YYYY-MM-DD');
      const data = {
        startTs: startDate,
        endTs: endDate,
        reportType: 2,
        downloadType: 4,
        employeeId: (employee == "" || employee == null) ? 0 : employee,
        month: 0,
        year: 0,
        projectId: (Project == "" || Project == null) ? 0 : Project,
        locationId: (worklocation == "" || worklocation == null) ? 0 : worklocation,
        showPdf: true,
        showWord:true,
      }
      debugger
      const dialogRef = this.tripDialog.open(ShowreportComponent, {
        autoFocus: false,
        disableClose: true,
        width: '100%',
        height: '90%',
        panelClass: 'mat-dialog-bookingreport',
        data: data,
      })
      dialogRef.afterClosed().subscribe(() => {
      });
    }
    else {
      this.validateFormControl();
    }
  }
  getProject() {
    this.mappingservice.GetLookup(1).subscribe(result => {
      this.projectSortList = result;
      this.filterprojectSortList = this.projectSortList.slice();
    });
  }
  locationLookup() {
    this.empDetailsService.getProject(true, 7).subscribe(result => {
      this.locationList = result;
      this.filterlocationList = this.locationList.slice();
    })
  }
  sortingChange(event) {
    debugger;
    this.proID = this.form.value.project;
    this.LocationId = this.form.value.locationId;
    if (this.LocationId == null || this.LocationId == "") {
      this.getEmployeesbyproject(this.proID);

    }
    else if (this.proID == null || this.proID == "") {
      this.getemployeeByLocation(this.LocationId);
      this.proID = 0;
    }
    else {
      this.getEmployeeByProandLocation(this.proID, this.LocationId);
    }

  }
  getEmployeesbyproject(id: number) {
    this.mappingservice.GetLookupById(11, id).subscribe(result => {
      this.mappedEmployeeList = result;
      this.filtermappedEmployeeList = this.mappedEmployeeList.slice();
    });
  }
  getemployeeByLocation(id: number) {
    debugger;
    this.empDetailsService.getEmployeeByLocation(id, true).subscribe(result => {
      this.mappedEmployeeList = result;
      this.filtermappedEmployeeList = this.mappedEmployeeList.slice();
    })
  }
  getEmployeeByProandLocation(proId: number, locationId: number) {
    debugger;
    this.empDetailsService.getEmployeeByProandLocation(proId, locationId, true).subscribe(result => {
      this.mappedEmployeeList = result;
      this.filtermappedEmployeeList = this.mappedEmployeeList.slice();
    })
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
