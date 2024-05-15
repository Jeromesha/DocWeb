import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { result } from 'lodash';
import { AlertService } from 'src/app/services/alert.service';
import { MappingServices } from 'src/app/services/mapping.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { TaskService } from 'src/app/services/task.service';
import { TimeSheetService } from 'src/app/services/timesheet.service';
import { UserSessionService } from 'src/app/services/usersession.service';
import { CommonInfo } from '../../app.config';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import swal from 'sweetalert2';
import * as _ from 'lodash';
import { RoleType } from 'src/enum/roletype';

@Component({
  selector: 'app-task-assign',
  templateUrl: './task-assign.component.html',
  styleUrls: ['./task-assign.component.scss']
})
export class TaskAssignComponent implements OnInit {

  id = 0;
  actionInfo = 1;
  form: FormGroup;
  formGrid: FormGroup;
  routeParams: any;
  data: any;
  periodList: any;
  filterperiodList: any;
  startDate: Date;
  endDate: Date;
  today: any;
  maxEndDate: any;
  minEndDate: any;
  submitbtn: string;
  roleId: any;
  dropdownSettings: any = {};
  userId: number;
  employeeList: any = [];
  employeeListByRole: any = [];
  employeeFilterList: any = [];
  CommonData: CommonInfo;
  formEditMode = true;
  isReadOnly = false;
  isDisable = false;
  matData: any = [];
  dataSource = new MatTableDataSource(this.matData);
  displayedColumns: string[] = [
    'statusDate',
    'taskStatusValue',
    'mileStoneValue',
    'remarks',
    // 'approvedStatusTypeValue',
    'actions'
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  disableDelete: boolean = false;
  addButton: string;
  filtertaskStatusList: any[];
  taskStatusList: any[];
  milestoneList: any[];
  filtermilestoneList: any[];
  approveTypeList: any[];
  filterapproveTypeList: any[];
  periodicTaskId: any;
  gridId: any;
  editDisable: any;
  public RoleEnumType = RoleType;
  Date: any;
  daysDifference: number;

  constructor(
    private formBuilder: FormBuilder,
    public taskService: TaskService,
    route: ActivatedRoute,
    public dialog: MatDialog,
    private mappingservice: MappingServices,
    public navigationService: NavigationService,
    private taskservice: TaskService,
    private alertService: AlertService,
    private _location: Location,
    private translate: TranslateService,
    private userSessionService: UserSessionService
  ) {
    this.routeParams = route.snapshot.params;
    this.id = JSON.parse(this.routeParams.id);
    this.actionInfo = parseInt(this.routeParams.actionInfo)
    if (this.id === 0) {
      this.submitbtn = 'Save';
    } else {
      this.submitbtn = 'Update';
    }
    this.roleId = this.userSessionService.roleId();
    this.userId = this.userSessionService.userId();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'empNameCode',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };
  }

  async ngOnInit(): Promise<void> {
    await this.initializeValidators();
    await this.getPeriod();
    await this.getEmployeeDetails();
    this.addButton = "Add";
    if (this.id !== 0) {
      await this.getTaskstatus();
      await this.getMilestone();
      await this.getApproveStatus();
    }
    this.Date = new Date;
    if (this.id === 0) {
      this.form.controls['assignedDate'].setValue(this.Date);
    }
  }

  initializeValidators() {
    this.form = this.formBuilder.group({
      id: [0],
      taskName: ['', Validators.required],
      description: ['', Validators.required],
      period: ['', Validators.required],
      assignedToId: ['', Validators.required],
      assignedDate: ['', Validators.required],
      targetDate: ['', Validators.required],
      reminderCount: [''],
      reminderDate: [''],
      isApprove: ['', Validators.required],
      ownerId: [this.userId],
      secondaryOwners: ['', Validators.required],
      isNotificationByMail: ['', Validators.required],
      isNotificationByWhatsApp: ['', Validators.required]
    });

    this.form.get('targetDate').valueChanges.subscribe(() => {
      this.updateReminderDate();
    });

    this.form.get('reminderCount').valueChanges.subscribe(() => {
      this.updateReminderDate();
    });

    this.formGrid = this.formBuilder.group({
      id: [0],
      periodicTaskId: [this.id],
      statusDate: ['', Validators.required],
      taskStatusId: ['', Validators.required],
      remarks: ['', Validators.required],
      mileStoneId: ['', Validators.required],
      approvedStatusType: [3],
      indices: [null]
    });
  }

