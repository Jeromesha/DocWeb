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
      while (moment(nonEntryDate).day() === 0 || moment(nonEntryDate).day() === 6) {
        nonEntryDate = moment(nonEntryDate).add(1, 'day').format("YYYY-MM-DD");
      }
      this.formData.entryDate = nonEntryDate;
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
      this.getgriddatabycurrentdate();
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
    this.form.controls['hours'].setValidators(Validators.required);
    this.form.controls['hours'].updateValueAndValidity();
    this.form.controls['entryDate'].setValidators(Validators.required);
    this.form.controls['entryDate'].updateValueAndValidity();
    this.form.controls['taskTypeId'].setValidators(Validators.required);
    this.form.controls['taskTypeId'].updateValueAndValidity();
    this.form.controls['description'].setValidators(Validators.required);
    this.form.controls['description'].updateValueAndValidity();
    this.form.controls['projectId'].setValidators(Validators.required);
    this.form.controls['projectId'].updateValueAndValidity()
    debugger;
    // if (this.form.value.IsLeave === 1) {
    //   this.form.controls["taskTypeId"].clearValidators();
    //   this.form.controls["taskTypeId"].updateValueAndValidity();
    // }
    console.log(this.form.value.hours,'this.form.value.hours');
    
    if (this.form.value.A != "00" && this.form.value.B != "" && this.form.value.A != ""){
      if (this.form.valid) {
        const formData = this.form.value;
        const timeInput = this.form.value.hours;
        const concatenatedValue = `${this.form.get('A').value}:${this.form.get('B').value}`;
          console.log(concatenatedValue,'+++++++++');
        // this.form.controls["hours"].setErrors(null);
        this.form.controls["hours"].setErrors(null);
        const hoursA = parseInt(this.form.get('A').value);
        const hoursB = parseInt(this.form.get('B').value);
        const calculatedHours = (hoursA * 60) + hoursB;
        // const calculatedHours = moment.duration(timeInput).asMinutes();
        formData.hours = concatenatedValue;
        const projectData = this.filterSortList.find(x => x.key === formData.projectId);
        // formData.hours = calculatedHours
        formData.project = projectData ? projectData.value : null;
        this.temproraryList.push(formData);
        let sum = 0;
        this.temproraryList.forEach(i => {
          let hours = moment.duration(i.hours).asMinutes();
          //hours = parseInt(moment(hours).format("HH")) * 60 + (parseInt(moment(hours).format("mm")));
          sum += hours;
        })
        console.log(this.temproraryList,'this.temproraryList');
        
        // sum = sum * 60;
        if (sum >(24*60)) {
          console.log(sum,'++++++');
          this.alertService.warning("Work time is exceeded more than 24 hours");
          this.temproraryList.pop();
          console.log(this.temproraryList,'=======' );
          
          return;
        }
        this.isLeaveValue = formData.IsLeave;

        const tempedate = { ...formData, EmployeeId: this.userSessionService.userId(), TaskStatusId: 0, id: 0, };
        console.log('tempdate', tempedate);
        this.list.push(tempedate);


        for (let item of this.list) {
          
          const convertedData = this.list.map(entry => ({
            ...entry,
            hours: this.convertMinutesToHHMM(entry.hours)
          }));
          console.log(convertedData,">>>>>>>>>>>>>>>>>>>>>");
          
          // this.showgridlist.push(convertedData);
        }
        this.dataSource.data = this.list;
        this.datalist = this.list.map(item => ({
          entryDate: moment(item.entryDate).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
          //hours: (typeof (item.hours) == "string") ? item.hours : parseInt(moment(item.hours).format("HH")) * 60 + parseInt(moment(item.hours).format("mm")),
          //hours:moment.duration(item.hours).asMinutes(),
          hours: calculatedHours,
          description: item.description,
          projectId: item.projectId,
          taskId: 0,
          //employeeId: item.EmployeeId,
          employeeId: this.userSessionService.userId(),
          isLeave: item.IsLeave == 1 ? true : false,
          timeIn: null,
          timeOut: null,
          taskStatusId: 0,
          taskTypeId: item.taskTypeId,
          approvedStatusType: 1,
        }));

        // this.dataSource.data = this.showgridlist;
        this.date = moment(this.datalist[0].entryDate).format("YYYY-MM-DD"),
        this.form.reset({
          // entryDate: this.formData.entryDate,
           entryDate: this.date,
          IsLeave: 2
        });
        

        this.projecttypelist = this.Normaltasklist;
        this.filterprojecttypelist = this.projecttypelist;

        this.disabled = true;
        //this.onbtnClick(2);
        this.form.controls["hours"].setValue("00:00");
        this.form.controls["A"].setValue("00");
        this.form.controls["B"].setValue("00");
        console.log(tempedate.projectId, "pro ID ")
        this.form.controls["projectId"].setValue(tempedate.projectId);
        debugger
      }
    }
    else {
      this.validateFormControl();
      this.form.controls["hours"].setErrors({ required: true });
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
      A: ['08', [Validators.required, Validators.pattern('^(0[0-9]|1[0-9]|2[0-3])$')]],
      B: ['00', [Validators.required, Validators.pattern('^[0-5][0-9]$')]],
    });
  }
  sortingChange(event) {
    debugger
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
    // Cast the event target to an HTMLInputElement
    const inputElement = event.target as HTMLInputElement;

    // Select all text in the input box
    inputElement.select();
  }
  moveFocus(event: any, name: any) {
    debugger
    let value = event.target.value.replace(/[^0-9]*/g, '');

    //  event.target.addEventListener('click', (e: Event) => {
    //     (e.target as HTMLInputElement).select();
    // });
    
    if (event.key === 'Backspace' && value === '' && event.target === this.input2.nativeElement) {
      this.input1.nativeElement.focus();
    }
    if (value.length === 2 && event.target === this.input1.nativeElement) {
      this.input2.nativeElement.focus();
    }
    // Update the value only if it's not a backspace key press or if the value is not empty
    if (event.key !== 'Backspace' || value !== '') {
       event.target.value = value.padStart(2, '0');
    }
    // event.target.value = value.padStart(2, '0');
    // if (value.length === 2 && event.target === this.input1.nativeElement) {
    //   this.input2.nativeElement.focus();
    // }else if (value.length === 0 && event.key === 'Backspace' && event.target === this.input2.nativeElement) {
    //   this.input1.nativeElement.focus();
    // }
    if (event.key === 'Backspace') {
      if (!this.input1.nativeElement.value) {
        this.input1.nativeElement.focus()
      }  else if (!this.input2.nativeElement.value) {
        this.input1.nativeElement.focus();
      }
      else {
        if (!this.input1.nativeElement.value) {
          this.input1.nativeElement.focus()
        }
        else if (!this.input2.nativeElement.value) {
          this.input2.nativeElement.focus();
        }else {
          this.pinValue = '' + this.form.value.a + '' + this.form.value.b;
          if (this.pinValue.length == 2) {
          }
        }
      }
    }
    let form1 = this.form.get('A').value;
    let form2 = this.form.get('B').value;
    if(form1 && form1.length == 1) {
      form1 = "0" + form1;      // form1 = "08"
     this.form.controls["A"].setValue(form1);
    }
  }

  // onTimeKeyDown(event: KeyboardEvent) {
  //   // Get the current input value
  //   let inputValue: string = (event.target as HTMLInputElement).value;
  
  //   // Allow only backspace and numbers
  //   if (
  //     event.key !== 'Backspace' &&
  //     (event.key < '0' || event.key > '9')
  //   ) {
  //     event.preventDefault();
  //     return;
  //   }
  
  //   // Handle backspace
  //   if (event.key === 'Backspace') {
  //     // Remove the last character if it is a number
  //     if (inputValue.length > 0 && !isNaN(Number(inputValue.slice(-1)))) {
  //       inputValue = inputValue.slice(0, -1);
  //     }
  //   }
  
  //   // Convert to 24-hour format
  //   const [hours, minutes] = inputValue.split(':');
  //   const formattedHours = (hours.length === 1 ? '0' : '') + hours;
  
  //   // Update the input value
  //   (event.target as HTMLInputElement).value = `${formattedHours}:${minutes}`;
  // }
  

  onTimeKeyDown(event: KeyboardEvent) {
    // Allow only backspace and numbers
    if (
      event.key !== 'Backspace' &&
      (event.key < '0' || event.key > '9')

    ) {
      console.log(event.key,">>>>>>>>>>>>>>>>>>>>");
      
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
    console.log(hours,minutes);
    
    return `${hours}:${minutes}`;
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
      if (this.id == 0 && this.actionInfo != 11) {
        this.form.controls["projectId"].setValue(this.defaultProject);
      }
      if (this.defaultProject != 0) {
        this.showdescription == true;
      }
    });
  }

  // GetTaskType() {
  //   debugger
  //   this.timesheetService.getLookup(13, true).subscribe(result => {

  //     this.projecttypelist = result;

  //     console.log("task type", result)
  //     this.filterprojecttypelist = this.projecttypelist;

  //     const keysToGroupOne: number[] = [16, 21, 22];
  //     result.forEach(item => {
  //       if (keysToGroupOne.includes(item.id)) {
  //         this.Leavetasklist.push(item);
  //       } else {
  //         this.Normaltasklist.push(item);
  //       }
  //     });
  //     console.log(this.Normaltasklist,"normal");
  //     console.log(this.Leavetasklist,"leave");

  //   });
  // }
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
    });
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
          const formattedHours = this.convertMinutesToHHMM(this.data.hours);
          
          console.log(formattedHours,"formattedHours");
          let apivalue = formattedHours;

          let form1 = "00";
          let form2 = "00";
          let sampletimearray = []
          if(apivalue) {
            sampletimearray = apivalue.split(':');        // sampletimearray = ["07","30"]
          }
          form1 = sampletimearray[0];       // form1 = "07"
          form2 = sampletimearray[1];       // form2 = "30"
          this.form.controls["A"].setValue(form1);
          this.form.controls["B"].setValue(form2);
          
          this.form.patchValue(this.data);
          // this.Getproject();
          // this.GetTaskType();
          //this.form.controls['hours'].setValue(moment().startOf('day').add(formattedHours, 'hours').toDate())
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
          this.dataSource.data = convertedData;
        }
      });
    }
  }
  getgriddatabycurrentdate() {
    // this.dataSource.data=[];
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
        this.dataSource.data = convertedData;
      }
    });
  }

  getgrid(userId: any, refresh: boolean) {
    debugger
    // if(this.date && this.actionInfo==2){
    //   debugger
    //   let eDate = moment(this.date).format("YYYY-MM-DD");
    //   this.form.controls['entryDate'].setValue(eDate);
    //   console.log(eDate)
    //   this.disabled = true;
    //   console.log("date success")
    // }
    if (this.date)
    //else
    {
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
          //this.dataSource = new MatTableDataSource(convertedData);
          //this.list.push(convertedData);
          if (this.actionInfo == 11) {
            this.dataSource.data = convertedData;
            this.editData(this.dataSource.data[0], false)
          }
          //this.list=convertedData;
          //this.dataSource.data = this.list;
          // this.Getproject();
          // this.GetTaskType();
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
    console.log(minutes,">>>>>>>>>>>>>>>>>>>>>>");
    
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
    //this.editTrue = editTrue;
    // this.editMode = editTrue;
    this.form.patchValue(dataField);

    // Splitting the hours and minutes from the 'hours' field
    const [hours, minutes] = dataField.hours.split(':');

    // Setting values of inputs 'A' and 'B'
    this.form.controls['A'].setValue(hours);
    this.form.controls['B'].setValue(minutes);

    // this.Getproject();
    // this.GetTaskType();
    if (dataField.isLeave == true) {
      this.form.controls['IsLeave'].setValue(true);
    }
    else {
      this.form.controls['IsLeave'].setValue(2);
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
    console.log(timeInput,'>>>>>+++++');
    
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
      console.log( this.datalist, '++++=====');
      
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
    if (this.list.length > 0) {
      this.loading = true;
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
              title: 'Already Entered as Leave',
              text: 'You already entered as leave for this particular date, so you are not able to add value'
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
      //this.rowCount = 1;
      this.projecttypelist = [];
      this.projecttypelist = this.Leavetasklist;
      this.filterprojecttypelist = this.projecttypelist;
      this.form.controls["hours"].setValue("08:00");
      this.form.controls["taskTypeId"].setValue(16);

      this.editTrue = true;

    }
    else if (option === 2) {
      debugger
      this.form.controls['projectId'].setValue(null);
      this.form.controls['hours'].setValue("00:00");
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

  onDelete(dataField: any) {
    debugger
    const index = this.datalist.indexOf(dataField);
    const index1 = this.list.indexOf(dataField);
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this Data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((willDelete) => {
      if (willDelete.value) {
        this.datalist.splice(index, 1);
        this.list.splice(index1, 1);
        this.dataSource.data = this.list;
        this.temproraryList.pop();
        Swal.fire('Deleted!', 'Your Data has been deleted.', 'success');
      }
      else {
        Swal.fire('Cancelled', 'Your Data is safe :)', 'error');
      }
    });
    // this.disabled = false;
    //this.clearData();
    // this.form.reset({
    //   entryDate: this.formData.entryDate,
    //   IsLeave: this.isLeaveValue
    // });
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
    //   this.form.controls['hours'].updateValueAndValidity();
    this.form.controls['description'].clearValidators();
    this.form.controls['description'].setValue('');
    //this.form.reset();
    this.editTrue = false;
    this.id = 0;
    this.isLeave = true;
    this.projecttypelist = [];
    this.projecttypelist = this.Normaltasklist;
    this.filterprojecttypelist = this.projecttypelist;
    this.GetdefaultProject();
    this.onbtnClick(2);
  }


}



