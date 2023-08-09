import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/services/alert.service';
import { TimeSheetService } from 'src/app/services/timesheet.service';
import { UserSessionService } from 'src/app/services/usersession.service';
import { MomentDateModule } from '@angular/material-moment-adapter';

import * as moment from 'moment';
import { result } from 'lodash';
import { timeout } from 'rxjs-compat/operator/timeout';
import { Observable } from 'rxjs';
import { ProjectdetailsService } from 'src/app/services/projectdetails.service';
import { EmployeedetailsService } from 'src/app/services/employeedetails.service';

@Component({
  selector: 'app-project-details-view',
  templateUrl: './project-details-view.component.html',
  styleUrls: ['./project-details-view.component.scss']
})
export class ProjectDetailsViewComponent implements OnInit {

  id = 0;
  actionInfo = 0;
  form: FormGroup;
  routeParams: any;
  pageTitle: string;
  data: any;
  submitbtn: string;
  filesResult: any;
  //selectedImage: any;
  licenceTypeList: any[];
  selectedFileName = 'Choose File';
  dropdownSettings: any = {};
  vehicleList: any = [];
  formEditMode = true;
  Languages: any[];
  RollList: any;
  passworderror = false;
  isReadOnly = false;
  // isDisable: boolean;
  isDisable = false;
  pattern: RegExp;
  show: boolean;
  show2: boolean;
  clientId: any;
  emailpattern: RegExp;
  filterSortList: { key: number; value: string; }[];
  showdescription: boolean = false;
  SaveTimesheet: any[];
  maxDate: Date;
  scheduledEndmax: any;
  clintdata: any;
  filterclintdata: any;
  projecttypelist: any;
  filterprojecttypelist: any;
  technologytypelist: any;
  filtertechnologytypelist: any;
  ProjectStatuslist: any;
  filterprojectstatuslist: any;
  filterprojectleadlist: any;
  projectleadlist: any;
  isdisable: boolean;
  natureofprojectlist: any;
  filternatureofprojectlist: any;
  reportingList: any[];
  filterreportingList: any[];



  constructor(
    private formBuilder: FormBuilder,
    private _location: Location,
    route: ActivatedRoute,
    public dialog: MatDialog,
    private alertService: AlertService,
    private userSessionService: UserSessionService,
    private translate: TranslateService,
    private timesheetService: TimeSheetService,
    private projectdetailsservice: ProjectdetailsService,
    private empDetailsService:EmployeedetailsService,
    // private router: Router
  ) {
    this.routeParams = route.snapshot.params;
    debugger
    this.id = JSON.parse(this.routeParams.id);
    this.id = parseInt(this.routeParams.id);
    //this.id = 0;
    debugger
    this.actionInfo = this.routeParams.actionInfo
    //this.actionInfo = 0;
    if (this.id === 0) {
      this.submitbtn = 'Save';
    } else {
      this.submitbtn = 'Update';
    }
    if (this.actionInfo == 1) {
      this.formEditMode = false
    }
    this.pattern = /^[^\s]+(\s+[^\s]+)*$/;
    this.emailpattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.clientId = this.userSessionService.getCurrentClientId();
   }

