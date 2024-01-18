import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/services/alert.service';
import { EmployeedetailsService } from 'src/app/services/employeedetails.service';
import { ExcelService } from 'src/app/services/excel.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {


  loading: boolean;
  data = [];
  dataSource = new MatTableDataSource(this.data);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("searchInput", { static: true }) searchInput: ElementRef;

  displayedColumns: string[] = [
    "action",
    "project",
    "firstName",
    "shortdescription",
    "status",
    // "joiningDate",
    // "designation"
  ];
  excelColumns: string[];
  constructor(private navigationService: NavigationService,
    public translate: TranslateService,
    private alertService: AlertService,
    private excelService: ExcelService,

  ) { }
  ngOnInit(): void {
  }

  goToAction(arg0: number,arg1: number) {
    throw new Error('Method not implemented.');
    }
    refresh() {
    throw new Error('Method not implemented.');
    }
    onExportExcel() {
    throw new Error('Method not implemented.');
    }
    applyFilter($event: KeyboardEvent) {
    throw new Error('Method not implemented.');
    }
    onDelete($event: MouseEvent,arg1: any,arg2: any) {
    throw new Error('Method not implemented.');
    }
}
