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
    this.router.navigate(['/dashboard/' + id, actionInfo]);
  }

  goToproject(id: number, actionInfo: number) {
    debugger;
    this.router.navigate(['/projectdetails/' + id, actionInfo]);
  }

  goTovillageuserEdit(VillagePanchayatId: number, userId: number, actionInfo: number) {
    this.router.navigate(['/villageuserdetail-edit/' + VillagePanchayatId + '/' + userId + '/' + actionInfo]);
  }
  goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  goToUnAuthorized() {
    this.router.navigate(['/unauthorized']);
  }

  goTOMiPage() {
    this.router.navigate(['/ribbion']);
  }

  goTOMiDashboard() {
    this.router.navigate(['/minewdashboard']);
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

  goToDistrict(id: number, actionInfo: number) {
    this.router.navigate(['/district/' + id, actionInfo]);
  }

  goToBlock(id: number, actionInfo: number) {
    this.router.navigate(['/block/' + id, actionInfo]);
  }

  goToSector(id: number, actionInfo: number) {
    this.router.navigate(['/sector/' + id, actionInfo]);
  }

  goToAwc(id: number, actionInfo: number) {
    this.router.navigate(['/awc/' + id, actionInfo]);
  }

  goToAwcPage() {
    this.router.navigate(['/awc/']);
  }


}


