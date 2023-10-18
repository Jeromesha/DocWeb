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
  mindate: Date;
  maxdate: Date;
  currentDate: Date;
  ddate: any;

  dataSource = new MatTableDataSource(this.jData);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("searchInput", { static: true }) searchInput: ElementRef;
  @ViewChild("chart") chart: ChartComponent;

  public chartOptions: Partial<ChartOptions>;
  @ViewChild('dt1') dt1: OwlDateTimeComponent<any>;
  @Input() workingTime: string;
  @Input() productiveTime: string;
  @Input() neutralTime: string;
  @Input() awayTime: string;
  @Input() lastSeen: string;
  UserId: any;
  displayedColumns: string[] = [
    "Name",
    "Man Days",
    "Work Hours Avg",
  ];


  public: string[];
  dateTimePicker: OwlDateTimeComponent<any>;
  dashboardlist: any;
  st: any;
  wt: any;
  nt: any;
  at: any;
  pt: any;
  ls: any;
  constructor(
    public navigationService: NavigationService,
    private dashboardService: DashboardService,
    private usersessionService: UserSessionService,
    private alertService: AlertService,
    private dateTimeAdapter: DateTimeAdapter<any>,
    private datePipe: DatePipe
  ) {
    this.currentDate = new Date();
    this.ddate = moment(this.currentDate).format('YYYY-MM-DD');
  }

  ngOnInit(): void {
    debugger;
    this.UserId = this.usersessionService.userId();
    this.timechamp(this.UserId, this.ddate);
    this.jData = [
      { Name: 'John', ManDays: 5, WorkHoursAvg: 8 },
      { Name: 'Alice', ManDays: 4, WorkHoursAvg: 7 },
      { Name: 'Bob', ManDays: 6, WorkHoursAvg: 7.5 }
    ];
    this.dataSource = new MatTableDataSource(this.jData);

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
    const previousDay = new Date(this.currentDate);
    previousDay.setDate(this.currentDate.getDate() - 1);
    this.currentDate = previousDay;
  }

  nextDate() {
    const nextDay = new Date(this.currentDate);
    nextDay.setDate(this.currentDate.getDate() + 1);
    this.currentDate = nextDay;
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
  // getTimeChart(id: any, date: any) {
  //   debugger;
  //   let chart = [5.67, 6.78, 30, 30, 44];
  //   this.dashboardService.gettimchamp(id, date, true).subscribe(result => {
  //     let res = {
  //       StartTime: moment(result.inTs).format('HH:mm'),
  //       WorkingTime: this.convertSecondsToHHMM(result.activeSecond),
  //       ProductiveTime: this.convertSecondsToHHMM(result.activeSecond),
  //       NeutralTime: this.convertSecondsToHHMM(result.lockSecond),
  //       AwayTime: this.convertSecondsToHHMM(result.idleSecond),
  //       LastSeen: moment(result.outTs).format('HH:mm')
  //     };
  //     chart = [parseInt(res?.StartTime),
  //     parseInt(res?.WorkingTime),
  //     parseInt(res?.NeutralTime),
  //     parseInt(res?.ProductiveTime),
  //     parseInt(res?.LastSeen),
  //     parseInt(res?.AwayTime)]
  //     console.log(chart);
  //     return chart;
  //   });
  //   return chart;
  // }
  timechamp(id: number, date: Date) {
    debugger
    this.dashboardService.gettimchamp(id, date, true).subscribe(result => {

      debugger;
      //this.dashboardlist = result;
      console.log(result, 'res');
      this.dashboardlist = {
        StartTime: moment(result.inTs).format('HH:mm'),
        WorkingTime: this.convertSecondsToHHMM(result.activeSecond),
        ProductiveTime: this.convertSecondsToHHMM(result.activeSecond),
        NeutralTime: this.convertSecondsToHHMM(result.lockSecond),
        AwayTime: this.convertSecondsToHHMM(result.idleSecond),
        LastSeen: moment(result.outTs).format('HH:mm')
      }
      this.timechart(this.dashboardlist);
    });

  }
  timechart(dashboardlist) {
    debugger
    const dblist = dashboardlist
    // this.st = (dblist?.StartTime);
    this.wt = this.timeToMinutes(dblist.WorkingTime)
    this.nt = this.timeToMinutes(dblist.NeutralTime)
    this.pt = this.timeToMinutes(dblist.ProductiveTime)
    // this.ls = (dblist?.LastSeen)
    this.at = this.timeToMinutes(dblist.AwayTime)
    console.log(this.wt, this.nt, this.pt, this.at);
    debugger;
    console.log('chart', this.chart);
    this.chartOptions = {
      //series: [5.67, 6.78, 30, 30, 44],

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
      legend1:
      {
        position: "bottom",
        horizontalAlign: "center"
      }
    };
    console.log(parseInt(this.dashboardlist?.StartTime), 'hii')

  }
  timeToMinutes(time) {
    debugger;
    const [hours, minutes] = time.split(':').map(Number);
    return Number(`${hours}.${minutes}`);
  }
}
