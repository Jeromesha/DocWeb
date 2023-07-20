import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/services/alert.service';
import { TimeSheetService } from 'src/app/services/timesheet.service';
import { UserSessionService } from 'src/app/services/usersession.service';


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



  constructor(private formBuilder: FormBuilder,
    private _location: Location,
    route: ActivatedRoute,
    public dialog: MatDialog,
    private alertService: AlertService,
    private userSessionService: UserSessionService,
    private timesheetService: TimeSheetService,
    private translate: TranslateService) {
    this.routeParams = route.snapshot.params;
    this.id = +this.routeParams.id;
    this.actionInfo = this.routeParams.actionInfo
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
    this.get(true);
  }

  initializeValidators() {
    this.form = this.formBuilder.group({
      id: [this.id, Validators.required],
      name: ['', [Validators.required]],
      tName: ['', [Validators.required]],
      code: ['', [Validators.required]],
      officeAddress: ['', [Validators.required]],
      tOfficeAddress: ['', [Validators.required]],
      email: ['', Validators.email],
      landLine: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      latitude: [null],
      longitude: [null],
      alternateNumber: [null],
      officerName: ['', [Validators.required]],
      tOfficerName: ['', [Validators.required]]
    });
  }

  get(refresh: boolean) {
    if (this.id > 0) {
      this.timesheetService.getById(this.id, refresh).subscribe(result => {
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
    if (this.form.valid) {
      if (this.form.value.latitude === null) {
        this.form.controls['latitude'].setValue(0);
      }
      if (this.form.value.longitude === null) {
        this.form.controls['longitude'].setValue(0);
      }
      const latitudelength = this.form.value.latitude.toString().length;
      if (latitudelength > 11) {
        this.alertService.warning('The Latitude Must Contain Only 11 Numbers');
        return;
      }
      const longitudelength = this.form.value.longitude.toString().length;
      if (longitudelength > 11) {
        this.alertService.warning('The Longitude Must Contain Only 11 Numbers');
        return;
      }
      this.timesheetService.save(this.form.value).subscribe(result => {
        // this.alertService.result(result, true, 'User updated successfully');
        const msg1 = this.translate.instant('Savedsuccessfully');
        const msg2 = this.translate.instant('Updatedsuccessfully');
        const msg3 = this.translate.instant('Region');
        const sucessmsg = this.id == 0 ? msg1 : msg2;
        this.alertService.result(result, true, msg3 + ' ' + sucessmsg);
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
}