  updateReminderDate() {
    const targetDate = this.form.get('targetDate').value;
    const reminderCount = this.form.get('reminderCount').value;

    if (targetDate && reminderCount) {
      const reminderDate = new Date(targetDate);
      reminderDate.setDate(reminderDate.getDate() - reminderCount);
      this.form.get('reminderDate').setValue(reminderDate);
    }
    if (!reminderCount || reminderCount === 0) {
      this.form.get('reminderDate').setValue("");
    }
  }

  disableForm() {
    switch (this.roleId) {
      case this.RoleEnumType.Root:
        return false;
      case this.RoleEnumType.SuperAdmin:
        return false;
      default:
        return true;
    }
  }

  getPeriod() {
    this.taskService.GetPeriod().subscribe(result => {
      this.periodList = [];
      this.periodList = result;
      this.filterperiodList = this.periodList?.slice();
    });
  }

  getEmployeeDetails() {
    this.taskService.employeeDetails().subscribe(result => {
      this.employeeList = [];
      if (result && result.value) {
        this.employeeList = result.value;
        this.employeeList.forEach(v => {
          v.empNameCode = v.firstName + '(' + v.empCode + ')'
        });
        this.employeeFilterList = this.employeeList?.slice();
        this.getEmployeeByRoleId();
      }
    });
  }

  getEmployeeByRoleId() {
    this.taskService.employeeDetailsByRoleId(1).subscribe(result => {
      this.employeeListByRole = [];
      if (result && result.value) {
        this.employeeListByRole = result.value;
        this.employeeListByRole.forEach(v => {
          v.empNameCode = v.firstName + '(' + v.empCode + ')'
        });

        if (this.id !== 0) {
          console.log(CommonInfo.taskData);
          const jsonData = JSON.parse(localStorage.getItem('taskData'));
          CommonInfo.taskData = jsonData;
          const ids = CommonInfo.taskData?.secondaryOwners.split(',');
          const matchedData = result.value.filter(owner => ids.includes(owner.id.toString()));
          CommonInfo.taskData.secondaryOwners = matchedData;
          this.form.patchValue(CommonInfo.taskData);
          CommonInfo.taskData.periodicTaskStatusViewModel = _.orderBy(CommonInfo.taskData.periodicTaskStatusViewModel, ['id'], ['desc']);
          this.matData = CommonInfo.taskData.periodicTaskStatusViewModel;
          this.dataSource = new MatTableDataSource(this.matData);
          this.dataSource.paginator = this.paginator;
          if (this.matData.length > 0) {
            this.addButton = "Add";
            // this.addButton = "Add Another";
          } else {
            this.addButton = "Add";
          }
          this.updateReminderCount();
        }
      }
    });
  }

  updateReminderCount() {
    const targetDateStr = this.form.get('targetDate').value;
    const reminderDateStr = this.form.get('reminderDate').value;

    if (targetDateStr && reminderDateStr) {
      const targetDate = new Date(targetDateStr);
      const reminderDate = new Date(reminderDateStr);
      targetDate.setHours(0, 0, 0, 0);
      reminderDate.setHours(0, 0, 0, 0);
      const differenceInTime = Math.abs(targetDate.getTime() - reminderDate.getTime());
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
      this.form.get('reminderCount').setValue(differenceInDays);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      var data = this.form.value;
      const ids = data.secondaryOwners.map(owner => owner.id);
      const secondaryOwnersString = ids.join(',');
      data.secondaryOwners = secondaryOwnersString;
      this.taskservice.savePeriodicTask(data).subscribe((res) => {
        if (res.isSuccess) {
          if (this.id == 0) {
            this.alertService.success("Task details " + "saved successfully.");
          } else {
            this.alertService.success("Task details " + "Updated successfully.");
          }
          this.navigationService.gotoAssignTaskgrid();
        }
        else {
          this.alertService.error(res.failures[0])
        }
      })
    }
    else {
      this.alertService.error('Please fill the required fields');
      this.validateFormControl()
    }
  }