   ngOnInit() {
    this.initializeValidators();
    this.Getproject();
    this.getclint();
    this.getprojecttype();
    this.getprojectLead();
    this.gettechnologytype();
    this.getProjectStatus();
    this.getNatureoftheproject();
    this.get(true);
    this.maxDate = new Date();
    this.scheduledEndmax = new Date();
    if(this.actionInfo == 0 && this.id !=0){
      this.isdisable =true;
    }else{
      this.isDisable = false;
    }
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'key',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };

  }

  initializeValidators() {


    this.form = this.formBuilder.group({
      id: [0],
      clientId: [null, Validators.required],
      projectName: [null, Validators.required],
      projectTypeId: ["",Validators.required],
      technologyTypeId: [null, Validators.required],
      repositoryName: [null, Validators.required],
      natureofproject:[null],
      repositoryUrl: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null],
      projectStatusId: [null, Validators.required],
      projectLeadId: [null, Validators.required],
      // reportingPersonId:[null],
      secLelreportingPersonId:[null]
    });
  }


  setDate() {
    if(this.form.value.endDate){
      this.form.controls['endDate'].setValue(null);
    }
    const currDate = moment(new Date()).format('YYYY-MM-DD');
    const yesterday = moment(new Date()).subtract(1, 'days').format('YYYY-MM-DD');
    const chooseDate = moment(this.form.value.ScheduledStart).format('YYYY-MM-DD');
    // if (chooseDate === currDate) {
    //   this.scheduledEndmin = this.form.value.ScheduledStart;
    //   this.scheduledEndmax = moment(this.form.value.ScheduledStart).format('YYYY-MM-DD');
    // } else if (chooseDate === yesterday) {
    //   this.scheduledEndmin = this.form.value.ScheduledStart;
    //   this.scheduledEndmax = moment(this.form.value.ScheduledStart).add(1, 'days').format('YYYY-MM-DD');
    // } else {
    //   this.scheduledEndmin = this.form.value.ScheduledStart;
    //   this.scheduledEndmax = moment(this.form.value.ScheduledStart).add(2, 'days').format('YYYY-MM-DD');
    // }

    const dcurr = moment(new Date(), "DD.MM.YYYY");
    const dchoose = moment(this.form.value.ScheduledStart, "DD.MM.YYYY");
    const datediff = dcurr.diff(dchoose, 'days');
    // if(datediff == 31 || datediff < 31){
    //   // this.scheduledEndmax = moment(new Date()).format('YYYY-MM-DD');
    //   this.scheduledEndmax = moment(this.form.value.ScheduledStart).add(31, 'days').format('YYYY-MM-DD');
    // }else if(datediff > 31){
    //   if(this.form.value.ScheduledEnd)
    //   this.form.controls['ScheduledEnd'].setValue(null);
    //   this.scheduledEndmin = this.form.value.ScheduledStart;
    //   this.scheduledEndmax = moment(this.form.value.ScheduledStart).add(31, 'days').format('YYYY-MM-DD');
    // }
    this.scheduledEndmax = moment(new Date()).add(0, 'days').format('YYYY-MM-DD');
  }

  Getproject() {
    debugger;
    this.timesheetService.getproject().subscribe(result => {
      console.log(">>>?", result);
      this.filterSortList = result;
    });
  }

 

  get(refresh: boolean) {
    if (this.id > 0) {
      this.projectdetailsservice.getById(this.id, refresh).subscribe(result => {
        this.data = result;
        if (this.data) {
          this.form.patchValue(this.data);
          if (this.formEditMode === false) {
            this.isReadOnly = false;
            this.form.disable();
            this.isDisable = true;
            //this.isReadOnly = false;
          }
        }
      });
      this.isReadOnly = true;
    }
  }
  getclint(){
    debugger;
    this.projectdetailsservice.getLookup(4,true).subscribe(result =>{
      this.clintdata = result;
      this.filterclintdata = this.clintdata.slice();
    })
  }

  getprojecttype(){
    debugger;
    this.projectdetailsservice.getProjectType(true).subscribe(result =>{
      this.projecttypelist = result;
      this.filterprojecttypelist = this.projecttypelist;
      console.log(">/>?",result);
    })
  }

  getprojectLead(){
    debugger;
    this.projectdetailsservice.getLookup(2,true).subscribe(result =>{
      this.projectleadlist = result;
      this.filterprojectleadlist = this.projectleadlist;
      console.log(">/>?",result);
    })
  }

  gettechnologytype(){
    debugger;
    this.projectdetailsservice.getLookup(9,true).subscribe(result =>{
      this.technologytypelist = result;
      this.filtertechnologytypelist = this.technologytypelist;
    })
  }

  getProjectStatus(){
    debugger;
    this.projectdetailsservice.getLookup(10,true).subscribe(result =>{
      this.ProjectStatuslist = result;
      this.filterprojectstatuslist = this.ProjectStatuslist;
    })
  }
  reportPersonLookup() {
    this.empDetailsService.getProject(true, 2).subscribe((res) => {
      this.reportingList = [];
      this.filterreportingList = [];
      this.reportingList = res;
      this.filterreportingList = this.reportingList.slice();
    })
  }
  getNatureoftheproject(){
    debugger;
    this.projectdetailsservice.getLookup(14,true).subscribe(result =>{
      this.natureofprojectlist = result;
      this.filternatureofprojectlist = this.natureofprojectlist;
    })
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

  onSubmit() {
    let technologyTypeId = [];
    const selectedPrijectList = this.form.get('technologyTypeId').value;
    if (selectedPrijectList && selectedPrijectList.length > 0) {
      selectedPrijectList.forEach(element => {
        technologyTypeId.push(element.key);
      });
    }
    console.log(">:",this.form.value.clintid);
    debugger;
    let client=this.form.value.clientId;
    let tech=this.form.value.technologyTypeId;
    var projectdata = 
     { 
      id:this.id,
      clientId :client,
      projectName: this.form.value.projectName,
      projectTypeId: this.form.value.projectTypeId,
      technologyTypeId: technologyTypeId,
      repositoryName: this.form.value.repositoryName,
      repositoryUrl: this.form.value.repositoryUrl,
      startDate: this.form.value.startDate,
      endDate: this.form.value.endDate,
      projectStatusId: this.form.value.projectStatusId,
      projectLeadId: this.form.value.projectLeadId
    }

    if (this.form.valid) {
      debugger
      this.projectdetailsservice.save(projectdata).subscribe(result => {
        const msg1 = this.translate.instant('Savedsuccessfully');
        const msg2 = this.translate.instant('Updatedsuccessfully');
        const msg3 = this.translate.instant('Region');
        const sucessmsg = this.id == 0 ? msg1 : msg2;
        this.alertService.result(result, true, msg3 + ' ' + sucessmsg);
      });
    // this.router.navigate(['/projectdetails/']);
    } 
    else {
      const msg4 = this.translate.instant('Please Check All fields');
      this.validateFormControl();
      this.alertService.result(result, true, msg4 );

    }
  }

  onCancel() {
    this._location.back();
  }
  password() {
    this.show = !this.show;
  }
  confirmpassword() {
    this.show2 = !this.show2;
  }

  phoneValid(event) {
    let isValid = false;
    let regex = /^[0-9 ]+$/;
    isValid = regex.test(event.target.value);
    if (isValid) {
      return true;
    } else {
      let val = this.form.value.alternateNumber;
      let vv = val.slice(0, -1);
      this.form.controls['alternateNumber'].setValue(vv);
      return false;
    }

  }
  onbtnClick(id) {
    debugger
    if (id == 1) {
      this.form.controls['choices'].setValue(id);
    }
    else {
      this.form.controls['choices'].setValue(id);
    }
    console.log(this.form.value.choices, "  {{this.form.value.choices}}");
    

  }

}
