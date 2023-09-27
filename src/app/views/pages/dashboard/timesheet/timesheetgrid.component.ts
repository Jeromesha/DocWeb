import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import * as moment from "moment";
import { TranslateService } from '@ngx-translate/core';
import swal from "sweetalert2";
import { AlertService } from "src/app/services/alert.service";
import { DashboardService } from "src/app/services/dashboard.service";

import { NavigationService } from "src/app/services/navigation.service";
import { TimeSheetService } from "src/app/services/timesheet.service";
import { UserSessionService } from "src/app/services/usersession.service";
import { animate, state, style, transition, trigger } from "@angular/animations";


@Component({
  selector: 'app-timesheetgrid',
  templateUrl: './timesheetgrid.component.html',
  styleUrls: ['./timesheetgrid.component.scss'],
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", minHeight: "0", visibility: "hidden" })
      ),
      state("expanded", style({ height: "*", visibility: "visible" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class TimesheetgridComponent implements OnInit {

  loading: boolean;
  data = [];
  dataSource = new MatTableDataSource(this.data);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("searchInput", { static: true }) searchInput: ElementRef;
  UserId: any;
  expandedElement: any;

  resultArray: any;

  @Input() actioninfo: any;

  displayedColumns: string[] = [
    "action",
    "entryDate",
    //"Project",
    "arrowUpDown",
    "Hours"
    //"Description"
  ];



  public: string[];
  constructor(
    public navigationService: NavigationService,
    private dashboardService: DashboardService,
    public translate: TranslateService,
    private usersessionService: UserSessionService,
    private timesheetService: TimeSheetService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    debugger;
    this.UserId = this.usersessionService.userId();
    this.gettimesheet(this.UserId);
    //this.getRedistrationData();
  }

  refresh() {
    this.searchInput.nativeElement.value = "";
    this.gettimesheet(this.UserId);
  }



  // gettimesheet(userId: any) {
  //   // this.loading = true;
  //   this.timesheetService.getTimesheet(userId, true).subscribe((res) => {
  //     if (res) {
  //       this.loading = false;
  //       this.data = res;
  //       this.dataSource = new MatTableDataSource(this.data);
  //       this.dataSource.sort = this.sort;
  //       this.dataSource.paginator = this.paginator;
  //     }
  //   });
  // }



  gettimesheet(userId: any) {
    // this.loading = true;
    this.timesheetService.getTimesheet(userId, true).subscribe((res) => {
      if (res) {
        this.loading = false;

        const uniqueDates = Array.from(new Set(res.map(v => moment(v.entryDate).format('YYYY-MM-DD'))));

        this.resultArray = uniqueDates.map(date => {
          const dropdownData = res.filter(item => moment(item.entryDate).format('YYYY-MM-DD') === date);

          const formattedDropdownData = this.formatDropdownData(dropdownData);


          return {
            date,
            totalHours: this.calculateTotalHoursForDate(dropdownData),
            dropdownData: formattedDropdownData
          };
        });

        console.log(this.resultArray);

        this.dataSource = new MatTableDataSource(this.resultArray);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  calculateTotalHoursForDate(data: any[]): string {
    const totalMinutes = data.reduce((total, item) => total + item.hours, 0);
    const totalHours = this.convertMinutesToHoursAndMinutes(totalMinutes);
    return totalHours;

  }
  formatDropdownData(data: any[]): any[] {
    return data.map(item => ({
      ...item,
      hours: (this.convertMinutesToHoursAndMinutes(item.hours))
    }));
  }

  convertMinutesToHoursAndMinutes(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
    const minutesString = remainingMinutes < 10 ? `0${remainingMinutes}` : `${remainingMinutes}`;
    return `${hoursString}:${minutesString}`;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  goToAction(id: number, actioninfo: number) {
    debugger
    this.navigationService.goToTimeSheet(id, actioninfo);
  }
  deleteRow(id) {
    let data = id
    this.timesheetService.delete(data).subscribe(result => {
      if (result) {
        this.refresh();
        this.alertService.success("Deleted Succussfully");

        // const msg1 = this.translate.instant('Savedsuccessfully');
        // const msg2 = this.translate.instant('Updatedsuccessfully');
        // const msg3 = this.translate.instant('');
        // const sucessmsg = this.id == 0 ? msg1 : msg2;

      }
    });
  }

  onDelete(e: Event, id: any) {
    e.preventDefault();
    const title = this.translate.instant('DeleteConfirmation');
    const txt = this.translate.instant('Are you sure you want to delete?');
    const Yes = this.translate.instant('Yes');
    const No = this.translate.instant('No');
    swal.fire({
      title,
      text: txt,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: Yes,
      cancelButtonText: No,
    }).then((result) => {
      if (result.value) {
        this.timesheetService.delete(id).subscribe(result => {
          if (result) {
            this.refresh();
            this.alertService.success("Deleted Succussfully");
          }
          else {
            this.alertService.error("Deletion unsuccussful");
          }
        });
      }
    })
  }

  deleteAll(e: Event, date: any) {
    debugger;
    let result = [];
    result = this.resultArray;
    console.log(result);
    for (const item of result) {
      if (item.date === date) {
        e.preventDefault();
        const title = this.translate.instant('DeleteConfirmation');
        const txt = this.translate.instant('Are you sure you want to delete?');
        const Yes = this.translate.instant('Yes');
        const No = this.translate.instant('No');
        swal.fire({
          title,
          text: txt,
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: Yes,
          cancelButtonText: No,
        }).then((result) => {
          if (result.value) {
            for (const i of item.dropdownData) {
              this.timesheetService.delete(i.id).subscribe(result => {
                if (result) {
                  this.refresh();
                  this.alertService.success("Deleted Succussfully");
                }
                else {
                  this.alertService.error("Deletion unsuccussful");
                }
              });
            }
          }
        })
      }
    }



  }
}
