import { Component, ElementRef, OnInit } from "@angular/core";
import * as ExcelJS from "exceljs";
import xlsxPopulate from 'xlsx-populate';
import * as CryptoJS from 'crypto-js';
import { Row, Workbook } from "exceljs";
import { forkJoin } from "rxjs";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { UserSessionService } from "src/app/services/usersession.service";
import { TimeSheetService } from "src/app/services/timesheet.service";
import { TranslateService } from "@ngx-translate/core";
import { AlertService } from "src/app/services/alert.service";
import { ActivatedRoute } from "@angular/router";
import { ExcelService } from "src/app/services/excel.service";
import * as moment from "moment";
import { ViewChild } from '@angular/core';
import { element } from "protractor";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import Swal from 'sweetalert2';

@Component({
  selector: "app-excelupload",
  templateUrl: "./excelupload.component.html",
  styleUrls: ["./excelupload.component.scss"],
})
export class ExceluploadComponent implements OnInit {
  show() {
    throw new Error('Method not implemented.');
  }
  form: FormGroup;
  table: boolean = false;
  SuccessList: { fileName: any; file: any; userExcelSaveListVM: any };
  currentFile: File;
  successArray: any;
  succesList: any;
  showName: string;
  selectedFiles: FileList;
  leaveList = [
    { key: 1, value: "Present" },
    { key: 2, value: "Leave" },
  ];
  data = [];
  dataSource = new MatTableDataSource(this.data);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("searchInput", { static: true }) searchInput: ElementRef;
  projecttypelist: any = [];
  SortList: any;
  jsonData: any = [];
  projectList: any = [];
  Leavetasklist: any = [];
  Normaltasklist: any = [];
  filterprojecttypelist: any = [];
  actionInfo: 0;
  routeParams: any;
  errorCount: any;
  displayedColumns: string[] = ["sno",
    // "action",
    "entryDate",
    "Project",
    "Task",
    "Hours",
    "Remarks",
    "error"
  ];
  temproraryList: any[] = [];
  arraydata: any;
  UserId: number;
  loading: boolean;
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  fileName: string;
  projecttypelistNames: any;
  showcard: boolean = true;
  projectname: string;
  arraydatas: any;
  constructor(
    private formBuilder: FormBuilder,
    route: ActivatedRoute,
    private alertService: AlertService,
    public excelService: ExcelService,
    private userSessionService: UserSessionService,
    private timesheetService: TimeSheetService,
    private translate: TranslateService
  ) {
    this.routeParams = route.snapshot.params;
    this.UserId = this.userSessionService.userId();

    this.actionInfo = this.routeParams.actionInfo;

  }
  data1: any = []
  name = "Angular 6";
  // data1 = [
  //   {
  //     name: "data1", //sheet1 with name data1
  //     values: [
  //       { header: "Project", value: [{ name: "Project 1" }, { name: "Project 2" }] },
  //       { header: "Task Type", value: [{ name: "Task 1" }, { name: "Task 2" }] },
  //       { header: "Date", value: "22/03/24" },
  //       { header: "Hours", value: "" },
  //       { header: "Mins", value: ""},
  //       { header: "Description", value: "" },
  //       { header: "Leave or Present", value: [{ name: "Leave" }, { name: "Present" }] }
  //     ]
  //   }
  // ];

  // data2 = this.transform(this.data1)


  ngOnInit(): void {
    this.initializeValidators();
    this.Getproject();
    this.GetTaskType();
  }
  Getproject() {
    debugger;
    this.timesheetService.getproject().subscribe((result) => {
      this.projectList = result;
      // this.transform(this.projectList)
      // this.data1[0].values[0].value = this.projectList
      // this.workbookData = this.transform(this.data1)
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
      // this.projecttypelist = [];
      this.projecttypelist = this.Normaltasklist;
      // this.transform(this.projecttypelist)
      // console.log(this.projecttypelist, "jsdhfj");

      // this.data1[0].values[1].value = this.projecttypelist
      // this.workbookData = this.transform(this.data1)

      this.filterprojecttypelist = this.projecttypelist;
      if (this.actionInfo == 0) {
        this.projecttypelist = [];
        this.projecttypelist = result;
        this.filterprojecttypelist = this.projecttypelist;
      }

    });

  }



