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
import { UserSessionService } from 'src/app/services/usersession.service';

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
  form:FormGroup;
  data = [];
  dataSource = new MatTableDataSource(this.data);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("searchInput", { static: true }) searchInput: ElementRef;
  displayedColumns: any[];
  resultArray: any[];
  expandedElement: any;
  constructor(
    private formBuilder: FormBuilder,
    private navigationService: NavigationService,
    public translate: TranslateService,
    private alertService: AlertService,
    private excelService: ExcelService,
    private userSessionService: UserSessionService
  ) { }

  ngOnInit(): void {
    this.initializeValidators();
    this.displayedColumns = [
      "action",
      "scheduleName",
      "periodValue",
      "assignedDate",
      "targetDate",
      "reminderDate",
    ];
    this.gettaskGriddata();
  }
  initializeValidators() {
    this.form = this.formBuilder.group({
    });
  }
  ModifyKraTaskstatus(dataFieldId: any, actioninfo: any) {
    // dataField.id, actioninfo
    this.navigationService.gotoKraStatusModify(0,actioninfo);
  }
  refresh(){

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  gettaskGriddata() {
    // this.taskservice.GetAssignTaskList(this.getApiName()).subscribe(result => {
      this.resultArray = [];
      // if (result && result.value) {
      //   this.resultArray = result.value;
      // }

    //   this.resultArray.forEach(result => {
    //     result.periodicTaskStatusViewModel.sort((a, b) => new Date(b.statusDate).getTime() - new Date(a.statusDate).getTime());
    // });


    this.resultArray=[{
      scheduleName:'Test ',
      periodValue:'Weekly',
      assignedDate:'2024-5-22',
      targetDate:'2024-5-26',
      reminderDate:'2024-5-23',
      id:1,
      periodicTaskStatusViewModel:[
        {
          task:'test model',
          ownerName:'Test',
          secondaryOwners:'Test 2',
          Executor:'test 3'
        }
      ]
    }]
    
      this.dataSource = new MatTableDataSource(this.resultArray);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.data = this.resultArray;

    // })
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

}
