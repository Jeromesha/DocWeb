import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export class DashboardService {

    getEventRoute = '/api/newevents/';

    constructor(private dataService: DataService) {
    };

    getTimeSheetsById(id: any, refresh: boolean) {
        return this.dataService.getData('/api/timesheet/getbyid/' + id, refresh);
    }
    getRegistrationDataById(id: number, refresh: boolean) {
        return this.dataService.getData('/api/registration/' + id, refresh);
    }
    downloadReciept(data: any) {
        return this.dataService.post('/api/report', data)
    }

}
