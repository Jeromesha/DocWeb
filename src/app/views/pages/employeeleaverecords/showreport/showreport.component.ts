import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ReportsService } from 'src/app/services/reports.service';
import { ShowreportModule } from './showreport.module';
import { TranslateService } from '@ngx-translate/core';
import { ReportType } from 'src/enum/reporttype';

@Component({
  selector: 'app-showreport',
  templateUrl: './showreport.component.html',
  styleUrls: ['./showreport.component.scss']
})
export class ShowreportComponent implements OnInit {

  routeParams: any;
  reportUrl: any;
  submitbtn: string;
  title: string;

  @Input()
  url: SafeResourceUrl;
  src: string;
  pdfSource: any;
  src1: any;
  loading: boolean = true;

  constructor(
    private reportService: ReportsService,
    public translate: TranslateService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ShowreportModule>,
    public sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    debugger
    this.loading = true;
    this.SetTitle(this.data?.reportType);
    this.data.downloadType = 4;
    this.reportService.tripreport(this.data).subscribe(result => {
      if (result) {
        const decodedStringAtoB = atob(result);
        this.src1 = this.sanitizer.bypassSecurityTrustHtml(decodedStringAtoB);
        this.loading = false;
      }
    });
  }

  SetTitle(reportType: any) {
    this.title = "";
    switch (reportType) {
      case ReportType.EmployeeReport:
        this.title = "Employee Leave Report";
        break;
      case ReportType.TimesheetReport:
        this.title = "Timesheet Report";
        break;
      case ReportType.AttendanceReport:
        this.title = "Attendance Report";
        break;
        case ReportType.TimeChampReport:
          this.title = "Attendance Report";
          break;
      default:
        break;
    }
  }

  downloadpdf() {
    debugger;
    const pdfdata = this.data;
    pdfdata.downloadType = 1;
    this.reportService.tripreport(pdfdata).subscribe(result => {
      if (result) {
        this.pdfSource = result;
        const linkSource = 'data:application/pdf;base64, ' + result;
        const downloadLink = document.createElement('a');
        const fileName = this.data.reportType == 1 ? 'Employee Leave Report.pdf' :
          this.data.reportType == 2 ? 'Timedheet Report.pdf' :
            this.data.reportType == 3 ? 'Attendance Report.pdf' :
            this.data.reportType == 4 ? 'Time Champ Report.pdf' : '';
        //const fileName = 'Leavereport.pdf';
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
      }
    });
  }

  downloadexcel() {
    debugger;
    const printdata = this.data;
    printdata.downloadType = 2;
    this.reportService.tripreport(printdata).subscribe(result => {
      if (result) {
        const linkSource = 'data:application/vnd.ms-excel;base64, ' + result;
        const downloadLink = document.createElement('a');
        //const fileName = this.data.ReportType == 1 ? 'Employee Leave Report.xls' : '';
        const fileName = this.data.reportType == 1 ? 'Employee Leave Report.xls' :
          this.data.reportType == 2 ? 'TimeSheet Report.xls' :
            this.data.reportType == 3 ? 'Attendance Report.xls' : 
            this.data.reportType == 4 ? 'Time Champ Report.xls' : '';
        //const fileName = 'Employee Leave Report.';
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
      }
    });
  }

  downloadhtml() {
    debugger
    const printdata = this.data;
    printdata.downloadType = 4;
    this.reportService.tripreport(printdata).subscribe(result => {
      if (result) {
        const linkSource = 'data:text/html;base64, ' + result;
        const downloadLink = document.createElement('a');
        const fileName = this.data.reportType == 1 ? 'Employee Leave Report.html' :
          this.data.reportType == 2 ? 'Timesheet Report.html' :
            this.data.reportType == 3 ? 'Attendance Report.html' : 
            this.data.reportType == 4 ? 'Time Champ Report.html' : '';
        //const fileName = 'Leave Report.html';
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
      }
    });
  }

  downloadword() {
    const worddata = this.data;
    worddata.downloadType = 3;
    this.reportService.tripreport(worddata).subscribe(result => {
      if (result) {
        const linkSource = 'data:application/msword;base64, ' + result;
        const downloadLink = document.createElement('a');
        const fileName = this.data.reportType == 1 ? 'Employee Leave Report.doc' :
          this.data.reportType == 2 ? 'TimeSheet Report.doc' :
            this.data.reportType == 3 ? 'Attendance Report.doc' :
            this.data.reportType == 4 ? 'Time Champ Report.doc' : '';
        //const fileName = 'Leave Report.doc';
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
      }
    });
  }


  onCancel() {
    this.dialogRef.close();
  }

  close(isProceed) {
    this.dialogRef.close(isProceed);
  }


}
