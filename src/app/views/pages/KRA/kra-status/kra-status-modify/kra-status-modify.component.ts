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
import { RoleType } from 'src/enum/roletype';
import { EmployeedetailsService } from 'src/app/services/employeedetails.service';
import { PerodicTaskService } from 'src/app/services/perodicTask.Service';

@Component({
  selector: 'app-kra-status-modify',
  templateUrl: './kra-status-modify.component.html',
  styleUrls: ['./kra-status-modify.component.scss'],
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
    'coContributor',
    'document'
    // 'actions',
    // 'approval'
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  addButton: string;
  Date: Date;
  taskStatusList: any;
  filtertaskStatusList: any;
  statusaddmindate: any;
  gridId: number;
  disableDelete: boolean = false;
  editDisable: any;
  approveTypeList: any;
  filterapproveTypeList: any;
  submitbtn: string;
  dropdownSettings: {};
  employeeListByRole: any[];
  modifyKRA: boolean;
  roleId: any;
  public RoleEnumType = RoleType;
  projectList: any[];
  filterprojectList: any[];
  taskStatusListbyId: any;
  disabletask: boolean = true;
  isApproval: boolean;
  isCoContributor: boolean;
  isDocument: boolean;
  attachmentFilename: any;
  fileType: number;
  pbFiles: any;
  filesResult: any;
  AttchmentdataData: any[] = [];
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
    private empDetailsService: EmployeedetailsService,
    private perodicTaskService: PerodicTaskService
  ) {
    this.routeParams = route.snapshot.params;
    this.id = parseInt(this.routeParams.id);
    this.actionInfo = this.routeParams.actionInfo;
    this.roleId = this.userSessionService.roleId();
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
    this.projectLookUp();
    this.Date = new Date;
    if (this.id === 0) {
      this.submitbtn = 'Save';
    } else {
      this.submitbtn = 'Update';
    }
    if (this.actionInfo == 0) {
      this.addButton = "Add";
    }
    else {
      this.addButton = "Update"
    }
    // if (this.id !== 0) {
    this.getApproveStatus();
    // }

    if (this.roleId == this.RoleEnumType.SuperAdmin) {
      this.modifyKRA = false;
      this.addButton = "Update";
      this.submitbtn = 'Update';
    }
    else {
      this.modifyKRA = true;
    }
    this.getDisplayedColumns();
    this.getTaskStatusById(this.id);
  }

  initializeValidators() {
    this.form = this.formBuilder.group({
      id: [0],
      taskName: ['', Validators.required],
      description: ['', Validators.required],
      ProjectId: ['']
    });
    this.formGrid = this.formBuilder.group({
      id: [0],
      periodicTaskId: [this.id],
      statusDate: ['', Validators.required],
      taskStatusId: ['', Validators.required],
      remarks: ['', Validators.required],
      Participants: [''],
      attachment: ['']
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
    this.formGrid.controls['Participants'].clearAsyncValidators();
    this.formGrid.controls['Participants'].updateValueAndValidity();
    this.gridId = 0;
    if (this.matData.length > 0) {
      this.addButton = "Add";
      // this.addButton = "Add Another";
    } else { this.addButton = "Add"; }
    this.disableDelete = false;
    this.editDisable = null;
    this.AttchmentdataData=[];
  }
  projectLookUp() {
    this.empDetailsService.getProject(true, 1).subscribe((res) => {
      this.projectList = [];
      this.filterprojectList = [];
      this.projectList = res;
      this.filterprojectList = this.projectList.slice();
    })
  }

  addData() {
    if (this.isCoContributor) {
      this.formGrid.controls['Participants'].setValidators(Validators.required);
      this.formGrid.controls['Participants'].updateValueAndValidity();
    }
    if (this.isDocument) {
      this.formGrid.controls['attachment'].setValidators(Validators.required);
      this.formGrid.controls['attachment'].updateValueAndValidity();
    }

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
      var coContributorIdList = []
      console.log(this.formGrid.value.Participants);
      if (this.formGrid.value.Participants) {
        var localcoContributorIdlist = this.formGrid.value.Participants
        coContributorIdList = localcoContributorIdlist.map(item => item.key);
      }
      this.matData.push({
        id: this.gridId,
        scheduleTaskExecutorId: this.id,
        statusDate: moment(this.formGrid.value.statusDate).format("YYYY-MM-DD") + "T00:00:00.000Z",
        note: this.formGrid.value.remarks,
        taskStatusName: _.find(this.taskStatusList, ['key', this.formGrid.value.taskStatusId])?.value,
        approvedStatus: _.find(this.approveTypeList, ['key', 3])?.value,
        taskStatusId: _.find(this.taskStatusList, ['key', this.formGrid.value.taskStatusId])?.key,
        approvedStatusType: 3,
        document: "testing"
      });
      console.log(this.matData, 'mat data')

      this.dataSource = new MatTableDataSource(this.matData);
      this.dataSource.paginator = this.paginator;
      this.formGrid.reset();
      this.formGrid.controls['Participants'].clearAsyncValidators();
      this.formGrid.controls['Participants'].updateValueAndValidity();
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
  getDisplayedColumns(): string[] {
    if (this.modifyKRA == false) {
      this.displayedColumns.push('approval');
    }
    else {
      this.displayedColumns.push('actions');
    }
    return this.displayedColumns;
  }

  getTaskStatusById(Id: any) {
    this.perodicTaskService.getTaskStatusById(Id).subscribe(result => {
      this.matData = [];
      if (result && result.value) {
        this.taskStatusListbyId = result.value;
        this.form.controls['taskName'].setValue(this.taskStatusListbyId.scheduleTaskName);
        this.form.controls['description'].setValue(this.taskStatusListbyId.scheduleTaskDescription);
        this.form.controls['ProjectId'].setValue(this.taskStatusListbyId.projectId);
        this.matData = this.taskStatusListbyId.scheduleTaskStatusViewModel;
        this.isApproval = this.taskStatusListbyId.isApproval;
        this.isCoContributor = this.taskStatusListbyId.isCoContributor;
        this.isDocument = this.taskStatusListbyId.isDocument;
        this.dataSource = new MatTableDataSource(this.matData);
        this.dataSource.paginator = this.paginator;
        console.log(this.taskStatusListbyId, 'jbdfiuusbouf')
      }
    });
  }

  download() {

  }

  // AttachmentUpload(event) {
  //   const file = event.target.files[0];
  //   // if (
  //   //   file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === "application/pdf") {
  //     // let filesize = file.size;
  //     // let acceptsize = parseInt((filesize / 1024).toFixed(2));
  //     // if (acceptsize <= 1024) {
  //       this.attachmentFilename = file.name;
  //       let checkType = file.type;
  //       let getFileType = checkType.split('/');
  //       if (getFileType[1] == 'pdf') {
  //         this.fileType = 2;
  //       } else {
  //         this.fileType = 1;
  //       }
  //       if (file) {
  //         const reader = new FileReader();
  //         reader.readAsDataURL(event.target.files[0]);
  //         reader.onload = (event: any) => {
  //           this.pbFiles = event.target.result;
  //           this.filesResult = event.target.result.split(',')[1];
  //           this.formGrid.controls['attachment'].setValue(this.filesResult);
  //           this.formGrid.controls['attachment'].setValue(file.name);

  //           this.AttchmentdataData.push({
  //             id: 0,
  //             attachmentFilename: file.name,
  //             attachmentType: 25,
  //             fileType: this.fileType,
  //             base64String: this.filesResult
  //           });
  //           console.log(this.AttchmentdataData,'efsjfn')
  //         };
  //       }
  //     // } else {
  //     //   this.alertService.warning(
  //     //     "File size is large, Please upload less than 1 MB"
  //     //   );
  //     // }

  //   // } else {
  //   //   this.alertService.warning("Please upload JPG, JPEG, PNG and PDF only");
  //   // }
  // }

  AttachmentUpload(event) {
    const files: FileList = event.target.files;
    this.AttchmentdataData = []; // Clear the previous data
    this.attachmentFilename = "";

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.attachmentFilename += file.name + "; "; // Concatenate file names

      let checkType = file.type;
      let getFileType = checkType.split('/');
      let fileType = getFileType[1] === 'pdf' ? 2 : 1;

      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (event: any) => {
          const base64String = event.target.result.split(',')[1];

          this.AttchmentdataData.push({
            id: 0,
            attachmentFilename: file.name,
            attachmentType: 25,
            fileType: fileType,
            base64String: base64String
          });

          // Update the form control for each file
          this.formGrid.controls['attachment'].setValue(this.AttchmentdataData);
        };
      }
    }

    console.log(this.AttchmentdataData, 'Attachment data');
  }

}
