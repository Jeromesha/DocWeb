import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { result } from 'lodash';
import { MappingServices } from 'src/app/services/mapping.service';
import { TaskService } from 'src/app/services/task.service';
import { TimeSheetService } from 'src/app/services/timesheet.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  id = 0;
  actionInfo = 0;
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
  alertService: any;

  constructor(
    private formBuilder: FormBuilder,
    route: ActivatedRoute,
    public dialog: MatDialog,
    private mappingservice: MappingServices,
    private timesheetService: TimeSheetService,
    private taskservice: TaskService
  ) { }

  ngOnInit(): void {
    this.initializeValidators();
    this.getProject();
    this.GetTaskType();
    this.getTaskstatus();
  }

  initializeValidators() {
    this.form = this.formBuilder.group({
      projectId: ['', Validators.required],
      AssignedTo: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      priority: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      taskTypeId: ['', Validators.required],
      EstimatedHours: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      CompletedHours: ['', Validators.pattern(/^\d+$/)],
      milestoneId: [''],
      moduleId: [''],
      taskstatusId: ['', Validators.required],
      shortdescription: ['', Validators.required],
      longdescription: ['', Validators.required],
      LeadComment: ['', Validators.required],
      DeveloperComments: [''],
    });
  }
  getProject() {
    debugger;
    this.mappingservice.GetLookup(1).subscribe(result => {
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
      data.CompletedHours = this.form.value.CompletedHours?this.form.value.CompletedHours:null;
      data.milestoneId = this.form.value.milestoneId? this.form.value.milestoneId : null;
      data.moduleId = this.form.value.moduleId ? this.form.value.moduleId : null;
      data.DeveloperComments = this.form.value.DeveloperComments ? this.form.value.DeveloperComments : null;

      this.taskservice.save(data).subscribe((res) => {
        console.log(res, 'savvvv');
        if (res.isSuccess) {
          if (this.id == 0) {
            this.alertService.success(data.firstName + ' ' + data.lastName + "'s details " + "saved successfully.");
          } else {
            this.alertService.success(data.firstName + ' ' + data.lastName + "'s details " + "Updated successfully.");

          }
          //this.navigationService.gotoEmployee();
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

    onCancel() {
      this.form.reset();
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

  }