  validateFormControl() {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true
        });
      }
    })
  }

  validateFormGridControl() {
    Object.keys(this.formGrid.controls).forEach(field => {
      const control = this.formGrid.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true
        });
      }
    })
  }

  onClear() {
    this.form.reset();
  }

  onCancel() {
    this._location.back();
  }

  updateEndDate(event: any) {
    if (event && typeof (event) === "string") {
      event = new Date(event);
    }
    if (event) {
      this.startDate = new Date(event);
      this.endDate = new Date(this.startDate);
      this.endDate.setDate(this.endDate.getDate() + 30);
      if (this.endDate > this.today) {
        this.maxEndDate = this.today;
        this.minEndDate = this.startDate;
      }
      else {
        this.minEndDate = this.startDate;
        this.maxEndDate = this.endDate;
      }
      this.form.controls['targetDate'].setValue('');
      //this.form.controls['endDate'].clearValidators();
    }
    this.form.controls['reminderDate'].setValue("");
  }

  calculateDaysDifference(event: any) {
    this.form.controls['reminderCount'].setValue(0);
    let assignedDate = this.form.value.assignedDate;
    if (assignedDate && event) {
      if (assignedDate && typeof (assignedDate) === "string") {
        assignedDate = new Date(assignedDate);
      }
      event = new Date(event);
      event.setHours(0, 0, 0, 0);
      assignedDate.setHours(0, 0, 0, 0);
      const startTime = event.getTime();
      const endTime = assignedDate.getTime();
      const difference = startTime - endTime;
      this.daysDifference = Math.ceil(difference / (1000 * 60 * 60 * 24));
    }
  }

  setCount() {
    if (this.form.value.reminderCount > this.daysDifference) {
      this.form.controls['reminderCount'].setValue(this.daysDifference);
    }
  }

  getTaskstatus() {
    this.taskservice.GetTaskstatus().subscribe(result => {
      this.taskStatusList = result;
      this.filtertaskStatusList = this.taskStatusList?.slice();
    })
  }

  taskStatusChange() {

  }

  getMilestone() {
    this.taskservice.GetMilestone(309).subscribe(result => {
      this.milestoneList = result;
      this.filtermilestoneList = this.milestoneList?.slice();
    })
  }

  milesoneChange() {

  }

  getApproveStatus() {
    this.taskservice.getApproveStatus().subscribe(result => {
      this.approveTypeList = result;
      this.filterapproveTypeList = this.approveTypeList?.slice();
    })
  }

  approveTypeChange() {

  }

  delete(rowIndex: any) {
    const msgstring = this.translate.instant('Youwanttodelete');
    this.deleteMenu((msgstring + ' ' + '?'), rowIndex);
  }

  deleteMenu(message: string, rowIndex: any) {
    const title = this.translate.instant('DeleteConfirmation');
    const Yes = this.translate.instant('Yes');
    const No = this.translate.instant('No');
    swal.fire(
      {
        title,
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: Yes,
        cancelButtonText: No,
      })
      .then(res => {
        if (res.value) {
          if (this.matData.length > 0) {
            this.matData.forEach((index) => {
              if (index.mileStoneValue == this.matData[rowIndex].mileStoneValue) {
                this.matData.splice(rowIndex, 1);
                this.dataSource = new MatTableDataSource(this.matData);
                this.dataSource.paginator = this.paginator;
              }
            })
            if (this.matData.length == 0) {
              this.addButton = "Add";
            }
          }
        }
      });
  }

  addData() {
    debugger
    if (this.gridId > 0) {
      var existingRecord = _.find(this.matData, ['id', this.gridId]);
      if (existingRecord && this.formGrid.valid) {
        existingRecord.taskStatusValue = _.find(this.taskStatusList, ['key', this.formGrid.value.taskStatusId])?.value;
        existingRecord.mileStoneValue = _.find(this.milestoneList, ['key', this.formGrid.value.mileStoneId])?.value;
        // existingRecord.approvedStatusTypeValue = _.find(this.approveTypeList, ['key', this.formGrid.value.approvedStatusType])?.value;
        existingRecord.taskStatusId = _.find(this.taskStatusList, ['key', this.formGrid.value.taskStatusId])?.key;
        existingRecord.mileStoneId = _.find(this.milestoneList, ['key', this.formGrid.value.mileStoneId])?.key;
        // existingRecord.approvedStatusType = _.find(this.approveTypeList, ['key', this.formGrid.value.approvedStatusType])?.key;
        existingRecord.remarks = this.formGrid.value.remarks;
        existingRecord.statusDate = this.formGrid.value.statusDate;

        this.dataSource = new MatTableDataSource(this.matData);
        this.dataSource.paginator = this.paginator;
        this.formGrid.reset();
        this.gridId = 0;
        this.editDisable = null;
      }
    }
    else if (this.formGrid.valid) {
      this.gridId = 0;
      this.matData.push({
        id: this.gridId,
        periodicTaskId: this.id,
        statusDate: this.formGrid.value.statusDate,
        remarks: this.formGrid.value.remarks,
        taskStatusValue: _.find(this.taskStatusList, ['key', this.formGrid.value.taskStatusId])?.value,
        mileStoneValue: _.find(this.milestoneList, ['key', this.formGrid.value.mileStoneId])?.value,
        // approvedStatusTypeValue: _.find(this.approveTypeList, ['key', this.formGrid.value.approvedStatusType])?.value,
        taskStatusId: _.find(this.taskStatusList, ['key', this.formGrid.value.taskStatusId])?.key,
        mileStoneId: _.find(this.milestoneList, ['key', this.formGrid.value.mileStoneId])?.key,
        // approvedStatusType: _.find(this.approveTypeList, ['key', this.formGrid.value.approvedStatusType])?.key,
      });

      this.dataSource = new MatTableDataSource(this.matData);
      this.dataSource.paginator = this.paginator;
      this.formGrid.reset();
      this.editDisable = null;
    } else {
      this.validateFormGridControl();
      this.alertService.error('Please fill the required fields');
    }
    if (this.matData.length > 0) {
      // this.addButton = "Add Another";
      this.addButton = "Add";
      this.disableDelete = false;
    }
  }

  editData(matData: any, index: number) {
    this.editDisable = index;
    let data
    data = {
      taskStatusId: matData.taskStatusId,
      mileStoneId: matData.mileStoneId,
      // approvedStatusType: matData.approvedStatusType,
      id: matData.id,
      statusDate: matData.statusDate,
      remarks: matData.remarks,
      periodicTaskId: this.id,
      index
    }
    if (matData.id !== 0) {
      this.addButton = "Update";
      this.gridId = matData.id;
    }
    this.disableDelete = true;
    this.formGrid.patchValue(data);
  }

  saveGrid() {
    if (this.matData.length <= 0) {
      this.alertService.info('Please select atleast one data');
    } else {
      this.matData = this.matData.map(v => ({ ...v, approvedStatusType: 3 }));
      const viewModel = {
        periodicTaskStatusTableViewModel: this.matData
      }
      this.taskservice.saveTaskGrid(viewModel).subscribe(result => {
        if (result && result.isSuccess) {
          this.alertService.success("Status Updated Successfully");
          this.navigationService.gotoAssignTaskgrid();
        } else {
          this.alertService.error(result.htmlFormattedFailures);
        }
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearData() {
    this.formGrid.reset();
    this.gridId = 0;
    if (this.matData.length > 0) {
      this.addButton = "Add";
      // this.addButton = "Add Another";
    } else { this.addButton = "Add"; }
    this.disableDelete = false;
    this.editDisable = null;
  }
}
