import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import swal from "sweetalert2";
import { AlertService } from 'src/app/services/alert.service';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeedetailsService } from 'src/app/services/employeedetails.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { TranslateService } from '@ngx-translate/core';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-employeedetails',
  templateUrl: './employeedetails.component.html',
  styleUrls: ['./employeedetails.component.scss']
})
export class EmployeedetailsComponent implements OnInit {


  loading: boolean;
  data = [];
  dataSource = new MatTableDataSource(this.data);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("searchInput", { static: true }) searchInput: ElementRef;

  displayedColumns: string[] = [
    "action",
    "firstName",
    "email",
    "mobile",
    "joiningDate",
    "designation"
  ];
  excelColumns: string[];
  constructor(private navigationService: NavigationService,
    public translate: TranslateService,
    private employeeService: EmployeedetailsService,
    private alertService: AlertService,
    private excelService: ExcelService,

  ) { }

  ngOnInit(): void {
    this.getEmpDetails();
  }

  goToAction(id, actionInfo) {
    this.navigationService.gotoEmployeeDetails(id, actionInfo)
  }

  getEmpDetails() {
    this.employeeService.getGridDetails(true).subscribe((res) => {
      if(res.isSuccess){
      this.data = res.value;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(res);
      }
      else{
        this.alertService.error(res.htmlFormattedFailures)
      }

    })
  }

  refresh() {
    this.searchInput.nativeElement.value = "";
    this.getEmpDetails();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onDelete(e: Event, id: any, name: any) {
    debugger;
    const fname = name;
    e.preventDefault();
    const title = this.translate.instant('DeleteConfirmation');
    const txt = this.translate.instant('Are you sure, Do you want to delete the details of ' + fname + '?');
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
        this.employeeService.delete(id).subscribe(result => {
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
    debugger
    this.loading = true;
    setTimeout(() => {
      var exportData = this.data;
      console.log('exaslk',exportData)
      if (!exportData || exportData.length === 0) {
        this.alertService.info("No data available to export");
        return;
      }
      let name;
      name = "Employee Details Report";
      this.excelColumns = [
        "Employee Code",
        "Name",
        "Email",
        "Mobile Number",
        "Joining Date",
        "Designation",
      ];

      const excelList = [];
      excelList.push({});
      exportData.forEach((a) => {
        excelList.push({
          Employee_Code: a.empCode,
          Name: a.firstName,
          Email: a.email,
          Mobile_Number: a.mobile,
          Joining_Date: a.joiningDate,
          Designation: a.designation,
        });
      });
      this.excelService.exportAsExcelFile(excelList, "Employee Deatils Report", this.excelColumns);
      this.loading = false;
    }, 500);

  }
}