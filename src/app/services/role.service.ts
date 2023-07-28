import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export class RoleService {

    getEventRoute = '/api/role/';

    constructor(private dataService: DataService) {
    };

    get(refresh: Boolean) {
        return this.dataService.getData('/api/roles', refresh);
    }

    getById(id: number) {
        return this.dataService.getRecord('/api/role/' + id);
    }

    getMenu(refresh: Boolean) {
        return this.dataService.getData('/api/employee/menus', refresh);
    }

    save(role) {
        return this.dataService.post('/api/role', role).map(response => {
            this.dataService.clearRouteCache(this.getEventRoute);
            return response;
        });
    }
    saveActiveStatus(activeState: any) {
        return this.dataService.post('/api/role/activate', activeState);
      }
}
