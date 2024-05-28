import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/services/alert.service';
import { ExcelService } from 'src/app/services/excel.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { TaskService } from 'src/app/services/task.service';
import { UserSessionService } from 'src/app/services/usersession.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-kra-task-attach',
  templateUrl: './kra-task-attach.component.html',
  styleUrls: ['./kra-task-attach.component.scss']
})
export class KraTaskAttachComponent implements OnInit {
  id:any;
  actionInfo:any;
  routeParams: any;
  form:FormGroup;
  employeeList: any[];
  employeeFilterList: any;
  dropdownSettings: any = {};
  employeeListByRole: any;
  kraTaskList: any[];
  filterKraTaskList: any[];
  Notifylist: any[];
  dropdownSettingsNotify: any={};
  submitbtn:string;
  dropdownSettingsDesignation: any={};
  Designationlist: any[];
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
    this.getKraTasklist();
    this.getNotifyDetails();
    this.getDesignationDetails();
    if(this.actionInfo==0){
      this.submitbtn='Add'
    }
    else{
      this.submitbtn='Update'
    }
  }


  initializeValidators() {
    this.form = this.formBuilder.group({
      id: [0],
      kratask:['',Validators.required],
      primaryowner: ['', Validators.required],
      secondaryOwners:['',Validators.required],
      approver:[''],
      employee:['',Validators.required],
      isApprove:['',Validators.required],
      isDocument:['',Validators.required],
      isRemainder:['',Validators.required],
      Participants:[''],
      notify:[''],
      isProject:['']
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

  getKraTasklist(){
    this.kraTaskList=[];
    this.filterKraTaskList=[];
    this.filterKraTaskList=[
      {key:1,value:'Code Review '},
      {key:2,value:'Testing'},
      {key:3,value:'Tech Learning'},
    ]
  }

  getNotifyDetails() {
    // this.taskService.employeeDetails().subscribe(result => {
    //   this.employeeListByRole = [];
    //   if (result && result.value) {
    //     this.employeeListByRole = result.value;
    //     this.employeeListByRole.forEach(v => {
    //       v.empNameCode = v.firstName + '(' + v.empCode + ')'
    //     });
    //   }
    // });
    this.Notifylist=[];
    this.Notifylist=[
      {key:1,value:'WhatsApp'},
      {key:2,value:'Mail'},
      // {key:3,value:'Both'},
    ]
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
    this.Designationlist=[];
    this.Designationlist=[
      {key:1,value:'Technical Head'},
      {key:2,value:'Senior Developer'},
      {key:3,value:'Sales Head'},
    ]
  }
  onCancel(){
    this._location.back();
  }
  onClear(){
    this.form.reset();
  }
  onSubmit(){
    this._location.back();
    this.alertService.success("KRA Task added Successfully")
  }
  
}
