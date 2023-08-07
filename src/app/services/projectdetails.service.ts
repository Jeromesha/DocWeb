import { Injectable } from '@angular/core';
import { DataService } from "./data.service";
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectdetailsService {

  // getEventRoute = "/api/projectemployee";

  constructor(private dataService: DataService) { }

  save(result: any) {
    return this.dataService.post('/api/project', result)
}

Approve(result: any) {
  return this.dataService.post('api/timesheet/updatetimesheet', result)
}

getById(id: number, refresh: boolean) {
    debugger;
    return this.dataService.getData('/api/project/' + id, refresh);
}
// api/lookup/{moduletype:int}

getLookup(moduletype: number, refresh:boolean){
  return this.dataService.getData('/api/lookup/' + moduletype, refresh);
}

getProjectType(refresh:boolean){
  return this.dataService.getData('/api/lookup/projecttype', refresh)
}

getTechnologyType(refresh:boolean){
  return this.dataService.getData('/api/Technologytype', refresh)
}

getProjectStatus(refresh:boolean){
  return this.dataService.getData('/api/projectstatuslookup', refresh)
}


getdata(refresh:boolean){
  return this.dataService.getData('/api/project', refresh);
}

getunapproveddata(projectid: any, employeeid: any){
  return this.dataService.getData('/timesheetbytimsheetid/' + projectid + '/' + employeeid, true);
}

}
