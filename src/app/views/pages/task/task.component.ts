import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { result } from 'lodash';
import { AlertService } from 'src/app/services/alert.service';
import { MappingServices } from 'src/app/services/mapping.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { TaskService } from 'src/app/services/task.service';
import { TimeSheetService } from 'src/app/services/timesheet.service';
import { UserSessionService } from 'src/app/services/usersession.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  id = 0;
  actionInfo = 1;
  form: FormGroup;
  routeParams: any;
  pageTitle: string;
  data: any;
  projectSortList: any;
  filterprojectSortList: any;
  proID: any;
  mappedEmployeeList: any;
  filtermappedEmployeeList: any;
  startDate: Date;
  endDate: Date;
  today: any;
  maxEndDate: any;
  minEndDate: any;
  Leavetasklist: any[];
  Normaltasklist: any[];
  projecttypelist: any[];
  filterprojecttypelist: any;
  modulelist: any;
  filtermodulelist: any;
  milestonelist: any;
  filtermilestonelist: any;
  taskstatuslist: any;
  filtertaskstatuslist: any;
  submitbtn: string;
  edittrue : boolean;
  roleId: any;

  constructor(
    private formBuilder: FormBuilder,
    route: ActivatedRoute,
    public dialog: MatDialog,
    private mappingservice: MappingServices,
    private timesheetService: TimeSheetService,
    public navigationService: NavigationService,
    private taskservice: TaskService,
    private alertService:AlertService,
    private _location : Location,
    private userSessionService :UserSessionService
  ) { 
    this.routeParams = route.snapshot.params;
    debugger
    this.id = JSON.parse(this.routeParams.id);
    //this.id = parseInt(this.routeParams.id);
    this.actionInfo = this.routeParams.actionInfo
    //this.actionInfo = 0;
    if (this.id === 0) {
      this.submitbtn = 'Save';
    } else {
      this.submitbtn = 'Update';
    }
    // if (this.actionInfo == 1) {
    //   this.formEditMode = false
    // }

    this.roleId = this.userSessionService.roleId();
    if(this.roleId ==3 || this.roleId ==4)
    {
      this.edittrue = true;
    }
  }

  ngOnInit(): void {
    this.initializeValidators();
    this.getProject();
    this.GetTaskType();
    this.getTaskstatus();
    this.GetTaskByID(true);
  }

  initializeValidators() {
    this.form = this.formBuilder.group({
      projectId: ['', Validators.required],
      assignedTo: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      priority: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      taskTypeId: ['', Validators.required],
      estimatedHours: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      completedHours: ['', Validators.pattern(/^\d+$/)],
      milestoneId: [''],
      moduleId: [''],
      taskStatusId: ['', Validators.required],
      shortDescription: ['', Validators.required],
      longDescription: ['', Validators.required],
      leadComment: ['', Validators.required],
      developerComments: [''],
    });
  }
  getProject() {
    debugger;
    this.timesheetService.getproject().subscribe(result =>{
      this.projectSortList = result;
      this.filterprojectSortList = this.projectSortList.slice();
    });
  }


  getTaskstatus() {
    this.taskservice.GetTaskstatus().subscribe(result => {
      this.taskstatuslist = result;
      this.filtertaskstatuslist = this.taskstatuslist.slice();
    })
  }

  sortingChange(event) {
    debugger;
    this.proID = this.form.value.projectId;
    this.getEmployeesbyproject(this.proID);
    this.getMilestone(this.proID);
    this.getModule(this.proID);
  }
  getEmployeesbyproject(id: number) {
    this.mappingservice.GetLookupById(11, id).subscribe(result => {
      this.mappedEmployeeList = result;
      this.filtermappedEmployeeList = this.mappedEmployeeList.slice();
    });
  }

  getModule(id: number) {
    this.taskservice.GetModule(id).subscribe(result => {
      this.modulelist = result;
      this.filtermodulelist = this.modulelist.slice();
    });

  }
  getMilestone(id: number) {
    debugger
    this.taskservice.GetMilestone(id).subscribe(result => {
      this.milestonelist = result;
      this.filtermilestonelist = this.milestonelist.slice();
    })
    debugger
  }

  onSubmit() {
    debugger;
    if (this.form.valid) {
      var data = this.form.value;

      data.Id = this.id;
      data.completedHours = this.form.value.completedHours?this.form.value.completedHours:null;
      data.milestoneId = this.form.value.milestoneId? this.form.value.milestoneId : null;
      data.moduleId = this.form.value.moduleId ? this.form.value.moduleId : null;
      data.developerComments = this.form.value.developerComments ? this.form.value.developerComments : null;

      this.taskservice.save(data).subscribe((res) => {
        console.log(res, 'savvvv');
        debugger
        if (res.isSuccess) {
          debugger
          if (this.id == 0) {
            this.alertService.success( "Task details " + "saved successfully.");
          } else {
            this.alertService.success("Task details " + "Updated successfully.");

          }
          debugger
          this.navigationService.gotoTaskgrid();
        }
        else {
          this.alertService.error(res.failures[0])
        }
      })
    }
    else {
      debugger
      this.validateFormControl()
    }
  }

  validateFormControl() {
    debugger
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true
        });
      }
    })
  }

    onClear() {
      this.form.reset();
    }

    onCancel() {
      this._location.back();
    }

    updateEndDate(event: any) {
      if (event) {
        this.startDate = new Date(event);
        this.endDate = new Date(this.startDate);
        this.endDate.setDate(this.endDate.getDate() + 30);
        if (this.endDate > this.today) {
          this.maxEndDate = this.today;
          this.minEndDate = this.startDate;
        }
        else {
          this.minEndDate = this.startDate;
          this.maxEndDate = this.endDate;
        }
        this.form.controls['endDate'].setValue('');
        //this.form.controls['endDate'].clearValidators();
      }
    }

    GetTaskType() {
      debugger;
      this.timesheetService.getLookup(13, true).subscribe(result => {
        const keysToGroupOne: number[] = [16, 21, 22];
        debugger;
        this.Leavetasklist = [];
        this.Normaltasklist = [];
        result.forEach(item => {
          if (keysToGroupOne.includes(item.key)) {
            this.Leavetasklist.push(item);
          } else {
            this.Normaltasklist.push(item);
          }
        });
        this.projecttypelist = [];
        this.projecttypelist = this.Normaltasklist;
        console.log("task type", result);
        this.filterprojecttypelist = this.projecttypelist;
        // if(this.actionInfo==11 || this.id>0){
        //   this.projecttypelist=[];
        //   this.projecttypelist = result;
        //   this.filterprojecttypelist = this.projecttypelist;
        // }
      });
    }

    GetTaskByID(refresh: boolean) {
      if (this.id > 0) {
        this.taskservice.GetTaskById(this.id).subscribe(result => {
      debugger;
          this.data = result;
          console.log("get result ",this.data);
          // this.filtertechtype = this.data.technologyType;
          // this.getProject();
          // this.GetTaskType();
          // this.getTaskstatus();
          this.proID = this.data.projectId;          ;
          this.getEmployeesbyproject(this.proID);
          this.getMilestone(this.proID);
          this.getModule(this.proID);
          if (this.data) {
            this.form.patchValue(this.data);
          }
        });
        //this.isReadOnly = true;
      }
    }
  }
