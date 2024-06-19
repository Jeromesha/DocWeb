import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { AlertService } from 'src/app/services/alert.service';
import { ExcelService } from 'src/app/services/excel.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { PerodicTaskService } from 'src/app/services/perodicTask.Service';
import { TaskService } from 'src/app/services/task.service';
import { UserSessionService } from 'src/app/services/usersession.service';

@Component({
  selector: 'app-kanban-task-details',
  templateUrl: './kanban-task-details.component.html',
  styleUrls: ['./kanban-task-details.component.scss']
})
export class KanbanTaskDetailsComponent implements OnInit {
  periodList: any[];
  taskStatusList: any;
  resultArray: any[];
  colors: string[];
  // colors: string[] = ['#3E65A6', '#71B03C', '#3E65A6', '#71B03C', '#3E65A6', '#71B03C'];

  isApprovelOrStatus: number;
  //status =1, approval=2 set based on event 
  todoTaskList: any[] = [];
  newTaskList: any[] = [];
  inprogressTaskList: any[] = [];
  completedTaskList: any[] = [];
  descopeTaskList: any[] = [];
  onholdTaskList: any[] = [];
  subCardarray: any[] = [];
  pagetitle: string;
  selectedOption: string;
  userId: number;

  @ViewChild('wrapRef1') wrapRef1!: ElementRef<HTMLDivElement>;
  @ViewChild('wrapRef2') wrapRef2!: ElementRef<HTMLDivElement>;

  constructor(
    private formBuilder: FormBuilder,
    private navigationService: NavigationService,
    public translate: TranslateService,
    public taskService: TaskService,
    private userSessionService: UserSessionService,
    private perodicTaskService: PerodicTaskService
  ) {
    this.userId = this.userSessionService.userId();
   }

  ngOnInit(): void {
    this.selectedOption = 'status';
    this.getTaskstatus();
    this.isStatus();

  }
  getTaskstatus() {
    debugger
    this.taskService.GetTaskstatus().subscribe(result => {
      this.taskStatusList = [];
      if (this.selectedOption == 'status') {
        result.push({ "key": 0, "value": "To-Do" });
      }
      this.taskStatusList = result.filter(item => item.key != 2).sort((a, b) => a.key - b.key);
      //if change in this list order, then need to change the order of the this.subcardarray
    })
  }
  getColor(index: number): string {
    return this.colors[index % this.colors.length];
  }
  ModifyKraTaskstatus(dataFieldId: any, actioninfo: any, assignedDate: any) {
    //status =1, approval=2
    this.navigationService.gotoKraStatusModify(dataFieldId, actioninfo, this.isApprovelOrStatus, assignedDate);
  }

  onToggleChange(event: any) {
    console.log('Selected option:', this.selectedOption);
    if (this.selectedOption == 'status') {
      this.isStatus();
    }
    else if (this.selectedOption == 'approval') {
      this.isApproval();
    }
  }

