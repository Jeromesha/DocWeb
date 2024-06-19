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
import { threadId } from 'worker_threads';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FileDownloadService } from 'src/app/services/fileDownload.service';

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
    // 'coContributor',
    // 'document'
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
  isApprovelOrStatus: any;
  private baseUrl = environment.apiBaseUrl;
  assignedDate: any;
  // scheduleTaskStatusId: any;
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
    private perodicTaskService: PerodicTaskService,
    private http: HttpClient,
    private fileDownloadService:FileDownloadService
  ) {
    this.routeParams = route.snapshot.params;
    this.id = parseInt(this.routeParams.id);
    this.actionInfo = this.routeParams.actionInfo;
    this.isApprovelOrStatus = this.routeParams.isApprovelOrStatus;
    this.assignedDate = this.routeParams.assignedDate;
    this.roleId = this.userSessionService.roleId();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'empNameCode',
      // selectAllText: 'Select All',
      // unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      enableCheckAll: false 
    };
  }

  ngOnInit(): void {
    this.initializeValidators();
    this.getTaskstatus();
    this.getEmployeeDetails();
    this.projectLookUp();
    this.Date = new Date;
    if (this.actionInfo == 0) {
      this.addButton = "Add";
    }
    else if (this.actionInfo == 1) {
      this.addButton = "View";
    }
    else {
      this.addButton = "Update"
    }
    this.getApproveStatus();
    if (this.isApprovelOrStatus == 2) {
      this.modifyKRA = false;
      if (this.actionInfo == 1) {
        this.addButton = "View";
      }
      else {
        this.addButton = "Update"
      }
      this.submitbtn = 'Update';
    }
    else {
      this.modifyKRA = true;
    }
    this.getTaskStatusById(this.id);
    this.assignedDate = moment(this.assignedDate).format("YYYY-MM-DD");
    this.assignedDate = moment(this.assignedDate).subtract(0, 'minute').toDate()
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
      Participants: [null],
      attachment: ['']
    });
  }
  getTaskstatus() {
    this.taskservice.GetTaskstatus().subscribe(result => {
      this.taskStatusList = result;
      this.taskStatusList = result.filter(item => item.key !== 1);
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
    this.attachmentFilename = '';
    this.formGrid.controls['Participants'].clearAsyncValidators();
    this.formGrid.controls['Participants'].updateValueAndValidity();
    this.formGrid.controls['Participants'].setErrors(null);
    this.gridId = 0;
    if (this.matData.length > 0) {
      this.addButton = "Add";
      // this.addButton = "Add Another";
    } else { this.addButton = "Add"; }
    this.disableDelete = false;
    this.editDisable = null;
    this.AttchmentdataData = [];
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
    debugger
    if (this.isCoContributor) {
      this.formGrid.controls['Participants'].setValidators(Validators.required);
      this.formGrid.controls['Participants'].updateValueAndValidity();
    }
    if (this.isDocument) {
      this.formGrid.controls['attachment'].setValidators(Validators.required);
      this.formGrid.controls['attachment'].updateValueAndValidity();
    }

    if (this.gridId > 0) {
      //edit add 

      var existingRecord = _.find(this.matData, ['id', this.gridId]);

      var coContributorIdList;
      var coContributorNameList;
      console.log(this.formGrid.value.Participants);
      if (this.formGrid.value.Participants) {
        var localcoContributorIdlist = this.formGrid.value.Participants
        coContributorIdList = localcoContributorIdlist.map(item => item.id);
        coContributorNameList = localcoContributorIdlist.map(item => item.empNameCode);
      }

      let attachmentViewModel = [];
      attachmentViewModels = existingRecord.attachmentViewModels;
      if (this.AttchmentdataData.length > 0) {
        attachmentViewModel = this.AttchmentdataData;
      }


      if (existingRecord && this.formGrid.valid) {
        existingRecord.id = this.gridId,
        existingRecord.scheduleTaskExecutorId = this.id,
        existingRecord.statusDate = moment(this.formGrid.value.statusDate).format("YYYY-MM-DD") + "T00:00:00.000Z"
        existingRecord.note = this.formGrid.value.remarks;
        existingRecord.taskStatusName = _.find(this.taskStatusList, ['key', this.formGrid.value.taskStatusId])?.value;
        existingRecord.approvedStatus = existingRecord.approvedStatus;
        existingRecord.taskStatusId = _.find(this.taskStatusList, ['key', this.formGrid.value.taskStatusId])?.key;
        existingRecord.approvedStatusType = existingRecord.approvedStatusType;
        existingRecord.coContributorId = coContributorIdList;
        existingRecord.attachmentViewModels = attachmentViewModel;
        existingRecord.coContributorName = coContributorNameList;

        this.dataSource = new MatTableDataSource(this.matData);
        this.dataSource.paginator = this.paginator;
        this.formGrid.reset();
        this.formGrid.controls['Participants'].setErrors(null);
        this.attachmentFilename = "";
        this.gridId = 0;
        this.editDisable = null;
      }
    }
    else if (this.formGrid.valid) {
      //new Add 
      this.gridId = 0;
      var coContributorIdList;
      var coContributorNameList;
      if (this.formGrid.value.Participants) {
        var localcoContributorIdlist = this.formGrid.value.Participants
        coContributorIdList = localcoContributorIdlist.map(item => item.id);
        coContributorNameList = localcoContributorIdlist.map(item => item.empNameCode);
      }
      var attachmentViewModels = [];
      if (this.AttchmentdataData.length > 0) {
        attachmentViewModels = this.AttchmentdataData;
      }
      console.log(this.matData, 'mat data before busg')
      this.matData.push({
        id: this.gridId,
        scheduleTaskExecutorId: this.id,
        statusDate: moment(this.formGrid.value.statusDate).format("YYYY-MM-DD") + "T00:00:00.000Z",
        note: this.formGrid.value.remarks,
        taskStatusName: _.find(this.taskStatusList, ['key', this.formGrid.value.taskStatusId])?.value,
        approvedStatus: _.find(this.approveTypeList, ['key', 3])?.value,
        taskStatusId: _.find(this.taskStatusList, ['key', this.formGrid.value.taskStatusId])?.key,
        approvedStatusType: 3,
        // document: "testing",
        coContributorId: coContributorIdList,
        attachmentViewModels: attachmentViewModels,
        coContributorName: coContributorNameList,
      });
      console.log(this.matData, 'mat data')

      this.dataSource = new MatTableDataSource(this.matData);
      this.dataSource.paginator = this.paginator;
      this.attachmentFilename = "";
      this.formGrid.controls['Participants'].clearAsyncValidators();
      this.formGrid.controls['Participants'].updateValueAndValidity();
      this.formGrid.reset();
      this.formGrid.controls['Participants'].setErrors(null);
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
        existingRecord.approvedStatus = _.find(this.approveTypeList, ['key', approvedStatusType])?.value;
        existingRecord.approvedStatusType = approvedStatusType;

        // this.dataSource = new MatTableDataSource(this.matData);
        // this.dataSource.paginator = this.paginator;
        // this.formGrid.reset();
        // this.gridId = 0;
        // this.editDisable = null;
      }
    }
  }

  editData(matData: any, index: number) {
    debugger
    this.editDisable = index;
    var attachment = [];
    this.AttchmentdataData=[];
    if (matData.attachmentViewModels.length > 0) {
      matData.attachmentViewModels.forEach(element => {
        attachment.push(element.attachmentFileName);
        //Add the pervious attachment data to the AttchmentdataData
        this.AttchmentdataData.push(element);
      });
    }


    let coContributorId = [];
    matData.coContributorId.forEach(element => {
      var idlist = {
        id: element,
        empNameCode: _.find(this.employeeListByRole, ['id', element])?.empNameCode
      }
      coContributorId.push(idlist)
    });

    let data
    data = {
      taskStatusId: matData.taskStatusId,
      approvedStatusType: matData.approvedStatusType,
      id: matData.id,
      statusDate: matData.statusDate,
      remarks: matData.note,
      Participants: coContributorId,
      attachmentViewModels: matData.attachmentViewModels,
      periodicTaskId: this.id,
      attachment: attachment,
      index
    }
    this.attachmentFilename = attachment;
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
    if (this.matData.length <= 0) {
      this.alertService.info('Please select atleast one data');
    } else {
      const viewModel = {
        scheduleTaskStatusPayLoadViewModelList: this.matData
      }
      this.perodicTaskService.SaveTaskStatus(viewModel).subscribe(result => {
        if (result && result.isSuccess) {
          this._location.back();
          this.alertService.success("Status Updated Successfully");
        } else {
          this.alertService.error(result.htmlFormattedFailures);
        }
      });
    }
  }

  getDisplayedColumnsforDocumtandCocontributor(): string[] {
    if (this.isCoContributor == true && this.isDocument == true) {
      this.displayedColumns.push('coContributor');
      this.displayedColumns.push('document');
    }
    else if (this.isCoContributor == true) {
      this.displayedColumns.push('coContributor');
    }
    else if (this.isDocument == true) {
      this.displayedColumns.push('document');
    }
    return this.displayedColumns;
  }

  getDisplayedColumns(): string[] {
    if (this.modifyKRA == false && this.isApproval == true) {
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
        // this.scheduleTaskStatusId=this.taskStatusListbyId.id;
        this.matData = this.taskStatusListbyId.scheduleTaskStatusViewModel;
        this.isApproval = this.taskStatusListbyId.isApproval;
        this.isCoContributor = this.taskStatusListbyId.isCoContributor;
        this.isDocument = this.taskStatusListbyId.isDocument;
        if (this.matData.length == 0) {
          this.submitbtn = 'Save';
        } else {
          this.submitbtn = 'Update';
        }
        this.dataSource = new MatTableDataSource(this.matData);
        this.dataSource.paginator = this.paginator;
        this.getDisplayedColumnsforDocumtandCocontributor();
        if (this.actionInfo != 1) {
          this.getDisplayedColumns();
        }
      }
    });
  }

  // download(attachment: any) {
  //   const filePath = `${this.baseUrl}${attachment.attachmentPath}/${attachment.attachmentFileName}`;
  //   this.http.get(filePath, { responseType: 'blob' }).subscribe((response: Blob) => {
  //     const url = window.URL.createObjectURL(response);
  //     const a = document.createElement('a');
  //     a.href = url;
  //     a.download = attachment.attachmentFileName;
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //     window.URL.revokeObjectURL(url);
  //   });
  // }


  download(attachment:any){
    debugger
    console.log(attachment)
    this.perodicTaskService.getAttachment(attachment).subscribe(result => {
      if (result) {
        var base64String = result.value.base64String;
        var fileName = result.value.attachmentFileName;
        this.fileDownloadService.downloadBase64File(base64String, fileName);
        
      } else {
        this.alertService.error(result.htmlFormattedFailures);
      }
    });
  }
  
  



  AttachmentUpload(event) {
    const files: FileList = event.target.files;
    if (this.addButton != "Update") {
      this.AttchmentdataData = []; // Clear the previous data
      this.attachmentFilename = "";
    }
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
            scheduleTaskStatusId: 0,
            attachmentFileName: file.name,
            attachmentType: 1,
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
