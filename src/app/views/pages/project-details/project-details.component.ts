import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from '@angular/router';
import { result } from 'lodash';
import * as moment from "moment";
import { AlertService } from "src/app/services/alert.service";
import { DashboardService } from "src/app/services/dashboard.service";
import swal from "sweetalert2";
import { TranslateService } from '@ngx-translate/core';
import { NavigationService } from "src/app/services/navigation.service";
import { ProjectdetailsService } from 'src/app/services/projectdetails.service';
import { UserSessionService } from "src/app/services/usersession.service";
import { ExcelService } from 'src/app/services/excel.service';

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
    // "projectlead",
    "Technologytype",
    "Repositoryname",
    "Repositoryurl",
    "ScheduledStart",
    "ScheduledEnd",
    "natureofprojectlist",
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
  public: string[];
  excelColumns: string[];

  constructor(
    public navigationService: NavigationService,
    private dashboardService: DashboardService,
    private usersessionService: UserSessionService,
    private alertService: AlertService,
    public translate: TranslateService,
    private projectdetailsservice: ProjectdetailsService,
    private excelService: ExcelService,

    // private router: Router
  ) { }

  ngOnInit(): void {
    debugger;
    this.UserId = this.usersessionService.userId();
    this.getprojectdetailsdata();
  }
  getprojectdetailsdata() {
    debugger;
    this.projectdetailsservice.getdata(true).subscribe((result) => {
      console.log("}}}?", result)
      this.loading = false;
      this.data = result;
      this.dataSource = new MatTableDataSource(this.data);
      console.log(this.dataSource,'getprojectdetails')
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
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

  refresh() {
    this.searchInput.nativeElement.value = "";
    this.getprojectdetailsdata();
  }

  onDelete(e: Event, id: any, name: any) {
    const pname = name;
    e.preventDefault();
    const title = this.translate.instant('DeleteConfirmation');
    const txt = this.translate.instant('Are you sure, Do you want to delete the project ' + pname + '?');
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
        this.projectdetailsservice.delete(id).subscribe(result => {
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
  onExportExcel(){
    debugger;
    this.loading = true;
    setTimeout(() => {
      var exportData = this.data;
      console.log('proexcel',exportData)
      if (!exportData || exportData.length === 0) {
        this.alertService.info("No data available to export");
        return;
      }
      let name;
      name = "Project Details Report";
      this.excelColumns = [
        "Client Name",
        "Project Name",
        "Business Unit",
        "Tech Stack",
        "Repository",
        "Repository URL",
        "Start Date",
        "End Date",
        "Nature of Project",
        "Project Status",
      ];
      const excelList = [];
      excelList.push({});
      exportData.forEach((a) => {
        excelList.push({
          Client_Name: a.clientName,
          Project_Name: a.projectName,
          Business_Unit: a.projectTypeName,
          Tech_Stack: a.technologyTypeName.join(', '),
          Repository: a.repositoryName,
          Repository_URL: a.repositoryUrl,
          Start_Date:a.startDate,
          End_Date:a.endDate,
          Nature_of_Project:a.natureoftheProject,
          Project_Status:a.projectStatusName,
        });
      });
      this.excelService.exportAsExcelFile(excelList, "Project Deatils Report", this.excelColumns);
      this.loading = false;
    }, 500);
  }
}
