import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export class InetDataService {

  constructor(private dataService: DataService) {
  };

  getPackages() {
    return this.dataService.getData('api/Package/Package', true)
  }

  getServicePackages() {
    return this.dataService.getData('api/Package/Service/' + 0, true)
  }

  save(data: any) {
    return this.dataService.post('/api/scheduleTask', data)
  }
}
