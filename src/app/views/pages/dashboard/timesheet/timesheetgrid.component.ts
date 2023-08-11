import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import * as moment from "moment";
import { AlertService } from "src/app/services/alert.service";
import { DashboardService } from "src/app/services/dashboard.service";
import { ExcelService } from "src/app/services/excel.service";
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
  public excelColumns: string[];
  constructor(
    public navigationService: NavigationService,
    private dashboardService: DashboardService,
    private excelService: ExcelService,
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
        "Booking Reference Number",
        "Booking Date",
        "Organisation Type",
        "Organisation / Agency Name",
        "GST IN",
        "Contact Person Name",
        "Mobile Number",
        "E-Mail",
        "Indoor Type",
        "Outdoor Type",
        "Total Cost (inc of GST 18%)",
        "Payment Status"

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
          outdoorTypeName: a.outdoorTypeName,
          totalCost: a.totalCost,
          paymentstatus: a.registrationStatusTypeName
        });
      });
      this.excelService.exportAsExcelFile(
        excelList,
        "Registration Report",
        this.excelColumns
      );
      this.loading = false;
    }, 500);
  }

  deleteRow(id){
    let data = id
    this.timesheetService.delete(data).subscribe(result => {
      if (result) {
        this.alertService.success("Deleted Succussfully");

        // const msg1 = this.translate.instant('Savedsuccessfully');
        // const msg2 = this.translate.instant('Updatedsuccessfully');
        // const msg3 = this.translate.instant('');
        // const sucessmsg = this.id == 0 ? msg1 : msg2;

      }
  }); 
}
}
