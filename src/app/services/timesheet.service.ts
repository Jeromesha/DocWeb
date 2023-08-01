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
        return this.dataService.getData('/api/region/' + id, refresh);
    }

    getproject() {
        return this.dataService.getData('api/lookup/3', true);
    }


    savetimsheet(result: any) {
        debugger
        return this.dataService.post('/api/timesheet', result).map(response => {
            this.dataService.clearRouteCache(this.getEventRoute);
            return response;
        });
    }

}