import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { OwlDateTime } from 'ng-pick-datetime/date-time/date-time.class';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/services/alert.service';
import { TimeSheetService } from 'src/app/services/timesheet.service';
import { UserSessionService } from 'src/app/services/usersession.service';
import { MomentDateModule } from '@angular/material-moment-adapter';
// import { SaveTimesheet, TimeSheetViewModel } from 'path/to/save-timesheet.model'; // Adjust the path to the correct location of your model
import swal from "sweetalert2";
import { NavigationService } from "src/app/services/navigation.service";
import * as moment from 'moment';
import { add, forOwn, result } from 'lodash';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FileDetector } from 'protractor';
import * as _ from 'lodash';


@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {
  defaulttime: any;
  list: any[] = []
  datalist: any[] = []
  formData =
    {
      entryDate: null ,
    }

  dataSource = new MatTableDataSource(this.list);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("searchInput", { static: true }) searchInput: ElementRef;
  displayedColumns: string[] = [
    "action",
    "entryDate",
    "Project",
    "Hours",
    "Remarks"
  ];

  id = 0;
  actionInfo = 0;
  form: FormGroup;
  routeParams: any;
  pageTitle: string;
  // datasource: any[] = [];
  submitbtn: string;
  filesResult: any;
  //selectedImage: any;
  licenceTypeList: any[];
  selectedFileName = 'Choose File';
  dropdownSettings: any = {};
  vehicleList: any = [];
  formEditMode = true;
  Languages: any[];
  RollList: any;
  passworderror = false;
  isReadOnly = false;
  // isDisable: boolean;
  isDisable = false;
  pattern: RegExp;
  show: boolean;
  show2: boolean;
  clientId: any;
  emailpattern: RegExp;
  filterSortList: any[];
  showdescription: boolean = false;
  SaveTimesheet: any[];
  isLeave: boolean = true;
  SortList: any;
  projecttypelist: any;
  filterprojecttypelist: any = [];
  defaultProject: any;
  mindate: Date;
  maxdate: Date;
  data: any;
  temproraryList: any[] = [];
  disabled: boolean = false;
  rowCount: number = 0;
  //isDataEntered: boolean = false;
  //my code 
  date: any;
  private route: ActivatedRoute;
  UserId: any;
  formatdate: any;

  constructor(private formBuilder: FormBuilder,
    private _location: Location,
    route: ActivatedRoute,
    public dialog: MatDialog,
    private alertService: AlertService,
    private userSessionService: UserSessionService,
    private timesheetService: TimeSheetService,
    private translate: TranslateService,
    public navigationService: NavigationService) {
    this.routeParams = route.snapshot.params;
    debugger
    //mycode
    this.actionInfo = this.routeParams.actionInfo;
    debugger;
    if (this.actionInfo == 0 || this.actionInfo == 1) {
      this.id = parseInt(this.routeParams.id);
    }
    else {
      this.date = this.routeParams.id;
    }
    //this.id = 0;
    let formattedDate = (moment()).format('DD-MMM-YYYY HH:mm:ss')
    // this.form = this.formBuilder.group({
    //   entryDate: [''],
    //   IsLeave: [0],
    // });
    debugger
    //this.actionInfo = this.routeParams.actionInfo
    if (this.id === 0) {
      this.submitbtn = 'Save';
    } else {
      this.submitbtn = 'Update';
    }
    if (this.actionInfo == 1 || this.actionInfo==11) {
      this.formEditMode = false
    }
    this.pattern = /^[^\s]+(\s+[^\s]+)*$/;
    this.emailpattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.clientId = this.userSessionService.getCurrentClientId();
    this.maxdate = new Date();
    this.mindate = new Date(this.maxdate);
    this.mindate.setDate(this.maxdate.getDate() - 39);
    //my code
    // this.form = this.formBuilder.group({
    //   entryDate: this.formData.entryDate,
    // });
  }

  ngOnInit() {
    debugger;
    this.initializeValidators();
    this.Getproject();
    this.GetdefaultProject();
    this.GetTaskType();
    this.get(true);
    this.UserId = this.userSessionService.userId();
    debugger;
    this.getgrid(this.UserId, true);
    // this.form.controls["entryDate"].setValue(new Date);// old code

    this.form.controls["entryDate"].setValue(moment(new Date).format("YYYY-MM-DD"));
    this.dataSource = new MatTableDataSource(this.list);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  onAdd() {
    debugger;
    if (this.form.valid) {
      const formData = this.form.value;
      let data = this.filterSortList.filter(x => x.key == this.form.value.projectId);
      let dataSource = {
        formData: formData,
        data: data[0].value
      }
      this.datalist = [];
      this.temproraryList.push(dataSource);
      let sum = 0;
      this.temproraryList.forEach(i => {
        let hours = i.formData.hours;
        hours = parseInt(moment(hours).format("HH")) * 60 + (parseInt(moment(hours).format("mm")));
        console.log("list", this.datalist)
        sum += hours;
      })
      sum = sum / 60;
      if (sum > 24) {
        this.alertService.warning("Work time is exceeded more than 24 hours");
        this.temproraryList.pop();
        return;
      }
      // if (!this.isPresentSelected) {
      //   this.isPresentSelected = formData.IsLeave === 0;
      // }
      this.list.push(dataSource);
      this.list.forEach(field => { field.EmployeeId = this.userSessionService.userId(), field.TaskStatusId = 0 })
      this.list.forEach(field => { field.id = 0 })
      //   {
      // //     //   hours: this.form.value.IsLeave == 1 ? 0 : parseInt(moment(this.form.value.hours).format('HH:mm')),
      // // // this.list.forEach(field =>
      // // //   {field.hours=((moment(this.form.value.hours).format('HH:mm')))})
      // //     // let formattedDate = (moment()).format('HH')
      // //     // this.list.forEach(field =>
      // //     //   {field.formattedDate= (moment()).format('HH')})
      // //     }

      // // this.list.push(data[0].value)
      // //const formattedDate = moment(inputDate).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
      //   }
      this.dataSource.data = this.list;
      this.list.forEach(i => {
        let hour = i.formData.hours;
        hour = parseInt(moment(hour).format("HH")) * 60 + (parseInt(moment(hour).format("mm")));
        let date = i.formData.entryDate;
        date = moment(date).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
        const timesheet = {
          //"id": 0,
          "entryDate": date,
          "hours": hour,
          "description": i.formData.description,
          "projectId": i.formData.projectId,
          "taskId": 0,
          "employeeId": i.EmployeeId,
          "isLeave": i.formData.IsLeave == 1 ? true : false,
          "timeIn": null,
          "timeOut": null,
          "taskStatusId": 0,
          //"project": i.data,
          "taskTypeId": i.formData.taskTypeId,
          "approvedStatusType": 1
        }
        this.datalist.push(timesheet);

      })
      //this.datasource = new MatTableDataSource(this.form.value);
      //console.log(this.dataSource,"563735735735");

      // Clear the form after adding data
      this.form.reset(
        {
          entryDate: this.formData.entryDate,

        }
      );
      this.disabled = true;

    }
  }

  initializeValidators() {
    this.form = this.formBuilder.group({
      id: [0],
      description: [''],
      hours: [moment().startOf('day').add(8, 'hours').toDate()], //old code

      // hours: [''],
      //hours: [null, Validators.required],
      IsLeave: [2, [Validators.required]],
      entryDate: ['', [Validators.required]
        //, [Validators.required, this.weekendValidator]
      ],
      EmployeeId: [this.id],
      taskTypeId: [0],
      projectId: [null],
      timeIn: [null],
      timeOut: [null],
      TaskStatusId: [null],
    });
    // this.form.get('hours').setValue(this.initialHoursValue);
  }
  sortingChange(event) {
    debugger
    if (event.value != null) {
      this.showdescription = true;
    }


  }
  // timeChange(e) {
  //   debugger;
  //   const selectedTime = moment(this.form.value.hours, 'HH:mm');
  //   console.log((this.form.value.hours).format('HH:mm'));
  //   console.log(parseInt(moment(this.form.value.hours).format('HH:mm')));
  // }
  timeChange() {
    const selectedTime = moment(this.form.value.hours, 'HH:mm');
    console.log((this.form.value.hours).format('HH:mm'));

    console.log(parseInt(moment(this.form.value.hours).format('HH:mm')));

  }
  getHours(e) {
    debugger;
    return moment(e, 'HH:mm')

  }
  endtimeChange() {
    // if (moment(this.form.value.startTs).format('HH:mm') == moment(this.form.value.endTs).format('HH:mm')) {
    //   this.form.controls['endTs'].setValue(null);
    //   this.alertService.error('End Time should be different from Start Time');
    // } else if (moment(this.form.value.startTs).format('HH:mm') > moment(this.form.value.endTs).format('HH:mm')) {
    //   this.form.controls['endTs'].setValue(null);
    //   const msg = this.translate.instant('RevenueendtimemustbegreaterthanrevenueStarttime');
    //   this.alertService.error(msg);
    // } else {
    // }

  }
  Getproject() {
    debugger;
    this.timesheetService.getproject().subscribe(result => {
      console.log(">>>?", result);
      this.SortList = result
      this.filterSortList = this.SortList.slice();
    });
  }
  GetdefaultProject() {
    this.timesheetService.getDefaultProject().subscribe(result => {
      this.defaultProject = result;
      if (this.id == 0) {
        this.form.controls["projectId"].setValue(this.defaultProject);
      }
      if (this.defaultProject != 0) {
        this.showdescription == true;
      }
    });
  }

  GetTaskType() {
    this.timesheetService.getLookup(13, true).subscribe(result => {
      this.projecttypelist = result;
      this.filterprojecttypelist = this.projecttypelist;
    })
  }
  get(refresh: boolean) {
    debugger
    if (this.id > 0) {
      this.timesheetService.gettimesheetById(this.id, refresh).subscribe(result => {
        this.data = result;
        //console.log('data'+this.data);
        if (this.data) {
          //this.form.controls['hours'].setValue("13:03")
          if (this.data.description) {
            this.showdescription = true
          }
          debugger

          this.form.patchValue(this.data);
          this.Getproject();
          this.GetTaskType();
          const unixTimestamp = this.data.hours * 1000;

          // Convert the UNIX timestamp to a Date object
          const now = new Date();
          now.setHours(0);
          now.setMinutes(0);
          now.setSeconds(0);
          now.setMilliseconds(0)
          let st = new Date(now);
          console.log(st);

          this.form.controls['hours'].setValue(moment().startOf('day').add(8, 'hours').toDate()) //old code
          if (this.data.isLeave == true) {
            this.form.controls['IsLeave'].setValue(true);
            this.isLeave = false
          }

        }
      });
      this.isReadOnly = true;
    }
  }
  getgrid(userId: any, refresh: boolean) {
    debugger
    if (this.date) {
      this.timesheetService.getTimesheet(userId, refresh).subscribe(result => {
        this.data = result;
        console.log('data' + this.data);
        debugger;
        for (let item of this.data) { 
          this.formatdate = moment(item.entryDate).format('YYYY-MM-DD');
          debugger;
          if (this.date === this.formatdate) {
            //this.dataSource = new MatTableDataSource(item.timesheets);
            const convertedData = item.timesheets.map(entry => ({
              ...entry,
              hours: this.convertMinutesToHHMM(entry.hours)
            }));
            this.dataSource = new MatTableDataSource(convertedData);
            this.Getproject();
            this.GetTaskType();
            if (item.timesheets.isLeave == true) {
              this.form.controls['IsLeave'].setValue(true);
              this.isLeave = false
            }
          }
        }
      });
      this.isReadOnly = true;
    }
  }
  convertMinutesToHHMM(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const hoursStr = hours < 10 ? '0' + hours : '' + hours;
    const minutesStr = remainingMinutes < 10 ? '0' + remainingMinutes : '' + remainingMinutes;
    return hoursStr + ':' + minutesStr;
  }
  
  
  goToAction(id: number, actioninfo: number) {
    debugger;
    this.navigationService.goToTimeSheet(id, actioninfo);
  }

  private formatWithLeadingZero(value: number): string {
    return value.toString().padStart(2, '0');
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


  // onSubmit() {
  // if (this.form.value.IsLeave == 2) {
  //   this.form.controls['hours'].setValidators(Validators.required);
  //   this.form.controls['hours'].updateValueAndValidity();
  //   // this.form.controls['timeIn'].setValidators(Validators.required);
  //   // this.form.controls['timeIn'].updateValueAndValidity();
  //   // this.form.controls['timeOut'].setValidators(Validators.required);
  //   // this.form.controls['timeOut'].updateValueAndValidity();
  //   this.form.controls['description'].setValidators(Validators.required);
  //   this.form.controls['description'].updateValueAndValidity();
  //   this.form.controls['projectId'].setValidators(Validators.required);
  //   this.form.controls['projectId'].updateValueAndValidity();
  // } else {
  //   this.form.controls['hours'].clearValidators();
  //   this.form.controls['hours'].updateValueAndValidity();
  //   // this.form.controls['timeIn'].clearValidators();
  //   // this.form.controls['timeIn'].updateValueAndValidity;
  //   // this.form.controls['timeOut'].clearValidators();
  //   // this.form.controls['timeOut'].updateValueAndValidity;
  //   this.form.controls['description'].clearValidators();
  //   this.form.controls['description'].updateValueAndValidity();
  //   this.form.controls['taskTypeId'].clearValidators();
  //   this.form.controls['taskTypeId'].updateValueAndValidity();
  //   this.form.controls['projectId'].clearValidators();
  //   this.form.controls['projectId'].updateValueAndValidity();
  // }
  // this.form.controls['entryDate'].setValue(moment(this.form.value.entryDate).format("YYYY-MM-DD"));
  // const timesheetData =
  // {
  //   id: this.id,
  //   entryDate: moment(this.form.value.entryDate).format("YYYY-MM-DD") + "T00:00:00.566Z",
  //   hours: this.form.value.IsLeave == 1 ? 0 : parseInt(moment(this.form.value.hours).format('HH:mm')),
  //   description: this.form.value.IsLeave == 1 ? '' : this.form.value.description,
  //   projectId: this.form.value.IsLeave == 1 ? 0 : this.form.value.projectId,
  //   taskId: 0,
  //   taskTypeId: this.form.value.IsLeave == 1 ? 0 : this.form.value.taskTypeId,
  //   employeeId: this.userSessionService.userId(),
  //   isLeave: this.form.value.IsLeave == 1 ? true : false,
  //   // timeIn:this.form.value.IsLeave == 1 ? null:moment(this.form.value.timeIn).format('HH:mm:ss'),  // Adjusted to use TimeSpan format (hh:mm:ss)
  //   // timeOut:this.form.value.IsLeave == 1 ? null:moment(this.form.value.timeOut).format('HH:mm:ss'), // Adjusted to use TimeSpan format (hh:mm:ss)
  //   taskStatusId: 0
  // };
  onSubmit() {

    if (this.list.length > 0) {
      let data = {
        timesheets: this.datalist
      }
      debugger

      this.timesheetService.savetimsheet(data).subscribe(result => {
        if (result && result.isSuccess) {
          this._location.back();
          this.alertService.success(this.id == 0 ? "Time Sheet Saved Successfully" : "Time Sheet Updated Successfully");

          // const msg1 = this.translate.instant('Savedsuccessfully');
          // const msg2 = this.translate.instant('Updatedsuccessfully');
          // const msg3 = this.translate.instant('');
          // const sucessmsg = this.id == 0 ? msg1 : msg2;

        }

      });
    } else {
      this.validateFormControl();
    }
  }

  onCancel() {
    this._location.back();
  }
  password() {
    this.show = !this.show;
  }
  confirmpassword() {
    this.show2 = !this.show2;
  }

  phoneValid(event) {
    let isValid = false;
    let regex = /^[0-9 ]+$/;
    isValid = regex.test(event.target.value);
    if (isValid) {
      return true;
    } else {
      let val = this.form.value.alternateNumber;
      let vv = val.slice(0, -1);
      this.form.controls['alternateNumber'].setValue(vv);
      return false;
    }

  }
  // onbtnClick(id) {
  //   debugger
  //   if (this.actionInfo != 1) {
  //     if (id == 1) {

  //       this.isLeave = false;
  //     }
  //     else {
  //       // this.form.controls['choices'].setValue(id);
  //       this.isLeave = true;

  //     }
  //   }

  // }
  onbtnClick(option: number) {
    if (option === 1) {
      // "Leave" button is clicked
      this.form.patchValue({ IsLeave: 1 });
      this.rowCount = 1; // Disable "Leave" button after adding one row
    } else if (option === 2) {
      // "Present" button is clicked
      this.form.patchValue({ IsLeave: 2 });
    }
  }
  // onDataEntered() {
  //   this.isDataEntered = true;
  // }

  // // Function to reset the data entered flag (e.g., when "Leave" button is clicked)
  // resetDataEntered() {
  //   this.isDataEntered = false;
  // }

  // onDelete(e: Event, id: any, date: any) {
  //   debugger;
  //   const formatDate = moment(date).format('DD-MM-YYYY');
  //   e.preventDefault();
  //   const title = this.translate.instant('DeleteConfirmation');
  //   const msg = 'Are you certain about deleting the record for ' + formatDate + ' ?';
  //   const txt = this.translate.instant(msg);
  //   const Yes = this.translate.instant('Yes');
  //   const No = this.translate.instant('No');
  //   swal.fire({
  //     title,
  //     text: txt,
  //     icon: 'question',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: Yes,
  //     cancelButtonText: No,
  //   }).then((result) => {
  //     if (result.value) {
  //       this.timesheetService.delete(id).subscribe(result => {
  //         if (result) {
  //           debugger;
  //           this.refresh();
  //           this.alertService.success("Deleted Succussfully");
  //         }
  //         else {
  //           this.alertService.error("Deletion unsuccussful");
  //         }
  //       });
  //     }
  //   })
  // }

//   refresh() {
//     debugger
//     this.searchInput.nativeElement.value = "";
//     //this.gettimesheet(this.UserId);
//     debugger;
//     this.getgrid(this.UserId,true);
//   }
}



