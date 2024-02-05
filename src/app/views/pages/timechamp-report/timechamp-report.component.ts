import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { EmployeedetailsService } from 'src/app/services/employeedetails.service';
import { MappingServices } from 'src/app/services/mapping.service';
import { ProjectdetailsService } from 'src/app/services/projectdetails.service';
import { ReportsService } from 'src/app/services/reports.service';
import { ShowreportComponent } from '../employeeleaverecords/showreport/showreport.component';
import * as moment from 'moment';
import { TcTimesheetService } from 'src/app/services/tcTimesheet.service';
import { ExcelService } from 'src/app/services/excel.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-timechamp-report',
  templateUrl: './timechamp-report.component.html',
  styleUrls: ['./timechamp-report.component.scss']
})
export class TimechampReportComponent implements OnInit {

  data = [];
  dataSource = new MatTableDataSource(this.data);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("searchInput", { static: true }) searchInput: ElementRef;
  form: any;
  today: Date;
  minEndDate: Date;
  mappedEmployeeList: any;
  filtermappedEmployeeList: any;
  startDate: Date;
  endDate: Date;
  loading: boolean = false;
  excelColumns: string[];
  displayedColumns: string[] = [
    "date",
    "id",
    "users",
    "inTime",
    "lastSeen",
    "workingHours",
    "productiveTime",
    "idleTime",
    "neturalTime"
  ];
  show:boolean=false;
  constructor(
    private formBuilder: FormBuilder,
    // private reportService: ReportsService,
    private TcTimesheetService: TcTimesheetService,
    public tripDialog: MatDialog,
    private excelService: ExcelService,
    private alertService: AlertService,
  ) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      startts: ['', Validators.required],
      endDate: ['', Validators.required],
      employeeName: ['', Validators.required],
    });
    this.today = moment().subtract(1, 'days').toDate();
    this.getEmployee()
  }
  updateEndDate(event: any) {
    if (event) {
      this.startDate = new Date(event);
      this.endDate = new Date(this.startDate);
      this.form.controls['endDate'].setValue('');
    }
  }

  getEmployee() {
    debugger;
    this.TcTimesheetService.GetTCEmployeelist().subscribe(result => {
      this.mappedEmployeeList = result.value;
      this.filtermappedEmployeeList = this.mappedEmployeeList.slice();
    })
  }
  onCancel() {
    this.getEmployee();
    this.show=false;
    this.data = [];
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  // onSubmit() {
  //   if (this.form.valid) {
  //     debugger;
  //     let startDate = this.form.value.startts;
  //     let endDate = this.form.value.endDate;
  //     let employee = this.form.value.employeeName;
  //     startDate = moment(startDate).format('DD-MMM-YY');
  //     endDate = moment(endDate).format('DD-MMM-YY');
  //     const data = {
  //       startTs: startDate,
  //       endTs: endDate,
  //       reportType: 2,
  //       downloadType: 4,
  //       employeeId: (employee == "" || employee == null) ? 0 : employee,
  //       showPdf: true,
  //       showWord: true,
  //     }
  //     debugger
  //     const dialogRef = this.tripDialog.open(ShowreportComponent, {
  //       autoFocus: false,
  //       disableClose: true,
  //       width: '100%',
  //       height: '90%',
  //       panelClass: 'mat-dialog-bookingreport',
  //       data: data,
  //     })
  //     dialogRef.afterClosed().subscribe(() => {
  //     });
  //   }
  //   else {
  //     this.validateFormControl();
  //   }
  // }
  getTimechampDetails() {
    if (this.form.valid) {
      let startDate = this.form.value.startts;
      let endDate = this.form.value.endDate;
      let employeeId = this.form.value.employeeName;
      startDate = moment(startDate).format('DD-MMM-YY');
      endDate = moment(endDate).format('DD-MMM-YY');
      this.TcTimesheetService.GetTCDetailsById(employeeId, startDate, endDate).subscribe(result => {
        this.show=true;
        this.data = result.value;
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
    }
    else {
      this.validateFormControl();
    }

  }
  onExportExcel() {

    debugger
    this.loading = true;
    setTimeout(() => {
      var exportData = this.data;
      console.log('exaslk', exportData)
      if (!exportData || exportData.length === 0) {
        this.alertService.info("No data available to export");
        return;
      }
      let name;
      name = "Employee's Time Champ  Report";
      this.excelColumns = [
        "Date",
        "Employee Code",
        "Employee Name ",
        "In Time",
        "Last Seen",
        "Working Hours",
        "Productive Time",
        "Idle Time",
        "Netural Time"
      ];

      const excelList = [];
      excelList.push({});
      exportData.forEach((a) => {
        excelList.push({
          Date: a.timesheetDate,
          Employee_Code: a.empID,
          Name: a.name,
          In_Time: a.startDateTime,
          Last_Seen: a.finishDateTime,
          Working_Hours: a.workingTime,
          Productive_Time: a.productiveTime,
          Idle_Time: a.idleTime,
          Netural_Time: a.neutralTime
        });
      });
      this.excelService.exportAsExcelFile(excelList, "Employee Time Champ Report", this.excelColumns);
      this.loading = false;
    }, 500);
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
