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
        return this.dataService.getData('/api/scheduleTask/getScheduleTaskByID/'+id,true);
    }

    saveSchedule(data:any){
        return this.dataService.post('/api/schedule', data)
    }
    getSchedulebyId(id:any){
        return this.dataService.getData('/api/schedule/getScheduleByID/'+id,true);
    }

    getScheduleGridList() {
        return this.dataService.getData('/api/schedule', true)
    }

    AttachTasktoScheduleSave(data:any){
        return this.dataService.post('/api/scheduletaskmapping', data)
    }

    getNotificationType() {
        return this.dataService.getData('/api/lookup/getnotificationtype', true)
    }
    getTaskList() {
        return this.dataService.getData('/api/lookup/getscheduletasklist', true)
    }
}
