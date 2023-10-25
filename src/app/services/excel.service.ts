import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as moment from 'moment';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {

    constructor() { }

    public exportAsExcelFile(json: any[], excelFileName: string, cols: any[]): void {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);

        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

        const range = XLSX.utils.decode_range(worksheet['!ref']);
        for (let index = range.s.r; index <= range.e.c; ++index) {
            const address = XLSX.utils.encode_col(index) + '1';
            worksheet[address].v = cols[index];
            // worksheet[address].s = {
            //   fill: { type: 'pattern', pattern: 'solid', fgColor: { rgb: 'FFFF00' } },
            //   font: { color: { rgb: 'FF0000' }, bold: true },
            // };
        }

        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        const todayDate = moment(new Date).format('DD-MM-YYYY');
        FileSaver.saveAs(data, fileName + '_' + todayDate + EXCEL_EXTENSION);
    }
}