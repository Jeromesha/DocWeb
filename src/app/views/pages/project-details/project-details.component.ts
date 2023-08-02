import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import * as moment from "moment";
import { AlertService } from "src/app/services/alert.service";
import { DashboardService } from "src/app/services/dashboard.service";
import { ExcelService } from "src/app/services/excel.service";
import { NavigationService } from "src/app/services/navigation.service";
import { UserSessionService } from "src/app/services/usersession.service";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  loading: boolean;
  data = [];
  dataSource = new MatTableDataSource(this.data);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("searchInput", { static: true }) searchInput: ElementRef;
  UserId: any;
  displayedColumns: string[] = [
    "action",
    "clintid",
    "projectname",
    "projecttype",
    "Technologytype",
    "Repositoryname",
    "Repositoryurl",
    "ScheduledStart",
    "ScheduledEnd",
    "projectstatus"
  ];

   // "S.No",
      // "clintid",
      // "projectname",
      // "projecttype",
      // "Technologytype",
      // "Repositoryname",
      // "Repositoryurl",
      // "ScheduledStart",
      // "ScheduledEnd",
      // "projectstatus",
      // "action"
  public excelColumns: string[];

  constructor(
    public navigationService: NavigationService,
    private dashboardService: DashboardService,
    private excelService: ExcelService,
    private usersessionService: UserSessionService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    debugger;
    this.UserId = this.usersessionService.userId();
    // this.gettimesheet(this.UserId);
  }

  gettimesheet(userId: any) {
    // this.loading = true;
    this.dashboardService.gettimesheet(userId, true).subscribe((res) => {
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
    this.navigationService.goToproject(id, actioninfo);
  }
  exportAsXLSX(): void {
    this.loading = true;
    setTimeout(() => {
      var exportData = this.data;
      if (!exportData || exportData.length === 0) {
        this.alertService.info("No data available to export");
        return;
      }

      this.excelColumns = [
        "S.No",
        "clintid",
        "projectname",
        "projecttype",
        "Technologytype",
        "Repositoryname",
        "Repositoryurl",
        "ScheduledStart",
        "ScheduledEnd",
        "projectstatus",
        "action"
      ];

     

      const excelList = [];
      exportData.forEach((a, index) => {
        let fillUpDate = moment(a.registrationTs).format('DD-MM-YYYY');
        excelList.push({
          sNo: index + 1,
          registrationRefNo: a.registrationRefNo,
          registrationTs: fillUpDate,
          organisationTypeName: a.organisationTypeName,
          organisationName: a.organisationName,
          gstNo: a.gstNo,
          contactPersonName: a.contactPersonName,
          contactPersonMobileNo: a.contactPersonMobileNo,
          contactPersonEmail: a.contactPersonEmail,
          indoorType: a.indoorType,
        });
      });
      this.excelService.exportAsExcelFile(
        excelList,
        "Project Details",
        this.excelColumns
      );
      this.loading = false;
    }, 500);
  }

  refresh() {
    this.searchInput.nativeElement.value = "";
    this.gettimesheet(this.UserId);
  }

}
