import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import * as ExcelJS from 'exceljs';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
interface Row {
    value: any;
    key: number;
    // Add more properties as needed
}

@Injectable()
export class ExcelService {

    constructor() { }

    public async exportAsExcelFiles(workbookData: { workSheet: string; rows: Row[] }[], excelFileName: string) {
        debugger
        const workbook = new ExcelJS.Workbook();

        workbookData.forEach(({ workSheet, rows }) => {
            const sheet = workbook.addWorksheet(workSheet);
            const uniqueHeaders = [
                ...new Set(
                    rows.reduce((prev, next) => [...prev, ...Object.keys(next)], [])
                )
            ];
            const columns: Partial<ExcelJS.Column>[] = uniqueHeaders.map(header => ({ header, key: header }));

            sheet.columns = columns;

            rows.forEach((jsonRow: Row, i: number) => {
                let cellValues = { ...jsonRow };

                uniqueHeaders.forEach((header: string, j) => { // Explicitly define the type of 'header'
                    if (Array.isArray(jsonRow[header])) {
                        cellValues[header] = "";
                    }
                });

                sheet.addRow(cellValues);

                uniqueHeaders.forEach((header, j) => {
                    if (Array.isArray(jsonRow[header])) {
                        const jsonDropdown = jsonRow[header];
                        sheet.getCell(
                            this.getSpreadSheetCellNumber(i + 1, j)
                        ).dataValidation = {
                            type: "list",
                            formulae: [`"${jsonDropdown.join(",")}"`]
                        };
                    }
                });
            });
        });

        const buffer = await workbook.xlsx.writeBuffer();
        this.saveAsExcelFile(buffer, excelFileName);
    }

    
      private getSpreadSheetCellNumber(row, column) {
        let result = "";
        // Get spreadsheet column letter
        let n = column;
        while (n >= 0) {
          result = String.fromCharCode((n % 26) + 65) + result;
          n = Math.floor(n / 26) - 1;
        }
    
        // Get spreadsheet row number
        result += `${row + 1}`;
    
        return result;
      }
    
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