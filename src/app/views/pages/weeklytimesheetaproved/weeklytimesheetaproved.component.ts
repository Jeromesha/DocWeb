import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from '@angular/router';
import { result } from 'lodash';
import * as moment from "moment";
import { AlertService } from "src/app/services/alert.service";
import { DashboardService } from "src/app/services/dashboard.service";
import { ExcelService } from "src/app/services/excel.service";
import { MappingdetailServices } from 'src/app/services/mappingdetails.service';
import { NavigationService } from "src/app/services/navigation.service";
import { ProjectdetailsService } from 'src/app/services/projectdetails.service';
import { UserSessionService } from "src/app/services/usersession.service";


@Component({
  selector: 'app-weeklytimesheetaproved',
  templateUrl: './weeklytimesheetaproved.component.html',
  styleUrls: ['./weeklytimesheetaproved.component.scss']
})
export class WeeklytimesheetaprovedComponent implements OnInit {
  routeParams: any;
  id = 0;
  actionInfo = 0;
  loading: boolean;
  data = [];
  dataSource = new MatTableDataSource(this.data);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("searchInput", { static: true }) searchInput: ElementRef;
  UserId: any;
  displayedColumns: string[] = [
    "Project",
    "Employees"
  ];
  public excelColumns: string[];
  constructor(
    public navigationService: NavigationService,
    private mappingdetailServices: MappingdetailServices,
    private excelService: ExcelService,
    route: ActivatedRoute,
    private usersessionService: UserSessionService,
    private alertService: AlertService
  ) { 
   
  }

  ngOnInit(): void {
    debugger;
    this.UserId = this.usersessionService.userId();
    this.getMappingDetail(this.UserId);
    //this.getRedistrationData();
  }

  refresh() {
    this.searchInput.nativeElement.value = "";
    this.getMappingDetail(this.UserId);
  }

  getMappingDetail(userId: any) {
    // this.loading = true;
    this.mappingdetailServices.getmappingdetail(userId, true).subscribe((res) => {
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
    this.navigationService.goToMapping(id, actioninfo);
  }
  viewemplayee(projectid: number, employeid: number){
    this.navigationService.goToemplayeeview(projectid, employeid);
  }

 

}