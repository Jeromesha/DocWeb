import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-forgotpasswordevent',
  templateUrl: './forgotpasswordevent.component.html',
  styleUrls: ['./forgotpasswordevent.component.scss']
})
export class ForgotpasswordeventComponent implements OnInit {
  forgotForm: FormGroup;
  returnUrl: string;
  abcd: number;

  eventData: any;
  captchacode: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<ForgotpasswordeventComponent>) {
    if (this.data) {
      this.eventData = JSON.stringify(data);
    }
  }

  ngOnInit() {
    this.initializeValidators();
    this.OnCaptachaValidators();
  }
  initializeValidators() {
   // this.abcd = Math.floor(1000 + Math.random() * 9000);
    this.forgotForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      txtCaptcha: new FormControl('', [Validators.required]),
      CaptchaDiv: new FormControl(this.captchacode, [Validators.required]),
    });
  }

  OnCaptachaValidators() {
    //this.abcd = Math.floor(1000 + Math.random() * 9000);
    this.captchaGenerate();
    // this.forgotForm = new FormGroup({
    //   txtCaptcha: new FormControl('', [Validators.required]),
    //   CaptchaDiv: new FormControl(this.captchacode, [Validators.required]),
    // });
this.forgotForm.controls['CaptchaDiv'].setValue(this.captchacode);
this.forgotForm.controls['txtCaptcha'].setValue(null);
  }
  captchaGenerate(){
    var alpha = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
    var i;
    for (i=0;i<6;i++){
      var a = alpha[Math.floor(Math.random() * alpha.length)];
      var b = alpha[Math.floor(Math.random() * alpha.length)];
      var c = alpha[Math.floor(Math.random() * alpha.length)];
      var d = alpha[Math.floor(Math.random() * alpha.length)];
      var e = alpha[Math.floor(Math.random() * alpha.length)];
      var f = alpha[Math.floor(Math.random() * alpha.length)];
      var g = alpha[Math.floor(Math.random() * alpha.length)];
     }
   this.captchacode = a + b +  c +  d + e +  f + g;

  }
  onSave() {
    if (this.forgotForm.valid) {
      if (this.captchacode === this.forgotForm.controls['txtCaptcha'].value) {
        this.userService.forgotpasswordUser(this.forgotForm.value).subscribe(result => {
          if (result && result.isSuccess) {
            this.alertService.success('Password has been sent to your registered email');
            this.dialogRef.close();
          }else{
            if (result && result.failures) {
              this.alertService.error(result.failures.toString());
            }
          }
        });
      }else{
        this.alertService.error('Please enter the vaild captcha');
      }
    } else {
      this.validateFormControl();
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  validateFormControl() {
    Object.keys(this.forgotForm.controls).forEach(field => {
      const control = this.forgotForm.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true
        });
      }
    })
  }
}
