import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export class PerodicTaskService {

    getEventRoute = 'api/scheduleTask';

    constructor(private dataService: DataService) {
    };

    getTaskCategory() {
        return this.dataService.getData('/api/lookup/getScheduleTastCategory', true)
    }
    saveTask(data: any) {
        return this.dataService.post('/api/scheduleTask', data)
    }
    getTaskGridList() {
        return this.dataService.getData('/api/scheduleTask', true)
    }
    getTaskbyId(id:any){
        return this.dataService.getData('/api/scheduleTask/GetScheduleTaskByID/'+id,true);
    }

}
