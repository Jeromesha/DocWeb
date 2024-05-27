import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/services/alert.service';
import { ExcelService } from 'src/app/services/excel.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { TaskService } from 'src/app/services/task.service';
import { UserSessionService } from 'src/app/services/usersession.service';
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import swal from 'sweetalert2';
import * as _ from 'lodash';
@Component({
  selector: 'app-kra-task',
  templateUrl: './kra-task.component.html',
  styleUrls: ['./kra-task.component.scss']
})
export class KraTaskComponent implements OnInit {
  routeParams: any;
  id: number;
  actionInfo: any;
  form: FormGroup;
  matData: any = [];
  dataSource = new MatTableDataSource(this.matData);
  displayedColumns: string[] = [
    'designationgrid',
    'descriptiongrid'
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  addButton: string;
  roleId: number;
  submitbtn: string;
  goalcodelist: any[];
  goalcodelistFilterList: any[];
  Kracategorylist: any[];
  KracategorylistFilterList: any[];
  actioncodelist: any[];
  actioncodelistFilterList: any;
  designationlist: any[];
  designationlistFilterList: any;
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
    private taskservice: TaskService,
  ) {
    this.routeParams = route.snapshot.params;
    this.id = parseInt(this.routeParams.id);
    this.actionInfo = this.routeParams.actionInfo;
    this.roleId = this.userSessionService.roleId();
  }

  ngOnInit(): void {
    this.initializeValidators();
    if (this.id === 0) {
      this.submitbtn = 'Save';
    } else {
      this.submitbtn = 'Update';
    }
    if (this.actionInfo == 0) {
      this.addButton = "Add";
    }
    else {
      this.addButton = "Update"
    }
  }

  initializeValidators() {
    this.form = this.formBuilder.group({
      id: [0],
      goalcode: ['', Validators.required],
      kracategory: ['', Validators.required],
      actioncode: ['', Validators.required],
      kraName: ['', Validators.required],
      designation:['',Validators.required],
      description:['',Validators.required]
    });
    this.getGolecode();
    this.getKracategory();
    this.getactioncode();
    this.getdesignation();
  }

  getGolecode() {
    // this.taskService.employeeDetailsByRoleId(1).subscribe(result => {
    this.goalcodelist = [];
    // if (result && result.value) {
    // this.employeeList = result.value;

    this.goalcodelist = [
      {
        key: 1,
        goalcode: "G01"
      },
      {
        key: 2,
        goalcode: "G02"
      },
      {
        key: 3,
        goalcode: "G03"
      }
    ]
    this.goalcodelistFilterList = this.goalcodelist?.slice();
    // }
    // });
  }

  getKracategory() {
    this.Kracategorylist = [
      {
        key: 1,
        kracategory: "Brand Value "
      },
      {
        key: 2,
        kracategory: "Brand Value "
      },
      {
        key: 3,
        kracategory: "Brand Value "
      }
    ]
    this.KracategorylistFilterList = this.Kracategorylist?.slice();
  }

  getactioncode() {

    this.actioncodelist = [];
    this.actioncodelist = [
      {
        key: 1,
        actioncode: "A01"
      },
      {
        key: 2,
        actioncode: "A02"
      },
      {
        key: 3,
        actioncode: "A03"
      }
    ]
    this.actioncodelistFilterList = this.actioncodelist?.slice();
  }
  getdesignation() {

    this.designationlist = [];
    this.designationlist = [
      {
        key: 1,
        designation: "Technical Head"
      },
      {
        key: 2,
        designation: "Technical Architect"
      },
      {
        key: 3,
        designation: "Sales Head"
      }
    ]
    this.designationlistFilterList = this.designationlist?.slice();
  }
  clearData(){
    this.form.controls['designation'].setValue('');
    this.form.controls['description'].setValue('');
    this.form.controls['designation'].clearValidators();
    this.form.get('designation').updateValueAndValidity();
    this.form.controls['description'].clearValidators();
    this.form.get('description').updateValueAndValidity();
  }

  addData(){
    debugger
    let desig =  _.find(this.designationlist, ['key', this.form.value.designation])?.designation;
    
    this.matData.push({ designationgrid:desig , descriptiongrid: this.form.value.description });
    this.dataSource = new MatTableDataSource(this.matData);
    this.dataSource.paginator = this.paginator;
    this.clearData();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  editData(datafield,index){

  }
  delete(rowIndex: any) {
    const msgstring = this.translate.instant('Youwanttodelete');
    this.deleteMenu((msgstring + ' ' + '?'), rowIndex);
  }

  deleteMenu(message: string, rowIndex: any) {
    const title = this.translate.instant('DeleteConfirmation');
    const Yes = this.translate.instant('Yes');
    const No = this.translate.instant('No');
    swal.fire(
      {
        title,
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: Yes,
        cancelButtonText: No,
      })
      .then(res => {
        if (res.value) {
          if (this.matData.length > 0) {
            this.matData.forEach((index) => {
              if (index.mileStoneValue == this.matData[rowIndex].mileStoneValue) {
                this.matData.splice(rowIndex, 1);
                this.dataSource = new MatTableDataSource(this.matData);
                this.dataSource.paginator = this.paginator;
              }
            })
            if (this.matData.length == 0) {
              this.addButton = "Add";
            }
          }
        }
      });
  }
  onCancel() {
    this._location.back();
  }
  saveGrid(){
    this.alertService.success("KRA Task added successfully");
    this._location.back();
  }
}
