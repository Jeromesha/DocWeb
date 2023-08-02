import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployeedetailsService } from 'src/app/services/employeedetails.service';

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
  reportingList:any[];
  filterreportingList:any[];
  checkedTickfill: boolean = false;
  checkedTicktActive: boolean = false;

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private empDetailsService: EmployeedetailsService) {
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
    this.reportPersonLookup()
    this.roleLookup()
  }

  initialValidators() {
    this.form = this.formBuilder.group({
      'empCode': ['', Validators.required],
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'roleType': ['', Validators.required],
      'mobile': ['', Validators.required],
      'email': ['', Validators.required],
      'svnUserName': ['', Validators.required],
      'svnPassword': ['', Validators.required],
      'dateOfBirth': ['', Validators.required],
      'joiningDate': ['', Validators.required],
      'marriageDate': ['', Validators.required],
      'empShortName': ['', Validators.required],
      'defaultProjectId': ['', Validators.required],
      'locationId': ['', Validators.required],
      'designation': ['', Validators.required],
      'gender': ['', Validators.required],
      'address': ['', Validators.required],
      'isFirstLogin': [''],
      'fillTimesheet': [''],
      'reportingPersonId':['',Validators.required]
    })
  }

  projectLookUp() {
    this.empDetailsService.getProject(true,1).subscribe((res) => {
      console.log(res);
      this.projectList = [];
      this.filterprojectList = [];
      this.projectList = res;
      this.filterprojectList = this.projectList.slice();

    })
  }

  roleLookup()
  {
    this.empDetailsService.getRole(true).subscribe((res)=>{
      this.roleList=[];
      this.filterroleType=[];
      this.roleList=res;
      this.filterroleType=this.roleList.slice();
    })
  }
  reportPersonLookup()
  {
    this.empDetailsService.getProject(true,2).subscribe((res)=>{
      this.reportingList=[];
      this.filterreportingList=[];
      this.reportingList=res;
      this.filterreportingList=this.reportingList.slice();
    })
  }

  locationLookup() {
    this.empDetailsService.getLocation(true).subscribe((res) => {
      this.locationList = [];
      this.filterlocationList = [];
      this.locationList = res;
      this.filterlocationList = this.locationList.slice();
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

  }

  onSubmit() {
    // var data={
    //   'id':0,
    //   'empCode':this.form.value.empId,
    //   ''
    // }

    var data=this.form.value;
    data.id=0;
    data.password='';
    data.passwordKey='';
    data.employeeProfileStream='';
    data.isSystemGeneratedPassword=true
data.designationTypeId='';
data.uniqueCode='';
data.statusType=0

console.log(data);

  }
}
