import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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

}


