import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
// import * as moment from "moment";
import { AlertService } from "src/app/services/alert.service";
import { DashboardService } from "src/app/services/dashboard.service";

import { NavigationService } from "src/app/services/navigation.service";
import { UserSessionService } from "src/app/services/usersession.service";

import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// import {default as _rollupMoment} from 'moment';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ApexChart, ApexLegend, ApexNonAxisChartSeries, ApexResponsive, ChartComponent } from "ng-apexcharts";
import { DateTimeAdapter, OwlDateTimeComponent } from "ng-pick-datetime";
import * as moment from 'moment';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { result } from "lodash";
// const moment = _rollupMoment || _moment;
//import { MatDialog } from '@angular/material/dialog';
//import { CalendarComponent } from "src/app/calendar/calendar.component";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  colors: any;
  legend: ApexLegend;
  legend1: ApexLegend;
};

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {

  loading: boolean;
  jData = [];
  maxdate: Date = new Date();
  currentDate: any;
  form: FormGroup;;
  Databasedate: any;
  getdate: any;
  display: boolean = true;
  displaygrid: boolean = true;
  public: string[];
  dateTimePicker: OwlDateTimeComponent<any>;
  dashboardlist: any;
  st: any;
  wt: any;
  nt: any;
  at: any;
  pt: any;
  ls: any;
  dashboardgrid = [];

  //dataSource = new MatTableDataSource(this.jData);
  dataSource = new MatTableDataSource(this.dashboardgrid);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("searchInput", { static: true }) searchInput: ElementRef;
  @ViewChild("chart") chart: ChartComponent;

  public chartOptions: Partial<ChartOptions>;
  @ViewChild('dt1') dt1: OwlDateTimeComponent<any>;
  UserId: any;
  displayedColumns: string[] = [
    "Name",
    "Man Days",
    "Work Hours",
  ];






  constructor(
    public navigationService: NavigationService,
    private dashboardService: DashboardService,
    private usersessionService: UserSessionService,
    private alertService: AlertService,
    private dateTimeAdapter: DateTimeAdapter<any>,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder
  ) {
    this.currentDate = new Date();
    this.Databasedate = moment(this.currentDate).format('YYYY-MM-DD');
  }

  ngOnInit(): void {
    debugger;
    this.UserId = this.usersessionService.userId();
    this.timegrid(this.UserId, this.Databasedate);
    this.timechamp(this.UserId, this.Databasedate);

    // this.jData = [
    //   { Name: 'John', ManDays: 5, WorkHoursAvg: 8 },
    //   { Name: 'Alice', ManDays: 4, WorkHoursAvg: 7 },
    //   { Name: 'Bob', ManDays: 6, WorkHoursAvg: 7.5 }
    // ];
    // this.dataSource = new MatTableDataSource(this.jData);
    this.form = this.formBuilder.group({
      entryDate: this.currentDate
    });
  }

  refresh() {
    this.searchInput.nativeElement.value = "";
    // this.gettimesheet(this.UserId);
  }

  // gettimesheet(userId: any) {
  //   // this.loading = true;
  //   this.dashboardService.gettimesheet(userId, true).subscribe((res) => {
  //     if (res) {
  //       this.loading = false;
  //       this.data = res;
  //       this.dataSource = new MatTableDataSource(this.data);
  //       this.dataSource.sort = this.sort;
  //       this.dataSource.paginator = this.paginator;
  //     }
  //   });
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  goToAction(id: number, actioninfo: number) {
    this.navigationService.goToTimeSheet(id, actioninfo);
  }
  previousDate() {
    debugger
    const previousDay = this.currentDate;
    previousDay.setDate(this.currentDate.getDate() - 1);
    this.currentDate = previousDay;
    this.form.controls['entryDate'].setValue(previousDay);
    this.getdate = moment(this.currentDate).format('YYYY-MM-DD');
    this.timechamp(this.UserId, this.getdate);
    this.timegrid(this.UserId, this.getdate);

  }

  nextDate() {
    debugger;
    const nextDay = this.currentDate;
    if (moment(this.maxdate).format('YYYY-MM-DD') > moment(nextDay).format('YYYY-MM-DD')) {
      nextDay.setDate(this.currentDate.getDate() + 1);
      this.currentDate = nextDay;
      this.form.controls['entryDate'].setValue(nextDay);
      this.getdate = moment(this.currentDate).format('YYYY-MM-DD');
      this.timechamp(this.UserId, this.getdate);
      this.timegrid(this.UserId, this.getdate);
    }
  }

  convertSecondsToHHMM(seconds: number): string {
    if (isNaN(seconds)) {
      return '00:00';
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    const hoursStr = hours < 10 ? '0' + hours : hours.toString();
    const minutesStr = minutes < 10 ? '0' + minutes : minutes.toString();
    const th = hoursStr + ':' + minutesStr;
    console.log(th, 'th');
    return th;

  }
  gettimechamp(object) {
    debugger;
    if (moment.isMoment(object)) {
      this.currentDate = object.toDate();
      this.getdate = moment(this.currentDate).format('YYYY-MM-DD');
      console.log('edate', this.getdate)
      // this.currentDate= object.toDate();
      this.timechamp(this.UserId, this.getdate);
      this.timegrid(this.UserId, this.getdate);
    }
  }
  timechamp(id: number, date: any) {
    debugger
    this.dashboardlist = [];
    this.dashboardService.gettimchamp(id, date, true).subscribe(result => {
      debugger;
      console.log(result, 'res');
      if (result != null) {
        this.dashboardlist = {
          StartTime: moment(result.inTs).format('HH:mm'),
          WorkingTime: this.convertSecondsToHHMM(result.activeSecond),
          ProductiveTime: this.convertSecondsToHHMM(result.activeSecond),
          NeutralTime: this.convertSecondsToHHMM(result.lockSecond),
          AwayTime: this.convertSecondsToHHMM(result.idleSecond),
          LastSeen: result.outTs == null || date == moment(this.maxdate).format('YYYY-MM-DD') ? '00:00' : moment(result.outTs).format('HH:mm')
        }
        this.timechart(this.dashboardlist);
        this.display = true;

      }
      else {
        console.log("no data")
        this.display = false;
      }
    });

  }
  timechart(dashboardlist) {
    debugger
    const dblist = dashboardlist
    this.wt = this.timeToMinutes(dblist.WorkingTime)
    this.nt = this.timeToMinutes(dblist.NeutralTime)
    this.pt = this.timeToMinutes(dblist.ProductiveTime)
    this.at = this.timeToMinutes(dblist.AwayTime)
    console.log(this.wt, this.nt, this.pt, this.at);
    debugger;
    console.log('chart', this.chart);
    this.chartOptions = {
      series: [this.wt, this.nt, this.pt, this.at],
      chart: {
        type: "donut",
        // width: 5100,
        height: 400,
      },
      labels: ["Working Time", "Neutral Time", "Productive Time", "Away Time"],
      colors: ["#66e977", "#fae902", "#af75b1", "#02d9ff"],

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            }
          }
        }
      ],
      legend: {
        position: "bottom",
        horizontalAlign: "center"
      },
    };
  }
  timeToMinutes(time) {
    debugger;
    const [hours, minutes] = time.split(':').map(Number);
    return Number(`${hours}.${minutes}`);
  }

  timegrid(id: number, date: any) {
    debugger;
    this.dashboardgrid = [];
    this.dashboardService.gettimegrid(id, date, true).subscribe(res => {
      debugger;
      if (res.length == 1 && res[0].activeSecond == 0) {
        this.displaygrid = false;
      }
      else {
        this.displaygrid = true;
        this.dashboardgrid = res.map((entry) => {
          const formateWorkinghrs = this.convertSecondsToHHMM(entry.activeSecond);
          const formateName = entry.value;
          const ManDays = 1;

          return {
            Name: formateName,
            WorkingHours: formateWorkinghrs,
            ManDays: ManDays
          };

        });
        this.dataSource = new MatTableDataSource(this.dashboardgrid);
        this.dataSource.sort = this.sort;

      }
    });
  }

}
