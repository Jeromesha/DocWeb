import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { AlertService } from 'src/app/services/alert.service';
import { ExcelService } from 'src/app/services/excel.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { TaskService } from 'src/app/services/task.service';
import { TimeSheetService } from 'src/app/services/timesheet.service';
import { UserSessionService } from 'src/app/services/usersession.service';
import swal from "sweetalert2";
import { CommonInfo } from '../../app.config';
import { RoleType } from 'src/enum/roletype';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", minHeight: "0", visibility: "hidden" })
      ),
      state("expanded", style({ height: "*", visibility: "visible" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})

export class TaskListComponent implements OnInit {
  data = [];
  dataSource = new MatTableDataSource(this.data);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("searchInput", { static: true }) searchInput: ElementRef;

  displayedColumns: string[] = [
    "action",
    "taskName",
    "description",
    "employeeFirstName",
    "periodValue",
    "assignedDate",
    "targetDate",
    "reminderDate",
    "isApprove",
    "isNotificationByMail",
    "isNotificationByWhatsApp"
  ];
  excelColumns: string[];
  resultArray: any;
  roleId: any;
  CommonData: CommonInfo;
  public RoleEnumType = RoleType;
  expandedElement: any;

  constructor(private formBuilder: FormBuilder,
    private timesheetService: TimeSheetService,
    private taskservice: TaskService,
    private navigationService: NavigationService,
    public translate: TranslateService,
    private alertService: AlertService,
    private excelService: ExcelService,
    private userSessionService: UserSessionService
  ) {
  }

  ngOnInit(): void {
    this.roleId = this.userSessionService.roleId();
    CommonInfo.clearTaskData();
    this.gettaskGriddata();
  }

  expandUp(dataField) {
    debugger;
    this.expandedElement = {};
    this.expandedElement = dataField;
  }
  expandDown(dataField) {
    debugger;
    this.expandedElement = {};
    this.expandedElement = dataField;
  }

  getApiName() {
    switch (this.roleId) {
      case this.RoleEnumType.Root:
        return "periodictasklistadmin";
      case this.RoleEnumType.SuperAdmin:
        return "periodictasklistowner";
      default:
        return "periodictasklistuser";
    }
  }

  showAdd() {
    switch (this.roleId) {
      case this.RoleEnumType.Root:
        return true;
      case this.RoleEnumType.SuperAdmin:
        return true;
      default:
        return false;
    }
  }

  gettaskGriddata() {
    this.taskservice.GetAssignTaskList(this.getApiName()).subscribe(result => {
      this.resultArray = [];
      if (result && result.value) {
        this.resultArray = result.value;
      }
      this.dataSource = new MatTableDataSource(this.resultArray);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.data = this.resultArray;
    })
  }

  goToAction(dataField: any, actioninfo: any) {
    localStorage.setItem('taskData', JSON.stringify(dataField));
    CommonInfo.taskData = dataField;
    this.navigationService.gotoTaskAssign(dataField.id, actioninfo);
  }

  refresh() {
    this.gettaskGriddata();
  }

  onExportExcel() {
    setTimeout(() => {
      var exportData = this.data;
      if (!exportData || exportData.length === 0) {
        this.alertService.info("No data available to export");
        return;
      }
      this.excelColumns = [
        "Task Name",
        "Description",
        "Employee Name",
        "Period Name",
        "Assigned Date",
        "Target Date",
        "Reminder Date",
        "Approved",
        "Notification By Mail",
        "Notification By WhatsApp",
      ];

      const excelList = [];
      excelList.push({});
      exportData.forEach((a) => {
        excelList.push({
          taskName: a.taskName,
          description: a.description,
          employeeFirstName: a.employeeFirstName + "(" + a.employeeCode + ")",
          periodValue: a.periodValue,
          assignedDate: moment(a.assignedDate).format("DD-MM-YYYY"),
          targetDate: moment(a.targetDate).format("DD-MM-YYYY"),
          reminderDate: moment(a.reminderDate).format("DD-MM-YYYY"),
          isApprove: a.isApprove ? 'Yes' : 'No',
          isNotificationByMail: a.isNotificationByMail ? 'Yes' : 'No',
          isNotificationByWhatsApp: a.isNotificationByWhatsApp ? 'Yes' : 'No'
        });
      });
      this.excelService.exportAsExcelFile(excelList, "Task List Report", this.excelColumns);
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
