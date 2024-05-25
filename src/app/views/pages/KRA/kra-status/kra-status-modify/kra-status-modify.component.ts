import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { AlertService } from 'src/app/services/alert.service';
import { ExcelService } from 'src/app/services/excel.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { TaskService } from 'src/app/services/task.service';
import { UserSessionService } from 'src/app/services/usersession.service';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-kra-status-modify',
  templateUrl: './kra-status-modify.component.html',
  styleUrls: ['./kra-status-modify.component.scss'],
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

export class KraStatusModifyComponent implements OnInit {
  routeParams: any;
  id: number;
  actionInfo: any;
  form: FormGroup;
  formGrid: FormGroup;
  matData: any = [];
  dataSource = new MatTableDataSource(this.matData);
  displayedColumns: string[] = [
    'statusDate',
    'taskStatusValue',
    'remarks',
    'approvedStatusTypeValue',
    'actions',
    'approval'
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  addButton:string;
  Date: Date;
  taskStatusList: any;
  filtertaskStatusList: any;
  statusaddmindate:any;
  gridId: number;
  disableDelete: boolean = false;
  editDisable: any;
  approveTypeList: any;
  filterapproveTypeList: any;
  submitbtn: string;
  dropdownSettings: { singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; allowSearchFilter: boolean; };
  employeeListByRole: any[];
  constructor(
    route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private navigationService: NavigationService,
    public translate: TranslateService,
    private alertService: AlertService,
    private excelService: ExcelService,
    private userSessionService: UserSessionService,
    public taskService: TaskService,
    private _location: Location,
    private taskservice: TaskService,
  ) {
    this.routeParams = route.snapshot.params;
    this.id = parseInt(this.routeParams.id);
    this.actionInfo = this.routeParams.actionInfo;
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'empNameCode',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };
   }

  ngOnInit(): void {
    this.initializeValidators();
    this.getTaskstatus();
    this.getEmployeeDetails();
    this.Date = new Date;
    if (this.id === 0) {
      this.submitbtn = 'Save';
    } else {
      this.submitbtn = 'Update';
    }
    if(this.actionInfo==0){
      this.addButton="Add";
    }
    else{
      this.addButton="Update"
    }
    // if (this.id !== 0) {
      this.getTaskstatus();
      this.getApproveStatus();
    // }
  }

  initializeValidators() {
    this.form = this.formBuilder.group({
      id: [0],
      taskName: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.formGrid = this.formBuilder.group({
      id: [0],
      periodicTaskId: [this.id],
      statusDate: ['', Validators.required],
      taskStatusId: ['', Validators.required],
      remarks: ['', Validators.required],
      Participants:[''],
      attachment:['']
    });
  }
  getTaskstatus() {
    this.taskservice.GetTaskstatus().subscribe(result => {
      this.taskStatusList = result;
      this.filtertaskStatusList = this.taskStatusList?.slice();
    })
  }
  getEmployeeDetails() {
    this.taskService.employeeDetails().subscribe(result => {
      this.employeeListByRole = [];
      if (result && result.value) {
        this.employeeListByRole = result.value;
        this.employeeListByRole.forEach(v => {
          v.empNameCode = v.firstName + '(' + v.empCode + ')'
        });
      }
    });
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

  addData() {
    if (this.gridId > 0) {
      var existingRecord = _.find(this.matData, ['id', this.gridId]);
      if (existingRecord && this.formGrid.valid) {
        existingRecord.taskStatusValue = _.find(this.taskStatusList, ['key', this.formGrid.value.taskStatusId])?.value;
        existingRecord.approvedStatusTypeValue = _.find(this.approveTypeList, ['key', this.formGrid.value.approvedStatusType])?.value;
        existingRecord.taskStatusId = _.find(this.taskStatusList, ['key', this.formGrid.value.taskStatusId])?.key;
        existingRecord.approvedStatusType = _.find(this.approveTypeList, ['key', this.formGrid.value.approvedStatusType])?.key;
        existingRecord.remarks = this.formGrid.value.remarks;
        existingRecord.statusDate = moment(this.formGrid.value.statusDate).format("YYYY-MM-DD") + "T00:00:00.000Z"

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
        statusDate : moment(this.formGrid.value.statusDate).format("YYYY-MM-DD") + "T00:00:00.000Z",
        remarks: this.formGrid.value.remarks,
        taskStatusValue: _.find(this.taskStatusList, ['key', this.formGrid.value.taskStatusId])?.value,
        approvedStatusTypeValue: _.find(this.approveTypeList, ['key', this.formGrid.value.approvedStatusType])?.value,
        taskStatusId: _.find(this.taskStatusList, ['key', this.formGrid.value.taskStatusId])?.key,
        approvedStatusType: _.find(this.approveTypeList, ['key', this.formGrid.value.approvedStatusType])?.key,
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

  getApproveStatus() {
    this.taskservice.getApproveStatus().subscribe(result => {
      this.approveTypeList = result;
      this.filterapproveTypeList = this.approveTypeList?.slice();
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  Approval(datafield: any, approvedStatusType: any) {
    if (datafield.id > 0 && this.actionInfo != 1) {
      var existingRecord = _.find(this.matData, ['id', datafield.id]);
      if (existingRecord) {
        existingRecord.taskStatusValue = _.find(this.taskStatusList, ['key', datafield.taskStatusId])?.value;
        existingRecord.approvedStatusTypeValue = _.find(this.approveTypeList, ['key', approvedStatusType])?.value;
        existingRecord.taskStatusId = _.find(this.taskStatusList, ['key', datafield.taskStatusId])?.key;
        existingRecord.approvedStatusType = approvedStatusType;
        existingRecord.remarks = datafield.remarks;
        existingRecord.statusDate = datafield.statusDate;

        // this.dataSource = new MatTableDataSource(this.matData);
        // this.dataSource.paginator = this.paginator;
        // this.formGrid.reset();
        // this.gridId = 0;
        // this.editDisable = null;
      }
    }
  }

  editData(matData: any, index: number) {
    this.editDisable = index;
    let data
    data = {
      taskStatusId: matData.taskStatusId,
      mileStoneId: matData.mileStoneId,
      approvedStatusType: matData.approvedStatusType,
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

  onCancel() {
    this._location.back();
  }


  saveGrid() {
    // if (this.matData.length <= 0) {
    //   this.alertService.info('Please select atleast one data');
    // } else {
    //   const viewModel = {
    //     periodicTaskStatusTableViewModel: this.matData
    //   }
    //   this.taskservice.saveTaskGrid(viewModel).subscribe(result => {
    //     if (result && result.isSuccess) {
    //       this.alertService.success("Status Updated Successfully");
    //       this.navigationService.gotoAssignTaskgrid();
    //     } else {
    //       this.alertService.error(result.htmlFormattedFailures);
    //     }
    //   });
    // }

    this._location.back();
    this.alertService.success("Status Updated Successfully");
  }
}
