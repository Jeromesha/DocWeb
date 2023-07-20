import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DashboardService } from "src/app/services/dashboard.service";
import { Location } from '@angular/common';

@Component({
  selector: "app-viewregistrationdetails",
  templateUrl: "./viewregistrationdetails.component.html",
  styleUrls: ["./viewregistrationdetails.component.scss"],
})
export class ViewregistrationdetailsComponent implements OnInit {
  routeParams: any;
  id: number;
  userId: number;
  actionInfo: any;
  registrationData: any;
  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private _location: Location
  ) {
    this.routeParams = route.snapshot.params;
    this.id = +this.routeParams.id;
    this.userId = +this.routeParams.userId;

    this.actionInfo = this.routeParams.actionInfo;
  }

  ngOnInit(): void {
    this.getregisterDataById();
  }
  getregisterDataById() {
    this.dashboardService
      .getRegistrationDataById(this.id, true)
      .subscribe((res) => {
        this.registrationData = res;
      });
  }
  refresh(){
    this.getregisterDataById();
  }
  onCancel(){
    this._location.back();
  }
  downloadReceipt(id:any) {
    let data = {
      "id": id,
      "reportType": 1,
      "downloadType": 1,
    }
        this.dashboardService.downloadReciept(data).subscribe(result => {
      debugger
      if (result) {
        const downloadLink = document.createElement('a');
        const fileName = "BookingRecipt.pdf";
        downloadLink.href = 'data:application/octet-stream;base64,' +result;
        downloadLink.download = fileName;
        downloadLink.click();
      }
    });  

  }
}
