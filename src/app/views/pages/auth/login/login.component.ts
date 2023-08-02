import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserIdleService } from 'angular-user-idle';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { RoleService } from 'src/app/services/role.service';
import { UserSessionService } from 'src/app/services/usersession.service';
import { ForgotpasswordeventComponent } from '../forgotpassword/forgotpasswordevent.component';
import swal from 'sweetalert2';
import { ChangepasswordComponent } from 'src/app/views/layout/changepassword/changepassword.component';

// import getBrowserFingerprint from 'get-browser-fingerprint';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: any;
  loginForm: FormGroup;
  userName: any;
  password: any;
  show: boolean;
  notificationList: any[];
  newnotificationList: any[];
  showLogin: boolean = false
  loading: boolean = false;


  constructor(private router: Router,
    private route: ActivatedRoute,
    private roleService: RoleService,
    private userSessionService: UserSessionService,
    private navigation: NavigationService,
    private userIdle: UserIdleService,
    public dialog: MatDialog,
    private authService: AuthenticationService,
    private alertService: AlertService,
    public translate: TranslateService,
    public addLoginDialog: MatDialog,
    private dashboardService: DashboardService,
    public navigationService: NavigationService,) {

    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ta|tl|de|af/) ? browserLang : 'en');
    this.translate.use('ta');
  }

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('isLoggedin')) === true) {
      this.navigationService.goToDashboard()
    }

    this.initializeValidators();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.userIdle.startWatching();
  }

  initializeValidators() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onLogin() {
    debugger
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService.clearSession();
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password, false).subscribe((res) => {
        if (res && res.failures && res.failures.length > 0) {
          debugger
          this.loading = false;
          if (res.failures[0].toString().includes('Unauthorized user')) {
            swal.fire({
              title: 'Confirmation',
              text: 'Another user logged in to your account, You want to force login',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes',
              cancelButtonText: 'No',
            }).then((result) => {
              if (result.value) {
                this.confirmLogout();
              }
            })
          } else
            this.alertService.error(res.failures[0]);
        }
        else if (res) {
          if (res.issystem_generated == true) {
            this.openChangePasswordDialog();
            this.loading = false;

          } else {
            this.userIdle.onTimerStart().subscribe(count => {
            });
            this.userIdle.onTimeout().subscribe(() => {
              this.userIdle.stopTimer();
              this.userIdle.stopWatching();
              this.authService.logOut();
              this.navigation.goToLogin();
            });
            this.getMenu(true);
            this.loading = false;
          }
        }
      },
        (error) => {
          this.loading = false;
        });
    } else {
      this.validateFormControl();
      this.loading = false;

    }
  }

  openChangePasswordDialog() {
    const dialogRef = this.dialog.open(ChangepasswordComponent, {
      autoFocus: false,
      disableClose: true,
      panelClass: 'mat-dialog'

    })
    dialogRef.afterClosed().subscribe(data => {
      if (data.isSuccess) {
        this.userIdle.onTimerStart().subscribe(count => {
        });
        this.userIdle.onTimeout().subscribe(() => {
          this.userIdle.stopTimer();
          this.userIdle.stopWatching();
          this.authService.logOut();
          this.navigation.goToLogin();
        });
        this.getMenu(true);
      }
    });
  }

  confirmLogout() {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password, true).subscribe((result) => {
      if (result && result.failures && result.failures.length > 0) {
        this.alertService.error(result.failures[0]);
      }
      else if (result) {
        if (result.issystem_generated == true) {
          this.openChangePasswordDialog();
        } else {
          this.userIdle.onTimerStart().subscribe(count => {
          });
          this.userIdle.onTimeout().subscribe(() => {
            this.userIdle.stopTimer();
            this.userIdle.stopWatching();
            this.authService.logOut();
            this.navigation.goToLogin();
          });
          this.getMenu(true);
        }
      }
    });
  }

  getMenu(isRefresh) {
    this.roleService.getMenu(isRefresh).subscribe(result => {
      const menuItems = [];
      console.log(result);

      result.forEach(element => {

        const mainMenu = { label: element.title, icon: element.icon, link: element.path, isVisible: element.isVisible, subItems: [] };
        if (element.submenu && element.submenu.length > 0) {
          element.submenu.forEach(level1 => {
            const submenu1 = { label: level1.title, icon: level1.icon, link: level1.path, isVisible: level1.isVisible, subItems: [] };
            if (level1.submenu && level1.submenu.length > 0) {
              level1.submenu.forEach(level2 => {
                const submenu2 = { label: level2.title, icon: level2.icon, link: level2.path, isVisible: level2.isVisible, subItems: [] };
                if (level2.submenu && level2.submenu.length > 0) {
                  level2.submenu.forEach(level3 => {
                    const submenu3 = { label: level3.title, icon: level3.icon, link: level3.path, isVisible: level3.isVisible, subItems: [] };
                    submenu2.subItems.push(submenu3);
                  });
                  submenu1.subItems.push(submenu2);
                }
              });
            }
            mainMenu.subItems.push(submenu1);
          });
        }
        menuItems.push(mainMenu);
      });
      if (menuItems && menuItems.length > 0) {
        this.userSessionService.setLocalStorageWithKey('menu', menuItems);
        this.userSessionService.setLocalStorageWithKey('menucontrols', result);
        localStorage.setItem('isLoggedin', 'true');
        this.navigation.goToDashboard();
        const selectedmenu = menuItems.find(e => {
          return e.label === 'Dashboard'
        });
        if (selectedmenu) {
          this.router.navigate([selectedmenu.link]);
        }
        // else if (menuItems[0].subItems.length > 0) {
        // const firstmenu = menuItems[2].subItems[1].link;
        // this.router.navigate([firstmenu]);
        // }
      }

      else {
        this.alertService.info('You have no Access, Please contact support team');
      }
    });
  }

  validateFormControl() {
    Object.keys(this.loginForm.controls).forEach(field => {
      const control = this.loginForm.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true
        });
      }
    })
  }

  openForgotPasswordDialog() {
    const dialogRef = this.dialog.open(ForgotpasswordeventComponent, {
      autoFocus: false,
      disableClose: true,
      panelClass: 'mat-dialog'

    })
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
      }
    });
  }

  passwordclick() {
    this.show = !this.show;
  }
  goToLogin() {
    this.showLogin = true
  }

}
