import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProjectdetailsService } from 'src/app/services/projectdetails.service';

@Component({
  selector: 'app-employeeleaverecords',
  templateUrl: './employeeleaverecords.component.html',
  styleUrls: ['./employeeleaverecords.component.scss']
})
export class EmployeeleaverecordsComponent implements OnInit {
  form:any
  projectleadlist: any;
  filterprojectleadlist: any;
  constructor(
    private formBuilder: FormBuilder,
    private projectdetailsservice: ProjectdetailsService,

  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      startts:[],
      endDate: [],
      employeeName: []
    
    });
    this.getprojectLead();
  }

  getprojectLead(){
    debugger;
    this.projectdetailsservice.getLookup(2,true).subscribe(result =>{
      this.projectleadlist = result;
      this.filterprojectleadlist = this.projectleadlist;
      console.log(">/>?",result);
    })
  }
}
