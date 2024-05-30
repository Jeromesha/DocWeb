import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/services/alert.service';
import { ExcelService } from 'src/app/services/excel.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { TaskService } from 'src/app/services/task.service';
import { UserSessionService } from 'src/app/services/usersession.service';
import { Location } from '@angular/common';
import * as moment from 'moment';
@Component({
  selector: 'app-schedular',
  templateUrl: './schedular.component.html',
  styleUrls: ['./schedular.component.scss']
})
export class SchedularComponent implements OnInit {
  routeParams: any;
  id: number;
  actionInfo: any;
  form: FormGroup;
  periodList: any[];
  filterperiodList: any;
  maxtargetdate: Date;
  startDate: Date;
  endDate: Date;
  today: any;
  maxEndDate: any;
  minEndDate: any;
  daysDifference: number;
  Date: Date;
  submitbtn:string;
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
  ) {
    this.routeParams = route.snapshot.params;
    this.id = parseInt(this.routeParams.id);
    this.actionInfo = this.routeParams.actionInfo;
  }

  ngOnInit(): void {
    this.initializeValidators();
    this.getPeriod();
    this.Date = new Date;
    if (this.id === 0) {
      this.form.controls['assignedDate'].setValue(this.Date);
      this.minEndDate = moment(this.Date).format("YYYY-MM-DD");
      this.minEndDate = moment(this.minEndDate).subtract(0, 'minute').toDate();
      this.submitbtn ='Add';
    }
    else{
      this.submitbtn = 'Update';
    }
  }

  initializeValidators() {
    this.form = this.formBuilder.group({
      id: [0],
      taskName: ['', Validators.required],
      period: ['', Validators.required],
      assignedDate: ['', Validators.required],
      targetDate: ['', Validators.required],
      reminderCount: [''],
      reminderDate: [''],
      isRepeat:['']
    });
    this.form.get('targetDate').valueChanges.subscribe(() => {
      this.updateReminderDate();
    });

    this.form.get('reminderCount').valueChanges.subscribe(() => {
      this.updateReminderDate();
    });
  }
  getPeriod() {
    this.taskService.GetPeriod().subscribe(result => {
      this.periodList = [];
      this.periodList = result;
      this.filterperiodList = this.periodList?.slice();
    });
  }
  updateMaxtargetdate() {
    const selectedPeriod = this.periodList.find(item => item.key === this.form.value.period);
    if (selectedPeriod) {
      const currentDate = new Date(); // Current date
      switch (selectedPeriod.value) {
        case 'Daily':
          this.maxtargetdate = new Date(currentDate);
          this.maxtargetdate.setDate(currentDate.getDate() + 1);
          break;
        case 'Weekly':
          this.maxtargetdate = new Date(currentDate);
          this.maxtargetdate.setDate(currentDate.getDate() + 7);
          break;
        case 'BiMonthly':
          this.maxtargetdate = new Date(currentDate);
          this.maxtargetdate.setDate(currentDate.getDate() + 15);
          break;
        case 'HalfYearly':
          this.maxtargetdate = new Date(currentDate);
          this.maxtargetdate.setDate(currentDate.getDate() + 183);
          break;
        case 'Quarterly':
          this.maxtargetdate = new Date(currentDate);
          this.maxtargetdate.setDate(currentDate.getDate() + 92);
          break;
        case 'Monthly':
          this.maxtargetdate = new Date(currentDate);
          this.maxtargetdate.setDate(currentDate.getDate() + 31);
          break;
        case 'Yearly':
          this.maxtargetdate = new Date(currentDate);
          this.maxtargetdate.setDate(currentDate.getDate() + 365);
          break;
        default:
          this.maxtargetdate = new Date(currentDate);
          this.maxtargetdate.setDate(currentDate.getDate() + 365);
          break;
      }
    }
  }
  updateEndDate(event: any) {
    debugger
    if (event && typeof (event) === "string") {
      event = new Date(event);
    }
    if (event) {
      this.startDate = new Date(event);
      this.endDate = new Date(this.startDate);
      this.endDate.setDate(this.endDate.getDate() + 30);
      if (this.endDate > this.today) {
        this.maxEndDate = this.today;
        this.minEndDate = moment(this.startDate).format("YYYY-MM-DD");
        this.minEndDate = moment(this.minEndDate).subtract(0, 'minute').toDate()
        // this.minEndDate = this.startDate;
      }
      else {
        // this.minEndDate = this.startDate;
        this.minEndDate = moment(this.startDate).format("YYYY-MM-DD");
        this.minEndDate = moment(this.minEndDate).subtract(0, 'minute').toDate()
        this.maxEndDate = this.endDate;
      }
      this.form.controls['targetDate'].setValue('');
      //this.form.controls['endDate'].clearValidators();
    }
    this.form.controls['reminderDate'].setValue("");
  }
  
  calculateDaysDifference(event: any) {
    this.form.controls['reminderCount'].setValue(0);
    let assignedDate = this.form.value.assignedDate;
    if (assignedDate && event) {
      if (assignedDate && typeof (assignedDate) === "string") {
        assignedDate = new Date(assignedDate);
      }
      event = new Date(event);
      event.setHours(0, 0, 0, 0);
      assignedDate.setHours(0, 0, 0, 0);
      const startTime = event.getTime();
      const endTime = assignedDate.getTime();
      const difference = startTime - endTime;
      this.daysDifference = Math.ceil(difference / (1000 * 60 * 60 * 24));
    }

  }
  setCount() {
    if (this.form.value.reminderCount > this.daysDifference) {
      this.form.controls['reminderCount'].setValue(this.daysDifference);
    }
  }

  updateReminderDate() {
    const targetDate = this.form.get('targetDate').value;
    const reminderCount = this.form.get('reminderCount').value;

    if (targetDate && reminderCount) {
      const reminderDate = new Date(targetDate);
      reminderDate.setDate(reminderDate.getDate() - reminderCount);
      this.form.get('reminderDate').setValue(reminderDate);
    }
    if (!reminderCount || reminderCount === 0) {
      this.form.get('reminderDate').setValue("");
    }
  }
  onCancel(){
    this._location.back();
  }
  onClear(){
    this.form.reset();
  }
  onSubmit(){
    this._location.back();
    this.alertService.success("Schedular added Successfully")
  }
}
