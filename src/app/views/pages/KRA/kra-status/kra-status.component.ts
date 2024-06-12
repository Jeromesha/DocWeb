import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/services/alert.service';
import { ExcelService } from 'src/app/services/excel.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { PerodicTaskService } from 'src/app/services/perodicTask.Service';
import { UserSessionService } from 'src/app/services/usersession.service';
import { RoleType } from 'src/enum/roletype';

@Component({
  selector: 'app-kra-status',
  templateUrl: './kra-status.component.html',
  styleUrls: ['./kra-status.component.scss'],
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", minHeight: "0", visibility: "hidden" })
      ),
      state("expanded", style({ height: "*", visibility: "visible" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class KraStatusComponent implements OnInit {
  form: FormGroup;
  data: any[] = [];
  dataSource = new MatTableDataSource(this.data);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("searchInput", { static: true }) searchInput: ElementRef;
  displayedColumns: any[];
  resultArray: any[] = [];
  expandedElement: any;
  roleId: any;
  public RoleEnumType = RoleType;
  selectedOption: string;
  userId: number;
  pagetitle: string;
  isApprovelOrStatus: number;
  //status =1, approval=2
  constructor(
    private formBuilder: FormBuilder,
    private navigationService: NavigationService,
    public translate: TranslateService,
    private alertService: AlertService,
    private excelService: ExcelService,
    private userSessionService: UserSessionService,
    private perodicTaskService: PerodicTaskService
  ) {
    this.roleId = this.userSessionService.roleId();
    this.userId = this.userSessionService.userId();
  }

  ngOnInit(): void {
    this.initializeValidators();
    this.selectedOption = 'status';
    this.isStatus();
  }

  initializeValidators() {
    this.form = this.formBuilder.group({
    });
  }

  ModifyKraTaskstatus(dataFieldId: any, actioninfo: any,assignedDate:any) {
    this.navigationService.gotoKraStatusModify(dataFieldId, actioninfo,this.isApprovelOrStatus,assignedDate);
  }

  isStatus() {
    this.displayedColumns = [
      "action",
      "manager",
      "task",
      "project",
      "periodValue",
      "assignedDate",
      "targetDate",
      "reminderDate",
    ];
    this.pagetitle = "Task Status"
    this.gettaskGriddata();
    this.isApprovelOrStatus = 1;
  }

  isApproval() {
    this.displayedColumns = [
      "action",
      "employee",
      "task",
      "project",
      "periodValue",
      "assignedDate",
      "targetDate",
      "reminderDate",
    ];
    this.pagetitle = "Task Approval"
    this.getApprovalTaskGriddata();
    this.isApprovelOrStatus = 2;
  }

  refresh() {
    this.gettaskGriddata();
    this.selectedOption = 'status';
    this.isStatus();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  gettaskGriddata() {
    this.perodicTaskService.getExecutorTaskGridList().subscribe(result => {
      this.resultArray = [];
      if (result && result.value) {
        this.resultArray = result.value;
      }
      if(this.resultArray.length==0){
        this.selectedOption = 'approval';
        this.isApproval();
      }
      this.dataSource = new MatTableDataSource(this.resultArray);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.data = this.resultArray;
    })
  }

  getApprovalTaskGriddata() {
    this.perodicTaskService.getApprovalTaskGridList(this.userId).subscribe(result => {
      this.resultArray = [];
      if (result && result.value) {
        this.resultArray = result.value;
      }
      if(this.resultArray.length==0){
        this.selectedOption = 'status';
        this.isStatus();
      }
      this.dataSource = new MatTableDataSource(this.resultArray);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.data = this.resultArray;
    })
  }

  expandUp(dataField) {
    debugger;
    this.expandedElement = {};
    this.expandedElement = dataField;
  }

  expandDown(dataField) {
    debugger;
    this.expandedElement = {};
    this.expandedElement = dataField;
  }

  onToggleChange(event: any) {
    console.log('Selected option:', this.selectedOption);
    if (this.selectedOption == 'approval') {
      this.isApproval();
    }
    else if (this.selectedOption == 'status') {
      this.isStatus();
    }
  }



}
