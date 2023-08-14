import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
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

@Component({
  selector: 'app-timesheetgrid',
  templateUrl: './timesheetgrid.component.html',
  styleUrls: ['./timesheetgrid.component.scss']
})
export class TimesheetgridComponent implements OnInit {

  loading: boolean;
  data = [];
  dataSource = new MatTableDataSource(this.data);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("searchInput", { static: true }) searchInput: ElementRef;
  UserId: any;
  displayedColumns: string[] = [
    "action",
    "entryDate",
    "Project",
    "Hours",
    "Description"
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

  gettimesheet(userId: any) {
    // this.loading = true;
    this.timesheetService.getTimesheet(userId, true).subscribe((res) => {
      if (res) {
        this.loading = false;
        this.data = res;
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
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
        });
      }
    })
  }
}
