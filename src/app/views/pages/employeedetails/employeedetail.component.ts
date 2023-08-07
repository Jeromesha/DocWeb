import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployeedetailsService } from 'src/app/services/employeedetails.service';
import * as forge from "node-forge";
import * as _ from 'lodash';
import { AlertService } from 'src/app/services/alert.service';
import { NavigationService } from 'src/app/services/navigation.service';

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
  formEditMode = true;
  submitbtn: string;
  roleList: any[];
  filterroleType: any[];
  projectList: any[];
  filterprojectList: any[];
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
  dropdownSettings:{};
  timeSheetTrue: boolean = false;
  timeSheetFalse: boolean = true;

  
  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private empDetailsService: EmployeedetailsService,
    private alertService:AlertService,
    private navigationService:NavigationService
    ) {
    this.routeparams = this.route.snapshot.params;
    this.actionInfo = this.routeparams.actionInfo;
    this.id = this.routeparams.id;
    if (this.id === 0) {
      this.submitbtn = 'Update';

    } else {
      this.submitbtn = 'Save';

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
    this.initialValidators();
    this.projectLookUp();
    this.locationLookup();
    this.reportPersonLookup();
    this.roleLookup();
    this.designationLookup();
    // this.getHybridLocation()
    this.date=new Date()
    if(this.id>0)
    {
      this.getEmpDetails();
      this.disab=true;
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

  initialValidators() {
    this.form = this.formBuilder.group({
      "Id":[0],
      'empCode': ['', Validators.required],
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'roleId': ['', Validators.required],
      'mobile': ['', Validators.required],
      'email': ['', Validators.required],
      // 'svnUserName': ['', Validators.required],
      'hybridLocationId': ['',],
      'secLelreportingPersonId':[''],
      'dateOfBirth': ['', Validators.required],
      'joiningDate': ['', Validators.required],
      'marriageDate': [''],
      'empShortName': ['', Validators.required],
      'defaultProjectId': ['', Validators.required],
      'locationId': ['', Validators.required],
      'designationTypeId': ['', Validators.required],
      'gender': ['', Validators.required],
      'address': ['', Validators.required],
      'isFirstLogin': [''],
      'fillTimesheet': [''],
      'reportingPersonId': ['', Validators.required],
      'stringPswrd': ['', Validators.required]
    })
  }

  getEmpDetails(){
    this.empDetailsService.getEmpDetail(true,this.id).subscribe((res)=>{
      console.log(res);
      this.form.patchValue(res);
      
    })
  }

  projectLookUp() {
    this.empDetailsService.getProject(true, 1).subscribe((res) => {
      console.log(res);
      this.projectList = [];
      this.filterprojectList = [];
      this.projectList = res;
      this.filterprojectList = this.projectList.slice();

    })
  }

  roleLookup() {
    this.empDetailsService.getProject(true,5).subscribe((res) => {
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
    })
  }

  locationLookup() {
    this.empDetailsService.getProject(true,7).subscribe((res) => {
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

  designationLookup(){
    this.empDetailsService.getDesignationList(true).subscribe((res)=>{
      this.designationList=[];
      this.filterdesignationList=[];
      this.designationList=res;
      this.filterdesignationList=this.designationList.slice()
    })
  }
  fillTimesheet(event) {
    console.log(event.checked);
    console.log(this.form.value.fillTimesheet);

    this.checkedTickfill = event.target.checked
  }

  isActive(event) {
    this.checkedTicktActive = event.target.checked
  }

  onCancel() {
    this.navigationService.gotoEmployee();

  }
  changeOptions(event){
if(event.value == 1){
this.timeSheetTrue = true;
this.timeSheetFalse  = false;
}else{
  this.timeSheetTrue = false;
  this.timeSheetFalse  = true;
}
  }
  onSubmit() {
    const projectId = [];
      debugger
      const selectedPrijectList = this.form.get('defaultProjectId').value;
      if (selectedPrijectList && selectedPrijectList.length > 0) {
        selectedPrijectList.forEach(element => {
          projectId.push(element.key);
        });
      }

    let obj=this.designationList.filter(x=>x.key==this.form.value.designationTypeId)
    console.log(obj);
    
    if (this.form.valid) 
    {
    var rsa = forge.pki.publicKeyFromPem(this.publicKey);
    var encryptedPassword = window.btoa(rsa.encrypt(this.form.value.stringPswrd));
    // this.form.controls['strpassword'].setValue(encryptedPassword)
    
      var data = this.form.value;
      data.password = '';
      data.defaultProjectId=projectId,
      data.employeeProfileStream = '';
      data.isSystemGeneratedPassword = false
      data.designation = obj[0].value;
      data.uniqueCode = this.form.value.empCode;
      data.stringPswrd=encryptedPassword;
      data.marriageDate=this.form.value.marriageDate==""?null:this.form.value.marriageDate;
      console.log(data.Designation);
      this.empDetailsService.saveEmployee(data).subscribe((res)=>{
        console.log(res,'savvvv');
        if(res.isSuccess){
          this.alertService.success("Employee Details saved successfully.");
          this.navigationService.gotoEmployee();
        }
        else{
          this.alertService.error(res.failures[0])
        }
      })
    } 
    else
     {
      this.validateFormControl()
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
}
