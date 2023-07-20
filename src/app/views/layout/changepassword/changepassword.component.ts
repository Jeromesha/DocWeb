import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';
import { UserSessionService } from 'src/app/services/usersession.service';
import { PasswordStrengthValidator } from 'src/app/views/layout/validators/password-strength.validators';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  form: FormGroup;
  returnUrl: string;
  abcd: number;
  eventData: any;
  userId: number;
  show: boolean;
  show2: boolean;
  showold: boolean;
  captchacode: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<ChangepasswordComponent>,
    private userSessionService: UserSessionService) {
    if (this.data) {
      this.eventData = JSON.stringify(data);
    }
    this.userId = this.userSessionService.userId();
    this.showold = false;
    this.show = false;
    this.show2 = false;
  }

  ngOnInit() {
    this.initializeValidators();
    this.OnCaptachaValidators();
  }

  initializeValidators() {
    this.form = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, PasswordStrengthValidator]),
      confirmpassword: new FormControl('', [Validators.required]),
      txtCaptcha: new FormControl('', [Validators.required]),
      CaptchaDiv: new FormControl(this.captchacode, [Validators.required]),
      userId: new FormControl(this.userId, [Validators.required]),
    });
  }

  OnCaptachaValidators() {
    this.captchaGenerate();
    this.form.controls['CaptchaDiv'].setValue(this.captchacode);
    this.form.controls['txtCaptcha'].setValue(null);
  }

  captchaGenerate() {
    var alpha = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
    var i;
    for (i = 0; i < 6; i++) {
      var a = alpha[Math.floor(Math.random() * alpha.length)];
      var b = alpha[Math.floor(Math.random() * alpha.length)];
      var c = alpha[Math.floor(Math.random() * alpha.length)];
      var d = alpha[Math.floor(Math.random() * alpha.length)];
      var e = alpha[Math.floor(Math.random() * alpha.length)];
      var f = alpha[Math.floor(Math.random() * alpha.length)];
      var g = alpha[Math.floor(Math.random() * alpha.length)];
    }
    this.captchacode = a + b + c + d + e + f + g;
  }

  onSave() {
    this.showold = false;
    this.show = false;
    this.show2 = false;
    if (this.form.valid) {
      if (this.captchacode === this.form.controls['txtCaptcha'].value) {
        if (this.form.controls['newPassword'].value === this.form.controls['confirmpassword'].value) {
          this.userService.changepasswordUser(this.form.value).subscribe(result => {
            if (result && result.isSuccess) {
              this.alertService.success('Password has been Updated Successfully');
              this.dialogRef.close(result);
            } else {
              if (result && result.failures) {
                this.alertService.error(result.failures.toString());
              }
            }
          });
        }
      } else {
        this.alertService.error('Please enter the vaild captcha');
      }
    } else {
      this.validateFormControl();
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  password() {
    this.show = !this.show;
  }

  confirmpassword() {
    this.show2 = !this.show2;
  }

  oldPassword() {
    this.showold = !this.showold;
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
}
