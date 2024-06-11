import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Injectable()

export class NavigationService {
  constructor(private router: Router) {
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
  goToTimeSheet(id: number, actionInfo: number) {
    debugger;
    this.router.navigate(['/timesheet/' + id, actionInfo]);
  }


  //my code 
  goToTimeSheets(date: Date, actionInfo: number) {
    debugger;
    const formattedDate = moment(date).format('YYYY-MM-DD');
    this.router.navigate(['/timesheet/' + formattedDate, actionInfo]);
  }

  gotoTask(id: any, actionInfo: any) {
    debugger;
    this.router.navigate(['/task/' + id, actionInfo])
  }

  gotoTaskAssign(id: any, actionInfo: any) {
    this.router.navigate(['/assigntask/' + id, actionInfo])
  }

  goToproject(id: number, actionInfo: number) {
    debugger;
    this.router.navigate(['/projectdetails/' + id, actionInfo]);
  }

  goToMapping(id: any, actionInfo: number) {
    debugger;
    this.router.navigate(['/mappingdetails/' + id, actionInfo]);
  }

  goToemployeeview(id: any, actionInfo: number) {
    debugger;
    this.router.navigate(['/weeklytimesheetaprove/' + id, actionInfo]);
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  goToUnAuthorized() {
    this.router.navigate(['/unauthorized']);
  }

  goToSessionTimedOut() {
    this.router.navigate(['/sessiontimedout']);
  }

  isOnLoginScreen(): boolean {
    return this.router.url === '/login';
  }

  goToUser(id: number, actionInfo: number) {
    this.router.navigate(['/users/' + id, actionInfo]);
  }

  goToProfile(id: number, actionInfo: number) {
    this.router.navigate(['/profile/' + id, actionInfo]);
  }
  gotoEmployeeDetails(id: number, actionInfo: number) {
    this.router.navigate(['/employeedetails/' + id, actionInfo])
  }
  gotoEmployee() {
    this.router.navigate(['/employeedetails/'])
  }
  gotoTaskgrid() {
    debugger
    this.router.navigate(['/task/'])
  }
  gotoExcelUpload() {
    this.router.navigate(['/upload'])

  }
  gotodesignation() {
    this.router.navigate(['/designation'])

  }

  gotoAssignTaskgrid() {
    this.router.navigate(['/assigntask/'])
  }

  gotoKraAttach(scheduleId: any,taskId:any, actionInfo: any) {
    debugger
    this.router.navigate(['/attachTask/' + scheduleId +'/'+taskId, actionInfo])
  }
  gotoScheduleAdd(id: any, actionInfo: any) {
    this.router.navigate(['/scheduler/' + id, actionInfo])
  }

  gotoKraStatusModify(id: any, actionInfo: any,isApprovelOrStatus:any) {
    this.router.navigate(['/taskStatus/' + id +'/'+ isApprovelOrStatus, actionInfo])
  }

  gotoKraTaskAdd(id: any, actionInfo: any) {
    this.router.navigate(['/kraTask/' + id, actionInfo])
  }
  gotoPeriodicTaskAdd(id: any, actionInfo: any) {
    this.router.navigate(['/periodicTask/' + id, actionInfo])
  }

}


