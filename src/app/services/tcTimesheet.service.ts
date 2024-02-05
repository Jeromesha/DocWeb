import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class TcTimesheetService {

    getEventRoute = '/api/newevents/';

    constructor(private dataService: DataService) {
    };

    GetTimechampDetails(date: string) {
        const apiUrl = '/api/timechamp?targetDate='+date;
        return this.dataService.getData(apiUrl,true);
    }

    GetTCEmployeelist(){
        return this.dataService.getData('/api/timechamp/tcEmployeeList', true);
    }
    GetTCDetailsById(empId:string,startDate: string,endDate:string) {
        const apiUrl = '/api/timechamp/getTcDeatailsById?empCode='+empId+'&startDate='+startDate+'&endDate='+endDate;
        return this.dataService.getData(apiUrl,true);
    }
}
