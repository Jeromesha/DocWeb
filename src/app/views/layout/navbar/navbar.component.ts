import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/app/services/usersession.service';
import swal from 'sweetalert2';
import * as _ from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangepasswordComponent } from '../changepassword/changepassword.component';
import { UserService } from 'src/app/services/user.service';
import { RoleType } from 'src/enum/roletype';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  form: FormGroup;
  username: '';
  languageType: any;
  Languages: any[];
  user_url: string;
  userdata: any;
  userImg: any;
  userId: number;
  emailId: any;
  roleName: any;
  roleId: number;
  public RoleEnumType = RoleType;
  notificationList: any[];
  active: boolean;
  currentDate: any;
  todayDate: string;
  districtId: number = 0;
  blockId: number = 0;
  districtList: any[];
  blockList: any[];
  filterdistrictList: any[];
  filterblockList: any[];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public translate: TranslateService,
    private userSessionService: UserSessionService,
    private authService: AuthenticationService,
    private navigationService: NavigationService,
    private router: Router,
    public dialog: MatDialog,
    private userService: UserService,
    private dashboardService: DashboardService,
    private formBuilder: FormBuilder,
  ) {
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ta|tl|de|af/) ? browserLang : 'en');
    this.languageType = userSessionService.getLanguageType();
    this.userId = userSessionService.userId();
    this.emailId = userSessionService.getEmail();
    this.roleId = this.userSessionService.roleId();
    this.currentDate = moment(new Date()).format('YYYY-MM-DD');

  }

  ngOnInit(): void {
    this.initializeValidators();
    this.username = this.userSessionService.getUserName();
    this.roleName = this.userSessionService.roleName();
    // this.getLanguage();
    this.getUserImg(true);
    // this.currentDate = moment(new Date()).format('YYYY-MM-DD');
    // this.form.controls['date'].setValue(this.currentDate);
    this.todayDate = moment(new Date()).format('dddd');
    // this.updateDistrict(0);
    // this.updateBlock(0);
    // this.updateDate(this.currentDate);
    console.log(this.username + '?' + this.roleName + '/')
  }

  initializeValidators() {
    // this.form = this.formBuilder.group({
    //   districtId: [0],
    //   blockId: [0],
    //   date: ['']
    // });
  }

  getUserImg(refresh: boolean) {
    // this.userService.getById(this.userId, refresh).subscribe(result => {
    //   this.userdata = result;
    //   this.userImg = result.userPhoto;
    // });
  }

  updateParam() {
    const urls = this.router.url.split('?');
    const url2 = this.router.url.split('/');
    if (url2.length === 2) {
      this.router.navigate([urls[0]], {
        queryParams: { data: new Date().getTime() }
      });
    }
  }

  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  /**
   * Logout
   */
  onLogout(e) {
    e.preventDefault();
    const title = this.translate.instant('LogoutConfirmation');
    const txt = this.translate.instant('Youwanttologout');
    const Yes = this.translate.instant('Yes');
    const No = this.translate.instant('No');
    swal.fire({
      title,
      text: txt,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: Yes,
      cancelButtonText: No,
    }).then((result) => {
      if (result.value) {
        let data = {
          userId: this.userId,
        };
        this.userService.logout(data).subscribe(res => {
          this.navigationService.goToLogin();
          this.authService.logOut();
        });
      }
    })
  }

  // getLanguage() {
  //   this.utilityService.getLanguageTypeLookup(true).subscribe(res => {
  //     if (res) {
  //       this.Languages = [];
  //       this.Languages = res;
  //       switch (this.languageType) {
  //         case 1:
  //           this.translate.use('en');
  //           break;
  //         case 2:
  //           this.translate.use('ta');
  //           break;
  //         case 3:
  //           this.translate.use('tl');
  //           break;
  //         default:
  //           this.translate.use('en');
  //           break;
  //       }
  //     }
  //   });
  // }

  openMyProfile() {
    const myuserId = this.userSessionService.userId();
    this.user_url = '/user/' + myuserId;
    this.navigationService.goToProfile(myuserId, 0);
  }

  openChangePasswordDialog() {
    const dialogRef = this.dialog.open(ChangepasswordComponent, {
      autoFocus: false,
      disableClose: true,
      panelClass: 'mat-dialog'

    })
    dialogRef.afterClosed().subscribe(data => {
      this.authService.logOut();
      this.navigationService.goToLogin();
    });
  }

  getLookupDistrict(refresh: boolean) {
    // this.form.controls['blockId'].setValue(0);
    // this.districtService.getLookUp(refresh).subscribe((result) => {
    //   if (result) {
    //     this.districtList = [];
    //     this.filterdistrictList = [];
    //     this.districtList = result;
    //     const districtLength = this.districtList.length;
    //     this.filterdistrictList = this.districtList.slice();
    //     // this.form.controls['districtId'].setValue(this.districtList[0].key);
    //     if (districtLength != 1) {
    //       this.getLookupBlock(this.form.value.districtId);
    //       this.districtId = this.form.value.districtId;
    //     }

    //     if (districtLength === 1) {
    //       this.form.controls["districtId"].setValue(this.districtList[0].key);
    //       this.getLookupBlock(this.form.value.districtId);
    //       this.districtId = this.form.value.districtId;
    //       // this.getBarChartData();
    //     }
    //   }
    // });
  }

  districtChange(event) {
    // this.getLookupBlock(this.form.value.districtId);
    // this.districtId = this.form.value.districtId;
    // this.blockId = 0;
    // this.form.controls["blockId"].setValue(0);
    // this.updateDistrict(this.form.value.districtId);
    // this.updateBlock(0);
  }

  getLookupBlock(id) {
    // this.blockService.getLookUpbyId(true, id).subscribe((result) => {
    //   if (result) {
    //     this.blockList = [];
    //     this.filterblockList = [];
    //     this.blockList = result;
    //     const blockLength = this.blockList.length;
    //     this.filterblockList = this.blockList.slice();
    //     if (blockLength != 1) {
    //       if (this.districtId == 1) {
    //         this.blockId = this.form.value.blockId;
    //       }
    //     }

    //     if (blockLength === 1) {
    //       this.form.controls["blockId"].setValue(this.blockList[0].key);
    //       this.blockId = this.form.value.blockId;
    //       // this.updateBlock(this.form.value.blockId);
    //       // this.getBarChartData();
    //     } else {
    //     }
    //   } else {
    //   }
    // });
  }


  getDate(event: any) {
    // this.updateDate(event);
  }

  blockChange() {
    // this.blockId = this.form.value.blockId;
    // this.updateBlock(this.form.value.blockId);
  }

  // updateDate(date) {
  //   const obj = JSON.parse(this.userSessionService.load());
  //   obj.filterdate = date;
  //   this.userSessionService.create(obj);
  // }

  // updateDistrict(districtId) {
  //   const obj = JSON.parse(this.userSessionService.load());
  //   obj.filterdistrictId = districtId;
  //   this.userSessionService.create(obj);
  // }

  // updateBlock(blockId) {
  //   const obj = JSON.parse(this.userSessionService.load());
  //   obj.filterblockId = blockId;
  //   this.userSessionService.create(obj);
  // }

}
