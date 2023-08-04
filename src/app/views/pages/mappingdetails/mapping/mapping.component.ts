import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import * as _ from 'lodash';
import { AlertService } from 'src/app/services/alert.service';
import { MappingServices } from 'src/app/services/mapping.service';
import { UserSessionService } from 'src/app/services/usersession.service';

@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.scss']
})
export class MappingComponent implements OnInit {

  form: FormGroup;
  routeParams: any;
  pattern: any;
  emailpattern: any;
  projectSortList: any[] = [];
  employeeSortList: any[] = [];
  showdescription: boolean = false;
  submitbtn: string = 'save';
  formEditMode: boolean = true;
  actionInfo: number = 0;
  id: number = 0;
  mappedEmployeeList: any = [];
  filtermappedEmployeeList: any = [];
  filterunmappedEmployeeList: any = [];
  unmappedEmployeeList: any = [];
  isSelectAllTransfer: boolean;
  select = [];
  isSelectAllRemoveTransfer: boolean;
  totalAmount: number;
  selected = [];
  viewdata: any;
  filterprojectSortList: any[];
  searchText2: string = "";
  searchText1: string = "";

  constructor(private formBuilder: FormBuilder,
    private _location: Location,
    route: ActivatedRoute,
    public dialog: MatDialog,
    private alertService: AlertService,
    private userSessionService: UserSessionService,
    private mappingservice: MappingServices,
    private translate: TranslateService) {
    this.routeParams = route.snapshot.params;
    this.id = JSON.parse(this.routeParams.id);
    this.id = +this.routeParams.id;
    //this.id = 0;

    this.actionInfo = this.routeParams.actionInfo
    //this.actionInfo = 0;
    if (this.id === 0) {
      this.submitbtn = 'Save';
    } else {
      this.submitbtn = 'Update';
    }
    if (this.actionInfo == 1) {
      this.formEditMode = false;
    }
    this.pattern = /^[^\s]+(\s+[^\s]+)*$/;
    this.emailpattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }

  ngOnInit(): void {

    this.initializeValidators();
    this.getProject();
    this.getEmployee();
    this.getEditdata();
    this.getViewdata()
    console.log('Ajith');

  }

  initializeValidators() {
    this.form = this.formBuilder.group({
      projectId: [0, Validators.required],
      firstListDatas: [],
      secondListDatas: [],
      unmappedEmployeeIds: [0],
      mappedEmployeeIds: []
    });
  }

  getEditdata() {
    if (this.id != 0) {
      this.formEditMode = true;
      this.form.controls['projectId'].setValue(this.id);
      this.getMappedEmployees(this.id);
      this.getUnmappedEmployees(this.id);
    }
  }

  sortingChange(event) {
    debugger;
    if (event.value != null) {
      this.showdescription = true;
    }
    this.getMappedEmployees(event.value);
    this.getUnmappedEmployees(event.value);
  }
  // onSubmit() {
  //   const projectemployeeData =
  //   {
  //     "isDeleted": false,
  //     "projectEmployeeViewModel": {
  //       "id": 0,
  //       "projectId": this.form.value.projectId,
  //       "employeeId": this.form.value.employeeId,
  //       "projectName": _.find(this.projectSortList, ['key', (this.form.value.projectId)])?.value,
  //       "employeeName": _.find(this.employeeSortList, ['key', (this.form.value.employeeId)])?.value
  //     }
  //   }
  //   if (this.form.valid) {
  //     
  //     this.mappingservice.MapProjectEmployee(projectemployeeData).subscribe(result => {
  //       const msg1 = this.translate.instant('Savedsuccessfully');
  //       const msg2 = this.translate.instant('Updatedsuccessfully');
  //       const msg3 = this.translate.instant('Region');
  //       const sucessmsg = msg1;
  //       this.alertService.result(result, true, msg3 + ' ' + sucessmsg);
  //     });
  //   } else {
  //     this.validateFormControl();
  //   }
  // }

  onSubmit() {
    const projectemployeeData =
    {
      "projectId": this.form.value.projectId,
      "unmappedEmployees": this.filterunmappedEmployeeList.map(pair => pair.key),
      "mappedEmployees": this.filtermappedEmployeeList.map(pair => pair.key)
    }
    debugger;
    console.log(projectemployeeData);

    if (this.form.valid) {
      debugger
      this.mappingservice.savemapping(projectemployeeData).subscribe(result => {
        if (result && result.isSuccess) {
          this._location.back();
          this.alertService.success(this.id == 0 ? "Time Sheet Saved Successfully" : "Time Sheet Updated Successfully");
        }

      });
    } else {
      this.validateFormControl();
    }
  }

