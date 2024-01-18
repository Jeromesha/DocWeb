import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/services/alert.service';
import { EmployeedetailsService } from 'src/app/services/employeedetails.service';
import { MappingServices } from 'src/app/services/mapping.service';
import { ProjectdetailsService } from 'src/app/services/projectdetails.service';
import { TimeSheetService } from 'src/app/services/timesheet.service';
import { UserSessionService } from 'src/app/services/usersession.service';

@Component({
  selector: 'app-projectmodule',
  templateUrl: './projectmodule.component.html',
  styleUrls: ['./projectmodule.component.scss']
})
export class ProjectmoduleComponent implements OnInit {
  

  id = 0;
  actionInfo = 0;
  form: FormGroup;
  routeParams: any;
  pageTitle: string;
  data: any;
  projectSortList: any;
  filterprojectSortList: any;

  constructor(
    private formBuilder: FormBuilder,
    route: ActivatedRoute,
    public dialog: MatDialog,
    private mappingservice: MappingServices,
    // private alertService: AlertService,
    // private userSessionService: UserSessionService,
    // private translate: TranslateService,
    // private timesheetService: TimeSheetService,
    // private projectdetailsservice: ProjectdetailsService,
    // private empDetailsService:EmployeedetailsService,
  ) { }

  ngOnInit(): void {
    this.initializeValidators();
    this.getProject();
  }
  initializeValidators() {


    this.form = this.formBuilder.group({
      projectId: ['', Validators.required],
      ModuleName: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  getProject() {
    debugger;
    this.mappingservice.GetLookup(1).subscribe(result => {
      this.projectSortList = result;
      this.filterprojectSortList = this.projectSortList.slice();
    });
  }
  onSubmit() {
    throw new Error('Method not implemented.');
  }
  onCancel() {
    this.form.reset();
  }

}
