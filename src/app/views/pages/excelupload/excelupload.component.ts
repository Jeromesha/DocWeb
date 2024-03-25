import { Component, ElementRef, OnInit } from "@angular/core";
import * as ExcelJS from "exceljs";

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

@Component({
  selector: "app-excelupload",
  templateUrl: "./excelupload.component.html",
  styleUrls: ["./excelupload.component.scss"],
})
export class ExceluploadComponent implements OnInit {
  form: FormGroup;
  table: boolean = true;
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
  projecttypelist: any=[];
  SortList: any;
  data: any;
  jsonData: any = [];
  projectList: any = [];
  Leavetasklist: any = [];
  Normaltasklist: any = [];
  filterprojecttypelist: any = [];
  actionInfo: 0;
  routeParams: any;
  dataSource: any = [];
  errorCount: any;
  displayedColumns: string[] = ["sno", "psId", "psNumber", "operatorName", "operatorNo", "Remarks"];
  arraydata: any;
  UserId: number;
  loading: boolean;
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  fileName: string;
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
  data1:any=[]
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
      this.transform(this.projectList)
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
      this.projecttypelist = [];
      this.projecttypelist = this.Normaltasklist;
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
  transform (data) {
let projectListName = []
this.projectList.forEach(element => {
  projectListName.push({name:element.value})
});
console.log(projectListName,"sdf");

this.data1 = [
  {
    name: "data1", //sheet1 with name data1
    values: [
      { header: "Project", value: projectListName},
      { header: "Task Type", value: [{ name: "Task 1" }, { name: "Task 2" }] },
      { header: "Date", value: "22/03/24" },
      { header: "Hours", value: "" },
      { header: "Mins", value: ""},
      { header: "Description", value: "" },
      { header: "Leave or Present", value: [{ name: "Leave" }, { name: "Present" }] }
    ]
  }
];
    const noOfRowaToGenerate = 10;
    return this.data1.map(({name, values}) => {
      const headers = values.reduce((prev, next) => 
        ({...prev, [next.header]: Array.isArray
        (next.value) ? next.value.map(({name}) => name): next.value}), {})
      return {
        workSheet: name,
        rows: Array(noOfRowaToGenerate).fill(headers)
      }
    })
  }
   workbookData = this.transform(this.data1)
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
        }
      })
    }

    else {
      this.validateFormControl();
    }

  }

  async downloadTemplate(): Promise<void> {
    const wb: ExcelJS.Workbook = new ExcelJS.Workbook();
    
    const projectPromise = this.timesheetService.getproject().toPromise();
        const taskNamesPromise = this.timesheetService.getLookup(13, true).toPromise();

        // Directly use this.leaveList if it's already a resolved array
        const PresentTypes = [this.leaveList]; // Ensure PresentTypes is an array

        // Wait for all promises to resolve
        const [Project, TaskNames] = await Promise.all([
            projectPromise,
            taskNamesPromise
        ]);

  const worksheet: ExcelJS.Worksheet = wb.addWorksheet("User");
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
    // const ProjectArray = projectValues.split(", ");
    // ProjectArray.forEach((value, rowIndex) => {
    //   worksheet.getCell(rowIndex + 3, 4).value = value;
    // });
    // const TaskArray = TaskValues.split(", ");
    // TaskArray.forEach((value, rowIndex) => {
    //   worksheet.getCell(rowIndex + 3, 4).value = value;
    // });
    // const presentArray = Leavevalue.split(", ");
    // presentArray.forEach((value, rowIndex) => {
    //   worksheet.getCell(rowIndex + 3, 2).value = value;
    // });

    // Populate data in the respective columns (dropdown list)
    const projectValues = Project.map((item) => item.name).join(", ");
    const taskValues = TaskNames.map((item) => item.name).join(", ");
    const leaveValue = PresentTypes[0].map((item) => item.key).join(", ");

    const userCategoryKey = Project.map((item) => item.value).join(", ");
    const taskKey = TaskNames.map((item) => item.value).join(", ");
    const leaveKey = PresentTypes[0].map((item) => item.value).join(", ");
 
  // Populate data in the respective columns (dropdown list)

    for (let i = 3; i < 200; i++) {
        const cellAddress = "A" + i;
        worksheet.getCell(cellAddress).dataValidation = {
            type: "list",
            allowBlank: true,
            formulae: [`"${userCategoryKey}"`],
        };
        worksheet.getCell(cellAddress).value = "";
        worksheet.getCell("A3").value = this.projectList[0].value;

    }

    for (let i = 3; i < 200; i++) {
        const cellAddress = "B" + i;
        worksheet.getCell(cellAddress).dataValidation = {
            type: "list",
            allowBlank: true,
            formulae: [`"${taskKey}"`],
        };
        worksheet.getCell(cellAddress).value = "";
        worksheet.getCell("B3").value = this.projecttypelist[0].value;

    }

    worksheet.getCell("C3").value = new Date(); // Set the value to the current date
    worksheet.getCell("D3").value = 1; // Set the value to the current date

    for (let i = 3; i < 200; i++) {
        const cellAddress = "G" + i;
        worksheet.getCell(cellAddress).dataValidation = {
            type: "list",
            allowBlank: true,
            formulae: [`"${leaveKey}"`],
        };
        worksheet.getCell(cellAddress).value = "";
        worksheet.getCell("G3").value = 1;

    }

    // Save the workbook as a downloadable file
    const buffer = await wb.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "User.xlsx");
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
          isLeaveValue=true;
        }

        console.log(formattedDate);
        const totalMinutes = cell4Value * 60 + cell5Value;

        if (!isNaN(cell4Value) && !isNaN(cell5Value) && row.getCell(1).value > '0' && (row.getCell(2)).value > '0' && row.getCell(3).value != null && row.getCell(6).value > '0' && row.getCell(7).value > '0') {
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
            isleavetypeId:isleavetypeId,
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
            isleavetypeId:isleavetypeId,

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
  exportAsXLSX(): void {
    debugger
    console.log(this.workbookData)
    console.log(this.data1)
    console.log(this.SortList)
    console.log(this.projecttypelist)
    this.excelService.exportAsExcelFiles(this.workbookData, "sample");
  }
  // data1 = [
  //   {
  //     name: "data1", //sheet1 with name data1
  //     values: [
  //       { header: "Project", value:  },
  //       { header: "TaskType", value: [{ name: "test1" }, { name: "test2" }] },
  //       { header: "Date", value: "" },
  //       { header: "Hours", value: [{ name: "val" }, { name: "val1" }] },
  //       { header: "Mins", value: [{ name: "val" }, { name: "val1" }] },
  //       { header: "Description", value: [{ name: "val" }, { name: "val1" }] },
  //       { header: "Leave_or_Present", value: [{ name: "val" }, { name: "val1" }] }


  //     ]
  //   }
  // ];

  // transform(data) {
  //   debugger
  //   const noOfRowsToGenerate = 10;
  //   return data.map(({ value, values }) => {
  //     const headers = values.reduce((prev, next) => ({
  //       ...prev,
  //       [next.header]: Array.isArray(next.value) ? next.value.map(({ value }) => value) : next.value
  //     }), {});
  
  //     // Find the dropdown value
  //     const dropdownValueObject = values.find(({ header }) => header === 'Dropdown'); // Assuming the dropdown header is 'Dropdown'
  //     const dropdownValue = dropdownValueObject ? dropdownValueObject.value : null; // Get the dropdown value if found, otherwise set it to null
  
  //     // Storing key-value pairs and selected dropdown value
  //     const rows = Array(noOfRowsToGenerate).fill({ ...headers, dropdownValue });
  
  //     return {
  //       workSheet: value,
  //       rows
  //     };
  //   });
  // }
  // excel
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
}
