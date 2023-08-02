import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/services/alert.service';
import { TimeSheetService } from 'src/app/services/timesheet.service';
import { UserSessionService } from 'src/app/services/usersession.service';
import { MomentDateModule } from '@angular/material-moment-adapter';
// import { SaveTimesheet, TimeSheetViewModel } from 'path/to/save-timesheet.model'; // Adjust the path to the correct location of your model


import * as moment from 'moment';


@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {

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
  isLeave: boolean = true;



  constructor(private formBuilder: FormBuilder,
    private _location: Location,
    route: ActivatedRoute,
    public dialog: MatDialog,
    private alertService: AlertService,
    private userSessionService: UserSessionService,
    private timesheetService: TimeSheetService,
    private translate: TranslateService) {
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
    this.get(true);
  }

  initializeValidators() {
    this.form = this.formBuilder.group({
      id: [0],
      description: [''],
      hours: [null],
      IsLeave: [2, [Validators.required]],
      EntryDate: ['', [Validators.required]],
      EmployeeId: [0],
      projectId: [null],
      timeIn: [null],
      timeOut: [null],
      TaskStatusId: [null],
    });
  }
  sortingChange(event) {
    if (event.value != null) {
      this.showdescription = true;
    }


  }
  timeChange() {

  }
  endtimeChange() {
    // if (moment(this.form.value.startTs).format('HH:mm') == moment(this.form.value.endTs).format('HH:mm')) {
    //   this.form.controls['endTs'].setValue(null);
    //   this.alertService.error('End Time should be different from Start Time');
    // } else if (moment(this.form.value.startTs).format('HH:mm') > moment(this.form.value.endTs).format('HH:mm')) {
    //   this.form.controls['endTs'].setValue(null);
    //   const msg = this.translate.instant('RevenueendtimemustbegreaterthanrevenueStarttime');
    //   this.alertService.error(msg);
    // } else {
    // }

  }
  Getproject() {
    debugger;
    this.timesheetService.getproject().subscribe(result => {
      console.log(">>>?", result);
      this.filterSortList = result;
    });
  }

  get(refresh: boolean) {
    debugger
    if (this.id > 0) {
      this.timesheetService.gettimesheetById(this.id, refresh).subscribe(result => {
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
    if(this.form.value.IsLeave == 2){
      this.form.controls['hours'].setValidators(Validators.required);
      this.form.controls['hours'].updateValueAndValidity();
      // this.form.controls['timeIn'].setValidators(Validators.required);
      // this.form.controls['timeIn'].updateValueAndValidity();
      // this.form.controls['timeOut'].setValidators(Validators.required);
      // this.form.controls['timeOut'].updateValueAndValidity();
      this.form.controls['description'].setValidators(Validators.required);
      this.form.controls['description'].updateValueAndValidity();
      this.form.controls['projectId'].setValidators(Validators.required);
      this.form.controls['projectId'].updateValueAndValidity();
    }else{
      this.form.controls['hours'].clearValidators();
      this.form.controls['hours'].updateValueAndValidity();
      // this.form.controls['timeIn'].clearValidators();
      // this.form.controls['timeIn'].updateValueAndValidity;
      // this.form.controls['timeOut'].clearValidators();
      // this.form.controls['timeOut'].updateValueAndValidity;
      this.form.controls['description'].clearValidators();
      this.form.controls['description'].updateValueAndValidity();
      this.form.controls['projectId'].clearValidators();
      this.form.controls['projectId'].updateValueAndValidity();
    }
    this.form.controls['EntryDate'].setValue(moment(this.form.value.EntryDate).format("YYYY-MM-DD"));
        const timesheetData =
   
    {
      timesheets: [
        {
          id:this.id,
          entryDate:moment(this.form.value.EntryDate).format("YYYY-MM-DD") + "T00:00:00.566Z",
          hours:this.form.value.IsLeave == 1 ? 0 : parseInt(moment(this.form.value.hours).format('HH:mm')),
          description:this.form.value.description,
          projectId:this.form.value.IsLeave == 1 ? 0: this.form.value.projectId,
          taskId:0,
          employeeId:this.userSessionService.userId(),
          isLeave:this.form.value.IsLeave == 1 ? true : false,
          // timeIn:this.form.value.IsLeave == 1 ? null:moment(this.form.value.timeIn).format('HH:mm:ss'),  // Adjusted to use TimeSpan format (hh:mm:ss)
          // timeOut:this.form.value.IsLeave == 1 ? null:moment(this.form.value.timeOut).format('HH:mm:ss'), // Adjusted to use TimeSpan format (hh:mm:ss)
          taskStatusId:0
        }
      ]
    }

    if (this.form.valid) {
      debugger
      this.timesheetService.savetimsheet(timesheetData).subscribe(result => {
        if(result && result.isSuccess){
          this._location.back();
          const msg1 = this.translate.instant('Savedsuccessfully');
          const msg2 = this.translate.instant('Updatedsuccessfully');
          const msg3 = this.translate.instant('');
          const sucessmsg = this.id == 0 ? msg1 : msg2;
          this.alertService.result(result, true, msg3 + ' ' + sucessmsg);
        }
        
      });
    } else {
      this.validateFormControl();
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
      
      this.isLeave = false;
     
      
    }
    else {
      // this.form.controls['choices'].setValue(id);
      this.isLeave = true;
     
    }


  }
}
