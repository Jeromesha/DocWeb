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

  constructor(
    public navigationService: NavigationService,
    private dashboardService: DashboardService,
    private usersessionService: UserSessionService,
    private alertService: AlertService,
    public translate: TranslateService,
    private projectdetailsservice: ProjectdetailsService,
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
}
