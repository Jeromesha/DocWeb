import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/services/alert.service';
import { ExcelService } from 'src/app/services/excel.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserSessionService } from 'src/app/services/usersession.service';
import { RoleType } from 'src/enum/roletype';

@Component({
  selector: 'app-perodictask-grid',
  templateUrl: './perodictask-grid.component.html',
  styleUrls: ['./perodictask-grid.component.scss'],
})
export class PerodictaskGridComponent implements OnInit {

  form:FormGroup;
  data = [];
  dataSource = new MatTableDataSource(this.data);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("searchInput", { static: true }) searchInput: ElementRef;
  displayedColumns: any[];
  resultArray: any[];
  expandedElement: any;
  roleId: any;
  public RoleEnumType = RoleType;
  constructor(
    private formBuilder: FormBuilder,
    private navigationService: NavigationService,
    public translate: TranslateService,
    private alertService: AlertService,
    private excelService: ExcelService,
    private userSessionService: UserSessionService
  ) {
    this.roleId = this.userSessionService.roleId();
   }

  ngOnInit(): void {
    this.displayedColumns = [
      "action",
      "task",
      "description"
    ];
    this.gettaskGriddata();
  }

  addKraTask(dataFieldId: any, actioninfo: any) {
    // dataField.id, actioninfo
    this.navigationService.gotoPeriodicTaskAdd(0,actioninfo);
  }
  refresh(){

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  gettaskGriddata() {
    // this.taskservice.GetAssignTaskList(this.getApiName()).subscribe(result => {
      this.resultArray = [];
      // if (result && result.value) {
      //   this.resultArray = result.value;
      // }

    //   this.resultArray.forEach(result => {
    //     result.periodicTaskStatusViewModel.sort((a, b) => new Date(b.statusDate).getTime() - new Date(a.statusDate).getTime());
    // });


    this.resultArray=[{
      description:'Brand Value',
      task:'Test ',

      id:1,
    }]
    
      this.dataSource = new MatTableDataSource(this.resultArray);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.data = this.resultArray;

    // })
  }

}
