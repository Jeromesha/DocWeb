import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeedetailsService {

  constructor(private dataService: DataService) { }

  getProject(refresh:boolean,id){
    return this.dataService.getData('/api/lookup/'+id,refresh)
  }

  getRole(refresh:boolean){
    return this.dataService.getData('/api/Rolelookup',refresh)
  }

  getLocation(refresh:boolean)
  {
    return this.dataService.getData('/api/worklocationlookup',refresh)
  }

  getDesignationList(refresh:boolean)
  {
    return  this.dataService.getData('/api/lookup/designation',refresh)
  }

  saveEmployee(data:any)
  {
    return this.dataService.post('/api/employee',data);
  }
}