  refresh() {
    this.selectedOption = 'status';
    this.getTaskstatus();
    this.isStatus();
  }
  isStatus() {
    this.todoTaskList=[];
    this.newTaskList=[];
    this.inprogressTaskList=[];
    this.completedTaskList=[];
    this.descopeTaskList=[];
    this.onholdTaskList =[];
    this.getTaskstatus();
    this.gettaskGriddata();
    this.subCardarray = [
      this.todoTaskList,
      this.newTaskList,
      this.inprogressTaskList,
      this.completedTaskList,
      this.descopeTaskList,
      this.onholdTaskList
    ];
    this.pagetitle = "Task Status";
    this.isApprovelOrStatus = 1;
    this.colors = ['red', 'blue', 'orange', 'green', 'brown', 'purple'];
  }
  isApproval() {
    this.todoTaskList=[];
    this.newTaskList=[];
    this.inprogressTaskList=[];
    this.completedTaskList=[];
    this.descopeTaskList=[];
    this.onholdTaskList =[];
    this.getTaskstatus();
    this.gettaskGridApprovaldata();
    this.subCardarray = [
      this.newTaskList,
      this.inprogressTaskList,
      this.completedTaskList,
      this.descopeTaskList,
      this.onholdTaskList
    ];
    this.pagetitle = "Task Approval";
    this.isApprovelOrStatus = 2;
    this.colors = ['blue', 'orange', 'green', 'brown', 'purple']
  }
  gettaskGriddata() {
    debugger
    this.perodicTaskService.getExecutorTaskGridList().subscribe(result => {
      this.resultArray = [];
      if (result && result.value) {
        this.resultArray = result.value;
      }
      console.log(this.resultArray, 'restu array ')

      //if status is approved in all , the need to remove that onto the array 
      // need to talk about this 

      for (let i = 0; i < this.resultArray.length; i++) {

        const element = this.resultArray[i];
        var assignedDate = moment(element?.scheduleTMViewModel?.scheduleGridViewModel?.targetDate).format("YYYY-MM-DD");
        var today = moment(new Date()).format("YYYY-MM-DD");

        if (assignedDate == today) {
          this.todoTaskList.push(element);
          this.resultArray.splice(i, 1);
          i--;
        }
        else if (element?.scheduleTaskStatusViewModels?.length === 0) {
          this.newTaskList.push(element);
          this.resultArray.splice(i, 1);
          i--;
        }
        else if (element?.scheduleTaskStatusViewModels?.length > 0) {
          const maxIdElement = element?.scheduleTaskStatusViewModels?.reduce((max, current) => {
            return current.id > max.id ? current : max;
          }, element.scheduleTaskStatusViewModels[0]);

          if (maxIdElement?.taskStatusId == 3) {
            this.inprogressTaskList.push(element);
            this.resultArray.splice(i, 1);
            i--;
          }
          else if (maxIdElement?.taskStatusId == 4) {
            this.completedTaskList.push(element);
            this.resultArray.splice(i, 1);
            i--;
          }
          else if (maxIdElement?.taskStatusId == 5) {
            this.descopeTaskList.push(element);
            this.resultArray.splice(i, 1);
            i--;
          }
          else if (maxIdElement?.taskStatusId == 6) {
            this.onholdTaskList.push(element);
            this.resultArray.splice(i, 1);
            i--;
          }
        }
      }
    })
  }


  gettaskGridApprovaldata() {
    debugger
    this.perodicTaskService.getApprovalTaskGridList(this.userId).subscribe(result => {
      this.resultArray = [];
      if (result && result.value) {
        this.resultArray = result.value;
      }
      console.log(this.resultArray, 'restu array ')

      //if status is approved in all , the need to remove that onto the array 
      // need to talk about this 

      for (let i = 0; i < this.resultArray.length; i++) {

        const element = this.resultArray[i];

        if (element?.scheduleTaskStatusViewModels?.length === 0) {
          this.newTaskList.push(element);
          this.resultArray.splice(i, 1);
          i--;
        }
        else if (element?.scheduleTaskStatusViewModels?.length > 0) {
          const maxIdElement = element?.scheduleTaskStatusViewModels?.reduce((max, current) => {
            return current.id > max.id ? current : max;
          }, element.scheduleTaskStatusViewModels[0]);

          if (maxIdElement?.taskStatusId == 3) {
            this.inprogressTaskList.push(element);
            this.resultArray.splice(i, 1);
            i--;
          }
          else if (maxIdElement?.taskStatusId == 4) {
            this.completedTaskList.push(element);
            this.resultArray.splice(i, 1);
            i--;
          }
          else if (maxIdElement?.taskStatusId == 5) {
            this.descopeTaskList.push(element);
            this.resultArray.splice(i, 1);
            i--;
          }
          else if (maxIdElement?.taskStatusId == 6) {
            this.onholdTaskList.push(element);
            this.resultArray.splice(i, 1);
            i--;
          }
        }
      }
    })
  }
  getSubcardArray(index: number): any[] {
    return this.subCardarray[index % this.subCardarray.length];
  }

  handleScroll(event: Event): void {
    const targetDiv = event.target as HTMLDivElement;

    if (targetDiv === this.wrapRef1.nativeElement && this.wrapRef2) {
      this.wrapRef2.nativeElement.scrollLeft = targetDiv.scrollLeft;
    } else if (targetDiv === this.wrapRef2.nativeElement && this.wrapRef1) {
      this.wrapRef1.nativeElement.scrollLeft = targetDiv.scrollLeft;
    }
  }
}
