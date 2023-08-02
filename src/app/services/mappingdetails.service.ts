import { Injectable } from "@angular/core";
import { DataService } from "./data.service";

@Injectable()
export class MappingdetailServices {

    getEventRoute = '/api/projectemployee';

    constructor(private dataService: DataService) {
    };

    getmappingdetail(id: number, refresh: boolean) {
        return this.dataService.getData('/api/projectemployee', refresh);
    }
    Delete(id: number) {
        return this.dataService.getData('/api/projectemployee/delete/' + id, true).map(response => {
            this.dataService.clearRouteCache(this.getEventRoute);
            return response;
        });
    }

}