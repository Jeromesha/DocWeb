import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/services/alert.service';
import { ExcelService } from 'src/app/services/excel.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { TaskService } from 'src/app/services/task.service';
import { UserSessionService } from 'src/app/services/usersession.service';
import { Location } from '@angular/common';
import { EmployeedetailsService } from 'src/app/services/employeedetails.service';
import { PerodicTaskService } from 'src/app/services/perodicTask.Service';
import { result } from 'lodash';
@Component({
  selector: 'app-kra-task-attach',
  templateUrl: './kra-task-attach.component.html',
  styleUrls: ['./kra-task-attach.component.scss']
})
export class KraTaskAttachComponent implements OnInit {
  scheduleId: any;
  taskId: any;
  actionInfo: any;
  routeParams: any;
  form: FormGroup;
  employeeList: any[];
  employeeFilterList: any;
  dropdownSettings: any = {};
  employeeListByRole: any;
  kraTaskList: any[];
  filterKraTaskList: any[];
  Notifylist: any[];
  dropdownSettingsNotify: any = {};
  submitbtn: string;
  dropdownSettingsDesignation: any = {};
  Designationlist: any[];
  projectList: any[];
  filterprojectList: any[];
  isProject: boolean = false;
  isPerson: boolean = false;
  filterNotifyList: any[];
  showApprover: boolean = false;
  selectedCount: any;
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
    private empDetailsService: EmployeedetailsService,
    private perodicTaskService: PerodicTaskService
  ) {
    this.routeParams = route.snapshot.params;
    this.scheduleId = parseInt(this.routeParams.scheduleId);
    this.taskId = parseInt(this.routeParams.taskId)
    this.actionInfo = this.routeParams.actionInfo;
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'empNameCode',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      enableCheckAll: false 
    };
    this.dropdownSettingsNotify = {
      singleSelection: false,
      idField: 'key',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };
    this.dropdownSettingsDesignation = {
      singleSelection: false,
      idField: 'key',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };
  }

  ngOnInit(): void {
    this.initializeValidators();
    this.getEmployeeByRoleId();
    this.getEmployeeDetails();
    this.projectLookUp();
    this.getKraTasklist();
    this.getNotifyDetails();
    this.getDesignationDetails();
    if (this.actionInfo == 0) {
      this.submitbtn = 'Save'
    }
    else {
      this.submitbtn = 'Update'
    }
  }


  initializeValidators() {
    this.form = this.formBuilder.group({
      id: [0],
      kratask: ['', Validators.required],
      primaryowner: ['', Validators.required],
      secondaryOwners: [''],
      approver: [''],
      employee: [''],
      isApprove: ['', Validators.required],
      isDocument: ['', Validators.required],
      isRemainder: ['', Validators.required],
      Participants: ['',Validators.required],
      notify: ['', Validators.required],
      isRepeat: ['', Validators.required],
      project: [''],
      isprojOrPerc: ['', Validators.required]
    });
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

  getEmployeeByRoleId() {
    this.taskService.employeeDetailsByRoleId(1).subscribe(result => {
      this.employeeList = [];
      if (result && result.value) {
        this.employeeList = result.value;
        this.employeeList.forEach(v => {
          v.empNameCode = v.firstName + '(' + v.empCode + ')'
        });
        this.employeeFilterList = this.employeeList?.slice();
      }
    });
  }

  projectLookUp() {
    debugger
    this.empDetailsService.getProject(true, 1).subscribe((res) => {
      debugger
      this.projectList = [];
      this.filterprojectList = [];
      this.projectList = res;
      this.filterprojectList = this.projectList.slice();
    })
  }

  getKraTasklist() {
    this.perodicTaskService.getTaskList().subscribe(result => {
      this.kraTaskList = [];
      this.filterKraTaskList = [];
      if (result) {
        this.kraTaskList = result;
        this.filterKraTaskList = this.kraTaskList.slice();
      }
    })
  }

  getNotifyDetails() {
    this.perodicTaskService.getNotificationType().subscribe(result => {
      this.Notifylist = [];
      this.filterNotifyList = [];
      if (result) {
        this.Notifylist = result;
        this.filterNotifyList = this.Notifylist.slice();
      }
    });
  }
  getDesignationDetails() {
    // this.taskService.employeeDetails().subscribe(result => {
    //   this.employeeListByRole = [];
    //   if (result && result.value) {
    //     this.employeeListByRole = result.value;
    //     this.employeeListByRole.forEach(v => {
    //       v.empNameCode = v.firstName + '(' + v.empCode + ')'
    //     });
    //   }
    // });
    this.Designationlist = [];
    this.Designationlist = [
      { key: 1, value: 'Technical Head' },
      { key: 2, value: 'Senior Developer' },
      { key: 3, value: 'Sales Head' },
    ]
  }
  onCancel() {
    this._location.back();
  }
  onClear() {
    this.form.reset();
    this.form.controls['employee'].clearValidators();
    this.form.controls['employee'].updateValueAndValidity();
    this.form.controls['project'].clearValidators();
    this.form.controls['project'].updateValueAndValidity();
    this.form.controls['notify'].clearValidators();
    this.form.controls['notify'].updateValueAndValidity();
    this.form.controls['approver'].clearValidators();
    this.form.controls['approver'].updateValueAndValidity();
    this.isPerson = false;
    this.isProject = false;
    this.showApprover=false;
  }

  onSubmit() {
    debugger
    if (this.form.valid) {
      debugger
      var projectidlist = []
      console.log(this.form.value.project);
      if (this.form.value.project) {
        var localprojectidlist=this.form.value.project
        projectidlist = localprojectidlist.map(item => item.key);
      }
      var executoridlist = []
      if (this.form.value.employee) {
        var localExecutoridlist=this.form.value.employee
        executoridlist = localExecutoridlist.map(item => item.id);
      }
      var data = {
        id: this.taskId,
        scheduleId: this.scheduleId,
        scheduleTaskId: this.form.value.kratask,
        primaryOwnerId: this.form.value.primaryowner,
        secondaryOwnerId: this.form.value.secondaryOwners ? this.form.value.secondaryOwners : null,
        projectEmployeeScheduleTask: this.isProject == true && this.isPerson == true ? 3 : this.isProject == true ? 1 : this.isPerson == true ? 2 : 3,
        isCoContributor: this.form.value.Participants,
        notificationType: this.form.value.notify,
        isApproval: this.form.value.isApprove,
        approverId: this.form.value.approver? this.form.value.approver:null,
        isDocument: this.form.value.isDocument,
        isReminder: this.form.value.isRemainder,
        isRepeat: this.form.value.isRepeat,
        projectId: projectidlist,
        executorId: executoridlist
      }
      console.log(data, 'data')
      this.perodicTaskService.AttachTasktoScheduleSave(data).subscribe(result => {
        if (result.isSuccess) {
          this._location.back();
          if (this.taskId == 0) {
            this.alertService.success("Task attached Successfully");
          }
          else if (this.taskId > 0) {
            this.alertService.success("Task Updated Successfully");
          }
        }
        else {
          this.alertService.error(result.failures[0])
        }
      });
    }
    else {
      this.validateFormControl();
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

  Approval(status:boolean){
    if(status==true){
      this.showApprover=true;
      this.form.controls['approver'].setValidators(Validators.required);
      this.form.controls['approver'].updateValueAndValidity();
    }
    else{
      this.showApprover=false;
      this.form.controls['approver'].clearValidators();
      this.form.controls['approver'].updateValueAndValidity();
    }
  }

  handleChange(event: any, value: any) {
    debugger
    if (value == 1) {
      this.isProject = event.checked;
      if (event.checked) {
        this.form.controls['project'].setValidators(Validators.required);
        this.form.controls['project'].updateValueAndValidity();
      }
      else {
        this.form.controls['project'].clearValidators();
        this.form.controls['project'].updateValueAndValidity();
      }
    }
    else if (value == 2) {
      this.isPerson = event.checked;
      if (event.checked) {
        this.form.controls['employee'].setValidators(Validators.required);
        this.form.controls['employee'].updateValueAndValidity();
      }
      else {
        this.form.controls['employee'].clearValidators();
        this.form.controls['employee'].updateValueAndValidity();
      }
    }
  }

  onItemSelect(item: any) {
    this.selectedCount = this.form.controls.project.value.length;
    if(this.selectedCount == 1 ||this.selectedCount == 0){
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'empNameCode',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        allowSearchFilter: true,
        enableCheckAll: false 
      };
    }
    else{
      this.dropdownSettings = {
        singleSelection: true,
        idField: 'id',
        textField: 'empNameCode',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        allowSearchFilter: true,
        enableCheckAll: false 
      };
      let length = this.form.controls.employee.value.length ? this.form.controls.employee.value.length:0;
      if(length >1){
        this.form.controls['employee'].setValue('');
      }
    }
  }
}