  initializeValidators() {
    this.form = this.formBuilder.group({
      id: [0],
      file: ["", [Validators.required]],
    });
  }
  reset() {
    this.form.reset();
    debugger;
    document.getElementById("customLabel").innerHTML = "Choose file";
    this.selectedFiles = undefined;
  }
  customFile(event) {
    document.getElementById("customLabel").innerHTML = "Choose file";

    this.selectedFiles = event.target.files;
    this.fileName = this.selectedFiles[0].name;
    console.log(this.selectedFiles, ">>>>>>>>>>>>>>>>>>>>>>>>selectedFiles", event);
    console.log(event.target.value, ">>>>>>>>>>>event.target.value");

    // var fileName = event.target.files.item(0).name;
    document.addEventListener('DOMContentLoaded', function () {
      // Your code here
      document.getElementById("customLabel").innerHTML = fileName;
    });
    if (this.selectedFiles && this.selectedFiles.length > 0) {

      this.currentFile = this.selectedFiles.item(0);
      let reader = new FileReader();
      var fileName = this.selectedFiles.item(0).name;
      var fileExtension =
        "|" + fileName.slice(fileName.lastIndexOf(".") + 1) + "|";
      var type =
        "|" +
        this.currentFile.type.slice(this.currentFile.type.lastIndexOf("/") + 1) +
        "|";
      var result =
        "|xls|xlsx|csv|".indexOf(type.toLowerCase()) !== -1 ||
        "|xls|xlsx|csv|".indexOf(fileExtension.toLowerCase()) !== -1;

      if (this.form.valid) {
        if (result) {
          reader.onloadend = async () => {
            var workbookData = reader.result;
            if (typeof workbookData === "string") {
              // Convert the string to ArrayBuffer
              const encoder = new TextEncoder();
              workbookData = encoder.encode(workbookData).buffer;
            }
            var dataArray = await this.convertWorkbookToJson(workbookData);
            console.log(dataArray); // Display the converted JSON array

            // Further processing with the JSON data...
          };

          reader.readAsArrayBuffer(this.currentFile);
          this.myInputVariable.nativeElement.value = "";
        }
      } else {
        this.validateFormControl();
      }

    } else {
      console.error("No files selected"); // Handle case where no files are selected
    }
    // event.target.value = null;

  }
  upload() {
    if (this.form.valid) {
      var payload = {
        timesheets: this.jsonData
      }
      this.timesheetService.BulkExcelSheet(payload).subscribe(result => {
        debugger
        this.loading = false;
        console.log('ta', result);
        if (result && result.isSuccess) {
          this.alertService.success("Time Sheet Updated Successfully");
          // location.reload();
          this.myInputVariable.nativeElement.value = "";
          this.fileName ="";
          this.showcard = true;

        }
        if (result && result.isFailure) {
          // this.alertService.error("Please correct and upload this file once more.")
          Swal.fire({
            icon: 'warning',
            title: 'Invalid Records',
            text: 'Please review the error list to check for any incorrect uploads.'
          }).then(() => {
            this.table = true;
            this.showcard = false;
            this.arraydata = result.value;
            this.arraydata.forEach(e => {
              e.projectName = this.projectList.find(project => project.key === e.projectId)?.value || 'Unknown';
              e.Tasktype = this.projecttypelist.find(project => project.key === e.taskTypeId)?.value || 'Unknown';
              e.hours = this.convertToHoursFormat(e.hours);
              this.temproraryList.pop();
            });


            this.dataSource = new MatTableDataSource(this.arraydata);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            console.log(this.arraydata, "76");

          });
          //  this.projectname= this.projectList.forEach((e) => e.key== e.value);


        }
      })
    }

    else {
      this.showcard = true;
      this.validateFormControl();
    }

  }


