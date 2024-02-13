import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, RequiredValidator } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { UserSession } from 'src/app/models/usersession';
import { AlertService } from 'src/app/services/alert.service';
import { EmployeedetailsService } from 'src/app/services/employeedetails.service';
import { ExcelService } from 'src/app/services/excel.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { TaskService } from 'src/app/services/task.service';
import { TimeSheetService } from 'src/app/services/timesheet.service';
import { UserSessionService } from 'src/app/services/usersession.service';
import swal from "sweetalert2";

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
    "date",
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
  projectid = 0
  statuslist: any[] = [1, 3];
  resultArray: any;
  dropdownSettings: any = {};
  // filtertechnologytypelist: any;
  filtertaskstatuslist: any;
  taskstatuslist: any;
  temp=[
    {key:1,value:'New'},
    {key:3,value:'Inprogress'}
  ]
  roleId:any;
  sessionData = new UserSession();
  showAdd: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private timesheetService: TimeSheetService,
    private taskservice: TaskService,
    private navigationService: NavigationService,
    public translate: TranslateService,
    private alertService: AlertService,
    private excelService: ExcelService,
    private userSessionService : UserSessionService
  ) { 
    debugger;
  }
  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'key',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };

    this.roleId = this.userSessionService.roleId();
    if(this.roleId !=3 && this.roleId !=4)
    {
      this.showAdd = true;
    }
    this.initializeValidators();
    this.Getproject();
    this.getTaskstatus();
    // this.getDefaultTaskStatus();
    this.form.controls["Taskstatus"].setValue(this.temp);
    this.gettaskGriddata(this.projectid, this.statuslist);
    
  }

  initializeValidators() {
    this.form = this.formBuilder.group({
      projectId: [''],
      Taskstatus: ['', Validators.required]
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

  getDefaultTaskStatus(): any {
    return this.filtertaskstatuslist.length > 0 ? this.filtertaskstatuslist[1].key : null;
  }

  Getproject() {
    debugger;
    this.timesheetService.getproject().subscribe(result => {
      console.log(">>>?", result);
      this.SortList = result
      this.filterSortList = this.SortList.slice();
    });

  }

  gettaskGriddata(id: any, statuslist: any) {
    debugger;
    this.taskservice.GetTaskGridData(id, statuslist).subscribe(result => {
      if(result) {
        this.resultArray = result;
      } else {
        this.resultArray = [];
      }
      console.log(this.resultArray, "this data")
      const convertedData = this.resultArray.map(entry => ({
        ...entry,
        startDate: moment(entry.startDate).format("DD-MM-YYYY")
      }));
      this.dataSource = new MatTableDataSource(convertedData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.data = convertedData;
      this.form.controls['Taskstatus'].setValidators;
    })
    // this.form.controls['Taskstatus'].setValidators;
  }

  GetGridbyfilter() {
    debugger;
    if (this.form.valid) {
      this.projectid = this.form.value.projectId ? this.form.value.projectId : this.projectid;
      var temptasklist = this.form.value.Taskstatus.map(item => item.key);
      if (temptasklist != null) {
        this.statuslist = temptasklist;
      }
      this.gettaskGriddata(this.projectid, this.statuslist);
    }
    else {
      this.validateFormControl()
    }
  }

  validateFormControl() {
    debugger
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true
        });
      }
    })
  }


  goToAction(id: any, actioninfo: any) {
    this.navigationService.gotoTask(id, actioninfo);
  }
  refresh() {
    this.form.controls['Taskstatus'].clearValidators();
    this.form.reset();
    this.projectid = 0
    this.statuslist = [1, 3];
    this.gettaskGriddata(this.projectid, this.statuslist);
    this.form.controls["Taskstatus"].setValue(this.temp);
    
  }
  onExportExcel() {
    this.loading = true;
    setTimeout(() => {
      var exportData = this.data;
      console.log('exaslk', exportData)
      if (!exportData || exportData.length === 0) {
        this.alertService.info("No data available to export");
        return;
      }
      let name;
      name = "Task Ststus Report";
      this.excelColumns = [
        "Date",
        "Project",
        "Employee Code",
        "Employee Name",
        "Task Description",
        "Developer Commends",
        "Completed Hours",
        "status"
      ];

      const excelList = [];
      excelList.push({});
      exportData.forEach((a) => {
        excelList.push({
          Date: a.startDate,
          Project: a.project,
          Employee_Code: a.empCode,
          Employee_Name: a.empname,
          Task_Description: a.shortDescription,
          Developer_Commends:a.developerComments,
          Completed_Hours:a.completedHours,
          status: a.taskStatus,
        });
      });
      this.excelService.exportAsExcelFile(excelList, "Task Status Report", this.excelColumns);
      this.loading = false;
    }, 500);
  }
  applyFilter($event: KeyboardEvent) {
    throw new Error('Method not implemented.');
  }

  onDelete(e: Event, id: any, name: any) {
    const pname = name;
    e.preventDefault();
    const title = this.translate.instant('DeleteConfirmation');
    const txt = this.translate.instant('Are you sure, Do you want to delete the Task ' + pname + '?');
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
        this.taskservice.Deletebyid(id).subscribe(result => {
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