  validateFormControl() {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true
        });
      }
    })
  }

  getViewdata() {

    if (this.actionInfo == 1) {
      this.mappingservice.getById(this.id, true).subscribe(result => {
        this.viewdata = result;
        console.log(">>>?", this.viewdata);
      });
    }
  }


  getEmployee() {
    this.mappingservice.GetLookup(2).subscribe(result => {
      // let result = [{
      //   id: 1,
      //   value: "test"
      // }, {
      //   id: 2,
      //   value: "test"
      // }]
      this.employeeSortList = result;


    });
  }

  getMappedEmployees(id: number) {
    this.mappingservice.GetLookupById(11, id).subscribe(result => {
      this.mappedEmployeeList = result;
      this.filtermappedEmployeeList = this.mappedEmployeeList.slice();
    });
  }
  getUnmappedEmployees(id: number) {
    this.mappingservice.GetLookupById(12, id).subscribe(result => {
      this.unmappedEmployeeList = result;
      this.filterunmappedEmployeeList = this.unmappedEmployeeList.slice();
    });
  }
  applyFilter() {
    debugger;
    if (this.searchText1 != "") {
      this.filterunmappedEmployeeList = this.unmappedEmployeeList.filter((item) =>
        item.value.toLowerCase().includes(this.searchText1.toLowerCase())
      );
    }
    if (this.searchText2 != "") {
      this.filtermappedEmployeeList = this.mappedEmployeeList.filter((item) =>
        item.value.toLowerCase().includes(this.searchText2.toLowerCase())
      );
    }
  }
  getProject() {
    debugger
    this.mappingservice.GetLookup(1).subscribe(result => {
      this.projectSortList = result;
      this.filterprojectSortList = this.projectSortList.slice();
    });
  }
  onCancel() {
    this._location.back();
  }




  moveToTransfer() {
    if (this.filtermappedEmployeeList.length > 0) {
      if (this.filterunmappedEmployeeList.length > 0) {
        let data = this.filterunmappedEmployeeList.filter((item) => item.isSelect == true);
        if (data.length > 0) {
          data.forEach(element => {
            element.disabled = false
          });
          debugger
          // this.mappedEmployeeList.forEach((e) => { e.disabled = e.isSelect == true ? false : true; });
          this.filtermappedEmployeeList = data.concat(this.filtermappedEmployeeList);

          this.filterunmappedEmployeeList = this.filterunmappedEmployeeList.filter((item) => item.isSelect !== true);
          this.isSelectAllTransfer = false;
          this.filtermappedEmployeeList.forEach((e) => { e.isSelect = false; });
        } else {
          let msg = "Please select atleast one data to transfer";
          this.alertService.info(msg);
        }
        //this.mappedEmployeeList = this.mappedEmployeeList.concat(data);
      } else {
        this.select = this.filterunmappedEmployeeList;
      }
    } else {
      let msg = "Please select the employee";
      this.alertService.info(msg);
    }
  }

  removedToTransfer() {
    debugger
    if (this.filterunmappedEmployeeList.length > 0) {
      if (this.filtermappedEmployeeList.length > 0) {
        let data = this.filtermappedEmployeeList.filter((item) => item.isSelect == true);
        if (data.length > 0) {
          data.forEach(element => {
            element.disabled = false
          });
          debugger
          // this.mappedEmployeeList.forEach((e) => { e.disabled = e.isSelect == true ? false : true; });
          this.filterunmappedEmployeeList = data.concat(this.filterunmappedEmployeeList);

          this.filtermappedEmployeeList = this.filtermappedEmployeeList.filter((item) => item.isSelect !== true);
          this.isSelectAllRemoveTransfer = false;
          this.filterunmappedEmployeeList.forEach((e) => { e.isSelect = false; });
        } else {
          let msg = "Please select atleast one data to transfer";
          this.alertService.info(msg);
        }
        //this.unmappedEmployeeList = this.unmappedEmployeeList.concat(data);
      } else {
        this.select = this.filtermappedEmployeeList;
      }
    } else {
      let msg = "Please select the employee";
      this.alertService.info(msg);
    }
    // if (this.mappedEmployeeList.length > 0) {
    //   let data: any = this.mappedEmployeeList.filter((item) => item.isSelect == true);
    //   this.mappedEmployeeList = this.mappedEmployeeList.filter((item) => item.isSelect == false);
    //   data.forEach(e => { e.isSelect = true; });
    //   this.unmappedEmployeeList = data.concat(this.unmappedEmployeeList);
    //   this.mappedEmployeeList = this.mappedEmployeeList.filter((item) => item.isSelect == false);
    //   if (data.length > 0) {
    //     // this.mappedEmployeeList.splice(data,1);
    //     data.forEach(e => { e.isSelect = false; });

    //   } else {
    //     let msg = "Please select atleast one data to transfer";
    //     this.alertService.info(msg);
    //   }

    //   this.isSelectAllRemoveTransfer = false;
    // } else {
    //   this.totalAmount = 0;
    //   let msg = "Please select atleast one data to transfer";
    //   this.alertService.info(msg);
    // }
  }
  selectAllTransfer(event) {
    debugger
    if (event.checked) {
      this.isSelectAllTransfer = true;
      this.select = this.filterunmappedEmployeeList;
      this.filterunmappedEmployeeList.forEach((element) => {
        element.isSelect = true;
      });
    } else {
      this.filterunmappedEmployeeList.forEach((element) => {
        element.isSelect = false;
      });
      this.select = [];
      this.isSelectAllTransfer = false;
    }
  }
  selectAllRemoveTransfer(event) {
    debugger
    if (event.checked) {
      this.isSelectAllRemoveTransfer = true;
      this.selected = this.filtermappedEmployeeList;
      this.filtermappedEmployeeList.forEach((element) => {
        element.isSelect = true;
      });
    } else {
      this.filtermappedEmployeeList.forEach((element) => {
        element.isSelect = false;
      });
      this.selected = [];
      this.isSelectAllRemoveTransfer = false;
    }
  }
  onNgModelChange(event) {

    let array = event.option.value;
    if (array.isSelect) {
      array.isSelect = false;
      this.isSelectAllTransfer = false;
    } else {
      array.isSelect = true;
    }
  }
}
