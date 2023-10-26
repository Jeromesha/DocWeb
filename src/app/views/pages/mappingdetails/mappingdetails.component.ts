import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { AlertService } from 'src/app/services/alert.service';
import { ExcelService } from 'src/app/services/excel.service';
import { MappingdetailServices } from 'src/app/services/mappingdetails.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserSessionService } from 'src/app/services/usersession.service';

@Component({
  selector: 'app-mappingdetails',
  templateUrl: './mappingdetails.component.html',
  styleUrls: ['./mappingdetails.component.scss']
})
export class MappingdetailsComponent implements OnInit {

  loading: boolean;
  data = [];
  dataSource = new MatTableDataSource(this.data);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("searchInput", { static: true }) searchInput: ElementRef;
  UserId: any;
  displayedColumns: string[] = [
    "action",
    "Project",
    "Employees"
  ];
  public: string[];
  excelColumns: string[];
  constructor(
    public navigationService: NavigationService,
    private mappingdetailServices: MappingdetailServices,
    private usersessionService: UserSessionService,
    private alertService: AlertService,
    private excelService: ExcelService
  ) { }

  ngOnInit(): void {

    this.UserId = this.usersessionService.userId();
    this.getMappingDetail(this.UserId);
    this.refresh();
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
  onExportExcel() {
    debugger;
    this.loading = true;
    setTimeout(() => {
      var exportData = this.data;
      console.log('Mapxcel', exportData)
      if (!exportData || exportData.length === 0) {
        this.alertService.info("No data available to export");
        return;
      }
      let name;
      name = "Project Employee Mapping Details Report";
      this.excelColumns = [
        "Project Name",
        "Employees",
      ];
      const excelList = [];
      excelList.push({});
      // exportData.forEach((a) => {
      //   excelList.push({
      //     Project_Name: a.projectName,
      //     Employees: a.projectEmployees.forEach((b)=>{
      //       excelList.push({
      //         Employees:b.employeeName
      //       })
      //     })
      //   });
      // });
      // exportData.forEach((a) => {
      //   let isFirstEmployee = true;
      //   if (excelList.length >= 0) {
      //     excelList.push({
      //       Project_Name: '',
      //       Employee: '',
      //     });
      //   }

      //   a.projectEmployees.forEach((b) => {
      //     const excelRow = {
      //       Project_Name: isFirstEmployee ? a.projectName : '',
      //       Employee: b.employeeName,
      //     };
      //     isFirstEmployee = false;
      //     excelList.push(excelRow);
      //   });
      // });
      exportData.forEach((a) => {
        a.projectEmployees.forEach((b) => {
          excelList.push({
            Project_Name: a.projectName,
            Employee: b.employeeName,
          });
        });
      });
      this.excelService.exportAsExcelFile(excelList, "Employee Mapping Deatils Report", this.excelColumns);
      this.loading = false;
    }, 500);
  }
}