  back() {
    location.reload();
  }
  convertToHoursFormat(hours) {
    const hoursValue = Math.floor(hours / 60);
    const minutesValue = hours % 60;
    return `${hoursValue}h ${minutesValue}m`;
  }
  async downloadTemplate(): Promise<void> {
    const wb: ExcelJS.Workbook = new ExcelJS.Workbook();
    const Project = await this.timesheetService.getproject();
    const TaskNames = await this.timesheetService.getLookup(13, true);
    const PresentTypes = [this.leaveList];

    forkJoin([Project, TaskNames, PresentTypes]).subscribe((data) => {
      const [Project, TaskNames, PresentTypes] = data;
      // Sheets
      const worksheet: ExcelJS.Worksheet = wb.addWorksheet("User");
      const projectValues = Project.map((item) => item.name).join(", ");
      const TaskValues = TaskNames.map((item) => item.name).join(", ");
      const Leavevalue = PresentTypes.map((item) => item.key).join(", ");

      // Add header
      const header = [
        "Project",
        "Task Type",
        "Date",
        "Hours",
        "Mins",
        "Description",
        "Leave or Present",
      ];
      worksheet.mergeCells("A1:G1");
      const titleCell = worksheet.getCell("A1");
      titleCell.value = "Task Sheet";
      titleCell.alignment = { vertical: "middle", horizontal: "center" };
      titleCell.font = { bold: true, color: { argb: "FFFFFF" } }; // Font color is white
      titleCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "3E65A6" },
      }; // Background color

      const headerRow = worksheet.addRow(header);

      // Format the header row
      headerRow.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFADD8E6" }, // Background color
          bgColor: { argb: "FFFFFFFF" }, // Text color
        };

        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });

      headerRow.eachCell((cell) => {
        cell.font = { bold: true };
      });
      headerRow.alignment = { vertical: "middle", horizontal: "center" };
      worksheet.getColumn(1).width = 35;
      worksheet.getColumn(2).width = 40;
      worksheet.getColumn(3).width = 25;
      worksheet.getColumn(4).width = 15;
      worksheet.getColumn(5).width = 15;
      worksheet.getColumn(6).width = 30;
      worksheet.getColumn(7).width = 25;


      // Populate data in the respective columns (dropdown list)
      const ProjectArray = projectValues.split(", ");
      ProjectArray.forEach((value, rowIndex) => {
        worksheet.getCell(rowIndex + 3, 4).value = value;
      });
      const TaskArray = TaskValues.split(", ");
      TaskArray.forEach((value, rowIndex) => {
        worksheet.getCell(rowIndex + 3, 4).value = value;
      });
      const presentArray = Leavevalue.split(", ");
      presentArray.forEach((value, rowIndex) => {
        worksheet.getCell(rowIndex + 3, 2).value = value;
      });

      const userCategoryKey = Project.map((item) => item.value).join(", ");
      const TaskKey = TaskNames.map((item) => item.value).join(", ");
      const leaveKey = PresentTypes.map((item) => item.value).join(", ");

      let joineddropdownlist1 = userCategoryKey;
      let joineddropdownlist2 = TaskKey;
      let joineddropdownlist3 = leaveKey;

      for (let i = 3; i < 200; i++) {
        const cellAddress = "A" + i;
        worksheet.getCell(cellAddress).dataValidation = {
          type: "list",
          allowBlank: true,
          formulae: [`"${joineddropdownlist1}"`],
        };
        worksheet.getCell(cellAddress).value = "";
        // worksheet.getCell("A3").value = this.projectList[0].value;

      }

      for (let i = 3; i < 200; i++) {
        const cellAddress = "B" + i;
        worksheet.getCell(cellAddress).dataValidation = {
          type: "list",
          allowBlank: true,
          formulae: [`"${joineddropdownlist2}"`],
        };
        worksheet.getCell(cellAddress).value = "";
        // worksheet.getCell("B3").value = 1;

      }

      // worksheet.getCell("C3").value = new Date(); // Set the value to the current date
      // worksheet.getCell("D3").value = 1 // Set the value to the current date


      for (let i = 3; i < 200; i++) {
        const cellAddress = "G" + i;
        worksheet.getCell(cellAddress).dataValidation = {
          type: "list",
          allowBlank: true,
          formulae: [`"${joineddropdownlist3}"`],
        };
        worksheet.getCell(cellAddress).value = "";
        // worksheet.getCell("G3").value = 1;

      }

      // Save the workbook as a downloadable file
      wb.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, "User.xlsx");
      });
    });
  }

  async convertWorkbookToJson(workbookData: ArrayBuffer): Promise<any> {
    debugger
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(workbookData);
    const worksheet = workbook.getWorksheet(1);

    this.jsonData = [];
    let errorList = []
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 2) {
        // Skip header rows  const cell4Value = row.getCell(4).value?.toString(); // Convert cell value to string
        const cell3Value = row.getCell(3).value?.toString();
        const cell4Value = parseFloat(row.getCell(4).value !== null ? row.getCell(4).value.toString() : '0');
        const cell5Value = parseFloat(row.getCell(5).value !== null ? row.getCell(5).value.toString() : '0');
        const formattedDate = moment(cell3Value).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
        let isLeaveValue = false;
        let isleavetypeId = 0

        if (row.getCell(7).value === 'Present') {
          isleavetypeId = 1;
          isLeaveValue = false;
        }
        else if (row.getCell(7).value === 'Leave') {
          isleavetypeId = 2;
          isLeaveValue = true;
        }

        console.log(formattedDate);
        const totalMinutes = cell4Value * 60 + cell5Value;

        if (!isNaN(cell4Value) && !isNaN(cell5Value) && row.getCell(1).value > '0' && row.getCell(2).value > '0' && row.getCell(3).value != null && row.getCell(6).value > '0' && row.getCell(7).value > '0') {
          const rowData = {
            projectId: row.getCell(1).value,
            taskTypeId: row.getCell(2).value,
            entryDate: formattedDate,
            hours: totalMinutes,
            description: row.getCell(6).value,
            isLeave: isLeaveValue,
            timeIn: null,
            timeOut: null,
            approvedStatusType: 1,
            taskId: 0,
            employeeId: this.UserId,
            taskStatusId: 0,
            // isleavetypeId:isleavetypeId,
            id: this.form.value.id

          };
          this.jsonData.push(rowData);
        }
        else {
          const rowData = {
            projectId: row.getCell(1).value,
            taskTypeId: row.getCell(2).value,
            entryDate: formattedDate,
            hours: totalMinutes,
            description: row.getCell(6).value,
            isLeave: isLeaveValue,
            timeIn: null,
            timeOut: null,
            approvedStatusType: 1,
            taskId: 0,
            employeeId: this.UserId,
            taskStatusId: 0,
            // isleavetypeId:isleavetypeId,

            id: this.form.value.id
          };
          errorList.push(rowData)
        }

      }
    });
    if (errorList.length > 0) {
      this.alertService.error("Please fill in all fields.");
    } else {
      this.jsonData.forEach((element) => {
        try {
          let local = this.projectList;
          let projectDesc = element.projectId.toLowerCase();
          local = local.filter((e) => e.value.toLowerCase() == projectDesc);
          let key = local.length > 0 ? local[0].key : 0;
          element.projectId = key;
          let local1 = this.projecttypelist;
          let projecttaskDesc = element.taskTypeId.toLowerCase();
          local1 = local1.filter((e) => e.value.toLowerCase() == projecttaskDesc);
          let key1 = local1.length > 0 ? local1[0].key : 0;
          element.taskTypeId = key1;
          let local2 = this.leaveList;
          let presenceDesc = element.isLeave.toLowerCase();
          local2 = local2.filter((e) => e.value.toLowerCase() == presenceDesc);
          let key2 = local2.length > 0 ? local2[0].key : 0;
          element.isLeave = key2;
        } catch (error) { }
      });
      console.log(this.jsonData, "786*)");

      errorList = this.jsonData;
      errorList = errorList.filter(e => e.projectId == 0 || e.taskTypeId == 0 || e.isleavetypeId == 0)
      if (errorList.length > 0) {
        this.alertService.error("Please upload the valid format sheet.");

      }
    }
    // this.jsonData;
    // let local = this.projectList;

  }
  // async downloadTemplate(): Promise<void> {
  //   const wb = XLSX.utils.book_new();
  //   const Project = await this.timesheetService.getproject();
  //   const TaskNames = await this.timesheetService.getLookup(13, true);
  //   const PresentTypes = [this.leaveList];

  //   forkJoin([Project, TaskNames, PresentTypes]).subscribe((data) => {
  //     const [Project, TaskNames, PresentTypes] = data;
  //     const ws = XLSX.utils.aoa_to_sheet([
  //       ["Project", "TaskType", "Date", "Hours", "Mins", "Description", "LeaveorPresent"]
  //     ]);

  //     XLSX.utils.book_append_sheet(wb, ws, "User");

  //     // Populate data in column A from the first API response
  //     const projectValues = Project.map((item) => [item.value]);
  //     projectValues.forEach((value, rowIndex) => {
  //       XLSX.utils.sheet_add_aoa(ws, [value], { origin: { r: rowIndex + 1, c: 0 } });
  //     });

  //     // Populate data in column B from the second API response
  //     const taskValues = TaskNames.map((item) => [item.value]);
  //     taskValues.forEach((value, rowIndex) => {
  //       XLSX.utils.sheet_add_aoa(ws, [value], { origin: { r: rowIndex + 1, c: 1 } });
  //     });

  //     // Populate data in column G from the third array
  //     const presentValues = PresentTypes.map((item) => [item.value]);
  //     presentValues.forEach((value, rowIndex) => {
  //       XLSX.utils.sheet_add_aoa(ws, [value], { origin: { r: rowIndex + 1, c: 6 } });
  //     });

  //     // Set data validation for column A
  //     const dataValidationAFormula = `=INDIRECT("User!$A$1"):INDIRECT("User!$A$${projectValues.length})`;
  //     for (let i = 2; i <= 200; i++) {
  //       ws[`A${i}`].f = dataValidationAFormula;
  //     }

  //     // Set data validation for column B
  //     const dataValidationBFormula = `=INDIRECT("User!$B$1"):INDIRECT("User!$B$${taskValues.length})`;
  //     for (let i = 2; i <= 200; i++) {
  //       ws[`B${i}`].f = dataValidationBFormula;
  //     }

  //     // Set data validation for column G
  //     const dataValidationGFormula = `=INDIRECT("User!$G$1"):INDIRECT("User!$G$${presentValues.length})`;
  //     for (let i = 2; i <= 200; i++) {
  //       ws[`G${i}`].f = dataValidationGFormula;
  //     }

  //     // Save the workbook as a downloadable file
  //     const wbBinaryString = XLSX.write(wb, { type: 'binary' });
  //     const blob = new Blob([this.s2ab(wbBinaryString)], {
  //       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  //     });
  //     saveAs(blob, "User.xlsx");
  //   });
  // }

  // You need to define the `s2ab` function somewhere in your code.
  // It's commonly used to convert string to ArrayBuffer.
  // Here's an example implementation:

  s2ab(s: string): ArrayBuffer {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }
  // async convertWorkbookToJson(workbookData: ArrayBuffer): Promise<any> {
  //   const data = new Uint8Array(workbookData);
  //   const wbBinaryString = Array.from(data).map(byte => String.fromCharCode(byte)).join('');

  //   const wb = XLSX.read(wbBinaryString, { type: 'binary' });

  //   const ws = wb.Sheets[wb.SheetNames[0]];

  //   const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });

  //   return jsonData;
  // }
  validateFormControl() {
    debugger;
    Object.keys(this.form.controls).forEach((field) => {
      const control = this.form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true,
        });
      }
    });
  }
  saveBlob(blob: Blob, fileName: string): void {
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style.display = "none";
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  /////Working Excel


  // transform(data) {
  //   debugger
  //   let projectListName = this.projectList.map(element => ({ name: element.value }));
  //   this.projecttypelistNames = [
  //     "Accounts",
  //     "Admin",
  //     "BRD / FRS Document Preparation",
  //     "Bug Fixing",
  //     "Build Deployment",
  //     "CompOff",
  //     "Data Entry",
  //     "Database Activity",
  //     "Development",
  //     "Recruitment",
  //     "Regression Testing",
  //     "Retesting",
  //     "Salary Negotiations",
  //     "Scheduling Interview with Leads",
  //     "Sending Evaluation feedback",
  //     "Server",
  //     "Sourcing",
  //     "SRS Documents Preparation",
  //     "Statutory Norms & Compliance",
  //     "Supporting",
  //     "System / Laptop Issue",
  //     "Testcase Preparation",
  //     "Testing",
  //     "Training & Other HR Activities",
  //     "Training Session",
  //     "UI/UX Designing",
  //     "Unit Testing",
  //     "User Manual preparation"


  //   ];
  //   let projecttypelistName = this.projecttypelistNames.map(element => ({ name: element }));

  //   this.data1 = [

  //     {
  //       name: "data1", //sheet1 with name data1
  //       values: [
  //         { header: "Project", value: projectListName },
  //         { header: "Task Type", value: projecttypelistName },
  //         { header: "Date", value: "" },
  //         { header: "Hours", value: "" },
  //         { header: "Mins", value: "" },
  //         { header: "Description", value: "" },
  //         { header: "Leave or Present", value: [{ name: "Leave" }, { name: "Present" }] }
  //       ]
  //     }
  //   ];

  //   const noOfRowsToGenerate = 100;

  //   return this.data1.map(({ name, values }) => {
  //     const headers = values.reduce((prev, next) =>
  //       ({ ...prev, [next.header]: Array.isArray(next.value) ? next.value.map(({ name }) => name) : next.value }), {})
  //     return {
  //       workSheet: name,
  //       rows: Array(noOfRowsToGenerate).fill(headers)
  //     }
  //   });
  // }

  // workbookDatas = this.transform(this.data1);

  // exportAsXLSX(): void {
  //   debugger
  //   let projectListName = this.projectList.map(element => ({ name: element.value }));
  //   this.projecttypelistNames = [
  //     "Accounts",
  //     "Admin",
  //     "BRD / FRS Document Preparation",
  //     "Bug Fixing",
  //     "Build Deployment",
  //     "CompOff", 
  //     "Data Entry",
  //     "Database Activity",
  //     "Development",
  //     "DevOps",
  //     "Document Preparation",
  //     "Employee Engagement",
  //     "Event Coordination",
  //     "Exit Formalities",
  //     "Flow Chart / Use case Diagram preparation",
  //     "HR Tasks",
  //     "Induction & Orientation",
  //     "Internet Outage",
  //     "Interview(one to one)",
  //     "IT Support",
  //     "Knowledge Transfer",
  //     "Meeting",
  //     "Meeting in Client Office",
  //     "Miscellaneous",
  //     "Onboarding",
  //     "Organization communication",
  //     "Payroll Processing",
  //     "Payroll",
  //     "Performance Management (PMS)",
  //     "Policy formulation",
  //     "Power Outage",
  //     "Project Discussion",
  //     "R&D",
  //     "Recruitment",
  //     "Regression Testing",
  //     "Retesting",
  //     "Salary Negotiations",
  //     "Scheduling Interview with Leads",
  //     "Sending Evaluation feedback",
  //     "Server",
  //     "Sourcing",
  //     "SRS Documents Preparation",
  //     "Statutory Norms & Compliance",
  //     "Supporting",
  //     "System / Laptop Issue",
  //     "Testcase Preparation",
  //     "Testing",
  //     "Training & Other HR Activities",
  //     "Training Session",
  //     "UI/UX Designing",
  //     "Unit Testing",
  //     "User Manual preparation"
  //   ];
  //   let projecttypelistName = this.projecttypelistNames.map(element => ({ name: element }));
  //   // Call transform() with the populated projectListName
  //   this.workbookDatas = this.transform(projecttypelistName);
  //   console.log(this.workbookDatas)
  //   console.log(this.data1)
  //   console.log(this.SortList)
  //   console.log(this.projecttypelist)
  //   this.excelService.exportAsExcelFiles(this.workbookDatas, "sample");
  // }


}
