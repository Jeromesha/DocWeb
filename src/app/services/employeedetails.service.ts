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
  getHybridProject(refresh:boolean,id)
  {
    return this.dataService.getData('/api/worklocationlookup',refresh)
  }
  getDesignationList(refresh:boolean)
  {
    return  this.dataService.getData('/api/lookup/designation',refresh)
  }
  getAllDesignationList(refresh:boolean){
    return  this.dataService.getData('/api/designation/list',refresh)
  }

  DesignationSave(data:any)
  {
    return  this.dataService.post('/api/designation',data)
  }
  getEmployeeByLocation(id:any,refresh:boolean){
    debugger
    return this.dataService.getData('/api/lookup/worklocationId/'+id,refresh)
  }

  getEmployeeByProandLocation(proId:any,locationId:any,refresh:boolean){
    debugger
    return this.dataService.getData('/api/lookup/pwl/'+proId+"/"+locationId,refresh)
  }

  saveEmployee(data:any)
  {
    return this.dataService.post('/api/employee',data);
  }

  getGridDetails(refresh:boolean)
  {
    return this.dataService.getData('/api/employee',refresh)
  }

  getEmpDetail(refresh,id){
    return this.dataService.getData('/api/employee/'+id,refresh)
  }
  delete(id: number) {
    debugger
    return this.dataService.post('/api/employee/deleteemployeebyid/'+id,true).map(response => {
        this.dataService.clearRouteCache('/api/employee');
        return response;
    });
}
}
