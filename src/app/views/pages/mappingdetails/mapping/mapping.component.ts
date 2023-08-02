import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import * as _ from 'lodash';
import { AlertService } from 'src/app/services/alert.service';
import { MappingServices } from 'src/app/services/mapping.service';
import { UserSessionService } from 'src/app/services/usersession.service';

@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.scss']
})
export class MappingComponent implements OnInit {

  form: FormGroup;
  routeParams: any;
  pattern: any;
  emailpattern: any;
  projectSortList: { key: number; value: string; }[];
  employeeSortList: { key: number; value: string; }[];
  showdescription: boolean = false;
  submitbtn: string = 'save';
  formEditMode: boolean = true;
  actionInfo: number = 0;
  id: number = 0;

  constructor(private formBuilder: FormBuilder,
    private _location: Location,
    route: ActivatedRoute,
    public dialog: MatDialog,
    private alertService: AlertService,
    private userSessionService: UserSessionService,
    private mappingservice: MappingServices,
    private translate: TranslateService) {
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
  }

  ngOnInit(): void {
    debugger;
    this.initializeValidators();
    this.getProject();
    this.getEmployee();
    console.log('Ajith');
  }

  initializeValidators() {
    this.form = this.formBuilder.group({
      id: [0],
      projectId: [0, Validators.required],
      employeeId: [0, Validators.required]
    });
  }

  sortingChange(event) {
    if (event.value != null) {
      this.showdescription = true;
    }

  }
  onSubmit() {
    const projectemployeeData =
    {
      "isDeleted": false,
      "projectEmployeeViewModel": {
        "id": 0,
        "projectId": this.form.value.projectId,
        "employeeId": this.form.value.employeeId,
        "projectName": _.find(this.projectSortList, ['key', (this.form.value.projectId)])?.value,
        "employeeName": _.find(this.employeeSortList, ['key', (this.form.value.employeeId)])?.value
      }
    }
    if (this.form.valid) {
      debugger
      this.mappingservice.MapProjectEmployee(projectemployeeData).subscribe(result => {
        const msg1 = this.translate.instant('Savedsuccessfully');
        const msg2 = this.translate.instant('Updatedsuccessfully');
        const msg3 = this.translate.instant('Region');
        const sucessmsg = msg1;
        this.alertService.result(result, true, msg3 + ' ' + sucessmsg);
      });
    } else {
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


  getEmployee() {
    this.mappingservice.GetEmployee().subscribe(result => {
      this.employeeSortList = result;
    });
  }
  getProject() {
    this.mappingservice.GetProject().subscribe(result => {
      this.projectSortList = result;
    });
  }
  onCancel() {
    this._location.back();
  }

}
