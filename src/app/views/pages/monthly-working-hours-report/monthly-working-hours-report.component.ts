import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/services/alert.service';
import { ExcelService } from 'src/app/services/excel.service';
import { ProjectdetailsService } from 'src/app/services/projectdetails.service';
import { TimeSheetService } from 'src/app/services/timesheet.service';

@Component({
  selector: 'app-monthly-working-hours-report',
  templateUrl: './monthly-working-hours-report.component.html',
  styleUrls: ['./monthly-working-hours-report.component.scss']
})
export class MonthlyWorkingHoursReportComponent implements OnInit {

  data: any[] = [];
  dataSource = new MatTableDataSource(this.data);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("searchInput", { static: true }) searchInput: ElementRef;
  form: any;
  loading: boolean = false;
  selectedyear: number;
  years: number[] = [];
  filteryears: any[] = [];
  months: any[] = [];
  EmployeeList: any;
  filtermappedEmployeeList: any;
  show: boolean = false;
  dates: any[] = [];
  excelColumns: string[];
  displayedColumns: string[] = [
    "code",
    "Employee",
    "Expectedhours",
    "workingHours",
    ...this.dates,
    "workingDays",
    "dateOfJoining",
  ];

  constructor(
    private formBuilder: FormBuilder,
    private projectdetailsservice: ProjectdetailsService,
    private timesheetService: TimeSheetService,
    private datePipe: DatePipe,
    private excelService: ExcelService,
    private alertService: AlertService) {
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
    this.getEmployees();
  }

