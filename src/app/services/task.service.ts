import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    getEventRoute = '/api/newevents/';

    constructor(private dataService: DataService) {
    };

    GetModule(id: number) {
        return this.dataService.getData('/api/lookup/module/' + id, true);
    }

    GetMilestone(id: number) {
        return this.dataService.getData('/api/lookup/milestone/' + id, true);
    }

    GetTaskstatus(){
        return this.dataService.getData('/api/lookup/taskstatus',true)
    }

    save(result: any) {
        debugger
        return this.dataService.post('/api/task', result)
    }
}