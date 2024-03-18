import { ExcelService } from './../../../../services/excel.service';
import { Component, OnInit, ViewChild, ElementRef, Output, Input } from '@angular/core';
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
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import * as ExcelJS from 'exceljs';

import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {
  showTable = false;
  defaulttime: any;
  edate: any;

  list: any[] = []
  datalist: any[] = []

  formData =
    {
      entryDate: moment().startOf('day').toDate(),

    }

  
  data1 = [
    {
      name: "data1", //sheet1 with name data1
      values: [
        { header: "Project", value: [] },
        { header: "Task Type", value: [] },
        { header: "Date", value: "" },
        { header: "Hours", value: "" },
        { header: "Hours", value: "" },
        { header: "Task Description", value: "" },

      ]
    }
  ];

  data2 = this.transform(this.data1)
  workbookData = this.transform(this.data1)

  dataSource = new MatTableDataSource(this.list);
  @ViewChild('input1') input1: ElementRef | any;
  @ViewChild('input2') input2: ElementRef | any;
  // @ViewChild('addButton') addButton: ElementRef;
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
  private isLeaveValue: number;
  Normaltasklist: any[] = [];
  Leavetasklist: any[] = [];
  deletedItemIds: number[] = [];
  localID: number = 0;

  formentry: any;
  date: any;
  private route: ActivatedRoute;
  UserId: any;
  formatdate: any;
  editTrue: Boolean = false;
  View: boolean = false;
  loading: boolean = false;
  editMode: boolean = false;
  // loading: boolean = false;
  public dateTime3: any;
  leavedisable: boolean = true;
  showgridlist: any;
  pinValue: string;

  constructor(private formBuilder: FormBuilder,
    private _location: Location,
    route: ActivatedRoute,
    public dialog: MatDialog,
    private alertService: AlertService,
    public ExcelService:ExcelService,
    private userSessionService: UserSessionService,
    private timesheetService: TimeSheetService,
    private translate: TranslateService,
    public navigationService: NavigationService) {
    this.routeParams = route.snapshot.params;
    debugger
    //this.id = parseInt(this.routeParams.id);
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
    debugger
    if (this.id === 0) {
      let nonEntryDate: any = localStorage.getItem('nonEntryDate') ? localStorage.getItem('nonEntryDate') : moment(new Date).format("YYYY-MM-DD");
      // while (moment(nonEntryDate).day() === 0 || moment(nonEntryDate).day() === 6) {
      //   nonEntryDate = moment(nonEntryDate).add(1, 'day').format("YYYY-MM-DD");
      // }
      this.formData.entryDate = nonEntryDate;
      if (this.date == 0) {
        this.date = nonEntryDate;
      }
      this.submitbtn = 'Save';
    } else {
      this.submitbtn = 'Update';
    }
    if (this.actionInfo == 1 || this.actionInfo == 11) {
      this.formEditMode = false;
    }
    this.pattern = /^[^\s]+(\s+[^\s]+)*$/;
    this.emailpattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.clientId = this.userSessionService.getCurrentClientId();
    this.maxdate = new Date();
    this.mindate = new Date(this.maxdate);
    this.mindate.setDate(this.maxdate.getDate() - 39);
    debugger
  }

  ngOnInit() {
    debugger;
    this.initializeValidators();
    this.form.controls['A'];
    this.form.controls['B'];
    this.Getproject();
    this.GetdefaultProject();
    this.GetTaskType();
    this.get(true);
    this.UserId = this.userSessionService.userId();
    debugger;
    this.getgrid(this.UserId, true);
    if (this.actionInfo == 2) {
      // this.getgriddatabycurrentdate();
    }
    //this.form.controls["entryDate"].setValue(moment(new Date).format("YYYY-MM-DD"));
    this.form.controls["entryDate"].setValue(this.date);
    // this.form.controls["hours"].setValue("00:00");
    this.dataSource = new MatTableDataSource(this.list);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.formentry = this.formBuilder.group(
      {
        entryDate: [this.formData.entryDate, Validators.required],
        hours: ['', Validators.required],
        description: ['', Validators.required],
        projectId: ['', Validators.required],
        taskTypeId: ['', Validators.required],
        A: ['00', [Validators.required, Validators.pattern('^(0[0-9]|1[0-9]|2[0-3])$')]],
        B: ['00', [Validators.required, Validators.pattern('^[0-5][0-9]$')]]
      });
  }

  onAdd() {
    debugger;
    if (this.id === null) {
      this.id = 0;
    }
    this.localID = this.localID + 1;

    this.form.controls['hours'].setValidators(Validators.required);
    this.form.controls['hours'].updateValueAndValidity();
    this.form.controls['entryDate'].setValidators(Validators.required);
    this.form.controls['entryDate'].updateValueAndValidity();
    this.form.controls['taskTypeId'].setValidators(Validators.required);
    this.form.controls['taskTypeId'].updateValueAndValidity();
    this.form.controls['description'].setValidators(Validators.required);
    this.form.controls['description'].updateValueAndValidity();
    this.form.controls['projectId'].setValidators(Validators.required);
    this.form.controls['projectId'].updateValueAndValidity();

    console.log(this.form.value, 'this.form.value.hours');

    if (this.form.valid && this.form.value.B != "" && this.form.value.A != "" && !(this.form.value.A == "00" && this.form.value.B == "00")) {
      if (this.form.valid) {
        const formData = { ...this.form.value, id: this.id }; // Assign this.id to formData.id
        const timeInput = this.form.value.hours;
        const concatenatedValue = `${this.form.get('A').value}:${this.form.get('B').value}`;
        console.log(concatenatedValue, '+++++++++');
        this.form.controls["hours"].setErrors(null);
        const hoursA = parseInt(this.form.get('A').value);
        const hoursB = parseInt(this.form.get('B').value);
        const calculatedHours = (hoursA * 60) + hoursB;
        formData.hours = concatenatedValue;
        formData.hoursNumber = calculatedHours;
        const projectData = this.filterSortList.find(x => x.key === formData.projectId);
        formData.project = projectData ? projectData.value : null;
        formData.localid = this.localID

        let convertedData = this.data.map(entry => ({
          ...entry,
          hours: this.convertMinutesToHHMM(entry.hours)
        }));
        console.log(convertedData, ">>>>>>>>>>>>>>>>>>>>>1");
        let ogdata = Object.assign({}, formData);
        if (this.date == 0) {
          this.temproraryList.push(formData);
        } else {
          convertedData.push(formData);
          ogdata.hours = calculatedHours;
          this.data.push(ogdata);
        }
        let sum = 0;
        this.temproraryList.forEach(i => {
          let hours = moment.duration(i.hours).asMinutes();
          sum += hours;
        });
        console.log(this.data, 'this.temproraryList');

        if (sum > (24 * 60)) {
          console.log(sum, '++++++');
          this.alertService.warning("Work time is exceeded more than 24 hours");
          this.temproraryList.pop();
          console.log(this.temproraryList, '=======');
          return;
        }
        this.isLeaveValue = formData.IsLeave;

        const tempedate = { ...formData, EmployeeId: this.userSessionService.userId(), TaskStatusId: 0 };
        console.log('tempdate', tempedate);
        this.list.push(tempedate);

        for (let item of this.list) {
          const convertedData = this.list.map(entry => ({
            ...entry,
            hours: this.convertMinutesToHHMM(entry.hours)
          }));
          console.log(convertedData, ">>>>>>>>>>>>>>>>>>>>>");
        }
        if (this.date == 0) {
          this.dataSource = new MatTableDataSource(this.list);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        } else {
          this.dataSource = new MatTableDataSource(convertedData);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
        console.log(this.dataSource.data, 'this.dataSource.data>>>>')
        this.datalist = this.list.map(item => ({
          entryDate: moment(item.entryDate).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
          hours: item.hoursNumber,
          description: item.description,
          projectId: item.projectId,
          taskId: 0,
          employeeId: this.userSessionService.userId(),
          isLeave: item.IsLeave == 1 ? true : false,
          timeIn: null,
          timeOut: null,
          taskStatusId: 0,
          taskTypeId: item.taskTypeId,
          approvedStatusType: 1,
          localid: this.localID
        }));

        this.date = moment(this.datalist[0].entryDate).format("YYYY-MM-DD"),
          this.form.reset({
            entryDate: this.date,
            IsLeave: 2
          });

        this.projecttypelist = this.Normaltasklist;
        this.filterprojecttypelist = this.projecttypelist;
        this.disabled = true;
        this.form.controls["hours"].setValue("00:00");
        this.form.controls["A"].setValue("00");
        this.form.controls["B"].setValue("00");
        console.log(tempedate.projectId, "pro ID ")
        this.form.controls["projectId"].setValue(tempedate.projectId);
        console.log(this.data, "og");
        console.log(convertedData, "show");
      }
    } else {
      if (this.form.value.A === "00" && this.form.value.B === "00") {
        // this.form.controls['A'].setErrors({ 'incorrect': true }, { emitEvent: true });
      }
      this.validateFormControl();
      // this.form.controls["hours"].setErrors({ required: true });
    }
  }

  initializeValidators() {
    this.form = this.formBuilder.group({
      id: [0],
      description: ['', [Validators.required]],
      hours: [moment().startOf('day').add(8, 'hours').toDate(), [Validators.required]], //old code
      IsLeave: [2, [Validators.required]],
      entryDate: ['', [Validators.required]],
      EmployeeId: [this.id],
      taskTypeId: ['', [Validators.required]],
      projectId: ['', [Validators.required]],
      timeIn: [null],
      timeOut: [null],
      TaskStatusId: [null],
      A: ['00', [Validators.required, Validators.pattern('^(0[0-9]|1[0-9]|2[0-3])$')]],
      B: ['00', [Validators.required, Validators.pattern('^[0-5][0-9]$')]],
    });
  }
  sortingChange(event) {
    debugger
    console.log(event.value, '{{}}}}}{{}}}}====');
    if (event.value == 16) {
      this.form.controls["A"].setValue("08");
      this.form.controls["B"].setValue("00");
      this.leavedisable = false;
      this.editTrue = true;
    }
    else if (event.value == 21 || event.value == 22) {
      this.form.controls["A"].setValue("04");
      this.form.controls["B"].setValue("00");
      this.leavedisable = true;
      this.editTrue = false;
    }
  }
  timeChange() {
    const selectedTime = moment(this.form.value.hours, 'HH:mm');
    console.log((this.form.value.hours).format('HH:mm'));
    console.log(parseInt(moment(this.form.value.hours).format('HH:mm')));
  }

  onTimeChange(event: any) {
    const inputValue: string = event.target.value;

    // Convert to 24-hour format
    const [hours, minutes] = inputValue.split(':');
    const formattedHours = (hours.length === 1 ? '0' : '') + hours;

    // Update the form value
    this.form.get('hours').setValue(`${formattedHours}:${minutes}`);
  }

  selectAllText(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.select();
  }
  moveFocus(event: any, name: any) {
    debugger
    let value = event.target.value.replace(/[^0-9]*/g, '');
    if (event.key === 'Backspace' && value === '' && event.target === this.input2.nativeElement) {
      this.input1.nativeElement.focus();
    }
    if (value.length === 2 && event.target === this.input1.nativeElement) {
      this.input2.nativeElement.focus();
    }
    if (event.key !== 'Backspace' || value !== '') {
      event.target.value = value.padStart(2, '0');
    }

    if (event.key === 'Backspace') {
      if (!this.input1.nativeElement.value) {
        this.input1.nativeElement.focus()
      } else if (!this.input2.nativeElement.value) {
        this.input1.nativeElement.focus();
      }
      else {
        if (!this.input1.nativeElement.value) {
          this.input1.nativeElement.focus()
        }
        else if (!this.input2.nativeElement.value) {
          this.input2.nativeElement.focus();
        } else {
          this.pinValue = '' + this.form.value.a + '' + this.form.value.b;
          if (this.pinValue.length == 2) {
          }
        }
      }
    }
    let form1 = this.form.get('A').value;
    let form2 = this.form.get('B').value;
    if (form1 && form1.length == 1) {
      form1 = "0" + form1;      // form1 = "08"
      this.form.controls["A"].setValue(form1);
    }
  }

  onTimeKeyDown(event: KeyboardEvent) {
    // Allow only backspace and numbers
    if (
      event.key !== 'Backspace' &&
      (event.key < '0' || event.key > '9')

    ) {
      console.log(event.key, ">>>>>>>>>>>>>>>>>>>>");

      event.preventDefault();
      return;
    }

    const inputElement = event.target as HTMLInputElement;
    const selectionStart = inputElement.selectionStart ?? 0;
    const selectionEnd = inputElement.selectionEnd ?? 0;
    const inputValue = inputElement.value;

    // Handle backspace
    if (event.key === 'Backspace') {
      if (selectionStart === selectionEnd && selectionStart > 0) {
        const charToDelete = selectionStart - 1;
        const newValue =
          inputValue.slice(0, charToDelete) +
          inputValue.slice(charToDelete + 1);
        inputElement.value = this.formatTime(newValue);
        inputElement.setSelectionRange(charToDelete, charToDelete);
        event.preventDefault();
        return;
      }
    }
    // Prevent adding characters if the input is already at the max length
    if (inputValue.length >= 8) {
      event.preventDefault();
      return;
    }
    // Handle numbers
    const char = event.key;
    if (!isNaN(Number(char))) {
      const newValue =
        inputValue.slice(0, selectionStart) +
        char +
        inputValue.slice(selectionEnd);
      inputElement.value = this.formatTime(newValue);
      inputElement.setSelectionRange(selectionStart + 1, selectionStart + 1);
      event.preventDefault();
    }
  }
  onTimeInput(event: InputEvent) {
    const inputElement = event.target as HTMLInputElement;
    const newValue = this.formatTime(inputElement.value);
    inputElement.value = newValue;
  }
  formatTime(value: string): string {
    const regex = /^(\d{0,2}):?(\d{0,2})$/;
    const match = regex.exec(value);
    if (!match) {
      return '00:00';
    }
    const hours = match[1] ? match[1].padStart(2, '0') : '00';
    const minutes = match[2] ? match[2].padStart(2, '0') : '00';
    console.log(hours, minutes);

    return `${hours}:${minutes}`;
  }
  getHours(e) {
    debugger;
    return moment(e, 'HH:mm')

  }
  endtimeChange() {
  }
  Getproject() {
    debugger;
    this.timesheetService.getproject().subscribe(result => {
      console.log(">>>?", result);
      this.SortList = result
      this.filterSortList = this.SortList.slice();
      this.data1[0].values[0].value = this.SortList
      this.workbookData = this.transform(this.data1)

    });
  }
  GetdefaultProject() {
    this.timesheetService.getDefaultProject().subscribe(result => {
      this.defaultProject = result;
      if (this.id == 0 && this.actionInfo != 11) {
        this.form.controls["projectId"].setValue(this.defaultProject);
      }
      if (this.defaultProject != 0) {
        this.showdescription == true;
      }
    });
  }
  GetTaskType() {
    debugger;
    this.timesheetService.getLookup(13, true).subscribe(result => {
      const keysToGroupOne: number[] = [16, 21, 22];
      debugger;
      this.Leavetasklist = [];
      this.Normaltasklist = [];
      result.forEach(item => {
        if (keysToGroupOne.includes(item.key)) {
          this.Leavetasklist.push(item);
        } else {
          this.Normaltasklist.push(item);
        }
      });
      this.projecttypelist = [];
      this.projecttypelist = this.Normaltasklist;

      this.filterprojecttypelist = this.projecttypelist;
      if (this.actionInfo == 11 || this.id > 0) {
        this.projecttypelist = [];
        this.projecttypelist = result;
        this.filterprojecttypelist = this.projecttypelist;

      }
      this.data1[0].values[1].value = this.projecttypelist
      this.workbookData = this.transform(this.data1)
    });
  }
  get(refresh: boolean) {
    debugger
    if (this.id > 0) {
      this.timesheetService.gettimesheetById(this.id, refresh).subscribe(result => {
        this.data = result;
        if (this.data) {
          //this.form.controls['hours'].setValue("13:03")
          if (this.data.description) {
            this.showdescription = true
          }
          debugger
          const formattedHours = this.convertMinutesToHHMM(this.data.hours);
          console.log(formattedHours, "formattedHours");
          let apivalue = formattedHours;

          let form1 = "00";
          let form2 = "00";
          let sampletimearray = []
          if (apivalue) {
            sampletimearray = apivalue.split(':');        // sampletimearray = ["07","30"]
          }
          form1 = sampletimearray[0];       // form1 = "07"
          form2 = sampletimearray[1];       // form2 = "30"
          this.form.controls["A"].setValue(form1);
          this.form.controls["B"].setValue(form2);
          this.form.patchValue(this.data);
          this.form.controls['hours'].setValue(formattedHours);
          if (this.data.isLeave == true) {
            debugger
            this.form.controls['IsLeave'].setValue(1);
            // this.isLeave = false
          }
          else {
            this.form.controls['IsLeave'].setValue(2);
          }
        }
      });
      this.isReadOnly = true;
      this.disabled = true;
    }
  }

  getgriddatabydate(object: any) {
    debugger
    if (moment.isMoment(object)) {
      //this.dataSource.data=[];
      var d = object.toDate();
      let entryDate = moment(d).format("YYYY-MM-DD") + " 00:00:00";
      console.log('edate', entryDate)
      this.timesheetService.getTimesheetByDate(this.UserId, entryDate, true).subscribe(result => {
        debugger
        if (result.length === 0) {
          debugger
          this.dataSource.data = [];
        }
        this.data = result;
        for (let item of this.data) {
          const convertedData = this.data.map(entry => ({
            ...entry,
            hours: this.convertMinutesToHHMM(entry.hours)
          }));
          this.dataSource = new MatTableDataSource(convertedData);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      });
    }
  }
  getgriddatabycurrentdate() {
    var d = moment().startOf('day').toDate();
    let entryDate = moment(d).format("YYYY-MM-DD") + " 00:00:00";
    this.timesheetService.getTimesheetByDate(this.UserId, entryDate, true).subscribe(result => {
      if (result.length === 0) {
        debugger
        this.dataSource.data = [];
      }
      this.data = result;
      for (let item of this.data) {
        const convertedData = this.data.map(entry => ({
          ...entry,
          hours: this.convertMinutesToHHMM(entry.hours)
        }));
        this.dataSource = new MatTableDataSource(convertedData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  getgrid(userId: any, refresh: boolean) {
    debugger;
    if (this.date) {
      let entryDate = moment(this.date).format("YYYY-MM-DD") + " 00:00:00";
      this.timesheetService.getTimesheetByDate(userId, entryDate, refresh).subscribe(result => {
        this.data = result;
        console.log('data', this.data);
        debugger;
        for (let item of this.data) {
          const convertedData = this.data.map(entry => ({
            ...entry,
            hours: this.convertMinutesToHHMM(entry.hours)
          }));
          debugger;
          console.log('convert ', convertedData)
          if (this.actionInfo == 11 || this.actionInfo == 2) {
            this.dataSource = new MatTableDataSource(convertedData);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.editData(this.dataSource.data[0], false)
          }
          this.form.controls['entryDate'].setValue(entryDate);
          this.disabled = true;
          if (this.data.isLeave == true) {
            this.form.controls['IsLeave'].setValue(true);
          }
        }
      });
      this.isReadOnly = true;
    }
    if (this.actionInfo == 11) {
      this.View = true;
      this.form.controls['hours'].setValue(null);
    }
  }

  convertMinutesToHHMM(minutes: number): string {
    console.log(minutes, ">>>>>>>>>>>>>>>>>>>>>>");
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    // const hoursStr = hours < 10 ? '0' + hours : '' + hours;
    // const minutesStr = remainingMinutes < 10 ? '0' + remainingMinutes : '' + remainingMinutes;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
  }


  goToAction(id: number, actioninfo: number) {
    debugger;
    this.navigationService.goToTimeSheet(id, actioninfo);
  }

  editData(dataField: any, editTrue: boolean) {
    debugger
    console.log('edit data', dataField)
    if (editTrue == true) {
      this.form.patchValue(dataField);

      // Splitting the hours and minutes from the 'hours' field
      const [hours, minutes] = dataField.hours.split(':');

      // Setting values of inputs 'A' and 'B'
      this.form.controls['A'].setValue(hours);
      this.form.controls['B'].setValue(minutes);
      if (dataField.isLeave == true) {
        this.form.controls['IsLeave'].setValue(true);
      }
      else {
        this.form.controls['IsLeave'].setValue(2);
      }
    }
  }

  private formatWithLeadingZero(value: number): string {
    return value.toString().padStart(2, '0');
  }
  validateFormControl() {
    debugger;
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true
        });
      }
    })
  }
  onSubmitInEdit() {
    this.loading = true;
    debugger
    const hoursPart = this.form.value.A;
    const minutesPart = this.form.value.B;
    const timeInput = `${hoursPart}:${minutesPart}`;
    console.log(timeInput, '>>>>>+++++');

    if (timeInput !== "00:00") {
      const calculatedHours = moment.duration(timeInput).asMinutes();
      console.log(calculatedHours,);

      const timesheetData =
      {
        id: this.form.value.id,
        entryDate: moment(this.form.value.entryDate).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        //hours: parseInt(moment(this.form.value.hours).format("HH")) * 60 + parseInt(moment(this.form.value.hours).format("mm")),
        hours: calculatedHours,
        description: this.form.value.description,
        projectId: this.form.value.projectId,
        taskTypeId: this.form.value.taskTypeId,
        employeeId: this.userSessionService.userId(),
        isLeave: this.form.value.IsLeave == 1 ? true : false,
        taskId: 0,
        timeIn: null,
        timeOut: null,
        taskStatusId: 0,
        approvedStatusType: 1
      };
      this.datalist.push(timesheetData);
      let data = {
        timesheets: this.datalist
      }
      this.timesheetService.savetimsheet(data).subscribe(result => {
        debugger
        this.loading = false;
        console.log('ta', result);
        if (result && result.isSuccess) {
          if (this.actionInfo == 0) {
            this._location.back();
            this.alertService.success("Time Sheet Updated Successfully");
          }
          else {
            this._location.back();
            this.form.reset();
            this.alertService.success(this.id == 0 ? "Time Sheet Saved Successfully" : "Time Sheet Updated Successfully");
            this.getgrid(this.UserId, true);
            this.clearData();
          }

        }
        else {
          if (result.failures == "test1") {
            this.alertService.warning("Your time limit is exeed for this particular date, so you are not able to update value");
            this.temproraryList.pop();
          }
          else {
            this.alertService.warning("You already entered as leave for this particular date, so you are not able to update value");
            this.temproraryList.pop();
          }
        }
      });
    } else {
      this.validateFormControl();
      this.form.controls["hours"].setErrors({ required: true });
      this.loading = false;
    }
  }
  onSubmit() {
    debugger
    if (this.list.length > 0 || this.actionInfo == 2) {
      this.loading = true;
      let filterData = []
      let data = {
        timesheets: this.datalist
      }
      debugger

      this.timesheetService.savetimsheet(data).subscribe(result => {
        this.loading = false;
        if (result && result.isSuccess) {
          this._location.back();
          this.alertService.success(this.id == 0 ? "Time Sheet Saved Successfully" : "Time Sheet Updated Successfully");

        }
        else {
          if (result.failures == "test1") {
            Swal.fire({
              icon: 'warning',
              title: 'Time Limit Exceeded',
              text: 'Your time limit is exceeded for this particular date, so you are not able to add value'
            }).then(() => {
              this.temproraryList.pop();
            });
          }
          else if (result.failures == "test2") {
            Swal.fire({
              icon: 'warning',
              title: 'Already Entered as Present',
              text: 'You already entered as Present for this particular date, so you are not able to add value as leave'
            }).then(() => {
              this.temproraryList.pop();
            });
          }
          else {
            Swal.fire({
              icon: 'warning',
              title: 'Entry Already Exists',
              text: 'You have already entered a task for this particular date. Please modify the existing entry or choose another date.',
            }).then(() => {
              this.temproraryList.pop();
            });
          }
        }

      });
    }
    else {
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
  onbtnClick(option: number) {
    debugger
    if (option === 1) {
      debugger
      this.form.patchValue({ IsLeave: 1 });
      this.form.controls['projectId'].setValue(142);
      this.form.controls['taskTypeId'].setValue(null);
      this.form.get('taskTypeId').clearValidators();
      this.form.get('taskTypeId').updateValueAndValidity();
      if (this.temproraryList.length > 0) {
        this.leavedisable = true;
        const keysToGroupOne: number[] = [21, 22];
        const tlist = [];
        debugger;
        this.Leavetasklist.forEach(item => {
          if (keysToGroupOne.includes(item.key)) {
            tlist.push(item);
          }
        });
        this.Leavetasklist = [];
        this.Leavetasklist = tlist;
      }
      else {
        this.leavedisable = false;
      }
      this.projecttypelist = [];
      this.projecttypelist = [];
      this.projecttypelist = this.Leavetasklist;
      this.filterprojecttypelist = this.projecttypelist;
      this.form.controls["A"].setValue("08");
      this.form.controls["B"].setValue("00");
      this.form.controls["taskTypeId"].setValue(16);
      this.editTrue = true;

    }
    else if (option === 2) {
      debugger
      this.form.controls['projectId'].setValue(null);
      this.form.controls['A'].setValue("00");
      this.form.controls['B'].setValue("00");
      this.form.controls['description'].setValue('')
      this.form.get('projectId').clearValidators();
      this.form.get('description').clearValidators();
      this.form.get('projectId').updateValueAndValidity();
      this.form.get('description').updateValueAndValidity();
      this.form.patchValue({ IsLeave: 2 });
      this.projecttypelist = this.Normaltasklist;
      this.filterprojecttypelist = this.projecttypelist;
      this.GetdefaultProject();
      this.leavedisable = true;
      this.editTrue = false;
    }
  }
  excel() {

  }
  onDelete(dataField: any, i) {
    debugger
    let localData = this.list;
    let localData1 = this.datalist;
    const index1 = this.list.findIndex(loc => loc.localid == dataField.localid);
    const index = this.dataSource.data.findIndex(loc => loc.localid == dataField.localid);
    console.log(localData, "878");
    console.log(localData1, "978");
    console.log(this.dataSource.data, "978");
    console.log(this.temproraryList, "978");
    console.log(this.data, "978");
    console.log(index, "978");
    console.log(index1, "978");
    console.log(this.dataSource.data[index], "978");
    console.log(this.list[index1], "978");
    console.log(dataField, "978");

    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this Data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((willDelete) => {
      if (willDelete.value) {
        if (dataField.id == 0 || dataField.id == null) {
          let localdelete = this.dataSource.data
          this.datalist.splice(index1, 1);
          this.list.splice(index1, 1);
          this.temproraryList.splice(index1, 1);
          const data = this.dataSource.data;
          this.data.splice(index, 1);
          data.splice((this.paginator.pageIndex * this.paginator.pageSize) + i, 1);
          this.dataSource.data = data;
        }
        else {
          this.timesheetService.delete(dataField.id).subscribe(res => {
            if (res.isSuccess) {
              Swal.fire('Deleted!', 'Your Data has been deleted.', 'success');
              this.dataSource.data = this.dataSource.data.filter(e => e.id != dataField.id);
              this.data.splice(i, 1);
            }
          })
        }
      }
      else {
        Swal.fire('Cancelled', 'Your Data is safe :)', 'error');
      }
    });
  }

  generateExcelWithDropdown(): void {

  }

  clearData() {
    this.form.controls['entryDate'].clearValidators();
    this.form.controls['entryDate'].setValue(this.date);
    this.form.controls['IsLeave'].setValue(this.form.value.IsLeave = 2);
    this.form.controls['projectId'].clearValidators();
    this.form.controls['projectId'].setValue('');
    this.form.controls['taskTypeId'].clearValidators();
    this.form.controls['taskTypeId'].setValue('');
    this.form.controls['hours'].clearValidators();
    this.form.controls['hours'].setValue('');
    this.form.controls["hours"].setValue("00:00");
    this.form.controls['description'].clearValidators();
    this.form.controls['description'].setValue('');
    this.editTrue = false;
    this.id = 0;
    this.isLeave = true;
    this.projecttypelist = [];
    this.projecttypelist = this.Normaltasklist;
    this.filterprojecttypelist = this.projecttypelist;
    this.GetdefaultProject();
    this.onbtnClick(2);
  }

   transform(data) {
    debugger
    const noOfRowsToGenerate = 10;
    return data.map(({ value, values }) => {
      const headers = values.reduce((prev, next) => ({
        ...prev,
        [next.header]: Array.isArray(next.value) ? next.value.map(({ value }) => value) : next.value
      }), {});
  
      // Find the dropdown value
      const dropdownValueObject = values.find(({ header }) => header === 'Dropdown'); // Assuming the dropdown header is 'Dropdown'
      const dropdownValue = dropdownValueObject ? dropdownValueObject.value : null; // Get the dropdown value if found, otherwise set it to null
  
      // Storing key-value pairs and selected dropdown value
      const rows = Array(noOfRowsToGenerate).fill({ ...headers, dropdownValue });
  
      return {
        workSheet: value,
        rows
      };
    });
  }
  
  exportAsXLSX(): void {
    debugger
    console.log(this.workbookData)
    console.log(this.data1)
    console.log(this.SortList)
    console.log(this.projecttypelist)
    this.ExcelService.exportAsExcelFiles(this.workbookData, "sample");
  }




async downloadTemplate(): Promise<void> {
  const wb: ExcelJS.Workbook = new ExcelJS.Workbook();
  // const worksheet: ExcelJS.Worksheet = wb.addWorksheet('User') as any;
  // const dataValidations = (worksheet as any).dataValidations;

  const userCategoryNames = await this.timesheetService.getproject();
  const districtNames = await this.timesheetService.getLookup(13,true);
  const stateNames = await this.timesheetService.getproject();
  const workplaceNames = await this.timesheetService.getproject();

  forkJoin([userCategoryNames, districtNames, stateNames, workplaceNames]).subscribe(data => {
    const [userCategoryNames, districtNames, stateNames, workplaceNames] = data;

    // Sheets
    const worksheet: ExcelJS.Worksheet = wb.addWorksheet('User');
    const stateSheet: ExcelJS.Worksheet = wb.addWorksheet('State');
    const districtSheet: ExcelJS.Worksheet = wb.addWorksheet('District');
    const workplaceSheet: ExcelJS.Worksheet = wb.addWorksheet('Workplace');
    const userCategoryValues = userCategoryNames.map(item => item.name).join(', ');
    const districtValues = districtNames.map(item => item.name).join(', ');
    const stateValues = stateNames.map(item => item.value).join(', ');
    const workplaceValues = workplaceNames.map(item => item.workplacename).join(', ');
    console.log(districtValues, "districtValues");

    // Add headers

    const header = ['First Name', 'Last Name', 'OperatorId', 'Email', 'Mobile Number', 'User Category', 'State', 'District', 'Workplace'];

    worksheet.mergeCells('A1:I1');

    const titleCell = worksheet.getCell('A1');
    titleCell.value = 'New User';
    titleCell.alignment = { vertical: 'middle', horizontal: 'center' };

    titleCell.font = { bold: true, color: { argb: 'FFFFFF' } }; // Font color is white
    titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '040e5a' } }; // Background color is navy blue

    //Main sheet
    // Add the header row to the worksheet
    const headerRow = worksheet.addRow(header);

    // Format the header row
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFADD8E6' }, // Background color
        bgColor: { argb: 'FFFFFFFF' }, // Text color
      };

      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    headerRow.eachCell(cell => {
      cell.font = { bold: true }
    })
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };


    worksheet.getColumn(1).width = 15;
    worksheet.getColumn(2).width = 15;
    worksheet.getColumn(3).width = 15;
    worksheet.getColumn(4).width = 25;
    worksheet.getColumn(5).width = 25;
    worksheet.getColumn(6).width = 25;
    worksheet.getColumn(7).width = 15;
    worksheet.getColumn(8).width = 15;
    worksheet.getColumn(9).width = 15;



    //Populate data in the respective columns (dropdown list)


    const userArray = userCategoryValues.split(', ');
    userArray.forEach((value, rowIndex) => {
      worksheet.getCell(rowIndex + 3, 4).value = value;

    });

    const userCategoryKey = userCategoryNames.map(item => item.value).join(', ');

    let joineddropdownlist1 = userCategoryKey;

    console.log(joineddropdownlist1, "Formula")
    // let joineddropdownlist1 = "\"" + this.dropdownlist1.join(',') + "\"";


    for (let i = 3; i < 50; i++) {
      const cellAddress = 'F' + i;
      worksheet.getCell(cellAddress).dataValidation = {
        type: 'list',
        allowBlank: true,
        // formulae: [joineddropdownlist1],
        // formulae: [`"${joineddropdownlist1.join(",")}"`]
        formulae: [`"${joineddropdownlist1}"`]
      };
      worksheet.getCell(cellAddress).value = '';
    }



    // Another sheets


    const diheader = ['DistrictId', 'DName', 'StateId', 'StateName'];
    const stheader = ['Id', 'SName'];
    const wpheader = ['workplaceId', 'WName', 'DistrictId', 'DistrictName'];


    // State sheet

    const stheaderRow = stateSheet.addRow(stheader);

    stheaderRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFADD8E6' }, // Background color
        bgColor: { argb: 'FFFFFFFF' }, // Text color
      };

      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
    //Heading alignment
    stheaderRow.eachCell(cell => {
      cell.font = { bold: true }
    })

    stateSheet.getColumn(1).width = 15;
    stateSheet.getColumn(2).width = 20;

    const stateKey = stateNames.map(item => item.key).join(', ');
    const stateIdArray = stateKey.split(', ');


    stateIdArray.forEach((value, rowIndex) => {
      stateSheet.getCell(rowIndex + 2, 1).value = value;
    });

    const stateArray = stateValues.split(', ');
    stateArray.forEach((value, rowIndex) => {
      stateSheet.getCell(rowIndex + 2, 2).value = value;
    });

    const rangeName = 'StateNames'; // The name you want to assign

    const address = `State!$B2:B36$${stateNames.length + 1}`;

    wb.definedNames.add(address, rangeName)

    // worksheet.dataValidations.add('G3:G36', {
    //   type: 'list',
    //   allowBlank: true,
    //   formulae: ['StateNames'], // Use the named range you defined
    // });

    // District Sheet

    const diheaderRow = districtSheet.addRow(diheader);

    diheaderRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFADD8E6' }, // Background color
        bgColor: { argb: 'FFFFFFFF' }, // Text color
      };

      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    //Heading alignment

    diheaderRow.eachCell(cell => {
      cell.font = { bold: true }
    })
    diheaderRow.alignment = { vertical: 'middle', horizontal: 'center' };


    districtSheet.getColumn(1).width = 10;
    districtSheet.getColumn(2).width = 20;
    districtSheet.getColumn(3).width = 10;
    districtSheet.getColumn(4).width = 20;

    const disrictTitleCell = worksheet.getCell('A1')
    disrictTitleCell.alignment = { vertical: 'middle', horizontal: 'center' };

    disrictTitleCell.font = { bold: true, color: { argb: 'FFFFFF' } }; // Font color is white
    disrictTitleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '040e5a' } };



    const districtKey = districtNames.map(item => item.id).join(', ');
    const districtIdArray = districtKey.split(', ');


    districtIdArray.forEach((value, rowIndex) => {
      districtSheet.getCell(rowIndex + 2, 1).value = value;
    });

    const districtArray = districtValues.split(', ');

    districtArray.forEach((value, rowIndex) => {
      districtSheet.getCell(rowIndex + 2, 2).value = value;
    });

    const districtstateKey = districtNames.map(item => item.stateId).join(', ');
    const districtstateIdArrary = districtstateKey.split(', ');

    districtstateIdArrary.forEach((value, rowIndex) => {
      districtSheet.getCell(rowIndex + 2, 3).value = value;
    });

    const districtstateName = districtNames.map(item => item.stateName).join(', ');
    const districtstateNameArrary = districtstateName.split(', ');

    districtstateNameArrary.forEach((value, rowIndex) => {
      districtSheet.getCell(rowIndex + 2, 4).value = value;
    });

    // Name manager for dropdown


    const disrangeNames = 'districtNames'; // The name you want to assign

    const disaddress = `District!$B2:B700$${districtNames.length + 1}`;

    wb.definedNames.add(disaddress, disrangeNames)

    // worksheet.dataValidations.add('H3:H700', {
    //   type: 'list',
    //   allowBlank: true,
    //   formulae: ['districtNames'], // Use the named range you defined
    //   // formulae: ['=IF(\'Workplace Details\'!E3="ANDHRA PRADESH", District!B2:B13, IF(\'Workplace Details\'!E3="ASSAM", District!B14:B39, IF(\'Workplace Details\'!E3="ARUNACHAL PRADESH", District!B40:B54,IF(\'Workplace Details\'!E3="GUJARAT", District!B55:B84,) )))']
    // });
    const ran1 = 'AP';
    const disad1 = 'District!$B2:$B13$'
    wb.definedNames.add(disad1, ran1)

    const ran2 = 'AS';
    const disad2 = 'District!$B14:$B39$'
    wb.definedNames.add(disad2, ran2)

    const ran3 = 'AR';
    const disad3 = 'District!$B40:$B54$'
    wb.definedNames.add(disad3, ran3)

    const ran4 = 'GU';
    const disad4 = 'District!$B55:$B84$'
    wb.definedNames.add(disad4, ran4)

    const ran5 = 'BI';
    const disad5 = 'District!$B85:$B124$'
    wb.definedNames.add(disad5, ran5)

    const ran6 = 'HA';
    const disad6 = 'District!$B125:$B144$'
    wb.definedNames.add(disad6, ran6)

    const ran7 = 'HI';
    const disad7 = 'District!$B145:$B157$'
    wb.definedNames.add(disad7, ran7)

    const ran8 = 'JK';
    const disad8 = 'District!$B158:$B174$'
    wb.definedNames.add(disad8, ran8)

    const ran9 = 'KR';
    const disad9 = 'District!$B175:$B205$'
    wb.definedNames.add(disad9, ran9)

    const ran10 = 'KE';
    const disad10 = 'District!$B206:$B221$'
    wb.definedNames.add(disad10, ran10)

    const ran11 = 'MP';
    const disad11 = 'District!$B222:$B273$'
    wb.definedNames.add(disad11, ran11)

    const ran12 = 'MH';
    const disad12 = 'District!$B274:$B315$'
    wb.definedNames.add(disad12, ran12)

    const ran13 = 'MR';
    const disad13 = 'District!$B316:$B324$'
    wb.definedNames.add(disad13, ran13)

    const ran14 = 'ME';
    const disad14 = 'District!$B325:$B331$'
    wb.definedNames.add(disad14, ran14)

    const ran15 = 'MZ';
    const disad15 = 'District!$B332:$B339$'
    wb.definedNames.add(disad15, ran15)

    const ran16 = 'NL';
    const disad16 = 'District!$B340:$B350$'
    wb.definedNames.add(disad16, ran16)

    const ran17 = 'OR';
    const disad17 = 'District!$B351:$B381$'
    wb.definedNames.add(disad17, ran17)

    const ran18 = 'PU';
    const disad18 = 'District!$B382:$B403$'
    wb.definedNames.add(disad18, ran18)

    const ran19 = 'RJ';
    const disad19 = 'District!$B404:$B435$'
    wb.definedNames.add(disad19, ran19)

    const ran20 = 'SI';
    const disad20 = 'District!$B436:$B439$'
    wb.definedNames.add(disad20, ran20)

    const ran21 = 'TN';
    const disad21 = 'District!$B440:$B472$'
    wb.definedNames.add(disad21, ran21)

    const ran22 = 'TP';
    const disad22 = 'District!$B473:$B476$'
    wb.definedNames.add(disad22, ran22)

    const ran23 = 'UP';
    const disad23 = 'District!$B477:$B551$'
    wb.definedNames.add(disad23, ran23)

    const ran24 = 'WB';
    const disad24 = 'District!$B552:$B588$'
    wb.definedNames.add(disad24, ran24)

    const ran25 = 'DH';
    const disad25 = 'District!$B589:$B599$'
    wb.definedNames.add(disad25, ran25)

    const ran26 = 'GO';
    const disad26 = 'District!$B600:$B601$'
    wb.definedNames.add(disad26, ran26)

    const ran27 = 'PO';
    const disad27 = 'District!$B602:$B603$'
    wb.definedNames.add(disad27, ran27)

    const ran28 = 'LD';
    const disad28 = 'District!$B604:$B604$'
    wb.definedNames.add(disad28, ran28)

    const ran29 = 'DD';
    const disad29 = 'District!$B605:$B606$'
    wb.definedNames.add(disad29, ran29)

    const ran30 = 'DN';
    const disad30 = 'District!$B607:$B608$'
    wb.definedNames.add(disad30, ran30)

    const ran31 = 'CD';
    const disad31 = 'District!$B609:$B609$'
    wb.definedNames.add(disad31, ran31)

    const ran32 = 'AN';
    const disad32 = 'District!$B610:$B615$'
    wb.definedNames.add(disad32, ran32)

    const ran33 = 'UK';
    const disad33 = 'District!$B616:$B628$'
    wb.definedNames.add(disad33, ran33)

    const ran34 = 'JR';
    const disad34 = 'District!$B629:$B654$'
    wb.definedNames.add(disad34, ran34)

    const ran35 = 'CG';
    const disad35 = 'District!$B655:$B658$'
    wb.definedNames.add(disad35, ran35)

    const ran36 = 'TI';
    const disad36 = 'District!$B659:$B689$'
    wb.definedNames.add(disad36, ran36)

    // worksheet.dataValidations.add('H3:H700', {
    //   type: 'list',
    //   allowBlank: true,
    //   formulae: ['=IF(\'User\'!G3="ANDHRA PRADESH", AP, IF(\'User\'!G3="ASSAM", AS, IF(\'User\'!G3="ARUNACHAL PRADESH", AR,IF(\'User\'!G3="GUJARAT", GU,IF(\'User\'!G3="BIHAR", BI,IF(\'User\'!G3="HARYANA", HA,IF(\'User\'!G3="HIMACHAL PRADESH", HI,IF(\'User\'!G3="JAMMU AND KASHMIR", JK,IF(\'User\'!G3="KARNATAKA", KR,IF(\'User\'!G3="KERALA", KE,IF(\'User\'!G3="MADHYA PRADESH", MP,IF(\'User\'!G3="MAHARASHTRA", MH,IF(\'User\'!G3="MANIPUR", MR,IF(\'User\'!G3="MEGHALAYA", ME,IF(\'User\'!G3="MIZORAM", MZ,IF(\'User\'!G3="NAGALAND", NL,IF(\'User\'!G3="ORISSA", OR,IF(\'User\'!G3="PUNJAB", PU,IF(\'User\'!G3="RAJASTHAN", RJ,IF(\'User\'!G3="SIKKIM", SI,IF(\'User\'!G3="TAMIL NADU", TN,IF(\'User\'!G3="TRIPURA", TP,IF(\'User\'!G3="UTTAR PRADESH", UP,IF(\'User\'!G3="WEST BENGAL", WB,IF(\'User\'!G3="DELHI", DH,IF(\'User\'!G3="GOA", GO,IF(\'User\'!G3="PONDICHERRY", PO,IF(\'User\'!G3="LAKSHADWEEP", LD,IF(\'User\'!G3="DAMAN AND DIU", DD,IF(\'User\'!G3="DADRA AND NAGAR HAVELI", DN,IF(\'User\'!G3="CHANDIGARH", CD,IF(\'User\'!G3="ANDAMAN AND NICOBAR ISLAN", AN,IF(\'User\'!G3="UTTARAKHAND", UK,IF(\'User\'!G3="JHARKHAND", JR,IF(\'User\'!G3="CHATISGARH", CG,IF(\'User\'!G3="TELANGANA", TE, ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) )))']
    // });



    // workplace sheet

    const wpheaderRow = workplaceSheet.addRow(wpheader);

    wpheaderRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFADD8E6' }, // Background color
        bgColor: { argb: 'FFFFFFFF' }, // Text color
      };

      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    //Heading alignment

    wpheaderRow.eachCell(cell => {
      cell.font = { bold: true }
    })
    wpheaderRow.alignment = { vertical: 'middle', horizontal: 'center' };

    workplaceSheet.getColumn(1).width = 10;
    workplaceSheet.getColumn(2).width = 20;
    workplaceSheet.getColumn(3).width = 10;
    workplaceSheet.getColumn(4).width = 20;

    const wpTitleCell = worksheet.getCell('A1')
    wpTitleCell.alignment = { vertical: 'middle', horizontal: 'center' };

    titleCell.font = { bold: true, color: { argb: 'FFFFFF' } }; // Font color is white
    titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '040e5a' } };


    const wpAr = workplaceValues.split(', ');
    wpAr.forEach((value, rowIndex) => {
      workplaceSheet.getCell(rowIndex + 2, 1).value = value;

    });

    // workplaceSheet.dataValidations.add('J3:J500', {

    //   formula1: wpAr,

    // });


    const wpKey = workplaceNames.map(item => item.id).join(', ');
    const wpIdArray = wpKey.split(', ');


    wpIdArray.forEach((value, rowIndex) => {
      workplaceSheet.getCell(rowIndex + 2, 1).value = value;
    });

    const wpArray = workplaceValues.split(', ');

    wpArray.forEach((value, rowIndex) => {
      workplaceSheet.getCell(rowIndex + 2, 2).value = value;
    });


    const wpdistricteKey = workplaceNames.map(item => item.districtId).join(', ');
    const wpdistrictIdArrary = wpdistricteKey.split(', ');

    wpdistrictIdArrary.forEach((value, rowIndex) => {
      workplaceSheet.getCell(rowIndex + 2, 3).value = value;
    });

    const wpdistrictName = workplaceNames.map(item => item.districtName).join(', ');
    const wpdistricteNameArrary = wpdistrictName.split(', ');

    wpdistricteNameArrary.forEach((value, rowIndex) => {
      workplaceSheet.getCell(rowIndex + 2, 4).value = value;
    });



    const wprangeNames = 'workplaceNames'; // The name you want to assign

    const wpaddress = `Workplace!$B2:B700$${workplaceNames.length + 1}`;

    wb.definedNames.add(wpaddress, wprangeNames)

    // worksheet.dataValidations.add('I3:I500', {
    //   type: 'list',
    //   allowBlank: true,
    //   formulae: ['workplaceNames'], // Use the named range you defined
    // });


    const wprang1 = 'TRV';
    const wpad1 = 'Workplace!$B2:$B7$'
    wb.definedNames.add(wpad1, wprang1)

    const wprang2 = 'CHE';
    const wpad2 = 'Workplace!$B8:$B28$'
    wb.definedNames.add(wpad2, wprang2)

    const wprang3 = 'KCP';
    const wpad3 = 'Workplace!$B29:$B36$'
    wb.definedNames.add(wpad3, wprang3)

    const wprang4 = 'VEL';
    const wpad4 = 'Workplace!$B37:$B44$'
    wb.definedNames.add(wpad4, wprang4)

    const wprang5 = 'DHP';
    const wpad5 = 'Workplace!$B45:$B46$'
    wb.definedNames.add(wpad5, wprang5)

    const wprang6 = 'TRM';
    const wpad6 = 'Workplace!$B47:$B50$'
    wb.definedNames.add(wpad6, wprang6)

    const wprang7 = 'VPM';
    const wpad7 = 'Workplace!$B51:$B53$'
    wb.definedNames.add(wpad7, wprang7)

    const wprang8 = 'SAM';
    const wpad8 = 'Workplace!$B54:$B59$'
    wb.definedNames.add(wpad8, wprang8)

    const wprang9 = 'NAL';
    const wpad9 = 'Workplace!$B60:$B60$'
    wb.definedNames.add(wpad9, wprang9)

    const wprang10 = 'ERO';
    const wpad10 = 'Workplace!$B61:$B66$'
    wb.definedNames.add(wpad10, wprang10)

    const wprang11 = 'COM';
    const wpad11 = 'Workplace!$B67:$B79$'
    wb.definedNames.add(wpad11, wprang11)

    const wprang12 = 'DNL';
    const wpad12 = 'Workplace!$B80:$B82$'
    wb.definedNames.add(wpad12, wprang12)

    const wprang13 = 'KAR';
    const wpad13 = 'Workplace!$B83:$B83$'
    wb.definedNames.add(wpad13, wprang13)

    const wprang14 = 'TCP';
    const wpad14 = 'Workplace!$B84:$B89$'
    wb.definedNames.add(wpad14, wprang14)

    const wprang15 = 'PER';
    const wpad15 = 'Workplace!$B90:$B90$'
    wb.definedNames.add(wpad15, wprang15)

    const wprang16 = 'CUD';
    const wpad16 = 'Workplace!$B91:$B94$'
    wb.definedNames.add(wpad16, wprang16)

    const wprang17 = 'NAP';
    const wpad17 = 'Workplace!$B95:$B96$'
    wb.definedNames.add(wpad17, wprang17)

    const wprang18 = 'TRV';
    const wpad18 = 'Workplace!$B97:$B98$'
    wb.definedNames.add(wpad18, wprang18)

    const wprang19 = 'THR';
    const wpad19 = 'Workplace!$B99:$B102$'
    wb.definedNames.add(wpad19, wprang19)

    const wprang20 = 'PUK';
    const wpad20 = 'Workplace!$B103:$B104$'
    wb.definedNames.add(wpad20, wprang20)

    const wprang21 = 'SVG';
    const wpad21 = 'Workplace!$B105:$B106$'
    wb.definedNames.add(wpad21, wprang21)


    const wprang22 = 'MDR';
    const wpad22 = 'Workplace!$B107:$B115$'
    wb.definedNames.add(wpad22, wprang22)

    const wprang23 = 'THE';
    const wpad23 = 'Workplace!$B116:$B117$'
    wb.definedNames.add(wpad23, wprang23)

    const wprang24 = 'VDN';
    const wpad24 = 'Workplace!$B118:$B120$'
    wb.definedNames.add(wpad24, wprang24)

    const wprang25 = 'RNP';
    const wpad25 = 'Workplace!$B121:$B123$'
    wb.definedNames.add(wpad25, wprang25)

    const wprang26 = 'TTN';
    const wpad26 = 'Workplace!$B124:$B124$'
    wb.definedNames.add(wpad26, wprang26)

    const wprang27 = 'TVI';
    const wpad27 = 'Workplace!$B125:$B128$'
    wb.definedNames.add(wpad27, wprang27)

    const wprang28 = 'KYR';
    const wpad28 = 'Workplace!$B129:$B133$'
    wb.definedNames.add(wpad28, wprang28)

    const wprang29 = 'KNI';
    const wpad29 = 'Workplace!$B134:$B135$'
    wb.definedNames.add(wprang28, wpad28)

    const wprang30 = 'TUR';
    const wpad30 = 'Workplace!$B136:$B136$'
    wb.definedNames.add(wpad30, wprang30)

    const wprang31 = 'BGK';
    const wpad31 = 'Workplace!$B137:$B140$'
    wb.definedNames.add(wpad31, wprang31)


    const wprang32 = 'BGL';
    const wpad32 = 'Workplace!$B141:$B146$'
    wb.definedNames.add(wpad32, wprang32)


    const wprang33 = 'BLM';
    const wpad33 = 'Workplace!$B147:$B153$'
    wb.definedNames.add(wpad33, wprang33)

    const wprang34 = 'BRY';
    const wpad34 = 'Workplace!$B154:$B154$'
    wb.definedNames.add(wpad34, wprang34)

    const wprang35 = 'BDR';
    const wpad35 = 'Workplace!$B155:$B156$'
    wb.definedNames.add(wpad35, wprang35)

    const wprang36 = 'CRN';
    const wpad36 = 'Workplace!$B157:$B157$'
    wb.definedNames.add(wpad36, wprang36)

    const wprang37 = 'CDA';
    const wpad37 = 'Workplace!$B158:$B159$'
    wb.definedNames.add(wpad37, wprang37)

    const wprang38 = 'DNE';
    const wpad38 = 'Workplace!$B160:$B160$'
    wb.definedNames.add(wpad38, wprang38)

    const wprang39 = 'DRD';
    const wpad39 = 'Workplace!$B161:$B164$'
    wb.definedNames.add(wpad39, wprang39)

    const wprang40 = 'GDG';
    const wpad40 = 'Workplace!$B165:$B165$'
    wb.definedNames.add(wpad40, wprang40)

    const wprang41 = 'GLA';
    const wpad41 = 'Workplace!$B166:$B166$'
    wb.definedNames.add(wpad41, wprang41)

    const wprang42 = 'HSN';
    const wpad42 = 'Workplace!$B167:$B168$'
    wb.definedNames.add(wpad42, wprang42)

    const wprang43 = 'HVI';
    const wpad43 = 'Workplace!$B169:$B169$'
    wb.definedNames.add(wpad43, wprang43)

    const wprang44 = 'KLR';
    const wpad44 = 'Workplace!$B170:$B171$'
    wb.definedNames.add(wpad44, wprang44)

    const wprang45 = 'KPL';
    const wpad45 = 'Workplace!$B172:$B173$'
    wb.definedNames.add(wpad45, wprang45)

    const wprang46 = 'MSR';
    const wpad46 = 'Workplace!$B174:$B175$'
    wb.definedNames.add(wpad46, wprang46)

    const wprang47 = 'RCR';
    const wpad47 = 'Workplace!$B176:$B176$'
    wb.definedNames.add(wpad47, wprang47)

    const wprang48 = 'RNR';
    const wpad48 = 'Workplace!$B177:$B177$'
    wb.definedNames.add(wpad48, wprang48)

    const wprang49 = 'SMG';
    const wpad49 = 'Workplace!$B178:$B180$'
    wb.definedNames.add(wpad49, wprang49)

    const wprang50 = 'TKR';
    const wpad50 = 'Workplace!$B181:$B183$'
    wb.definedNames.add(wpad50, wprang50)

    const wprang51 = 'UDP';
    const wpad51 = 'Workplace!$B184:$B185$'
    wb.definedNames.add(wpad51, wprang51)

    const wprang52 = 'UKD';
    const wpad52 = 'Workplace!$B186:$B186$'
    wb.definedNames.add(wpad52, wprang52)

    const wprang53 = 'YGR';
    const wpad53 = 'Workplace!$B187:$B190$'
    wb.definedNames.add(wpad53, wprang53)

    const wprang54 = 'APZ';
    const wpad54 = 'Workplace!$B191:$B203$'
    wb.definedNames.add(wpad54, wprang54)

    const wprang55 = 'EKM';
    const wpad55 = 'Workplace!$B204:$B208$'
    wb.definedNames.add(wpad55, wprang55)

    const wprang56 = 'IKI';
    const wpad56 = 'Workplace!$B209:$B216$'
    wb.definedNames.add(wpad56, wprang56)

    const wprang57 = 'KUR';
    const wpad57 = 'Workplace!$B217:$B223$'
    wb.definedNames.add(wpad57, wprang57)

    const wprang58 = 'KRG';
    const wpad58 = 'Workplace!$B224:$B226$'
    wb.definedNames.add(wpad58, wprang58)

    const wprang59 = 'KLM';
    const wpad59 = 'Workplace!$B227:$B232$'
    wb.definedNames.add(wprang58, wprang59)

    const wprang60 = 'KTM';
    const wpad60 = 'Workplace!$B233:$B243$'
    wb.definedNames.add(wpad60, wprang60)

    const wprang61 = 'KZD';
    const wpad61 = 'Workplace!$B244:$B249$'
    wb.definedNames.add(wpad61, wprang61)

    const wprang62 = 'MPR';
    const wpad62 = 'Workplace!$B250:$B253$'
    wb.definedNames.add(wpad62, wprang62)

    const wprang63 = 'PKD';
    const wpad63 = 'Workplace!$B254:$B268$'
    wb.definedNames.add(wpad63, wprang63)

    const wprang64 = 'PMT';
    const wpad64 = 'Workplace!$B269:$B274$'
    wb.definedNames.add(wpad64, wprang64)

    const wprang65 = 'TVM';
    const wpad65 = 'Workplace!$B275:$B275$'
    wb.definedNames.add(wpad65, wprang65)

    const wprang66 = 'TSR';
    const wpad66 = 'Workplace!$B276:$B281$'
    wb.definedNames.add(wpad66, wprang66)

    const wprang67 = 'WYD';
    const wpad67 = 'Workplace!$B282:$B283$'
    wb.definedNames.add(wpad67, wprang67)

    const wprang68 = 'PDY';
    const wpad68 = 'Workplace!$B284:$B284$'
    wb.definedNames.add(wpad68, wprang68)

    const wprang69 = 'MBI';
    const wpad69 = 'Workplace!$B285:$B285$'
    wb.definedNames.add(wpad69, wprang69)

    const wprang70 = 'SAM';
    const wpad70 = 'Workplace!$B286:$B286$'
    wb.definedNames.add(wpad70, wprang70)

    const wprang71 = 'NMA';
    const wpad71 = 'Workplace!$B287:$B289$'
    wb.definedNames.add(wpad71, wprang71)

    const wprang72 = 'KRL';
    const wpad72 = 'Workplace!$B290:$B290$'
    wb.definedNames.add(wpad72, wprang72)

    // worksheet.dataValidations.add('I3:I500', {
    //   type: 'list',
    //   allowBlank: true,
    //   formulae: ['=IF(\'User\'!H3="TIRUVALLUR", TRV, IF(\'User\'!H3="CHENNAI", CHE, IF(\'User\'!H3="KANCHIPURAM", KCP, IF(\'User\'!H3="VELLORE", VEL, IF(\'User\'!H3="DHARMAPURI", DHP, IF(\'User\'!H3="TIRUVANNAMALAI", TRM,  IF(\'User\'!H3="VILLUPURAM", VPM, IF(\'User\'!H3="SALEM", SAM, IF(\'User\'!H3="NAMAKKAL", NAL, IF(\'User\'!H3="ERODE", ERO, IF(\'User\'!H3="COIMBATORE", COM, IF(\'User\'!H3="DINDIGUL", DNL, IF(\'User\'!H3="KARUR", KAR, IF(\'User\'!H3="TIRUCHIRAPPALLI", TCP, IF(\'User\'!H3="PERAMBALUR", PER, IF(\'User\'!H3="CUDDALORE", CUD, IF(\'User\'!H3="NAGAPATTINAM", NAP, IF(\'User\'!H3="TIRUVARUR", TRV, IF(\'User\'!H3="THANJAVUR", THR, IF(\'User\'!H3="PUDUKKOTTAI", PUK, IF(\'User\'!H3="SIVAGANGA", SVG, IF(\'User\'!H3="MADURAI", MDR, IF(\'User\'!H3="THENI", THE, IF(\'User\'!H3="VIRUDHUNAGAR", VDN, IF(\'User\'!H3="RAMANATHAPURAM", RNP, IF(\'User\'!H3="TUTICORIN", TTN, IF(\'User\'!H3="TIRUNELVELI", TVI, IF(\'User\'!H3="KANYAKUMARI", KYR, IF(\'User\'!H3="KRISHNAGIRI", KNI, IF(\'User\'!H3="TIRUPPUR", TUR, IF(\'User\'!H3="BAGALKOT", BGK, IF(\'User\'!H3="BANGALORE", BGL, IF(\'User\'!H3="BELGAUM", BLM, IF(\'User\'!H3="BELLARY", BRY, IF(\'User\'!H3="CHAMARAJANAGAR", CRN, IF(\'User\'!H3="CHITRADURGA", CDA, IF(\'User\'!H3="DAVANGERE", DNE, IF(\'User\'!H3="DHARWAD", DRD, IF(\'User\'!H3="GADAG", GDG, IF(\'User\'!H3="GULBARGA", GLA, IF(\'User\'!H3="HASSAN", HSN, IF(\'User\'!H3="HAVERI", HVI, IF(\'User\'!H3="KOLAR", KLR, IF(\'User\'!H3="KOPPAL", KPL, IF(\'User\'!H3="MYSORE", MSR, IF(\'User\'!H3="RAICHUR", RCR, IF(\'User\'!H3="RAMANAGARAM", RNR, IF(\'User\'!H3="SHIMOGA", SMG, IF(\'User\'!H3="TUMKUR", TKR,  IF(\'User\'!H3="UDUPI", UDP, IF(\'User\'!H3="UTTARKANNADA", UKD, IF(\'User\'!H3="YADGIR", YGR, IF(\'User\'!H3="ALAPPUZHA", APZ, IF(\'User\'!H3="ERNAKULAM", EKM, IF(\'User\'!H3="IDUKKI", IKI, IF(\'User\'!H3="KANNUR", KUR, IF(\'User\'!H3="KASARGOD", KRG, IF(\'User\'!H3="KOLLAM", KLM, IF(\'User\'!H3="KOTTAYAM", KTM, IF(\'User\'!H3="KOZHIKODE", KZD, IF(\'User\'!H3="MALAPPURAM", MPR, IF(\'User\'!H3="PALAKKAD", PKD, IF(\'User\'!H3="PATHANAMTHITTA", PMT, IF(\'User\'!H3="THIRUVANANTHAPURAM", TVM, IF(\'User\'!H3="THRISSUR", TSR, IF(\'User\'!H3="WAYANAD", WYD, IF(\'User\'!H3="PONDICHERRY", PDY, IF(\'User\'!H3="MUMBAI", MBI, IF(\'User\'!H3="SOUTH ANDAMAN", SAM, IF(\'User\'!H3="NORTH AND MIDDLE ANDAMAN", NMA, IF(\'User\'!H3="KARAIKAL", KRL,"")))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))'],

    // });

    // worksheet.dataValidations.add('J3:J700', {
    //   type: 'list',
    //   allowBlank: true,
    //   formulae: ['=IF(\'User\'!I3="TIRUVALLUR", TR, IF(\'User\'!I3="CHENNAI", CH, IF(\'User\'!I3="KANCHIPURAM", KC, IF(\'User\'!I3="VELLORE", VE,IF(\'User\'!I3="DHARMAPURI", DP,IF(\'User\'!I3="TIRUVANNAMALAI", TM,IF(\'User\'!I3="VILLUPURAM", VP,IF(\'User\'!I3="SALEM", SM,IF(\'User\'!I3="NAMAKKAL", NM,IF(\'User\'!I3="ERODE", ER,IF(\'User\'!I3="COIMBATORE", CM,IF(\'User\'!I3="DINDIGUL", DG,IF(\'User\'!I3="KARUR", KU,IF(\'User\'!I3="TIRUCHIRAPPALLI", TC,IF(\'User\'!I3="PERAMBALUR", PR,IF(\'User\'!I3="CUDDALORE", CD,IF(\'User\'!I3="NAGAPATTINAM", NP,IF(\'User\'!I3="TIRUVARUR", TV,IF(\'User\'!I3="PUDUKKOTTAI", PU,IF(\'User\'!I3="SIVAGANGA", SG,IF(\'User\'!I3="MADURAI", MD,IF(\'User\'!I3="THENI", TH,IF(\'User\'!I3="VIRUDHUNAGAR", VN,IF(\'User\'!I3="VIRUDHUNAGAR", VN,IF(\'User\'!I3="RAMANATHAPURAM", RP,IF(\'User\'!I3="TUTICORIN", TN,IF(\'User\'!I3="TIRUNELVELI", TE,IF(\'User\'!I3="KANYAKUMARI", KM,IF(\'User\'!I3="KRISHNAGIRI", KK,IF(\'User\'!I3="TIRUPPUR", TP,IF(\'User\'!I3="BAGALKOT", BA,IF(\'User\'!I3="BANGALORE", BL,IF(\'User\'!I3="BELGAUM", BG,IF(\'User\'!I3="BELLARY", BR,IF(\'User\'!I3="BIDAR", BD,IF(\'User\'!I3="CHAMARAJANAGAR", CA, IF(\'User\'!I3="CHITRADURGA", CI, IF(\'User\'!I3="DAVANGERE", DR, IF(\'User\'!I3="DHARWAD", DD, )))) ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) )) )))']
    // });
    // Rest of your code to populate the Excel workbook...

    // Finally, save the workbook
    wb.xlsx.writeBuffer().then(buffer => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'template.xlsx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  });
}
}