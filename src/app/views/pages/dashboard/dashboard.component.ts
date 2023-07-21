import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import * as moment from "moment";
import { AlertService } from "src/app/services/alert.service";
import { DashboardService } from "src/app/services/dashboard.service";
import { ExcelService } from "src/app/services/excel.service";
import { NavigationService } from "src/app/services/navigation.service";


@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {

  loading: boolean;
  data = [];
  dataSource = new MatTableDataSource(this.data);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("searchInput", { static: true }) searchInput: ElementRef;
  displayedColumns: string[] = [
    "action",
    "status",
    "RegistrationNo",
    "registrationTs",
    "OrganizatioType",
    "OrganizationName",
    "indoorTypeName",
    "outdoorTypeName",
    "totalCost",
    "mobile",
    "email",
  ];
  public excelColumns: string[];
  constructor(
    public navigationService: NavigationService,
    private dashboardService: DashboardService,
    private excelService: ExcelService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    debugger;
    this.getRedistrationData();
  }

  refresh() {
    this.searchInput.nativeElement.value = "";
    this.getRedistrationData();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRedistrationData() {
    this.loading = true;
    this.dashboardService.getRegistrationData(true).subscribe((res) => {
      if (res) {
        this.loading = false;
        this.data = res;
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }
  goToAction(id: number, actioninfo: number) {
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
}