import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { AlertService } from "src/app/services/alert.service";
import { TimeSheetService } from "src/app/services/timesheet.service";
import { UserSessionService } from "src/app/services/usersession.service";
import { Location } from "@angular/common";
import * as moment from "moment";
import { MatDialog } from "@angular/material/dialog";
import { EmployeedetailsService } from "src/app/services/employeedetails.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import Swal from "sweetalert2";
import * as _ from "lodash";

@Component({
  selector: "app-designation",
  templateUrl: "./designation.component.html",
  styleUrls: ["./designation.component.scss"],
})
export class DesignationComponent implements OnInit {
  routeParams: any;
  UserId: number;
  actionInfo: any;
  loading: boolean = false;
  ErrorTrue = false;
  DesignationType: any = "";
  Description: any = "";
  // @ViewChild('addButton') addButton: ElementRef;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("searchInput", { static: true }) searchInput: ElementRef;
  displayedColumns: string[] = ["action", "Designation","description"];
  designationList: any = [];

  dataSource = new MatTableDataSource(this.designationList);
  filterdesignationList: any[];
  constructor(
    private formBuilder: FormBuilder,
    route: ActivatedRoute,
    private alertService: AlertService,
    private userSessionService: UserSessionService,
    private timesheetService: TimeSheetService,
    private translate: TranslateService,
    private _location: Location,
    private empDetailsService: EmployeedetailsService
  ) {
    this.routeParams = route.snapshot.params;
    this.UserId = this.userSessionService.userId();

    this.actionInfo = this.routeParams.actionInfo;
  }

  ngOnInit(): void {
    this.designationLookup();
  }
  onCancel() {
    this._location.back();
  }
  designationLookup() {
    this.empDetailsService.getAllDesignationList(true).subscribe((res) => {
      this.designationList = [];
      this.designationList = res.value;
      this.designationList = _.orderBy(this.designationList, ['value'], ['desc']);
      this.dataSource = new MatTableDataSource(this.designationList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  submit() {
    this.ErrorTrue = true;
    if (this.DesignationType != "") {
      var payload = {
        name: this.DesignationType,
        description: this.Description,
      };
      this.empDetailsService.DesignationSave(payload).subscribe((res) => {
        if (res.isSuccess) {
          this.DesignationType = "";
          this.Description = "";
          this.ErrorTrue = false;
          this.alertService.success("Designation Added Successfully");
        } else {
          this.alertService.error("Try Again");
        }
      });
    } else {
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onDelete(dataField: any) {
    debugger;
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((willDelete) => {
      if (willDelete.value) {        
        this.timesheetService.deletedesig(dataField).subscribe((res) => {
          if (res.isSuccess) {
            Swal.fire("Deleted!", "Your Data has been deleted successfully");
            this.designationLookup();
            // this.dataSource.data = this.dataSource.data.filter(e => e.key != dataField.key);
          }
        });
      } else {
        Swal.fire("Cancelled", "Your Data is safe :)", "error");
      }
    });
  }
  clearData() {
    this.DesignationType = "";
    this.Description = "";
    this.ErrorTrue = false;
  }
}
