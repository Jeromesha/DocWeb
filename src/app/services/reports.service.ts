import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export class ReportsService {

    getEventRoute = '/api/user/';
    constructor(private dataService: DataService) {
    };
    tripreport(data: any) {
        return this.dataService.post('/api/report', data).map(response => {
            this.dataService.clearRouteCache(this.getEventRoute);
            return response;
        });
    }
}