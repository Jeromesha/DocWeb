import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployeedetailsService } from 'src/app/services/employeedetails.service';
import * as forge from "node-forge";
import * as _ from 'lodash';
import { AlertService } from 'src/app/services/alert.service';
import { NavigationService } from 'src/app/services/navigation.service';
import * as moment from 'moment';

@Component({
  selector: 'app-employeedetail',
  templateUrl: './employeedetail.component.html',
  styleUrls: ['./employeedetail.component.scss']
})
export class EmployeedetailComponent implements OnInit {
  routeparams: any;
  actionInfo: any;
  id: any;
  form: FormGroup;

  statuslist = [
    { key: 1, value: 'Resigned' },
    { key: 2, value: 'Working' },
  ];
  
  formEditMode = true;
  submitbtn: string;
  roleList: any[];
  filterroleType: any[];
  projectList: any[];
  filterprojectList: any[] = [];
  filterlocationList: any[];
  locationList: any[];
  filtergenderList: any[];
  genderList: any[];
  reportingList: any[];
  filterreportingList: any[];
  designationList: any[];
  filterdesignationList: any[];
  checkedTickfill: boolean = false;
  checkedTicktActive: boolean = false;


  publicKey: string = `-----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAruzidSHRz8Pk6wy/aw3z
  U1lp+pB6BGU1LxsWGJMsJ2dRCks5+G3MBGttwOHwIMd42+PTy4tIwxBg3yI7yf2C
  mOKz+7UaG/pVQII4HfRmMxN7K5W9lf6+GSnmCdxDBtWc/4/AtRNrwHkDHwwK6bPn
  mysKZ9ymfxAT3MxKE9HpOUPaZzqqGEw7LbGW9nIWpAiBcbRTgvGRDsOuq4XVVDka
  v8H06TRgFrUtJ1HffIdW4XDJ/hUbAtzD3sLwomH4o0cLv/gnntf6HZNs51axB5Ep
  qIWXPSyHHd6Wi6Suij9/PDmrhTfOQSrrLrGxtOvchGO5H6IxGJJEhPYbozlGvJ90
  iQIDAQAB
  -----END PUBLIC KEY-----`;
  date: Date;
  disab: boolean;
  hybridLocationList: any[];
  filterHybridlocationList: any[];
  dropdownSettings: {};
  timeSheetTrue: boolean;
  timeSheetFalse: boolean;
  defaultProjectList: any = [];
  filterdefaultProjectList: any;
  encryptedPassword: string;
  secondaryreportingList: any;
  filtersecondaryreportingList: any;
  result: any;


  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private empDetailsService: EmployeedetailsService,
    private alertService: AlertService,
    private navigationService: NavigationService
  ) {
    this.routeparams = this.route.snapshot.params;
    this.actionInfo = this.routeparams.actionInfo;
    this.id = this.routeparams.id;
    if (this.id == 0) {
      this.submitbtn = 'Save';

    } else {
      this.submitbtn = 'Update';

    }
    if (this.actionInfo == 1) {
      this.formEditMode = false
    }
    this.genderList = [
      {
        key: 'M',
        value: 'Male'
      },
      {
        key: 'F',
        value: 'Female'
      }
    ];
    this.filtergenderList = this.genderList.slice()

  }

  ngOnInit(): void {
    debugger;
    this.initialValidators();
    if (this.id == 0) {
      this.projectLookUp(true);
    }
    this.locationLookup();
    this.reportPersonLookup();
    this.roleLookup();
    this.designationLookup();
    // this.getHybridLocation()
    this.date = new Date()
    if (this.id > 0) {
      this.getEmpDetails();
      this.disab = true;
    }
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'key',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };
    if (this.id == 0) {
      this.timeSheetFalse = true;
      this.form.controls['fillTimesheet'].setValue('2')

    }
  }

  initialValidators() {
    this.form = this.formBuilder.group({
      "Id": [this.id],
      'empCode': [, Validators.required],
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'roleId': ['', Validators.required],
      'statusid': [''],
      'mobile': ['',  [Validators.required, Validators.pattern(/^[6-9]{1}[0-9]{9}$/)]],
      'email': ['', Validators.required],
      'secondlvlReportingPersonId': ['',],
      'dateOfBirth': ['', Validators.required],
      'joiningDate': ['', Validators.required],
      'lastWorkingday': [''],
      'marriageDate': [null],
      'defaultProjectId': ['', Validators.required],
      'locationId': ['', Validators.required],
      'designationTypeId': ['', Validators.required],
      'gender': ['', Validators.required],
      'address': ['', Validators.required],
      'Prodfactors': [''],
      'projectId': ['', Validators.required],
      'fillTimesheet': [],
      'reportingPersonId': ['', Validators.required],
      'stringPswrd': ['',],
      'stringPswrd2': ['',],

    })
  }

  getEmpDetails() {
    this.empDetailsService.getEmpDetail(true, this.id).subscribe((res) => {
      debugger
      this.form.patchValue(res);
      this.projectLookUp(res);
      if (res.fillTimesheet == true) {
        this.timeSheetTrue = true;
        this.timeSheetFalse = false;
      } else {
        this.timeSheetFalse = true;
        this.timeSheetTrue = false;
      }
    })
  }

  projectLookUp(result) {
    debugger
    this.empDetailsService.getProject(true, 1).subscribe((res) => {
      debugger
      this.projectList = [];
      this.filterprojectList = [];
      this.projectList = res;
      this.filterprojectList = this.projectList.slice();
      debugger
      if (result) {
        console.log(typeof result.projectId);
        let projetId = result.projectId.filter(a => a.key == result.defaultProjectId);
        this.getDefaultProjectList(projetId[0], 1)
      }
    })
  }
  getDefaultProjectList(event, id) {
    debugger
    if (id == 1) {
      let projectId = event;
      this.defaultProjectList.push(projectId);
      this.filterdefaultProjectList = this.defaultProjectList.slice();
      if (id > 0) {
        this.filterdefaultProjectList = this.form.value.projectId;
      }
    } else {
      const index = this.filterdefaultProjectList.findIndex(selectedItem => selectedItem.key === event.key);
      if (index !== -1) {
        this.defaultProjectList.splice(index, 1);
        this.filterdefaultProjectList = this.defaultProjectList.slice();
        if (id > 0) {
          this.filterdefaultProjectList = this.form.value.projectId;
        }
      }
    }

  }
  isItemSelected(item: any): boolean {
    return this.filterdefaultProjectList.some(selectedItem => selectedItem.id === item.id);
  }
  roleLookup() {
    this.empDetailsService.getProject(true, 5).subscribe((res) => {
      this.roleList = [];
      this.filterroleType = [];
      this.roleList = res;
      this.filterroleType = this.roleList.slice();
    })
  }
  reportPersonLookup() {
    this.empDetailsService.getProject(true, 2).subscribe((res) => {
      this.reportingList = [];
      this.filterreportingList = [];
      this.reportingList = res;
      this.filterreportingList = this.reportingList.slice();

      this.secondaryreportingList = [];
      this.filtersecondaryreportingList = [];
      this.secondaryreportingList = res;
      this.filtersecondaryreportingList = this.secondaryreportingList.slice();
    })
  }

  locationLookup() {
    this.empDetailsService.getProject(true, 7).subscribe((res) => {
      this.locationList = [];
      this.filterlocationList = [];
      this.locationList = res;
      this.filterlocationList = this.locationList.slice();
    })
  }

  // getHybridLocation(){
  //   this.empDetailsService.getHybridProject(true,7).subscribe((res) => {
  //     this.hybridLocationList = [];
  //     this.filterHybridlocationList = [];
  //     this.hybridLocationList = res;
  //     this.filterHybridlocationList = this.filterHybridlocationList.slice();
  //   })
  // }

  designationLookup() {
    this.empDetailsService.getDesignationList(true).subscribe((res) => {
      this.designationList = [];
      this.filterdesignationList = [];
      this.designationList = res;
      this.filterdesignationList = this.designationList.slice()
    })
  }
  // fillTimesheet(event) {
  //   console.log(event.checked);
  //   console.log(this.form.value.fillTimesheet);

  //   this.checkedTickfill = event.target.checked
  // }

  isActive(event) {
    this.checkedTicktActive = event.target.checked
  }

  onCancel() {
    this.navigationService.gotoEmployee();

  }
  changeOptions(event) {
    debugger
    if (event.value == "1") {
      this.timeSheetTrue = true;
      this.timeSheetFalse = false;
    } else {
      this.timeSheetTrue = false;
      this.timeSheetFalse = true;
    }
  }

  encrypt() {
    var rsa = forge.pki.publicKeyFromPem(this.publicKey);
    this.encryptedPassword = window.btoa(rsa.encrypt(this.form.value.stringPswrd));
  }
  onSubmit() {
    if (this.id == 0) {
      this.form.controls['stringPswrd'].setValidators(Validators.required);
      this.form.controls['stringPswrd'].updateValueAndValidity();
      this.form.controls['stringPswrd2'].setValidators(Validators.required);
      this.form.controls['stringPswrd2'].updateValueAndValidity();
    } else {
      this.form.controls['stringPswrd'].clearValidators();
      this.form.controls['stringPswrd'].updateValueAndValidity();
      this.form.controls['stringPswrd2'].clearValidators();
      this.form.controls['stringPswrd2'].updateValueAndValidity();
    }
    const projectId = [];
    debugger
    const selectedPrijectList = this.form.get('projectId').value;
    if (selectedPrijectList && selectedPrijectList.length > 0) {
      selectedPrijectList.forEach(element => {
        projectId.push(element.key);
      });
    }

    let obj = this.designationList.filter(x => x.key == this.form.value.designationTypeId)
    console.log(obj);

    if (this.form.valid) {
      // this.form.controls['strpassword'].setValue(encryptedPassword)
      if (this.form.value.stringPswrd == this.form.value.stringPswrd2 || this.id>0) {
        var data = this.form.value;
        data.password = null;
        data.projectId = projectId;
        data.employeeProfileStream = '';
        data.isFirstLogin = true;
        data.isSystemGeneratedPassword = false
        data.designation = obj[0].value;
        data.uniqueCode = this.form.value.empCode;
        data.stringPswrd = this.encryptedPassword;
        data.marriageDate = this.form.value.marriageDate == null ? null : moment(this.form.value.marriageDate).format('YYYY-MM-DD');
        data.fillTimesheet = this.timeSheetTrue;
        data.dateOfBirth = moment(this.form.value.dateOfBirth).format('YYYY-MM-DD');
        data.joiningDate = moment(this.form.value.joiningDate).format('YYYY-MM-DD');
        data.lastWorkingday = moment(this.form.value.lastWorkingday).format('YYYY-MM-DD');
        data.secondlvlReportingPersonId = this.form.value.secondlvlReportingPersonId ? this.form.value.secondlvlReportingPersonId : 0;
        console.log(data.Designation);
        this.empDetailsService.saveEmployee(data).subscribe((res) => {
          console.log(res, 'savvvv');
          if (res.isSuccess) {
            if (this.id == 0) {
              this.alertService.success(data.firstName + ' ' + data.lastName + "'s details " + "saved successfully.");
            } else {
              this.alertService.success(data.firstName + ' ' + data.lastName + "'s details " + "Updated successfully.");

            }
            this.navigationService.gotoEmployee();
          }
          else {
            this.alertService.error(res.failures[0])
          }
        })
      }
      else
      {
        this.alertService.error("Password doesn't match");
      }
    }
    else {
      this.validateFormControl()
    }
    // encryptedPassword = ''
  }

  myFunction(event) {

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
}
