import { DataService } from "./data.service";

export class TimeSheetService {

    getEventRoute = "/api/timesheet/";
    dataService: DataService;

    save(result: any) {
        return this.dataService.post('/api/region/', result).map(response => {
            this.dataService.clearRouteCache(this.getEventRoute);
            return response;
        });
    }

    getById(id: number, refresh: boolean) {
        return this.dataService.getData('/api/region/' + id, refresh);
    }
}