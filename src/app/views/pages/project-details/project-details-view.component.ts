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
    private router: Router
  ) {
    this.routeParams = route.snapshot.params;
    this.id = JSON.parse(this.routeParams.id);
    this.id = +this.routeParams.id;
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
    this.gettechnologytype();
    this.getProjectStatus();
    this.get(true);
    this.maxDate = new Date();
    this.scheduledEndmax = new Date();

  }

  initializeValidators() {


    this.form = this.formBuilder.group({
      id: [0],
      clintid: ['', Validators.required],
      projectname: [null, Validators.required],
      projecttype: ["",Validators.required],
      Technologytype: ['', Validators.required],
      Repositoryname: [null, Validators.required],
      Repositoryurl: [null, Validators.required],
      ScheduledStart: [null, Validators.required],
      ScheduledEnd: [null, Validators.required],
      projectstatus: [null, Validators.required]
    });
  }
  timeChange() {

  }

  setDate() {
    if(this.form.value.ScheduledEnd){
      this.form.controls['ScheduledEnd'].setValue(null);
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
      console.log(">>?",result);
      console.log(">>?",this.clintdata);

    })
  }

  getprojecttype(){
    debugger;
    this.projectdetailsservice.getLookup(1,true).subscribe(result =>{
      this.projecttypelist = result;
      this.filterprojecttypelist = this.projecttypelist;
      console.log(">/>?",result);
    })
  }

  gettechnologytype(){
    debugger;
    this.projectdetailsservice.getLookup(2,true).subscribe(result =>{
      this.technologytypelist = result;
      this.filtertechnologytypelist = this.technologytypelist;
    })
  }

  getProjectStatus(){
    debugger;
    this.projectdetailsservice.getLookup(3,true).subscribe(result =>{
      this.ProjectStatuslist = result;
      this.filterprojectstatuslist = this.ProjectStatuslist;
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
    debugger;
    // const timesheetData =
   
    // {
    //   timesheets: [
    //     {
    //       id: 0,
    //       entryDate: moment(this.form.value.EntryDate).format("YYYY-MM-DD") + "T00:00:00.566Z",
    //       hours: this.form.value.hours,
    //       description: this.form.value.description,
    //       projectId: this.form.value.projectId,
    //       taskId: 0,
    //       employeeId: this.userSessionService.userId(),
    //       isLeave: this.form.value.IsLeave == 1 ? true : false,
    //       timeIn: null,
    //       timeOut:  null ,
    //       taskStatusId: 0
    //     }
    //   ]
    // }
    
    var projectdata = [
     { 
      clintid : this.form.value.clientId,
      projectname: this.form.value.projectname,
      projecttype: this.form.value.projecttype,
      Technologytype: this.form.value.Technologytype,
      Repositoryname: this.form.value.Repositoryname,
      Repositoryurl: this.form.value.Repositoryurl,
      ScheduledStart: this.form.value.ScheduledStart,
      ScheduledEnd: this.form.value.ScheduledEnd,
      projectstatus: this.form.value.projectstatus
    }
    ]


    if (this.form.valid) {
      debugger
      this.projectdetailsservice.save(projectdata).subscribe(result => {
        const msg1 = this.translate.instant('Savedsuccessfully');
        const msg2 = this.translate.instant('Updatedsuccessfully');
        const msg3 = this.translate.instant('Region');
        const sucessmsg = this.id == 0 ? msg1 : msg2;
        this.alertService.result(result, true, msg3 + ' ' + sucessmsg);
      });
    this.router.navigate(['/projectdetails/']);
    } else {
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
