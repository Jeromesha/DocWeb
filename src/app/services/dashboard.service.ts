import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export class DashboardService {

    getEventRoute = '/api/newevents/';

    constructor(private dataService: DataService) {
    };

    gettimesheetById(id: number, refresh: boolean) {
        return this.dataService.getData('/api/timesheet/timesheetbytimsheetid/' + id, refresh);
    }
    getTimesheet(id: number, refresh: boolean) {
        return this.dataService.getData('/api/timesheet/timesheetsbyid/' + id, refresh);
    }
    getRegistrationDataById(id: number, refresh: boolean) {
        return this.dataService.getData('/api/registration/' + id, refresh);
    }
    downloadReciept(data: any) {
        return this.dataService.post('/api/report', data)
    }
    gettimchamp(id: number, date: Date, refresh: boolean) {
        return this.dataService.getData('/api/eventdetail/' + id + '/' + date, refresh);
    }
}
