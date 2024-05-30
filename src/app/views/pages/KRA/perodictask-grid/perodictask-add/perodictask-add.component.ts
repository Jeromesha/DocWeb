import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { AlertService } from 'src/app/services/alert.service';
import { ExcelService } from 'src/app/services/excel.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { TaskService } from 'src/app/services/task.service';
import { UserSessionService } from 'src/app/services/usersession.service';

@Component({
  selector: 'app-perodictask-add',
  templateUrl: './perodictask-add.component.html',
  styleUrls: ['./perodictask-add.component.scss']
})
export class PerodictaskAddComponent implements OnInit {

  routeParams: any;
  id: number;
  actionInfo: any;
  form: FormGroup;

  submitbtn: string;
  constructor(
    route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private navigationService: NavigationService,
    public translate: TranslateService,
    private alertService: AlertService,
    private excelService: ExcelService,
    private userSessionService: UserSessionService,
    public taskService: TaskService,
    private _location: Location,
  ) {
    this.routeParams = route.snapshot.params;
    this.id = parseInt(this.routeParams.id);
    this.actionInfo = this.routeParams.actionInfo;
  }

  ngOnInit(): void {
    this.initializeValidators();
    if (this.id === 0) {
      this.submitbtn = 'Add';
    }
    else {
      this.submitbtn = 'Update';
    }
  }

  initializeValidators() {
    this.form = this.formBuilder.group({
      id: [0],
      taskName: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  onCancel() {
    this._location.back();
  }
  onClear() {
    this.form.reset();
  }
  onSubmit() {
    this._location.back();
    this.alertService.success("Task added Successfully")
  }

}
