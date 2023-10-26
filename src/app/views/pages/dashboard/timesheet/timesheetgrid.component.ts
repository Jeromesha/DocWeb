import { Component, ElementRef, Input, OnInit, Output, ViewChild } from "@angular/core";
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
import * as _ from "lodash";
import { ExcelService } from "src/app/services/excel.service";


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

  @Output() showTable;
  loading: boolean;
  data = [];
  dataSource = new MatTableDataSource(this.data);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("searchInput", { static: true }) searchInput: ElementRef;
  UserId: any;
  expandedElement: any;

  resultArray: any;

  expanded = false;

  @Input() actioninfo: any;

  displayedColumns: string[] = [
    "action",
    "entryDate",
    "Hours"
  ];



  public: string[];
  excelColumns: string[];
  constructor(
    public navigationService: NavigationService,
    private dashboardService: DashboardService,
    public translate: TranslateService,
    private usersessionService: UserSessionService,
    private timesheetService: TimeSheetService,
    private alertService: AlertService,
    private excelService: ExcelService,
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
    this.timesheetService.getTimesheet(userId, true).subscribe((res) => {
      if (res) {
        this.loading = false;
        console.log('res' + res);
        this.resultArray = res.map((entry) => {
          const formattedDate = moment(entry.entryDate).format('YYYY-MM-DD');
          const dropdownData = entry.timesheets;
          const formattedDropdownData = this.formatDropdownData(dropdownData);
          const totalHours = this.calculateTotalHoursForDate(dropdownData);

          return {
            date: formattedDate,
            totalHours: totalHours,
            dropdownData: formattedDropdownData
          };
        });
        console.log(this.resultArray);
        this.resultArray = _.orderBy(this.resultArray, ['date'], ['desc']);


        this.dataSource = new MatTableDataSource(this.resultArray);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  calculateTotalHoursForDate(data: any[]): string {
    const totalMinutes = data.reduce((total, item) => total + item.hours, 0);
    return this.convertMinutesToHoursAndMinutes(totalMinutes);
  }

  formatDropdownData(data: any[]): any[] {
    return data.map(item => ({
      ...item,
      hours: this.convertMinutesToHoursAndMinutes(item.hours)
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
    this.navigationService.goToTimeSheet(id, actioninfo);
  }
  goToActions(date: Date, actioninfo: number) {
    debugger
    this.navigationService.goToTimeSheets(date, actioninfo);
  }
  deleteRow(id) {
    let data = id
    this.timesheetService.delete(data).subscribe(result => {
      if (result) {
        this.refresh();
        this.alertService.success("Deleted Succussfully");
      }
    });
  }

  onDelete(e: Event, id: any, date: any) {
    debugger;
    const formatDate = moment(date).format('DD-MM-YYYY');
    e.preventDefault();
    const title = this.translate.instant('DeleteConfirmation');
    const msg = 'Are you certain about deleting the record for ' + formatDate + ' ?';
    const txt = this.translate.instant(msg);
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
    this.loading = true;
    let result = [];
    result = this.resultArray;
    const formatDate = moment(date).format('DD-MM-YYYY');
    for (const item of result) {
      if (item.date === date) {
        e.preventDefault();
        const title = this.translate.instant('DeleteConfirmation');
        const msg = 'Are you certain about deleting the records for ' + formatDate + ' ?';
        const txt = this.translate.instant(msg);
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
                  //swal.fire('Deleted!', 'Your Data has been deleted.', 'success');
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

  expandUp(dataField) {
    debugger;
    this.expandedElement = {};
    this.expandedElement = dataField;
  }
  expandDown(dataField) {
    debugger;
    this.expandedElement = {};
    this.expandedElement = dataField;
  }

  onExportExcel() {
    debugger;
    this.loading = true;
    setTimeout(() => {
      var exportData = this.resultArray;
      console.log('timesheetexcel', exportData)
      if (!exportData || exportData.length === 0) {
        this.alertService.info("No data available to export");
        return;
      }
      let name;
      name = "TimeSheet Details Report";
      // this.excelColumns = [
      //   "Entry Date",
      //   "Dropdown Data",
      //   "Hours",
      // ];
      // const excelList = [];
      // exportData.forEach((a) => {
      //   // Combine the data from the 'dropdownData' array into a table-like format
      //   let dropdownDataFormatted = "";

      //   if (a.dropdownData && a.dropdownData.length > 0) {
      //     dropdownDataFormatted = a.dropdownData
      //       .map(item => `${item.label}: ${item.value}`)
      //       .join('\n');
      //   }
      //   excelList.push({
      //     Entry_Date: a.date,
      //     Dropdown_Data: dropdownDataFormatted,
      //     Hours: a.totalHours
      //   });
      // });

      this.excelColumns = [
        "Entry Date",
        "Total Hours",
        "DropdownData - Project",
        "DropdownData - Hours",
        "DropdownData - Remarks",
      ];

      const excelList = [];
      const uniqueDates = new Set(); 
      exportData.forEach((a) => {
        if (!uniqueDates.has(a.date)) {
          uniqueDates.add(a.date);
          excelList.push({
            "Entry Date": a.date,
            "Total Hours": a.totalHours,
            "DropdownData - Project": "",
            "DropdownData - Hours": "",
            "DropdownData - Remarks": "",
          });
        }
        a.dropdownData.forEach((d) => {
          excelList.push({
            "Entry Date": "",
            "Total Hours": "",
            "DropdownData - Project": d.project,
            "DropdownData - Hours": d.hours,
            "DropdownData - Remarks": d.description,
          });
        });
      });

      this.excelService.exportAsExcelFile(excelList, "TimeSheet Deatils Report", this.excelColumns);
      this.loading = false;
    }, 500);
  }


}

