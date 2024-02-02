import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.scss']
})
export class MappingComponent implements OnInit {

  form: FormGroup;
  routeParams: any;
  pattern: any;
  data = [];
  dataSource = new MatTableDataSource(this.data);
  //unmapped = new MatTableDataSource();
  //mapped = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("searchInput1", { static: true }) searchInput: ElementRef;

  emailpattern: any;
  selectedUnmappedSet: Set<any> = new Set();
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
  datasource: any;
  displayedColumns: string[] = [
    "Employee Code",
    "Employee Name",
    "Phone Number",
    "Email"
  ];
  selectedmappedlist: any;
  selectedunmappedlist: any;
  selectallandremove: any;
  FinalMappedList: any;
  FianlUnmappedList: any;

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

    this.actionInfo = this.routeParams.actionInfo;
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
    //this.unmapped = new MatTableDataSource(this.filtermappedEmployeeList);
    //this.mapped = new MatTableDataSource(this.filtermappedEmployeeList);
    // this.FinalMappedList=this.filterunmappedEmployeeList;
    // this.FianlUnmappedList= this.filtermappedEmployeeList

  }

  initializeValidators() {
    this.form = this.formBuilder.group({
      projectId: ['', Validators.required],
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
    //if (event.value != null) {
    //this.showdescription = true;
    //}
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
    debugger;
    // if (!(this.selectedmappedlist.length >= 1)) {
    //   this.alertService.warning("Please select atleast one employee to map");
    // }
    if (this.form.valid) {
      const projectemployeeData =
      {
        "projectId": this.form.value.projectId,
        "unmappedEmployees": this.selectedunmappedlist.map(pair => pair.key),
        "mappedEmployees": this.selectedmappedlist.map(pair => pair.key)
      }
      if (!(this.selectedmappedlist.length >= 1)) {
        this.alertService.warning("Please select atleast one employee to map");
      }
      else {
        this.mappingservice.savemapping(projectemployeeData).subscribe(result => {
          if (result && result.isSuccess) {
            this._location.back();
            this.alertService.success(this.id == 0 ? "Employee added Successfully" : "Employees updated Successfully");
          }
        });
      }
    }
    else {
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
        this.dataSource = new MatTableDataSource(this.viewdata.employees);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
      // this.viewdata = {
      //   projectName: 'Test',
      //   repository: 'ATS(abcd)',
      //   noofemployees: 1,
      //   employees: [{
      //     EmpCode: '0396',
      //     employeeName: 'Ajith'
      //   }]
      // }
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
    debugger
    this.mappingservice.GetLookupById(11, id).subscribe(result => {
      this.mappedEmployeeList = result;
      this.selectedmappedlist = this.mappedEmployeeList.slice();
      this.filtermappedEmployeeList = this.mappedEmployeeList.slice();
    });
  }
  getUnmappedEmployees(id: number) {
    debugger
    this.mappingservice.GetLookupById(12, id).subscribe(result => {
      this.unmappedEmployeeList = result;
      this.selectedunmappedlist = this.unmappedEmployeeList.slice();
      this.filterunmappedEmployeeList = this.unmappedEmployeeList.slice();
      console.log(this.filterunmappedEmployeeList,"111111111111this.filterUnmappedEmployeeList");

    });
  }
  applyFilterSearch1(event: Event) {
    debugger;
    const list = this.preserveSelectedElements(this.unmappedEmployeeList, this.unmappedEmployeeList);
    this.FinalMappedList = list;
    debugger;
    if(event) {
      const filterValue = (event.target as HTMLInputElement).value;
      if (this.searchText1 !== filterValue) {
        this.filterunmappedEmployeeList = list;
        this.selectedUnmappedSet.clear();
      }
      this.searchText1 = filterValue;
      this.filterunmappedEmployeeList = list.filter((item) =>
        item.value.toLowerCase().includes(filterValue.toLowerCase())
      );
    } else {
      this.searchText1 = '';
      this.filterunmappedEmployeeList = list;
      this.selectedUnmappedSet.clear();
    }
  }


  applyFilterSearch2(event: Event) {
    debugger
    let list = this.preserveSelectedElements(this.filtermappedEmployeeList, this.mappedEmployeeList);
    const filterValue = (event.target as HTMLInputElement).value;
    this.filtermappedEmployeeList = list.filter((item) =>
      item.value.toLowerCase().includes(filterValue.toLowerCase())
    );
    this.FianlUnmappedList = list;
  }
  getProject() {
    this.mappingservice.GetLookup(1).subscribe(result => {
      this.projectSortList = result;
      this.filterprojectSortList = this.projectSortList.slice();
    });
  }
  onCancel() {
    this._location.back();
  }

  applyFilter(event: Event) {
    debugger
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  moveToTransfer() {
    debugger
    if (this.filterunmappedEmployeeList.length > 0){
    const selectedData = this.filterunmappedEmployeeList.filter((item) => item.isSelect === true);
    if (selectedData.length > 0) {
      selectedData.forEach(element => {
        element.disabled = false;
        this.selectedUnmappedSet.add(element.key);
      });
      this.unmappedEmployeeList = this.unmappedEmployeeList.filter(item => !this.selectedUnmappedSet.has(item.key));
      this.filterunmappedEmployeeList = this.filterunmappedEmployeeList.filter((item) => !this.selectedUnmappedSet.has(item.key));
      this.filtermappedEmployeeList = selectedData.concat(this.filtermappedEmployeeList);
      this.selectedmappedlist = selectedData.concat(this.selectedmappedlist);
      this.mappedEmployeeList = this.selectedmappedlist;
      this.isSelectAllTransfer = false;
      this.filtermappedEmployeeList.forEach((e) => { e.isSelect = false; });
      this.searchText1 = '';
      this.form.controls["secondListDatas"].reset();
      this.applyFilterSearch1(null) 
    console.log(this.filtermappedEmployeeList,"this.filtermappedEmployeeList");
        console.log(this.filterunmappedEmployeeList,"not.filtermappedEmployeeList");
    } else {
      const msg = "Please select at least one data to transfer";
      this.alertService.info(msg);
    }
  }
  else{
    this.unmappedEmployeeList = this.filterunmappedEmployeeList;
  }
  }

  removedToTransfer() {
    debugger
    if (this.filtermappedEmployeeList.length > 0) {
      const data = this.filtermappedEmployeeList.filter((item) => item.isSelect == true);
      if (data.length > 0) {
        data.forEach(element => {
          element.disabled = false;
        });
      this.filtermappedEmployeeList = this.filtermappedEmployeeList.filter((item) => !item.isSelect);
        this.selectedunmappedlist = data.concat(this.selectedunmappedlist);
        this.unmappedEmployeeList = data.concat(this.unmappedEmployeeList);
        this.isSelectAllRemoveTransfer = false;
        console.log(this.filterunmappedEmployeeList,"this.filterunmappedEmployeeList");
        console.log(this.filtermappedEmployeeList,"this.filtermappedEmployeeList");
      } else {
        const msg = "Please select atleast one data to transfer"; 
        this.alertService.info(msg);
      }
    } else {
      this.select = this.filtermappedEmployeeList;
    }
  }
  selectAllTransfer(event) {
    debugger
    if (event.checked) {
      this.isSelectAllTransfer = true;
      this.select = this.filterunmappedEmployeeList;
      this.filterunmappedEmployeeList.forEach((element) => {
        element.isSelect = true;
      });
      this.selectallandremove = 1;
    } else {
      this.filterunmappedEmployeeList.forEach((element) => {
        element.isSelect = false;
      });
      this.select = [];
      this.isSelectAllTransfer = false;
    }
  }
  selectAllRemoveTransfer(event) {
    console.log(">>>>>>>>>>>>",event.checked);
    debugger
    if (event.checked) {
      this.isSelectAllRemoveTransfer = true;
      this.selected = this.filtermappedEmployeeList;
      this.filtermappedEmployeeList.forEach((element) => {
        element.isSelect = true;
      });
      this.selectallandremove = 2;
    } else {
      this.filtermappedEmployeeList.forEach((element) => {
        element.isSelect = false;
      });
      this.selected = [];
      this.isSelectAllRemoveTransfer = false;
    }
  }
  onNgModelChange(event) {
    debugger
    console.log("qqqq",event.option.value);
    let array = event.option.value;
    if (array.isSelect) {
      // yiuuiyiuyi
      array.isSelect = true;
      if (this.selectallandremove == 1) {
        this.isSelectAllTransfer = false;
      }
      else if (this.selectallandremove == 2) {
        this.isSelectAllRemoveTransfer = false;
      }
    }
     else {
      array.isSelect = true;
    }
  }

  preserveSelectedElements(oldList: any[], newList: any[]): any[] {
    // const selectedIds = oldList.filter((item) => item.isSelect).map((item) => item.key);

    // if(selectedIds.length>0)
    // {
    //   debugger;
    // }

    // for (const item of newList) {
    //   item['isSelect'] = false;
    // }

    // newList.forEach((item) => {
    //   if (selectedIds.includes(item.key)) {
    //     item.isSelect = true;
    //   }
    // });
    // return newList;
    debugger
    const selectedIds = oldList.filter((item) => item.isSelect).map((item) => item.key);

    if (selectedIds.length > 0) {
      debugger;
    }

    // Deep clone the objects in newList to avoid modifying the original objects
    //const clonedList = newList.map(item => ({ ...item }));

    // for (const item of clonedList) {
    //   item['isSelect'] = false;
    // }

    newList.forEach((item) => {
      if (selectedIds.includes(item.key)) {
        item.isSelect = true;
      }
    });

    // console.log("ids, ", this.FinalMappedList)
    return newList;
  }
}
