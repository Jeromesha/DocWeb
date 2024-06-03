import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { AlertService } from 'src/app/services/alert.service';
import { ExcelService } from 'src/app/services/excel.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { TaskService } from 'src/app/services/task.service';
import { UserSessionService } from 'src/app/services/usersession.service';
import { PerodicTaskService } from 'src/app/services/perodicTask.Service';
import { result } from 'lodash';

@Component({
  selector: 'app-perodictask-add',
  templateUrl: './perodictask-add.component.html',
  styleUrls: ['./perodictask-add.component.scss']
})
export class PerodictaskAddComponent implements OnInit {

  routeParams: any;
  id: number;
  actionInfo: any;
  form: FormGroup;

  submitbtn: string;
  Categorylist: any[];
  CategorylistFilterList: any;
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
    public perodicTaskService :PerodicTaskService
  ) {
    this.routeParams = route.snapshot.params;
    this.id = parseInt(this.routeParams.id);
    this.actionInfo = this.routeParams.actionInfo;
  }

  ngOnInit(): void {
    this.initializeValidators();
    this.getTaskCategory();
    if (this.id === 0) {
      this.submitbtn = 'Add';
    }
    else {
      this.submitbtn = 'Update';
      this.getTaskbyId(this.id);
    }
  }

  initializeValidators() {
    this.form = this.formBuilder.group({
      id: [0],
      name: ['', Validators.required],
      description: ['', Validators.required],
      scheduleTaskCategoryType:['', Validators.required]
    });
  }
  getTaskCategory() {
    this.perodicTaskService.getTaskCategory().subscribe(result => {
      this.Categorylist = [];
      if (result) {
        this.Categorylist = result;
        this.CategorylistFilterList = this.Categorylist?.slice();
      }
    });
  }
  getTaskbyId(id:any){
    this.perodicTaskService.getTaskbyId(id).subscribe(result =>{
      if(result.isSuccess){
        var formdata = result.value;
        this.form.patchValue(formdata);
        console.log(formdata,'form data')
      }
    });
  }
  onCancel() {
    this._location.back();
  }
  onClear() {
    this.form.reset();
  }
  onSubmit() {
    if(this.form.valid){
      var data ={
        id:this.id >0? this.id :0,
        name:this.form.value.name,
        description:this.form.value.description,
        scheduleTaskCategoryType:this.form.value.scheduleTaskCategoryType
      }
      this.perodicTaskService.saveTask(data).subscribe(result => {
        if(result.isSuccess){
          this._location.back();
          this.alertService.success("Task added Successfully")
        }
        else{
          this.alertService.error(result.failures[0])
        }

      });
    }
    else{
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


}
