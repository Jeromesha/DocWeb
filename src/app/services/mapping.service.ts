import { DataService } from "./data.service";
import { Injectable } from "@angular/core";


@Injectable()
export class MappingServices {
    getEventRoute = '/api/projectemployee';

    constructor(private dataService: DataService) {
    };
    GetLookup(id: number) {
        return this.dataService.getData('/api/lookup/' + id, true);
    }
    GetLookupById(moduletype: number, id: number) {
        return this.dataService.getData('/api/lookup/' + moduletype + '/' + id, true);
    }
    MapProjectEmployee(result: any) {
        return this.dataService.post('/api/projectemployee/', result).map(response => {
            this.dataService.clearRouteCache(this.getEventRoute);
            return response;
        });
    }
    getById(id: number, refresh: boolean) {
        return this.dataService.getData('/api/projectemployee/' + id, refresh);
    }
}