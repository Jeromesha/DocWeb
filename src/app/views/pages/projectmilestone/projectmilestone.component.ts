import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MappingServices } from 'src/app/services/mapping.service';

@Component({
  selector: 'app-projectmilestone',
  templateUrl: './projectmilestone.component.html',
  styleUrls: ['./projectmilestone.component.scss']
})
export class ProjectmilestoneComponent implements OnInit {

  id = 0;
  actionInfo = 0;
  form: FormGroup;
  routeParams: any;
  pageTitle: string;
  data: any;
  projectSortList: any;
  filterprojectSortList: any;
  today: Date;
  startDate: Date;
  endDate: Date;
  maxEndDate: Date;
  minEndDate: Date;

  constructor(
    private formBuilder: FormBuilder,
    route: ActivatedRoute,
    public dialog: MatDialog,
    private mappingservice: MappingServices,
  ) { }

  ngOnInit(): void {
    this.initializeValidators();
    this.getProject();
    this.today = new Date();
  }

  initializeValidators() {


    this.form = this.formBuilder.group({
      projectId: ['', Validators.required],
      Milestone: ['', Validators.required],
      startts: ['', Validators.required],
      endDate: ['', Validators.required],
      easimatehours: ['',[Validators.required, Validators.pattern(/^\d+$/)]],
      Milestonefilestream: ['', Validators.required]
    });
  }
  getProject() {
    debugger;
    this.mappingservice.GetLookup(1).subscribe(result => {
      this.projectSortList = result;
      this.filterprojectSortList = this.projectSortList.slice();
    });
  }
  
  updateEndDate(event: any) {
    if (event) {
      this.startDate = new Date(event);
      this.endDate = new Date(this.startDate);
      this.endDate.setDate(this.endDate.getDate() + 30);
      if (this.endDate > this.today) {
        this.maxEndDate = this.today;
        this.minEndDate = this.startDate;
      }
      else {
        this.minEndDate = this.startDate;
        this.maxEndDate = this.endDate;
      }
      this.form.controls['endDate'].setValue('');
      //this.form.controls['endDate'].clearValidators();
    }
  }

  onSubmit() {
    throw new Error('Method not implemented.');
  }
  onCancel() {
    this.form.reset();
  }
}
