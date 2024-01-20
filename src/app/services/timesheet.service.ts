import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class TimeSheetService {

    getEventRoute = "/api/timesheet";
    // dataService: DataService;
    constructor(private dataService: DataService) {
    };

    save(result: any) {
        return this.dataService.post('/api/region/', result).map(response => {
            this.dataService.clearRouteCache(this.getEventRoute);
            return response;
        });
    }

    getById(id: number, refresh: boolean) {
        debugger;
        return this.dataService.getData('/api/gettimesheet/' + id, refresh);
    }
    // getTimesheetById(id: number, refresh: boolean) {
    //     return this.dataService.getData('api/timesheet/timesheetbytimsheetid/' + id, refresh);

    // }
    gettimesheetById(id: number, refresh: boolean) {
        return this.dataService.getData('/api/timesheet/timesheetbytimsheetid/' + id, refresh);
    }
    getTimesheet(id: number, refresh: boolean) {
        return this.dataService.getData('/api/timesheet/timesheetsbyid/' + id, refresh);
    }
    getTimesheetByDate(id:number, Date:string, refresh:boolean){
        return this.dataService.getData('/api/timesheet/timesheetbytimsheetidandDate/'+ id+'/' + Date ,refresh);
    }
    getproject() {
        return this.dataService.getData('/api/lookup/3', true);
    }
    getLookup(moduletype: number, refresh: boolean) {
        return this.dataService.getData('/api/lookup/' + moduletype, refresh);
    }

    savetimsheet(result: any) {
        return this.dataService.post('/api/timesheet/save', result).map(response => {
            this.dataService.clearRouteCache(this.getEventRoute);
            return response;
        });
    }

    delete(id: number) {
        debugger
        return this.dataService.post('/api/timesheet/deletetimesheetbyid/' + id,true).map(response => {
            this.dataService.clearRouteCache(this.getEventRoute);
            return response;
        });
    }

    getDefaultProject() {
        return this.dataService.getData('/api/timesheet/getdefaultprojectid', true);
    }

}