  initialValidators() {
    this.form = this.formBuilder.group({
      'month': ['', Validators.required],
      'year': ['', Validators.required],
      'employeeName': []
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
  getEmployees() {
    debugger;
    this.projectdetailsservice.getLookup(2, true).subscribe(result => {
      this.EmployeeList = result;
      this.filtermappedEmployeeList = this.EmployeeList.slice();
    })
  }
  // getWorkingHoursDetails() {
  //   if (this.form.valid) {
  //     debugger;
  //     // this.dates=[];
  //     let month = this.form.value.month;
  //     let year = this.form.value.year;
  //     let empId = this.form.value.employeeName?this.form.value.employeeName:0;
  //     debugger
  //     this.timesheetService.getMonthlyHowkingHours(empId, month, year).subscribe((result) => {
  //       console.log("}}}?", result)
  //       this.loading = false;
  //       this.show=true;
  //       this.data = result;

  //       // this.data = result.value.map(item => {
  //       //   const dates = item.dateAndTimeList.map(entry => entry.date);
  //       //   if (dates.length > 0) {
  //       //     this.dates.push(...dates.filter(date => !this.dates.includes(date)));
  //       //   }
  //       //   return {
  //       //     empCode: item.empCode,
  //       //     firstName: item.firstName,
  //       //     expectedHours: item.expectedHours,
  //       //     totalWorkingHours: item.totalWorkingHours,
  //       //     totalWorkingDays: item.totalWorkingDays,
  //       //     dateOfJoining: item.dateOfJoining,
  //       //     datesAndLoggedHours: item.dateAndTimeList.reduce((acc, val) => {
  //       //       acc[val.date] = val.loggedHours;
  //       //       return acc;
  //       //     }, {})
  //       //   };
  //       // });
  //       // this.dates.forEach(date => {
  //       //   this.displayedColumns.push(date);
  //       // });
  //       // this.dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());





  //       this.data = result.value.map(item => {
  //         const datesAndLoggedHours = {};
  //         item.dateAndTimeList.forEach(entry => {
  //           const formattedDate = this.datePipe.transform(entry.date, 'dd MMM');
  //           datesAndLoggedHours[formattedDate] = entry.loggedHours;
  //           if (!this.dates.includes(formattedDate)) {
  //             this.dates.push(formattedDate);
  //           }
  //         });

  //         return {
  //           empCode: item.empCode,
  //           firstName: item.firstName,
  //           expectedHours: item.expectedHours,
  //           totalWorkingHours: item.totalWorkingHours,
  //           totalWorkingDays: item.totalWorkingDays,
  //           dateOfJoining: this.datePipe.transform(item.dateOfJoining, 'dd-MM-YYYY'),
  //           datesAndLoggedHours: datesAndLoggedHours 
  //         };
  //       });
  //       this.dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  //       this.dates.forEach(date => {
  //         this.displayedColumns.push(date);
  //       });




  //       console.log(this.data, "khjdbvojb")
  //       debugger
  //       this.dataSource = new MatTableDataSource(this.data);
  //       this.dataSource.sort = this.sort;
  //       this.dataSource.paginator = this.paginator;
  //     })
  //   }
  //   else {
  //     this.validateFormControl();
  //   }
  // }
  getWorkingHoursDetails() {
    if (this.form.valid) {
      debugger;
      this.show = false;
      this.dates = [];
      this.displayedColumns = [];
      this.displayedColumns = [
        "code",
        "Employee",
        "Expectedhours",
        "workingHours",
        ...this.dates,
        "workingDays",
        "dateOfJoining",
      ];
      let month = this.form.value.month;
      let year = this.form.value.year;
      let empId = this.form.value.employeeName ? this.form.value.employeeName : 0;
      debugger
      this.timesheetService.getMonthlyHowkingHours(empId, month, year).subscribe((result) => {
        console.log("}}}?", result)
        this.loading = false;
        this.show = true;
        this.data = result;
        this.data = result.value.map(item => {
          const datesAndLoggedHours = {};
          item.dateAndTimeList.forEach(entry => {
            const formattedDate = this.datePipe.transform(entry.date, 'dd MMM YY');
            datesAndLoggedHours[formattedDate] = this.convertMinutesToHHMM(entry.loggedHours);
            if (!this.dates.includes(formattedDate)) {
              this.dates.push(formattedDate);
            }
          });
          return {
            empCode: item.empCode,
            firstName: item.firstName,
            expectedHours: this.convertMinutesToHHMM(item.expectedHours),
            totalWorkingHours: this.convertMinutesToHHMM(item.totalWorkingHours),
            totalWorkingDays: item.totalWorkingDays,
            dateOfJoining: this.datePipe.transform(item.dateOfJoining, 'dd-MM-YYYY'),
            datesAndLoggedHours: datesAndLoggedHours
          };
        });
        this.dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
        this.dates.forEach(date => {
          this.displayedColumns.push(date);
        });

        console.log(this.data, "khjdbvojb")
        debugger
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
    } else {
      this.validateFormControl();
    }
  }
  convertMinutesToHHMM(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const hoursStr = hours < 10 ? '0' + hours : '' + hours;
    const minutesStr = remainingMinutes < 10 ? '0' + remainingMinutes : '' + remainingMinutes;
    return hoursStr + ':' + minutesStr;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onCancel() {
    this.getEmployees();
    this.show = false;
    this.data = [];
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
      name = "Employee's Monthly Working Hours Report";
      this.excelColumns = [
        "Code",
        "Employee",
        "Expected Working Hours",
        "Actual Working Hours",
        "No.working Days",
        "Date Of Joining",
        ...this.dates
      ];

      var excelList = [];
      var rowData;
      excelList.push({});
      exportData.forEach((a) => {
        rowData = {
          Code: a.empCode,
          Employee: a.firstName,
          Expected_Working_Hours: a.expectedHours,
          Actual_Working_Hours: a.totalWorkingHours,
          No_working_Days: a.totalWorkingDays,
          Date_Of_Joining: a.dateOfJoining,
        };
        this.dates.forEach(date => {
          rowData[date] = a.datesAndLoggedHours[date] || 0;
        });
        excelList.push(rowData);
      })
     
      this.excelService.exportAsExcelFile(excelList, "Employee's Monthly Working Hours Report", this.excelColumns);
      this.loading = false;
    }, 500);
  }
}
