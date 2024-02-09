import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { OwlDateTimeComponent } from 'ng-pick-datetime';
import { AlertService } from 'src/app/services/alert.service';
import { EmployeedetailsService } from 'src/app/services/employeedetails.service';
import { ExcelService } from 'src/app/services/excel.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { TcTimesheetService } from 'src/app/services/tcTimesheet.service';
import swal from "sweetalert2";

@Component({
  selector: 'app-tc-timesheet',
  templateUrl: './tc-timesheet.component.html',
  styleUrls: ['./tc-timesheet.component.scss']
})
export class TcTimesheetComponent implements OnInit {
  loading: boolean;
  data = [];
  dataSource = new MatTableDataSource(this.data);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("searchInput", { static: true }) searchInput: ElementRef;

  displayedColumns: string[] = [
    "id",
    "users",
    "inTime",
    "lastSeen",
    "workingHours",
    "productiveTime",
    "idleTime",
    "neturalTime"
  ];
  excelColumns: string[];
  form: any;
  currentDate: any;
  maxdate: Date = moment().subtract(1, 'days').toDate();
  dateTimePicker: OwlDateTimeComponent<any>;
  fromPicker: OwlDateTimeComponent<any>;
  getdate: string;
  minDate = new Date(2024, 0, 1);
  constructor(private navigationService: NavigationService,
    public translate: TranslateService,
    private tcTimesheetservice: TcTimesheetService,
    private alertService: AlertService,
    private excelService: ExcelService,
    private formBuilder: FormBuilder
  ) {
    // this.currentDate = new Date();
    this.currentDate = moment().subtract(1, 'days').toDate();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      entryDate: this.currentDate
    });
    this.getTimechampDetails(moment(this.currentDate).format('DD-MMM-YY'));
  }

  getTimechampDetails(date) {
    this.tcTimesheetservice.GetTimechampDetails(date).subscribe((res) => {
      this.data = res.value;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(res);

    })
  }
  SelectedDate(object) {
    debugger;
    if (moment.isMoment(object)) {
      this.currentDate = object.toDate();
      this.getdate = moment(this.currentDate).format('DD-MMM-YY');
      this.getTimechampDetails(this.getdate)
    }
  }
  previousDate() {
    debugger
    const previousDay = this.currentDate;
    if (moment(this.minDate).format('YYYY-MM-DD') < moment(previousDay).format('YYYY-MM-DD')) {
      previousDay.setDate(this.currentDate.getDate() - 1);
      this.currentDate = previousDay;
      console.log(this.currentDate, 'previous')
      this.form.controls['entryDate'].setValue(previousDay);
      this.getdate = moment(this.currentDate).format('DD-MMM-YY');
      this.getTimechampDetails(this.getdate)
    }
    this.clearsearch();
  }

  nextDate() {
    debugger;
    const nextDay = this.currentDate;
    if (moment(this.maxdate).format('YYYY-MM-DD') > moment(nextDay).format('YYYY-MM-DD')) {
      nextDay.setDate(this.currentDate.getDate() + 1);
      this.currentDate = nextDay;
      this.form.controls['entryDate'].setValue(nextDay);
      this.getdate = moment(this.currentDate).format('DD-MMM-YY');
      this.getTimechampDetails(this.getdate)
    }
    this.clearsearch();
  }

  refresh() {
    debugger
    this.searchInput.nativeElement.value = "";
    this.currentDate = moment().subtract(1, 'days').toDate();
    this.form.controls['entryDate'].setValue(this.currentDate);
    this.getTimechampDetails(moment(this.currentDate).format('DD-MMM-YY'));
    this.form
  }

  clearsearch(){
  this.searchInput.nativeElement.value = ''; 
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
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
        "Employee Code",
        "Employee Name ",
        "Date",
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
          Employee_Code: a.empID,
          Name: a.name,
          Date: a.timesheetDate,
          In_Time: a.startDateTime,
          Last_Seen: a.finishDateTime,
          Working_Hours: a.workingTime,
          Productive_Time: a.productiveTime,
          Idle_Time: a.idleTime,
          Netural_Time: a.neutralTime
        });
      });
      this.excelService.exportAsExcelFile(excelList, "Employee's Time Champ Report", this.excelColumns);
      this.loading = false;
    }, 500);

  }
}
