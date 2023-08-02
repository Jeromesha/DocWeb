import { DataService } from "./data.service";
import { Injectable } from "@angular/core";


@Injectable()
export class MappingServices {
    getEventRoute = '/api/projectemployee';

    constructor(private dataService: DataService) {
    };
    GetProject() {
        return this.dataService.getData('/api/lookup/1', true);
    }
    GetEmployee() {
        return this.dataService.getData('/api/lookup/4', true);
    }
    MapProjectEmployee(result: any) {
        return this.dataService.post('/api/projectemployee/', result).map(response => {
            this.dataService.clearRouteCache(this.getEventRoute);
            return response;
        });
    }
}