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

    GetTaskstatus() {
        return this.dataService.getData('/api/lookup/taskstatus', true)
    }

    getApproveStatus() {
        return this.dataService.getData('/api/lookup/getApprovedStatus', true)
    }

    save(result: any) {
        return this.dataService.post('/api/task', result)
    }

    saveTaskGrid(result: any) {
        return this.dataService.post('/api/periodictaskstatus/list', result)
    }

    savePeriodicTask(result: any) {
        return this.dataService.post('/api/periodictask', result)
    }

    GetTaskGridData(id: any, statusList: any) {
        const url = `/api/task/${id}?${statusList.map(value => `Statuslist=${value}`).join('&')}`;
        return this.dataService.getData(url, true);
    }

    GetTaskById(id: any) {
        return this.dataService.getData('/api/task/GetTaskByID/' + id, true);
    }

    Deletebyid(id: any) {
        return this.dataService.post('/api/task/deleteTaskbyid/' + id, true).map(response => {
            this.dataService.clearRouteCache('/api/project');
            return response;
        });
    }

    GetPeriod() {
        return this.dataService.getData('/api/lookup/getPeriodList', true);
    }

    employeeDetails() {
        return this.dataService.getData('/api/employee/all', true)
    }

    employeeDetailsByRoleId(roleId: any) {
        return this.dataService.getData('/api/employee/byrole/' + roleId, true)
    }

    GetAssignTaskList(apiName: string) {
        return this.dataService.getData('/api/periodictask/' + apiName, true);
    }


}