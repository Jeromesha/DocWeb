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
import { NavigationService } from "src/app/services/navigation.service";
import { ProjectdetailsService } from 'src/app/services/projectdetails.service';
import { UserSessionService } from "src/app/services/usersession.service";
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-weeklytimesheetaprovel',
  templateUrl: './weeklytimesheetaprovel.component.html',
  styleUrls: ['./weeklytimesheetaprovel.component.scss']
})
export class WeeklytimesheetaprovelComponent implements OnInit {
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
    "action",
    "clintid",
    "projectname",
  ];

  public excelColumns: string[];
  approvelid: any [] = [];

  constructor(
    public navigationService: NavigationService,
    private dashboardService: DashboardService,
    private excelService: ExcelService,
    private usersessionService: UserSessionService,
    private alertService: AlertService,
    private projectdetailsservice: ProjectdetailsService,
    private _location: Location,
    private translate: TranslateService,
    route: ActivatedRoute,
    // private router: Router
  ) { 
    this.routeParams = route.snapshot.params;
    debugger
    this.id = JSON.parse(this.routeParams.id);
    this.id = parseInt(this.routeParams.id);
    //this.id = 0;
    debugger
    this.actionInfo = this.routeParams.actionInfo
  }

  ngOnInit(): void {
    debugger;
    this.UserId = this.usersessionService.userId();
    // this.gettimesheet(this.UserId);
    this.getprojectdetailsdata();
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

  getprojectdetailsdata(){
    debugger;
    this.projectdetailsservice.getunapproveddata(this.id, this.actionInfo).subscribe((result) =>{
      console.log("}}}?",result)
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
        "projectlead",
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
    this.getprojectdetailsdata();
  }
  onCancel() {
    this._location.back();
  }

  isActive(id){
    debugger;
    this.approvelid.push(id) ;
  }

  approve() {
    console.log(">:",this.approvelid);
    // var projectdata = 
    //  { 
    //   id:this.id,
    // }
    // if () {
      debugger
      this.projectdetailsservice.Approve(this.approvelid).subscribe(result => {
        const msg1 = this.translate.instant('Savedsuccessfully');
        const msg2 = this.translate.instant('Updatedsuccessfully');
        const msg3 = this.translate.instant('Region');
        const sucessmsg = this.id == 0 ? msg1 : msg2;
        this.alertService.result(result, true, msg3 + ' ' + sucessmsg);
      });
    // this.router.navigate(['/projectdetails/']);
    // } 
    // else {
    //   const msg4 = this.translate.instant('Please Check All fields');
    //   // this.validateFormControl();
    //   this.alertService.result(result, true, msg4 );

    // }
  }

}
