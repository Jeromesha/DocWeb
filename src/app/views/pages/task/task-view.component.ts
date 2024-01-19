import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup,Validators, FormBuilder,FormControl} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/services/alert.service';
import { EmployeedetailsService } from 'src/app/services/employeedetails.service';
import { ExcelService } from 'src/app/services/excel.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { TaskService } from 'src/app/services/task.service';
import { TimeSheetService } from 'src/app/services/timesheet.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {


  loading: boolean;
  data = [];
  dataSource = new MatTableDataSource(this.data);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("searchInput", { static: true }) searchInput: ElementRef;

  displayedColumns: string[] = [
    "action",
    "project",
    "firstName",
    "shortdescription",
    "status",
    // "joiningDate",
    // "designation"
  ];
  
  form: FormGroup;
  showdescription: boolean = false;
  SortList: any;
  filterSortList: any[];
  excelColumns: string[];
  projectid =0
  statuslist :any[]=[1,3];
  resultArray: any;
  dropdownSettings: any = {};
  // filtertechnologytypelist: any;
  filtertaskstatuslist: any;
  taskstatuslist: any;

  constructor(private formBuilder: FormBuilder,
    private timesheetService: TimeSheetService,
    private taskservice: TaskService,
    private navigationService: NavigationService,
    public translate: TranslateService,
    private alertService: AlertService,
    private excelService: ExcelService,
    private taskservice : TaskService

  ) { }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      projectId: [null, Validators.required],
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'key',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };

    this.Getproject();
    this.getTaskstatus();
  }

  initializeValidators() {
    this.form = this.formBuilder.group({
      projectId: ['', [Validators.required]],
    });
  }
  sortingChange(event) {
    debugger
    if (event.value != null) {
      this.showdescription = true;
    }
  }

  getTaskstatus() {
    this.taskservice.GetTaskstatus().subscribe(result => {
      this.taskstatuslist = result;
      this.filtertaskstatuslist = this.taskstatuslist.slice();
    })
  }

  Getproject() {
    debugger;
    this.timesheetService.getproject().subscribe(result => {
      console.log(">>>?", result);
      this.SortList = result
      this.filterSortList = this.SortList.slice();
    });
    this.gettaskGriddata(this.projectid,this.statuslist);
  }

  gettaskGriddata(id:any,statuslist:any){
    debugger;
    this.taskservice.GetTaskGridData(id,statuslist).subscribe(result => {
      this.resultArray = result;
      console.log(this.resultArray,"this data")
    this.dataSource = new MatTableDataSource(this.resultArray);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    })
  }

  goToAction(id: any, actioninfo: any) {
    this.navigationService.gotoTask(id, actioninfo);
  }
  refresh() {
    throw new Error('Method not implemented.');
  }
  onExportExcel() {
    throw new Error('Method not implemented.');
  }
  applyFilter($event: KeyboardEvent) {
    throw new Error('Method not implemented.');
  }
  onDelete($event: MouseEvent, arg1: any, arg2: any) {
    throw new Error('Method not implemented.');
  }
}
