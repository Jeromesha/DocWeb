import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/services/alert.service';
import { UserSessionService } from 'src/app/services/usersession.service';
import { UserService } from 'src/app/services/user.service';
import { NotifyService } from 'src/app/services/notifyService';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  id = 0;
  actionInfo = 0;
  form: FormGroup;
  routeParams: any;
  pageTitle: string;
  data: any;
  submitbtn: string;
  filesResult: any;
  selectedFileName = 'Choose File';
  dropdownSettings: any = {};
  formEditMode = true;
  Languages: any[];
  RollList: any;
  pattern: RegExp;
  isReadOnly = false;
  languageType: any;
  languageUpdate: any;
  isDisabled: boolean = true; 
  images: any[];
  constructor(private formBuilder: FormBuilder,
    private _location: Location,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private alertService: AlertService,
    private userSessionService: UserSessionService,
    private userService: UserService,
    private notifyService: NotifyService,
    private translate: TranslateService,
    private _lightbox: Lightbox) {
    this.routeParams = route.snapshot.params;
    this.id = +this.routeParams.id;
    this.actionInfo = this.routeParams.actionInfo
    if (this.id === 0) {
      this.submitbtn = 'Save';
    } else {
      this.submitbtn = 'Update';
    }
    if (this.actionInfo == 1) {
      this.formEditMode = false
    }
    this.pattern = /^(?!\s)(?![\s\S]*\s$)[a-zA-Z0-9\s()-]+$/;
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ta|tl|de|af/) ? browserLang : 'en');
    this.languageType = userSessionService.getLanguageType();
  }

  ngOnInit() {
    this.initializeValidators();
    this.get(true);
    // this.getLanguage();
    this.getRoll(true);
  }

  initializeValidators() {
    this.form = this.formBuilder.group({
      id: [this.id, Validators.required],
      firstName: [null, [Validators.required]],
      lastName: [null],
      email: [null, [Validators.required, Validators.email]],
      userName: ['', [Validators.required]],
      mobileNo: [null, [Validators.required]],
      languageType: ['', [Validators.required]],
      isProfile: [true],
    });
    
  }

  get(refresh: boolean) {
    if (this.id > 0) {
      this.userService.getById(this.id, refresh).subscribe(result => {
        this.data = result;
        if (this.data) {
          this.filesResult = this.data.userPhoto;
          this.selectedFileName = this.data.userPhotoPath;
          this.form.patchValue(this.data);
          if (this.formEditMode == false) {
            this.form.disable();
            this.isReadOnly = false;
          }
        }
      });
      this.isReadOnly = true;
    }
  }

  validateFormControl() {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true
        });
      }
    })
  }
  
  onSearchChange(searchValue: any): void {  
    this.form.controls['userName'].setValue(searchValue.target.value);
  }
  // getLanguage() {
  //   this.utilityService.getLanguageTypeLookup(true).subscribe(res => {
  //     if (res) {
  //       this.Languages = [];
  //       this.Languages = res;
  //     }
  //   });
  // }
  
  getRoll(refresh: boolean) {
    this.userService.getRoll(true).subscribe(res => {
      if (res) {
        this.RollList = [];
        this.RollList = res;
      }
    });
  }
  
  onSubmit() {
    if (this.form.valid) {
      this.userService.save(this.form.value).subscribe(result => {
        if (result) {
          const msg1 = this.translate.instant('Updatedsuccessfully');
          const msg3 = this.translate.instant('User');
         this.updateLanguageType(this.form.value.languageType);
        this.notifyService.emitChange3(this.form.value.languageType);
        this.languageType = this.userSessionService.getLanguageType();
         switch (this.languageType) {
          case 1:
            this.translate.use('en');
            break;
          case 2:
            this.translate.use('ta');
            break;
          case 3:
            this.translate.use('tl');
            break;
          default:
            this.translate.use('en');
            break;
        }
        this.alertService.result(result, true, msg3 +' '+ msg1);
        }
      });
    } else {
      this.validateFormControl();
    }
  }
  
  updateLanguageType(languageType){
    const obj = JSON.parse(this.userSessionService.load());
    obj.languageType = languageType;
    this.userSessionService.create(obj);
  }

  onCancel() {
    this._location.back();
  }

}
