import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeedetailsService } from 'src/app/services/employeedetails.service';
import { NavigationService } from 'src/app/services/navigation.service';

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
    "empCode",
    "firstName",
    "email",
    "mobile",
    "joiningDate",
    "designation"
  ];
  constructor(private navigationService:NavigationService,
    private employeeService:EmployeedetailsService) { }

  ngOnInit(): void {
    this.getEmpDetails();
  }

  goToAction(id,actionInfo){
    this.navigationService.gotoEmployeeDetails(id,actionInfo)
  }

  getEmpDetails()
  {
    this.employeeService.getGridDetails(true).subscribe((res)=>{
      this.data = res;
      console.log(res);
      
    })
  }

  refresh(){
    this.getEmpDetails();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
