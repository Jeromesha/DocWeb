(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-pages-auth-auth-module"],{

/***/ "/2yL":
/*!***********************************************************!*\
  !*** ./src/app/views/pages/auth/login/login.component.ts ***!
  \***********************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_login_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./login.component.html */ "qVrc");
/* harmony import */ var _login_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login.component.scss */ "4rlt");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var angular_user_idle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! angular-user-idle */ "uuDO");
/* harmony import */ var src_app_services_alert_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/alert.service */ "3LUQ");
/* harmony import */ var src_app_services_authentication_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/services/authentication.service */ "ej43");
/* harmony import */ var src_app_services_dashboard_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/services/dashboard.service */ "0AbP");
/* harmony import */ var src_app_services_navigation_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/services/navigation.service */ "+NYR");
/* harmony import */ var src_app_services_role_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/services/role.service */ "3b5Z");
/* harmony import */ var src_app_services_usersession_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/services/usersession.service */ "K0zP");
/* harmony import */ var _forgotpassword_forgotpasswordevent_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../forgotpassword/forgotpasswordevent.component */ "S8rG");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! sweetalert2 */ "PSD3");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var src_app_views_layout_changepassword_changepassword_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! src/app/views/layout/changepassword/changepassword.component */ "yCcV");


















// import getBrowserFingerprint from 'get-browser-fingerprint';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, route, roleService, userSessionService, navigation, userIdle, dialog, authService, alertService, translate, addLoginDialog, dashboardService, navigationService) {
        this.router = router;
        this.route = route;
        this.roleService = roleService;
        this.userSessionService = userSessionService;
        this.navigation = navigation;
        this.userIdle = userIdle;
        this.dialog = dialog;
        this.authService = authService;
        this.alertService = alertService;
        this.translate = translate;
        this.addLoginDialog = addLoginDialog;
        this.dashboardService = dashboardService;
        this.navigationService = navigationService;
        this.showLogin = false;
        this.loading = false;
        var browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|ta|tl|de|af/) ? browserLang : 'en');
        this.translate.use('ta');
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (JSON.parse(localStorage.getItem('isLoggedin')) === true) {
            this.navigationService.goToDashboard();
        }
        this.initializeValidators();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.userIdle.startWatching();
    };
    LoginComponent.prototype.initializeValidators = function () {
        this.loginForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormGroup"]({
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
        });
    };
    LoginComponent.prototype.onLogin = function () {
        var _this = this;
        if (this.loginForm.valid) {
            this.loading = true;
            this.authService.clearSession();
            this.authService.login(this.loginForm.value.email, this.loginForm.value.password, false).subscribe(function (res) {
                if (res && res.failures && res.failures.length > 0) {
                    _this.loading = false;
                    if (res.failures[0].toString().includes('Unauthorized user')) {
                        sweetalert2__WEBPACK_IMPORTED_MODULE_16___default.a.fire({
                            title: 'Confirmation',
                            text: 'Another user logged in to your account, You want to force login',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes',
                            cancelButtonText: 'No',
                        }).then(function (result) {
                            if (result.value) {
                                _this.confirmLogout();
                            }
                        });
                    }
                    else
                        _this.alertService.error(res.failures[0]);
                }
                else if (res) {
                    if (res.issystem_generated == true) {
                        _this.openChangePasswordDialog();
                    }
                    else {
                        _this.userIdle.onTimerStart().subscribe(function (count) {
                        });
                        _this.userIdle.onTimeout().subscribe(function () {
                            _this.userIdle.stopTimer();
                            _this.userIdle.stopWatching();
                            _this.authService.logOut();
                            _this.navigation.goToLogin();
                        });
                        _this.getMenu(true);
                    }
                }
            });
        }
        else {
            this.validateFormControl();
        }
    };
    LoginComponent.prototype.openChangePasswordDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(src_app_views_layout_changepassword_changepassword_component__WEBPACK_IMPORTED_MODULE_17__["ChangepasswordComponent"], {
            autoFocus: false,
            disableClose: true,
            panelClass: 'mat-dialog'
        });
        dialogRef.afterClosed().subscribe(function (data) {
            if (data.isSuccess) {
                _this.userIdle.onTimerStart().subscribe(function (count) {
                });
                _this.userIdle.onTimeout().subscribe(function () {
                    _this.userIdle.stopTimer();
                    _this.userIdle.stopWatching();
                    _this.authService.logOut();
                    _this.navigation.goToLogin();
                });
                _this.getMenu(true);
            }
        });
    };
    LoginComponent.prototype.confirmLogout = function () {
        var _this = this;
        this.authService.login(this.loginForm.value.email, this.loginForm.value.password, true).subscribe(function (result) {
            if (result && result.failures && result.failures.length > 0) {
                _this.alertService.error(result.failures[0]);
            }
            else if (result) {
                if (result.issystem_generated == true) {
                    _this.openChangePasswordDialog();
                }
                else {
                    _this.userIdle.onTimerStart().subscribe(function (count) {
                    });
                    _this.userIdle.onTimeout().subscribe(function () {
                        _this.userIdle.stopTimer();
                        _this.userIdle.stopWatching();
                        _this.authService.logOut();
                        _this.navigation.goToLogin();
                    });
                    _this.getMenu(true);
                }
            }
        });
    };
    LoginComponent.prototype.getMenu = function (isRefresh) {
        var _this = this;
        this.roleService.getMenu(isRefresh).subscribe(function (result) {
            var menuItems = [];
            console.log(result);
            result.forEach(function (element) {
                var mainMenu = { label: element.title, icon: element.icon, link: element.path, isVisible: element.isVisible, subItems: [] };
                if (element.submenu && element.submenu.length > 0) {
                    element.submenu.forEach(function (level1) {
                        var submenu1 = { label: level1.title, icon: level1.icon, link: level1.path, isVisible: level1.isVisible, subItems: [] };
                        if (level1.submenu && level1.submenu.length > 0) {
                            level1.submenu.forEach(function (level2) {
                                var submenu2 = { label: level2.title, icon: level2.icon, link: level2.path, isVisible: level2.isVisible, subItems: [] };
                                if (level2.submenu && level2.submenu.length > 0) {
                                    level2.submenu.forEach(function (level3) {
                                        var submenu3 = { label: level3.title, icon: level3.icon, link: level3.path, isVisible: level3.isVisible, subItems: [] };
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
                _this.userSessionService.setLocalStorageWithKey('menu', menuItems);
                _this.userSessionService.setLocalStorageWithKey('menucontrols', result);
                localStorage.setItem('isLoggedin', 'true');
                _this.navigation.goToDashboard();
                var selectedmenu = menuItems.find(function (e) {
                    return e.label === 'Dashboard';
                });
                if (selectedmenu) {
                    _this.router.navigate([selectedmenu.link]);
                }
                // else if (menuItems[0].subItems.length > 0) {
                // const firstmenu = menuItems[2].subItems[1].link;
                // this.router.navigate([firstmenu]);
                // }
            }
            else {
                _this.alertService.info('You have no Access, Please contact support team');
            }
        });
    };
    LoginComponent.prototype.validateFormControl = function () {
        var _this = this;
        Object.keys(this.loginForm.controls).forEach(function (field) {
            var control = _this.loginForm.get(field);
            if (control instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]) {
                control.markAsTouched({
                    onlySelf: true
                });
            }
        });
    };
    LoginComponent.prototype.openForgotPasswordDialog = function () {
        var dialogRef = this.dialog.open(_forgotpassword_forgotpasswordevent_component__WEBPACK_IMPORTED_MODULE_15__["ForgotpasswordeventComponent"], {
            autoFocus: false,
            disableClose: true,
            panelClass: 'mat-dialog'
        });
        dialogRef.afterClosed().subscribe(function (data) {
            if (data) {
            }
        });
    };
    LoginComponent.prototype.passwordclick = function () {
        this.show = !this.show;
    };
    LoginComponent.prototype.goToLogin = function () {
        this.showLogin = true;
    };
    LoginComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"] },
        { type: src_app_services_role_service__WEBPACK_IMPORTED_MODULE_13__["RoleService"] },
        { type: src_app_services_usersession_service__WEBPACK_IMPORTED_MODULE_14__["UserSessionService"] },
        { type: src_app_services_navigation_service__WEBPACK_IMPORTED_MODULE_12__["NavigationService"] },
        { type: angular_user_idle__WEBPACK_IMPORTED_MODULE_8__["UserIdleService"] },
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__["MatDialog"] },
        { type: src_app_services_authentication_service__WEBPACK_IMPORTED_MODULE_10__["AuthenticationService"] },
        { type: src_app_services_alert_service__WEBPACK_IMPORTED_MODULE_9__["AlertService"] },
        { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateService"] },
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__["MatDialog"] },
        { type: src_app_services_dashboard_service__WEBPACK_IMPORTED_MODULE_11__["DashboardService"] },
        { type: src_app_services_navigation_service__WEBPACK_IMPORTED_MODULE_12__["NavigationService"] }
    ]; };
    LoginComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-login',
            template: _raw_loader_login_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_login_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
        })
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "4rlt":
/*!*************************************************************!*\
  !*** ./src/app/views/pages/auth/login/login.component.scss ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".openLogin {\n  display: flex;\n  align-items: center;\n  height: 80%;\n}\n\n.imgArrow {\n  width: 40px;\n  margin-left: 29px;\n}\n\n@media only screen and (max-width: 1020px) {\n  .imgArrow {\n    width: 35px;\n  }\n}\n\n@media only screen and (max-width: 760px) {\n  .imgArrow {\n    width: 30px;\n  }\n}\n\n@media only screen and (max-width: 620px) {\n  .imgArrow {\n    width: 30px;\n    margin-left: 22px;\n  }\n}\n\n@media only screen and (max-width: 580px) {\n  .imgArrow {\n    width: 25px;\n    margin-left: 10px;\n  }\n}\n\n.login-button {\n  width: 13%;\n  margin-left: 62vw;\n  margin-top: 32vh;\n  padding: 0px;\n  text-align: center;\n}\n\n@media only screen and (max-width: 1020px) {\n  .login-button {\n    width: 15%;\n    font-size: 12px;\n    margin-top: 37vh;\n    margin-left: 60vw;\n  }\n}\n\n@media only screen and (max-width: 760px) {\n  .login-button {\n    width: 16%;\n    font-size: 11px;\n    margin-top: 38vh;\n    margin-left: 59vw;\n  }\n}\n\n@media only screen and (max-width: 620px) {\n  .login-button {\n    width: 17%;\n    font-size: 10px;\n    margin-top: 39vh;\n    margin-left: 58vw;\n  }\n}\n\n@media only screen and (max-width: 580px) {\n  .login-button {\n    width: 20%;\n    font-size: 9px;\n    margin-top: 41vh;\n    margin-left: 41vw;\n  }\n}\n\n@media only screen and (max-width: 400px) {\n  .login-button {\n    width: 22%;\n    font-size: 9px;\n    margin-top: 56vh;\n  }\n}\n\n.login-button:hover {\n  transform: scale(1.05);\n  box-shadow: 0px 0px 22px 1px #f3dd94;\n}\n\n#login .login-img1 {\n  padding-right: 30px !important;\n  padding-left: 30px !important;\n  padding-top: 50px !important;\n  padding-bottom: 50px !important;\n  background-repeat: no-repeat;\n  background-color: url('main_logo.png');\n}\n\n#login .login_sec1 {\n  background-position: 100%;\n  background-attachment: fixed;\n  height: calc(100vh);\n  background-size: 100%;\n}\n\n#login .login_sec {\n  background-position: 100%;\n  background-attachment: fixed;\n  height: calc(100vh);\n  background-size: 100%;\n}\n\n@media only screen and (max-width: 1040px) {\n  #login .login_sec {\n    transform: scale(1.1);\n  }\n}\n\n@media only screen and (max-width: 980px) {\n  #login .login_sec {\n    transform: scale(1.2);\n  }\n}\n\n@media only screen and (max-width: 900px) {\n  #login .login_sec {\n    transform: scale(1.3);\n  }\n}\n\n@media only screen and (max-width: 720px) {\n  #login .login_sec {\n    transform: scale(1.4);\n  }\n}\n\n@media only screen and (max-width: 620px) {\n  #login .login_sec {\n    transform: scale(1.6);\n  }\n}\n\n@media only screen and (max-width: 580px) {\n  #login .login_sec {\n    transform: scale(1);\n    background-size: contain;\n    background-position: center;\n  }\n}\n\n#login .loginpage {\n  background-size: 100% 100% !important;\n  background-repeat: no-repeat;\n  overflow: hidden;\n  height: calc(110vh);\n}\n\n#login .full-height-vh {\n  height: auto !important;\n}\n\n#login .logo {\n  text-align: center;\n}\n\n#login .logo img {\n  max-width: 65%;\n}\n\n#login .full-height-vh {\n  height: auto !important;\n}\n\n#login .card {\n  border: 0;\n  margin: 18px 0;\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n  border-radius: 4px;\n  width: 62%;\n  padding: 15px;\n}\n\n#login .card .card-title {\n  color: #000;\n  margin-bottom: 1.2rem;\n  text-transform: uppercase;\n  font-size: 0.875rem;\n  font-weight: bold;\n}\n\n#login .row {\n  margin-right: 0px !important;\n  margin-left: 0px !important;\n}\n\n#login .btn-outline-primary {\n  border-color: #6db02d !important;\n}\n\n#login .btn-outline-primary:hover {\n  background-color: #6db02d !important;\n}\n\n#login .btn.btn-primary.mr-1.btnsubmit {\n  background-color: #6db02d !important;\n  border-color: #6db02d !important;\n  color: #fff !important;\n}\n\n#login .forgot-password-option a.text-decoration-none,\n#login .forgot-password-option .custom-control-label,\n#login .remember-me a.text-decoration-none,\n#login .remember-me .custom-control-label {\n  font-size: 14px;\n}\n\n@media only screen and (max-width: 767px) {\n  #login .card {\n    border: 0;\n    margin: 18px 0;\n    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n    border-radius: 4px;\n    width: 100%;\n    padding: 15px;\n  }\n}\n\n#login .btn.btn-primary.login-button:hover {\n  background-color: #e0bb41 !important;\n  color: #1C2B47;\n  font-weight: 700;\n  font-size: 16px;\n}\n\n@media only screen and (max-width: 503px) {\n  #login .btn.btn-primary.login-button:hover {\n    font-weight: 600;\n    font-size: 13px;\n  }\n}\n\n.text-color {\n  color: #1C2B47 !important;\n}\n\n.carousel-caption.carousaltop {\n  margin: auto !important;\n}\n\n@media only screen and (max-width: 360px) {\n  .left-slider-content {\n    display: none;\n  }\n\n  .header {\n    font-size: 2em !important;\n    font-family: initial !important;\n    font-weight: 500 !important;\n    color: #047d00 !important;\n    text-align: center !important;\n  }\n\n  .imgalign {\n    width: 80px;\n  }\n}\n\n.captchaicon {\n  vertical-align: middle;\n  border-style: none;\n  cursor: pointer;\n}\n\n@media only screen and (min-width: 360px) and (max-width: 767px) {\n  .left-slider-content {\n    display: none;\n  }\n\n  .header {\n    font-size: 2em !important;\n    font-family: initial !important;\n    font-weight: 500 !important;\n    color: #047d00 !important;\n    text-align: center !important;\n  }\n\n  .imgalign {\n    width: 80px;\n  }\n}\n\n@media only screen and (min-width: 768px) and (max-width: 991px) {\n  .left-slider-content {\n    display: block;\n  }\n\n  .carouselinner {\n    width: 100% !important;\n    height: 100% !important;\n  }\n\n  .header {\n    font-size: 2em !important;\n    font-family: initial !important;\n    font-weight: 500 !important;\n    color: #047d00 !important;\n    text-align: center !important;\n  }\n\n  .imgalign {\n    width: 120px;\n  }\n}\n\n@media only screen and (min-width: 992px) and (max-width: 1199px) {\n  .left-slider-content {\n    display: block;\n  }\n\n  .carouselinner {\n    width: 100% !important;\n    height: 100% !important;\n  }\n\n  .header {\n    font-size: 2.2em !important;\n    font-family: initial !important;\n    font-weight: 500 !important;\n    color: #047d00 !important;\n    text-align: center !important;\n  }\n\n  .imgalign {\n    width: 60px;\n  }\n}\n\n@media only screen and (min-width: 1200px) {\n  .left-slider-content {\n    display: block;\n  }\n\n  .carouselinner {\n    width: 100% !important;\n    height: 100% !important;\n  }\n\n  .header {\n    font-size: 2.8em !important;\n    font-family: initial !important;\n    font-weight: 500 !important;\n    color: #047d00 !important;\n    margin-bottom: 0px !important;\n  }\n\n  .imgalign {\n    width: 70px;\n  }\n}\n\n@media only screen and (max-width: 521px) {\n  .scrollstyle {\n    overflow: auto !important;\n    height: auto;\n  }\n}\n\n.carousel-inner {\n  height: 100vh !important;\n}\n\n.left-slider-content {\n  padding-left: 0px !important;\n  padding-right: 0px !important;\n}\n\n.formcontent {\n  padding-left: 0px !important;\n}\n\n.container {\n  position: relative !important;\n  text-align: center;\n  color: transparent;\n}\n\n.centered {\n  position: absolute;\n  background-color: transparent !important;\n  top: 27%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n\n.capbox-inner {\n  font: bold 4px arial, sans-serif;\n  color: #000000;\n  margin: 3px auto 0px auto;\n  padding: 3px;\n  border-radius: 4px;\n}\n\n.CaptchaDiv {\n  font: bold 17px verdana, arial, sans-serif;\n  font-style: italic;\n  color: #000000;\n  padding: 4px;\n  border-radius: 4px;\n}\n\n.CaptchaInput {\n  margin: 1px 0px 1px 0px;\n  width: 135px;\n}\n\n.custom-captcha {\n  color: white !important;\n  background: none;\n  margin-bottom: 12px;\n  margin-top: 4px;\n  border: none;\n  font-style: italic;\n  font-size: 30px;\n  margin-left: 4em;\n  pointer-events: none;\n  padding-left: 23px;\n}\n\n.bg-white {\n  background-color: #ffffff !important;\n  background-size: 100% 100% !important;\n  background-repeat: no-repeat;\n}\n\n.header-layout {\n  flex-direction: row;\n  box-sizing: border-box;\n  display: flex;\n  place-content: center;\n  align-items: center;\n}\n\n.imgalign {\n  width: 70px;\n}\n\n@media only screen and (min-device-width: 320px) and (max-device-width: 390px) {\n  .login-captcha {\n    width: 82% !important;\n    height: 40px;\n  }\n\n  .header {\n    font-size: 27px !important;\n    font-family: initial !important;\n    font-weight: 500 !important;\n    color: #047d00 !important;\n    margin-bottom: 0px !important;\n  }\n}\n\n@media only screen and (min-device-width: 400px) and (max-device-width: 720px) {\n  .login-captcha {\n    width: 86% !important;\n    height: 40px;\n  }\n}\n\n@media only screen and (max-width: 320px) {\n  .login-captcha {\n    width: 77% !important;\n    height: 40px;\n  }\n\n  .header {\n    font-size: 22px !important;\n    font-family: initial !important;\n    font-weight: 500 !important;\n    color: #047d00 !important;\n    margin-bottom: 0px !important;\n  }\n}\n\n.button.btn.btn-primary.mr-1.btnrefresh {\n  background-color: #6db02d !important;\n  border-color: #6db02d !important;\n  color: #fff !important;\n}\n\n.mat-checkbox-checked.mat-accent .mat-checkbox-background,\n.mat-checkbox-indeterminate.mat-accent .mat-checkbox-background {\n  background-color: #6db02d !important;\n}\n\n.btn.btn-primary.mr-1.btnupdate {\n  background-color: #6db02d !important;\n  border-color: #6db02d !important;\n  color: #fff !important;\n}\n\n.mat-button.mat-accent,\n.mat-icon-button.mat-accent,\n.mat-stroked-button.mat-accent {\n  color: #6db02d !important;\n}\n\n.button.btn.btn-primary.mr-1.btnadd {\n  background-color: #1C2B47 !important;\n  border-color: #1C2B47 !important;\n  color: #fff !important;\n}\n\n.login_center {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n}\n\n.input_with_icon {\n  position: relative;\n}\n\n.pass_icon {\n  position: absolute;\n  right: 2%;\n  top: 30%;\n}\n\n.danger {\n  color: #ff586b !important;\n  text-transform: capitalize;\n}\n\n.card {\n  box-shadow: 0 10px 6px -6px #777;\n}\n\n.centered {\n  position: absolute;\n  background-color: transparent !important;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n\n.CaptchaDiv {\n  font: bold 17px verdana, arial, sans-serif;\n  font-style: italic;\n  color: #000000;\n  padding: 4px;\n  border-radius: 4px;\n}\n\n.input_with_icon {\n  position: relative;\n}\n\n.pass_icon {\n  position: absolute;\n  right: 2%;\n  top: 30%;\n}\n\n.CaptchaInput {\n  margin: 1px 0px 1px 0px;\n  width: 135px;\n}\n\n.custom-captcha {\n  color: white !important;\n  background: none;\n  margin-top: 3px;\n  margin-bottom: 0px;\n  border: none;\n  font-style: italic;\n  font-size: 26px;\n  margin-left: 3em;\n  pointer-events: none;\n  padding-left: 19px !important;\n}\n\nbutton.btn.btn-primary.recover-pass {\n  color: #fff !important;\n}\n\n.fm {\n  overflow: hidden !important;\n}\n\n.captchaicon {\n  vertical-align: middle;\n  border-style: none;\n  cursor: pointer;\n}\n\n.label-captcha {\n  width: 80px;\n  margin-top: -8px;\n}\n\n@media only screen and (min-device-width: 320px) and (max-device-width: 390px) {\n  .chgpwd-captcha {\n    width: 80% !important;\n    height: 40px;\n  }\n}\n\n@media only screen and (min-device-width: 400px) and (max-device-width: 720px) {\n  .chgpwd-captcha {\n    width: 84% !important;\n    height: 40px;\n  }\n}\n\n@media only screen and (max-width: 320px) {\n  .chgpwd-captcha {\n    width: 77% !important;\n    height: 40px;\n  }\n}\n\n.loadesr {\n  position: fixed;\n  left: 50px;\n  top: 50px;\n  width: 100%;\n  height: 100%;\n  z-index: 9999;\n  background: url(\"/assets/images/Loader02.gif\") 50% 50% no-repeat #f9f9f9;\n  background-color: rgba(249, 249, 249, 0.5);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXGxvZ2luLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtBQUpGOztBQU9BO0VBQ0UsV0FBQTtFQUNBLGlCQUFBO0FBSkY7O0FBS0U7RUFIRjtJQUlJLFdBQUE7RUFGRjtBQUNGOztBQUdFO0VBTkY7SUFPSSxXQUFBO0VBQUY7QUFDRjs7QUFDRTtFQVRGO0lBVUksV0FBQTtJQUNGLGlCQUFBO0VBRUE7QUFDRjs7QUFERTtFQWJGO0lBY0ksV0FBQTtJQUNGLGlCQUFBO0VBSUE7QUFDRjs7QUFEQTtFQUNFLFVBQUE7RUFDRSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0FBSUo7O0FBSEk7RUFOSjtJQU9NLFVBQUE7SUFDQSxlQUFBO0lBQ0EsZ0JBQUE7SUFDQSxpQkFBQTtFQU1KO0FBQ0Y7O0FBTEk7RUFaSjtJQWFNLFVBQUE7SUFDQSxlQUFBO0lBQ0EsZ0JBQUE7SUFDQSxpQkFBQTtFQVFKO0FBQ0Y7O0FBUEk7RUFsQko7SUFtQk0sVUFBQTtJQUNBLGVBQUE7SUFDQSxnQkFBQTtJQUNBLGlCQUFBO0VBVUo7QUFDRjs7QUFUSTtFQXhCSjtJQXlCTSxVQUFBO0lBQ0EsY0FBQTtJQUNBLGdCQUFBO0lBQ0EsaUJBQUE7RUFZSjtBQUNGOztBQVhJO0VBOUJKO0lBK0JNLFVBQUE7SUFDQSxjQUFBO0lBQ0EsZ0JBQUE7RUFjSjtBQUNGOztBQVZBO0VBQ0Usc0JBQUE7RUFDQSxvQ0FBQTtBQWFGOztBQUVFO0VBRUUsOEJBQUE7RUFDQSw2QkFBQTtFQUNBLDRCQUFBO0VBQ0EsK0JBQUE7RUFDQSw0QkFBQTtFQUdBLHNDQUFBO0FBRko7O0FBS0U7RUFDRSx5QkFBQTtFQUNBLDRCQUFBO0VBQ0EsbUJBQUE7RUFDQSxxQkFBQTtBQUhKOztBQU1FO0VBRUUseUJBQUE7RUFDQSw0QkFBQTtFQUNBLG1CQUFBO0VBQ0EscUJB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RUFDQSxVQUFBO0VBQ0EsU0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHdFQUFBO0VBRUEsMENBQUE7QUFuREYiLCJmaWxlIjoibG9naW4uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAubG9naW5JbWFnZXtcbiBcbi8vICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbi8vICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcuLi8uLi8uLi8uLi8uLi9hc3NldHMvaW1hZ2VzL2FncmlleHBvcGcxLmpwZycpO1xuLy8gfVxuLm9wZW5Mb2dpbntcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgaGVpZ2h0OiA4MCU7XG4gIFxufVxuLmltZ0Fycm93e1xuICB3aWR0aDogNDBweDtcbiAgbWFyZ2luLWxlZnQ6IDI5cHg7XG4gIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aCA6MTAyMHB4KSB7XG4gICAgd2lkdGg6IDM1cHg7XG4gIH1cbiAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoIDo3NjBweCkge1xuICAgIHdpZHRoOiAzMHB4O1xuICB9XG4gIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aCA6NjIwcHgpIHtcbiAgICB3aWR0aDogMzBweDtcbiAgbWFyZ2luLWxlZnQ6IDIycHg7XG4gIH1cbiAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoIDo1ODBweCkge1xuICAgIHdpZHRoOiAyNXB4O1xuICBtYXJnaW4tbGVmdDogMTBweDtcbiAgfVxufVxuXG4ubG9naW4tYnV0dG9uIHtcbiAgd2lkdGg6IDEzJTtcbiAgICBtYXJnaW4tbGVmdDogNjJ2dztcbiAgICBtYXJnaW4tdG9wOiAzMnZoO1xuICAgIHBhZGRpbmc6IDBweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoIDoxMDIwcHgpIHtcbiAgICAgIHdpZHRoOiAxNSU7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICBtYXJnaW4tdG9wOiAzN3ZoO1xuICAgICAgbWFyZ2luLWxlZnQ6IDYwdnc7XG4gICAgfVxuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aCA6NzYwcHgpIHtcbiAgICAgIHdpZHRoOiAxNiU7XG4gICAgICBmb250LXNpemU6IDExcHg7XG4gICAgICBtYXJnaW4tdG9wOiAzOHZoO1xuICAgICAgbWFyZ2luLWxlZnQ6IDU5dnc7XG4gICAgfVxuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aCA6NjIwcHgpIHtcbiAgICAgIHdpZHRoOiAxNyU7XG4gICAgICBmb250LXNpemU6IDEwcHg7XG4gICAgICBtYXJnaW4tdG9wOiAzOXZoO1xuICAgICAgbWFyZ2luLWxlZnQ6IDU4dnc7XG4gICAgfVxuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aCA6NTgwcHgpIHtcbiAgICAgIHdpZHRoOiAyMCU7XG4gICAgICBmb250LXNpemU6IDlweDtcbiAgICAgIG1hcmdpbi10b3A6IDQxdmg7XG4gICAgICBtYXJnaW4tbGVmdDogNDF2dztcbiAgICB9XG4gICAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoIDo0MDBweCkge1xuICAgICAgd2lkdGg6IDIyJTtcbiAgICAgIGZvbnQtc2l6ZTogOXB4O1xuICAgICAgbWFyZ2luLXRvcDogNTZ2aDtcbiAgICB9XG4gICAgXG59XG5cbi5sb2dpbi1idXR0b246aG92ZXIge1xuICB0cmFuc2Zvcm06IHNjYWxlKDEuMDUpO1xuICBib3gtc2hhZG93OiAwcHggMHB4IDIycHggMXB4ICNmM2RkOTQ7XG59XG5cblxuXG5cbiNsb2dpbiB7XG5cbiAgLy8gLmxvZ2luLWltZyB7XG4gIC8vICAgcGFkZGluZy1yaWdodCA6IDMwcHggIWltcG9ydGFudDtcbiAgLy8gICBwYWRkaW5nLWxlZnQgIDogMzBweCAhaW1wb3J0YW50O1xuICAvLyAgIHBhZGRpbmctdG9wICAgOiA1MHB4ICFpbXBvcnRhbnQ7XG4gIC8vICAgcGFkZGluZy1ib3R0b206IDUwcHggIWltcG9ydGFudDtcbiAgLy8gICBiYWNrZ3JvdW5kLWltYWdlICAgICA6IHVybCgnLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Mb2dpbl9pbWFnZXMvTG9naW5fbWFwNjAuanBnJyk7XG4gIC8vIH1cbiAgLmxvZ2luLWltZzEge1xuXG4gICAgcGFkZGluZy1yaWdodDogMzBweCAhaW1wb3J0YW50O1xuICAgIHBhZGRpbmctbGVmdDogMzBweCAhaW1wb3J0YW50O1xuICAgIHBhZGRpbmctdG9wOiA1MHB4ICFpbXBvcnRhbnQ7XG4gICAgcGFkZGluZy1ib3R0b206IDUwcHggIWltcG9ydGFudDtcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgIC8vIGJhY2tncm91bmQtc2l6ZTpjb250YWluO1xuICAgIC8vIGJhY2tncm91bmQtcG9zaXRpb246Y2VudGVyO1xuICAgIGJhY2tncm91bmQtY29sb3I6dXJsKCcuLi8uLi8uLi8uLi8uLi9hc3NldHMvaW1hZ2VzL21haW5fbG9nby5wbmcnKTtcbiAgfVxuXG4gIC5sb2dpbl9zZWMxIHtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAxMDAlO1xuICAgIGJhY2tncm91bmQtYXR0YWNobWVudDogZml4ZWQ7XG4gICAgaGVpZ2h0OiBjYWxjKDEwMHZoKTtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7XG4gIH1cblxuICAubG9naW5fc2VjIHtcbiAgICAvLyBiYWNrZ3JvdW5kLWltYWdlICAgICA6IHVybCgnLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2ltZy9sb2dpbi9sb2dpbl9iZy5qcGcnKTtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAxMDAlO1xuICAgIGJhY2tncm91bmQtYXR0YWNobWVudDogZml4ZWQ7XG4gICAgaGVpZ2h0OiBjYWxjKDEwMHZoKTtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7XG5cbiAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGggOjEwNDBweCkge1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xuICAgIH1cbiAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGggOjk4MHB4KSB7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMik7XG4gICAgfVxuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aCA6OTAwcHgpIHtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4zKTtcbiAgICB9XG4gICAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoIDo3MjBweCkge1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjQpO1xuICAgIH1cbiAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGggOjYyMHB4KSB7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuNik7XG4gICAgfVxuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aCA6NTgwcHgpIHtcbiAgICAgIC8vIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2ltZy90bmdzX2JnSW1hZ2VfbW9iaWxlLnBuZycpO1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbiAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbiAgICB9XG4gIH1cblxuICAubG9naW5wYWdlIHtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMCUgMTAwJSAhaW1wb3J0YW50O1xuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBoZWlnaHQ6IGNhbGMoMTEwdmgpO1xuXG4gIH1cblxuICAuZnVsbC1oZWlnaHQtdmgge1xuICAgIGhlaWdodDogYXV0byAhaW1wb3J0YW50O1xuICB9XG5cbiAgLmxvZ28ge1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgfVxuXG4gIC5sb2dvIGltZyB7XG4gICAgbWF4LXdpZHRoOiA2NSU7XG4gIH1cblxuICAuZnVsbC1oZWlnaHQtdmgge1xuICAgIGhlaWdodDogYXV0byAhaW1wb3J0YW50O1xuICB9XG5cbiAgLmNhcmQge1xuICAgIGJvcmRlcjogMDtcbiAgICBtYXJnaW46IDE4cHggMDtcbiAgICBib3gtc2hhZG93OiAwIDRweCA4cHggMCByZ2JhKDAsIDAsIDAsIDAuMiksIDAgNnB4IDIwcHggMCByZ2JhKDAsIDAsIDAsIDAuMTkpO1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICB3aWR0aDogNjIlO1xuICAgIHBhZGRpbmc6IDE1cHg7XG5cbiAgfVxuXG4gIC5jYXJkIC5jYXJkLXRpdGxlIHtcbiAgICBjb2xvcjogIzAwMDtcbiAgICBtYXJnaW4tYm90dG9tOiAxLjJyZW07XG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICBmb250LXNpemU6IC44NzVyZW07XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIH1cblxuICAucm93IHtcbiAgICBtYXJnaW4tcmlnaHQ6IDBweCAhaW1wb3J0YW50O1xuICAgIG1hcmdpbi1sZWZ0OiAwcHggIWltcG9ydGFudDtcbiAgfVxuXG4gIC8vIFJlZ2lzdGVyIEJ1dHRvbiBDb2xvclxuICAuYnRuLW91dGxpbmUtcHJpbWFyeSB7XG4gICAgYm9yZGVyLWNvbG9yOiAjNmRiMDJkICFpbXBvcnRhbnQ7XG5cbiAgICAmOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICM2ZGIwMmQgIWltcG9ydGFudDtcbiAgICB9XG4gIH1cblxuICAvLyBMb2dpbiBCdXR0b24gQ29sb3JcbiAgLy8gLmJ0bi5idG4tcHJpbWFyeSB7XG4gIC8vICAgYmFja2dyb3VuZC1jb2xvcjogIzFDMkI0NyAhaW1wb3J0YW50O1xuICAvLyAgIGJvcmRlci1jb2xvcjogIzFDMkI0NyAhaW1wb3J0YW50O1xuICAvLyAgIGNvbG9yOiAjZmZmICFpbXBvcnRhbnQ7XG4gIC8vIH1cblxuICAuYnRuLmJ0bi1wcmltYXJ5Lm1yLTEuYnRuc3VibWl0IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNmRiMDJkICFpbXBvcnRhbnQ7XG4gICAgYm9yZGVyLWNvbG9yOiAjNmRiMDJkICFpbXBvcnRhbnQ7XG4gICAgY29sb3I6ICNmZmYgIWltcG9ydGFudDtcbiAgfVxuXG4gIC8vIEZvcmdvdCBQYXNzd29yZCBDb2xvclxuICAuZm9yZ290LXBhc3N3b3JkLW9wdGlvbixcbiAgLnJlbWVtYmVyLW1lIHtcblxuICAgIGEudGV4dC1kZWNvcmF0aW9uLW5vbmUsXG4gICAgLmN1c3RvbS1jb250cm9sLWxhYmVsIHtcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICB9XG4gIH1cblxuICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGggOjc2N3B4KSB7XG4gICAgLmNhcmQge1xuICAgICAgYm9yZGVyOiAwO1xuICAgICAgbWFyZ2luOiAxOHB4IDA7XG4gICAgICBib3gtc2hhZG93OiAwIDRweCA4cHggMCByZ2JhKDAsIDAsIDAsIDAuMiksIDAgNnB4IDIwcHggMCByZ2JhKDAsIDAsIDAsIDAuMTkpO1xuICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICBwYWRkaW5nOiAxNXB4O1xuICAgIH1cbiAgfVxuICAuYnRuLmJ0bi1wcmltYXJ5LmxvZ2luLWJ1dHRvbjpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2UwYmI0MSAhaW1wb3J0YW50O1xuICAgIGNvbG9yOiAjMUMyQjQ3O1xuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aCA6NTAzcHgpIHtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgZm9udC1zaXplOiAxM3B4O1xuICAgIH1cbiAgfVxufVxuXG4udGV4dC1jb2xvciB7XG4gIGNvbG9yOiAjMUMyQjQ3ICFpbXBvcnRhbnQ7XG59XG5cbi8vIENhcm91c2FsIFN0eWxlXG4uY2Fyb3VzZWwtY2FwdGlvbi5jYXJvdXNhbHRvcCB7XG4gIG1hcmdpbjogYXV0byAhaW1wb3J0YW50O1xufVxuXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDM2MHB4KSB7XG4gIC5sZWZ0LXNsaWRlci1jb250ZW50IHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG5cbiAgLmhlYWRlciB7XG4gICAgZm9udC1zaXplOiAyZW0gIWltcG9ydGFudDtcbiAgICBmb250LWZhbWlseTogaW5pdGlhbCAhaW1wb3J0YW50O1xuICAgIGZvbnQtd2VpZ2h0OiA1MDAgIWltcG9ydGFudDtcbiAgICBjb2xvcjogIzA0N2QwMCAhaW1wb3J0YW50O1xuICAgIHRleHQtYWxpZ246IGNlbnRlciAhaW1wb3J0YW50O1xuICB9XG5cbiAgLmltZ2FsaWduIHtcbiAgICB3aWR0aDogODBweDtcbiAgfVxufVxuXG4uY2FwdGNoYWljb24ge1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBib3JkZXItc3R5bGU6IG5vbmU7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAzNjBweCkgYW5kIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gIC5sZWZ0LXNsaWRlci1jb250ZW50IHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG5cbiAgLmhlYWRlciB7XG4gICAgZm9udC1zaXplOiAyZW0gIWltcG9ydGFudDtcbiAgICBmb250LWZhbWlseTogaW5pdGlhbCAhaW1wb3J0YW50O1xuICAgIGZvbnQtd2VpZ2h0OiA1MDAgIWltcG9ydGFudDtcbiAgICBjb2xvcjogIzA0N2QwMCAhaW1wb3J0YW50O1xuICAgIHRleHQtYWxpZ246IGNlbnRlciAhaW1wb3J0YW50O1xuICB9XG5cbiAgLmltZ2FsaWduIHtcbiAgICB3aWR0aDogODBweDtcbiAgfVxufVxuXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSBhbmQgKG1heC13aWR0aDogOTkxcHgpIHtcbiAgLmxlZnQtc2xpZGVyLWNvbnRlbnQge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICB9XG5cbiAgLmNhcm91c2VsaW5uZXIge1xuICAgIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG4gICAgaGVpZ2h0OiAxMDAlICFpbXBvcnRhbnQ7XG4gIH1cblxuICAuaGVhZGVyIHtcbiAgICBmb250LXNpemU6IDJlbSAhaW1wb3J0YW50O1xuICAgIGZvbnQtZmFtaWx5OiBpbml0aWFsICFpbXBvcnRhbnQ7XG4gICAgZm9udC13ZWlnaHQ6IDUwMCAhaW1wb3J0YW50O1xuICAgIGNvbG9yOiAjMDQ3ZDAwICFpbXBvcnRhbnQ7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyICFpbXBvcnRhbnQ7XG4gIH1cblxuICAuaW1nYWxpZ24ge1xuICAgIHdpZHRoOiAxMjBweDtcbiAgfVxufVxuXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDk5MnB4KSBhbmQgKG1heC13aWR0aDogMTE5OXB4KSB7XG4gIC5sZWZ0LXNsaWRlci1jb250ZW50IHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgfVxuXG4gIC5jYXJvdXNlbGlubmVyIHtcbiAgICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xuICAgIGhlaWdodDogMTAwJSAhaW1wb3J0YW50O1xuICB9XG5cbiAgLmhlYWRlciB7XG4gICAgZm9udC1zaXplOiAyLjJlbSAhaW1wb3J0YW50O1xuICAgIGZvbnQtZmFtaWx5OiBpbml0aWFsICFpbXBvcnRhbnQ7XG4gICAgZm9udC13ZWlnaHQ6IDUwMCAhaW1wb3J0YW50O1xuICAgIGNvbG9yOiAjMDQ3ZDAwICFpbXBvcnRhbnQ7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyICFpbXBvcnRhbnQ7XG4gIH1cblxuICAuaW1nYWxpZ24ge1xuICAgIHdpZHRoOiA2MHB4O1xuICB9XG59XG5cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTIwMHB4KSB7XG4gIC5sZWZ0LXNsaWRlci1jb250ZW50IHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgfVxuXG4gIC5jYXJvdXNlbGlubmVyIHtcbiAgICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xuICAgIGhlaWdodDogMTAwJSAhaW1wb3J0YW50O1xuICB9XG5cbiAgLmhlYWRlciB7XG4gICAgZm9udC1zaXplOiAyLjhlbSAhaW1wb3J0YW50O1xuICAgIGZvbnQtZmFtaWx5OiBpbml0aWFsICFpbXBvcnRhbnQ7XG4gICAgZm9udC13ZWlnaHQ6IDUwMCAhaW1wb3J0YW50O1xuICAgIGNvbG9yOiAjMDQ3ZDAwICFpbXBvcnRhbnQ7XG4gICAgbWFyZ2luLWJvdHRvbTogMHB4ICFpbXBvcnRhbnQ7XG4gIH1cblxuICAuaW1nYWxpZ24ge1xuICAgIHdpZHRoOiA3MHB4O1xuICB9XG59XG5cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNTIxcHgpIHtcbiAgLnNjcm9sbHN0eWxlIHtcbiAgICBvdmVyZmxvdzogYXV0byAhaW1wb3J0YW50O1xuICAgIGhlaWdodDogYXV0bztcbiAgfVxufVxuXG4uY2Fyb3VzZWwtaW5uZXIge1xuICBoZWlnaHQ6IDEwMHZoICFpbXBvcnRhbnQ7XG59XG5cbi5sZWZ0LXNsaWRlci1jb250ZW50IHtcbiAgcGFkZGluZy1sZWZ0OiAwcHggIWltcG9ydGFudDtcbiAgcGFkZGluZy1yaWdodDogMHB4ICFpbXBvcnRhbnQ7XG59XG5cbi5mb3JtY29udGVudCB7XG4gIHBhZGRpbmctbGVmdDogMHB4ICFpbXBvcnRhbnQ7XG59XG5cbi5jb250YWluZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmUgIWltcG9ydGFudDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBjb2xvcjogdHJhbnNwYXJlbnQ7XG59XG5cbi5jZW50ZXJlZCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbiAgdG9wOiAyNyU7XG4gIGxlZnQ6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG59XG5cbi5jYXBib3gtaW5uZXIge1xuICBmb250OiBib2xkIDRweCBhcmlhbCwgc2Fucy1zZXJpZjtcbiAgY29sb3I6ICMwMDAwMDA7XG5cbiAgbWFyZ2luOiAzcHggYXV0byAwcHggYXV0bztcbiAgcGFkZGluZzogM3B4O1xuICAtbW96LWJvcmRlci1yYWRpdXM6IDRweDtcbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbn1cblxuLkNhcHRjaGFEaXYge1xuICBmb250OiBib2xkIDE3cHggdmVyZGFuYSwgYXJpYWwsIHNhbnMtc2VyaWY7XG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgY29sb3I6ICMwMDAwMDA7XG4gIC8vYmFja2dyb3VuZC1jb2xvcjojRkZGRkZGO1xuICBwYWRkaW5nOiA0cHg7XG4gIC1tb3otYm9yZGVyLXJhZGl1czogNHB4O1xuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDRweDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xufVxuXG4uQ2FwdGNoYUlucHV0IHtcbiAgbWFyZ2luOiAxcHggMHB4IDFweCAwcHg7XG4gIHdpZHRoOiAxMzVweDtcbn1cblxuLmN1c3RvbS1jYXB0Y2hhIHtcbiAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XG4gIGJhY2tncm91bmQ6IG5vbmU7XG4gIG1hcmdpbi1ib3R0b206IDEycHg7XG4gIG1hcmdpbi10b3A6IDRweDtcbiAgYm9yZGVyOiBub25lO1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG4gIGZvbnQtc2l6ZTogMzBweDtcbiAgbWFyZ2luLWxlZnQ6IDRlbTtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIHBhZGRpbmctbGVmdDogMjNweDtcbn1cblxuLmJnLXdoaXRlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZiAhaW1wb3J0YW50O1xuICBiYWNrZ3JvdW5kLXNpemU6IDEwMCUgMTAwJSAhaW1wb3J0YW50O1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xufVxuXG4uaGVhZGVyLWxheW91dCB7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHBsYWNlLWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLmltZ2FsaWduIHtcbiAgd2lkdGg6IDcwcHg7XG59XG5cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi1kZXZpY2Utd2lkdGggOiAzMjBweCkgYW5kIChtYXgtZGV2aWNlLXdpZHRoIDogMzkwcHgpIHtcbiAgLmxvZ2luLWNhcHRjaGEge1xuICAgIHdpZHRoOiA4MiUgIWltcG9ydGFudDtcbiAgICBoZWlnaHQ6IDQwcHg7XG4gIH1cblxuICAuaGVhZGVyIHtcbiAgICBmb250LXNpemU6IDI3cHggIWltcG9ydGFudDtcbiAgICBmb250LWZhbWlseTogaW5pdGlhbCAhaW1wb3J0YW50O1xuICAgIGZvbnQtd2VpZ2h0OiA1MDAgIWltcG9ydGFudDtcbiAgICBjb2xvcjogIzA0N2QwMCAhaW1wb3J0YW50O1xuICAgIG1hcmdpbi1ib3R0b206IDBweCAhaW1wb3J0YW50O1xuICB9XG59XG5cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi1kZXZpY2Utd2lkdGggOiA0MDBweCkgYW5kIChtYXgtZGV2aWNlLXdpZHRoIDo3MjBweCkge1xuICAubG9naW4tY2FwdGNoYSB7XG4gICAgd2lkdGg6IDg2JSAhaW1wb3J0YW50O1xuICAgIGhlaWdodDogNDBweDtcbiAgfVxufVxuXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGggOjMyMHB4KSB7XG4gIC5sb2dpbi1jYXB0Y2hhIHtcbiAgICB3aWR0aDogNzclICFpbXBvcnRhbnQ7XG4gICAgaGVpZ2h0OiA0MHB4O1xuICB9XG5cbiAgLmhlYWRlciB7XG4gICAgZm9udC1zaXplOiAyMnB4ICFpbXBvcnRhbnQ7XG4gICAgZm9udC1mYW1pbHk6IGluaXRpYWwgIWltcG9ydGFudDtcbiAgICBmb250LXdlaWdodDogNTAwICFpbXBvcnRhbnQ7XG4gICAgY29sb3I6ICMwNDdkMDAgIWltcG9ydGFudDtcbiAgICBtYXJnaW4tYm90dG9tOiAwcHggIWltcG9ydGFudDtcbiAgfVxuXG59XG5cbi5idXR0b24uYnRuLmJ0bi1wcmltYXJ5Lm1yLTEuYnRucmVmcmVzaCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM2ZGIwMmQgIWltcG9ydGFudDtcbiAgYm9yZGVyLWNvbG9yOiAjNmRiMDJkICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiAjZmZmICFpbXBvcnRhbnQ7XG59XG5cbi5tYXQtY2hlY2tib3gtY2hlY2tlZC5tYXQtYWNjZW50IC5tYXQtY2hlY2tib3gtYmFja2dyb3VuZCxcbi5tYXQtY2hlY2tib3gtaW5kZXRlcm1pbmF0ZS5tYXQtYWNjZW50IC5tYXQtY2hlY2tib3gtYmFja2dyb3VuZCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM2ZGIwMmQgIWltcG9ydGFudDtcbiAgO1xufVxuXG4uYnRuLmJ0bi1wcmltYXJ5Lm1yLTEuYnRudXBkYXRlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzZkYjAyZCAhaW1wb3J0YW50O1xuICBib3JkZXItY29sb3I6ICM2ZGIwMmQgIWltcG9ydGFudDtcbiAgY29sb3I6ICNmZmYgIWltcG9ydGFudDtcbn1cblxuLm1hdC1idXR0b24ubWF0LWFjY2VudCxcbi5tYXQtaWNvbi1idXR0b24ubWF0LWFjY2VudCxcbi5tYXQtc3Ryb2tlZC1idXR0b24ubWF0LWFjY2VudCB7XG4gIGNvbG9yOiAjNmRiMDJkICFpbXBvcnRhbnQ7XG59XG5cbi5idXR0b24uYnRuLmJ0bi1wcmltYXJ5Lm1yLTEuYnRuYWRkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFDMkI0NyAhaW1wb3J0YW50O1xuICBib3JkZXItY29sb3I6ICMxQzJCNDcgIWltcG9ydGFudDtcbiAgY29sb3I6ICNmZmYgIWltcG9ydGFudDtcbn1cblxuLmxvZ2luX2NlbnRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbi5pbnB1dF93aXRoX2ljb24ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5wYXNzX2ljb24ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAyJTtcbiAgdG9wOiAzMCU7XG59XG5cbi5kYW5nZXIge1xuICBjb2xvcjogI2ZmNTg2YiAhaW1wb3J0YW50O1xuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbn1cblxuLmNhcmQge1xuICAvL2JveC1zaGFkb3c6IDAgNHB4IDhweCAwIHJnYmEoMCwgMCwgMCwgMC4yKSwgMCA2cHggMjBweCAwIHJnYmEoMCwgMCwgMCwgMC4xOSkhaW1wb3J0YW50O1xuICAtd2Via2l0LWJveC1zaGFkb3c6IDAgMTBweCA2cHggLTZweCAjNzc3O1xuICAtbW96LWJveC1zaGFkb3c6IDAgMTBweCA2cHggLTZweCAjNzc3O1xuICBib3gtc2hhZG93OiAwIDEwcHggNnB4IC02cHggIzc3Nztcbn1cblxuLy9jYXB0Y2hhIHNlY3Rpb25cbi5jZW50ZXJlZCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbiAgdG9wOiA1MCU7XG4gIGxlZnQ6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG59XG5cbi5DYXB0Y2hhRGl2IHtcbiAgZm9udDogYm9sZCAxN3B4IHZlcmRhbmEsIGFyaWFsLCBzYW5zLXNlcmlmO1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG4gIGNvbG9yOiAjMDAwMDAwO1xuICAvL2JhY2tncm91bmQtY29sb3I6I0ZGRkZGRjtcbiAgcGFkZGluZzogNHB4O1xuICAtbW96LWJvcmRlci1yYWRpdXM6IDRweDtcbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbn1cblxuLmlucHV0X3dpdGhfaWNvbiB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLnBhc3NfaWNvbiB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDIlO1xuICB0b3A6IDMwJTtcbn1cblxuLkNhcHRjaGFJbnB1dCB7XG4gIG1hcmdpbjogMXB4IDBweCAxcHggMHB4O1xuICB3aWR0aDogMTM1cHg7XG59XG5cbi5jdXN0b20tY2FwdGNoYSB7XG4gIGNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50O1xuICBiYWNrZ3JvdW5kOiBub25lO1xuICBtYXJnaW4tdG9wOiAzcHg7XG4gIG1hcmdpbi1ib3R0b206IDBweDtcbiAgYm9yZGVyOiBub25lO1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG4gIGZvbnQtc2l6ZTogMjZweDtcbiAgbWFyZ2luLWxlZnQ6IDNlbTtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIHBhZGRpbmctbGVmdDogMTlweCAhaW1wb3J0YW50O1xufVxuXG5idXR0b24uYnRuLmJ0bi1wcmltYXJ5LnJlY292ZXItcGFzcyB7XG4gIGNvbG9yOiAjZmZmICFpbXBvcnRhbnQ7XG59XG5cbi5mbSB7XG4gIG92ZXJmbG93OiBoaWRkZW4gIWltcG9ydGFudDtcbn1cblxuLy8gLmljb24ge1xuLy8gICAvL2Zsb2F0OiByaWdodDtcbi8vICAgcGFkZGluZy1sZWZ0OiAxNXB4O1xuLy8gICBjdXJzb3I6IHBvaW50ZXI7XG4vLyAgIHBhZGRpbmctdG9wOiAxcHg7XG4vLyAgIGZvbnQtc2l6ZTogMjVweDtcbi8vIH1cbi5jYXB0Y2hhaWNvbiB7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIGJvcmRlci1zdHlsZTogbm9uZTtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4ubGFiZWwtY2FwdGNoYSB7XG4gIHdpZHRoOiA4MHB4O1xuICBtYXJnaW4tdG9wOiAtOHB4O1xufVxuXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4tZGV2aWNlLXdpZHRoIDogMzIwcHgpIGFuZCAobWF4LWRldmljZS13aWR0aCA6IDM5MHB4KSB7XG4gIC5jaGdwd2QtY2FwdGNoYSB7XG4gICAgd2lkdGg6IDgwJSAhaW1wb3J0YW50O1xuICAgIGhlaWdodDogNDBweDtcbiAgfVxuXG5cbn1cblxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLWRldmljZS13aWR0aCA6IDQwMHB4KSBhbmQgKG1heC1kZXZpY2Utd2lkdGggOjcyMHB4KSB7XG4gIC5jaGdwd2QtY2FwdGNoYSB7XG4gICAgd2lkdGg6IDg0JSAhaW1wb3J0YW50O1xuICAgIGhlaWdodDogNDBweDtcbiAgfVxuXG5cbn1cblxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoIDozMjBweCkge1xuICAuY2hncHdkLWNhcHRjaGEge1xuICAgIHdpZHRoOiA3NyUgIWltcG9ydGFudDtcbiAgICBoZWlnaHQ6IDQwcHg7XG4gIH1cbn1cbi5sb2FkZXNyIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICBsZWZ0OiA1MHB4O1xuICB0b3A6IDUwcHg7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHotaW5kZXg6IDk5OTk7XG4gIGJhY2tncm91bmQ6IHVybChcIi9hc3NldHMvaW1hZ2VzL0xvYWRlcjAyLmdpZlwiKSA1MCUgNTAlIG5vLXJlcGVhdFxuICAgIHJnYigyNDksIDI0OSwgMjQ5KTtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0OSwgMjQ5LCAyNDksIDAuNSk7XG59XG5cbiJdfQ== */");

/***/ }),

/***/ "5YGQ":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/pages/auth/auth.component.html ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<router-outlet></router-outlet>");

/***/ }),

/***/ "8tqk":
/*!************************************************************************************!*\
  !*** ./src/app/views/pages/auth/forgotpassword/forgotpasswordevent.component.scss ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".centered {\n  position: absolute;\n  background-color: transparent !important;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n\n.CaptchaDiv {\n  font: bold 17px verdana, arial, sans-serif;\n  font-style: italic;\n  color: #000000;\n  padding: 4px;\n  border-radius: 4px;\n}\n\n.input_with_icon {\n  position: relative;\n}\n\n.pass_icon {\n  position: absolute;\n  right: 2%;\n  top: 30%;\n}\n\n.CaptchaInput {\n  margin: 1px 0px 1px 0px;\n  width: 135px;\n}\n\nfigure {\n  position: relative;\n}\n\n.custom-captcha {\n  color: white !important;\n  background: none;\n  margin-top: 3px;\n  margin-bottom: 0px;\n  border: none;\n  font-style: italic;\n  font-size: 26px;\n  margin-left: 3em;\n  pointer-events: none;\n  padding-left: 19px !important;\n}\n\nbutton.btn.btn-primary.recover-pass {\n  color: #fff !important;\n}\n\n.fm {\n  overflow: hidden !important;\n}\n\n.captchaicon {\n  vertical-align: middle;\n  border-style: none;\n  cursor: pointer;\n}\n\n.label-captcha {\n  width: 80px;\n  margin-top: -8px;\n}\n\n.row {\n  display: flex;\n  flex-wrap: wrap;\n  margin-right: -15px;\n  margin-left: -15px;\n  margin-top: 15px;\n}\n\n.danger {\n  color: #ff586b !important;\n  text-transform: capitalize;\n}\n\n@media only screen and (min-device-width: 320px) and (max-device-width: 460px) {\n  .centered {\n    font-size: 23px;\n    top: 38%;\n    font-size: 14px !important;\n    left: 36%;\n  }\n\n  .icon.captchaicon {\n    width: 20px;\n  }\n}\n\n@media only screen and (min-device-width: 320px) and (max-device-width: 399px) {\n  .forgot-captcha.captcha-image {\n    width: 72% !important;\n    height: 27px;\n  }\n\n  .form-actions {\n    text-align: center !important;\n  }\n\n  .form-actions button {\n    margin-bottom: 10px;\n  }\n}\n\n@media only screen and (min-device-width: 400px) and (max-device-width: 720px) {\n  .forgot-captcha.captcha-image {\n    width: 84% !important;\n    height: 40px;\n  }\n}\n\n@media only screen and (max-width: 320px) {\n  .forgot-captcha.captcha-image {\n    width: 77% !important;\n    height: 40px;\n  }\n}\n\nform label {\n  text-transform: none !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXGZvcmdvdHBhc3N3b3JkZXZlbnQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBQTtFQUNBLHdDQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSxnQ0FBQTtBQUNGOztBQUNBO0VBQ0UsMENBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFFQSxZQUFBO0VBR0Esa0JBQUE7QUFDRjs7QUFDQTtFQUNFLGtCQUFBO0FBRUY7O0FBQUE7RUFDQSxrQkFBQTtFQUNFLFNBQUE7RUFDQSxRQUFBO0FBR0Y7O0FBREE7RUFDRSx1QkFBQTtFQUNBLFlBQUE7QUFJRjs7QUFGQTtFQUNFLGtCQUFBO0FBS0Y7O0FBSEE7RUFDRSx1QkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0Esb0JBQUE7RUFDQSw2QkFBQTtBQU1GOztBQUpBO0VBQ0Usc0JBQUE7QUFPRjs7QUFMQTtFQUNFLDJCQUFBO0FBUUY7O0FBQ0E7RUFDRSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtBQUVGOztBQUNBO0VBQ0UsV0FBQTtFQUNBLGdCQUFBO0FBRUY7O0FBQ0E7RUFDRSxhQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtBQUVGOztBQUFBO0VBQ0UseUJBQUE7RUFDQSwwQkFBQTtBQUdGOztBQVlBO0VBQ0U7SUFDRSxlQUFBO0lBQ0EsUUFBQTtJQUNBLDBCQUFBO0lBQ0EsU0FBQTtFQVRGOztFQVdBO0lBQ0UsV0FBQTtFQVJGO0FBQ0Y7O0FBVUE7RUFDRTtJQUNFLHFCQUFBO0lBQ0MsWUFBQTtFQVJIOztFQVVHO0lBQ0UsNkJBQUE7RUFQTDs7RUFTRztJQUNFLG1CQUFBO0VBTkw7QUFDRjs7QUFVQTtFQUNFO0lBQ0sscUJBQUE7SUFDQyxZQUFBO0VBUk47QUFDRjs7QUFZQTtFQUNFO0lBQ0sscUJBQUE7SUFDQyxZQUFBO0VBVk47QUFDRjs7QUFZQTtFQUNFLCtCQUFBO0FBVkYiLCJmaWxlIjoiZm9yZ290cGFzc3dvcmRldmVudC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jZW50ZXJlZCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbiAgdG9wOiA1MCU7XG4gIGxlZnQ6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG59XG4uQ2FwdGNoYURpdiB7XG4gIGZvbnQ6IGJvbGQgMTdweCB2ZXJkYW5hLCBhcmlhbCwgc2Fucy1zZXJpZjtcbiAgZm9udC1zdHlsZTogaXRhbGljO1xuICBjb2xvcjogIzAwMDAwMDtcbiAgLy9iYWNrZ3JvdW5kLWNvbG9yOiNGRkZGRkY7XG4gIHBhZGRpbmc6IDRweDtcbiAgLW1vei1ib3JkZXItcmFkaXVzOiA0cHg7XG4gIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNHB4O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG59XG4uaW5wdXRfd2l0aF9pY29ue1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4ucGFzc19pY29ue1xucG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMiU7XG4gIHRvcDogMzAlO1xufVxuLkNhcHRjaGFJbnB1dCB7XG4gIG1hcmdpbjogMXB4IDBweCAxcHggMHB4O1xuICB3aWR0aDogMTM1cHg7XG59XG5maWd1cmV7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbi5jdXN0b20tY2FwdGNoYSB7XG4gIGNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50O1xuICBiYWNrZ3JvdW5kOiBub25lO1xuICBtYXJnaW4tdG9wOiAzcHg7XG4gIG1hcmdpbi1ib3R0b206IDBweDtcbiAgYm9yZGVyOiBub25lO1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG4gIGZvbnQtc2l6ZTogMjZweDtcbiAgbWFyZ2luLWxlZnQ6IDNlbTtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIHBhZGRpbmctbGVmdDogMTlweCAhaW1wb3J0YW50O1xufVxuYnV0dG9uLmJ0bi5idG4tcHJpbWFyeS5yZWNvdmVyLXBhc3Mge1xuICBjb2xvcjogI2ZmZiAhaW1wb3J0YW50O1xufVxuLmZtIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbiAhaW1wb3J0YW50O1xufVxuLy8gLmljb24ge1xuLy8gICAvL2Zsb2F0OiByaWdodDtcbi8vICAgcGFkZGluZy1sZWZ0OiAxNXB4O1xuLy8gICBjdXJzb3I6IHBvaW50ZXI7XG4vLyAgIHBhZGRpbmctdG9wOiAxcHg7XG4vLyAgIGZvbnQtc2l6ZTogMjVweDtcbi8vIH1cbi5jYXB0Y2hhaWNvbiB7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIGJvcmRlci1zdHlsZTogbm9uZTtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4ubGFiZWwtY2FwdGNoYSB7XG4gIHdpZHRoOiA4MHB4O1xuICBtYXJnaW4tdG9wOiAtOHB4O1xufVxuXG4ucm93IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBtYXJnaW4tcmlnaHQ6IC0xNXB4O1xuICBtYXJnaW4tbGVmdDogLTE1cHg7XG4gIG1hcmdpbi10b3A6IDE1cHg7XG59XG4uZGFuZ2VyIHtcbiAgY29sb3I6ICNmZjU4NmIgIWltcG9ydGFudDtcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG59XG4vLyBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDMyMXB4KSBhbmQgKG1heC13aWR0aDogNTQzcHgpIHtcbi8vICAgLmZvcmdvdC1jYXB0Y2hhLmNhcHRjaGEtaW1hZ2Uge1xuLy8gICAgIHdpZHRoOiA4NyUgIWltcG9ydGFudDtcbi8vICAgICBoZWlnaHQ6IDMzcHg7XG4vLyAgIH1cbi8vIH1cblxuLy8gQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAzMjFweCkgYW5kIChtYXgtd2lkdGg6IDU0M3B4KSB7XG4vLyAgIC5pY29uIHtcbi8vICAgICBtYXJnaW4tbGVmdDogMTcwcHg7XG4vLyAgICAgbWFyZ2luLXRvcDogLTYwcHg7XG4vLyAgIH1cbi8vIH1cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi1kZXZpY2Utd2lkdGggOiAzMjBweCkgYW5kIChtYXgtZGV2aWNlLXdpZHRoIDogNDYwcHgpIHtcbiAgLmNlbnRlcmVke1xuICAgIGZvbnQtc2l6ZTogMjNweDtcbiAgICB0b3A6IDM4JTtcbiAgICBmb250LXNpemU6IDE0cHggIWltcG9ydGFudDtcbiAgICBsZWZ0OiAzNiU7XG4gIH1cbiAgLmljb24uY2FwdGNoYWljb257XG4gICAgd2lkdGg6IDIwcHg7XG4gIH1cbn1cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi1kZXZpY2Utd2lkdGggOiAzMjBweCkgYW5kIChtYXgtZGV2aWNlLXdpZHRoIDogMzk5cHgpIHtcbiAgLmZvcmdvdC1jYXB0Y2hhLmNhcHRjaGEtaW1hZ2UgIHtcbiAgICB3aWR0aDogNzIlICFpbXBvcnRhbnQ7XG4gICAgIGhlaWdodDogMjdweDtcbiAgIH1cbiAgICAgLmZvcm0tYWN0aW9uc3tcbiAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXIhaW1wb3J0YW50O1xuICAgICB9XG4gICAgIC5mb3JtLWFjdGlvbnMgYnV0dG9ue1xuICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgIH1cbiAgICAgXG59XG5cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi1kZXZpY2Utd2lkdGggOiA0MDBweCkgYW5kIChtYXgtZGV2aWNlLXdpZHRoIDo3MjBweCkge1xuICAuZm9yZ290LWNhcHRjaGEuY2FwdGNoYS1pbWFnZSAge1xuICAgICAgIHdpZHRoOiA4NCUgIWltcG9ydGFudDtcbiAgICAgICAgaGVpZ2h0OiA0MHB4O1xuICAgICAgfVxuXG4gICAgIFxufVxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAgKG1heC13aWR0aCA6MzIwcHgpIHtcbiAgLmZvcmdvdC1jYXB0Y2hhLmNhcHRjaGEtaW1hZ2UgIHtcbiAgICAgICB3aWR0aDogNzclICFpbXBvcnRhbnQ7XG4gICAgICAgIGhlaWdodDogNDBweDtcbiAgICAgIH1cbiAgICB9XG5mb3JtIGxhYmVsIHsgXG4gIHRleHQtdHJhbnNmb3JtOiBub25lICFpbXBvcnRhbnQ7XG59XG4iXX0= */");

/***/ }),

/***/ "OgzM":
/*!****************************************************!*\
  !*** ./src/app/views/pages/auth/auth.component.ts ***!
  \****************************************************/
/*! exports provided: AuthComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthComponent", function() { return AuthComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_auth_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./auth.component.html */ "5YGQ");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");



var AuthComponent = /** @class */ (function () {
    function AuthComponent() {
    }
    AuthComponent.prototype.ngOnInit = function () {
    };
    AuthComponent.ctorParameters = function () { return []; };
    AuthComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-auth',
            template: _raw_loader_auth_component_html__WEBPACK_IMPORTED_MODULE_1__["default"]
        })
    ], AuthComponent);
    return AuthComponent;
}());



/***/ }),

/***/ "S8rG":
/*!**********************************************************************************!*\
  !*** ./src/app/views/pages/auth/forgotpassword/forgotpasswordevent.component.ts ***!
  \**********************************************************************************/
/*! exports provided: ForgotpasswordeventComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForgotpasswordeventComponent", function() { return ForgotpasswordeventComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_forgotpasswordevent_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./forgotpasswordevent.component.html */ "Wi6q");
/* harmony import */ var _forgotpasswordevent_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./forgotpasswordevent.component.scss */ "8tqk");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var src_app_services_alert_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/alert.service */ "3LUQ");
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/user.service */ "qfBg");








var ForgotpasswordeventComponent = /** @class */ (function () {
    function ForgotpasswordeventComponent(data, userService, alertService, dialogRef) {
        this.data = data;
        this.userService = userService;
        this.alertService = alertService;
        this.dialogRef = dialogRef;
        if (this.data) {
            this.eventData = JSON.stringify(data);
        }
    }
    ForgotpasswordeventComponent.prototype.ngOnInit = function () {
        this.initializeValidators();
        this.OnCaptachaValidators();
    };
    ForgotpasswordeventComponent.prototype.initializeValidators = function () {
        // this.abcd = Math.floor(1000 + Math.random() * 9000);
        this.forgotForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormGroup"]({
            username: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].email]),
            txtCaptcha: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            CaptchaDiv: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](this.captchacode, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
        });
    };
    ForgotpasswordeventComponent.prototype.OnCaptachaValidators = function () {
        //this.abcd = Math.floor(1000 + Math.random() * 9000);
        this.captchaGenerate();
        // this.forgotForm = new FormGroup({
        //   txtCaptcha: new FormControl('', [Validators.required]),
        //   CaptchaDiv: new FormControl(this.captchacode, [Validators.required]),
        // });
        this.forgotForm.controls['CaptchaDiv'].setValue(this.captchacode);
        this.forgotForm.controls['txtCaptcha'].setValue(null);
    };
    ForgotpasswordeventComponent.prototype.captchaGenerate = function () {
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
    };
    ForgotpasswordeventComponent.prototype.onSave = function () {
        var _this = this;
        if (this.forgotForm.valid) {
            if (this.captchacode === this.forgotForm.controls['txtCaptcha'].value) {
                this.userService.forgotpasswordUser(this.forgotForm.value).subscribe(function (result) {
                    if (result && result.isSuccess) {
                        _this.alertService.success('Password has been sent to your registered email');
                        _this.dialogRef.close();
                    }
                    else {
                        if (result && result.failures) {
                            _this.alertService.error(result.failures.toString());
                        }
                    }
                });
            }
            else {
                this.alertService.error('Please enter the vaild captcha');
            }
        }
        else {
            this.validateFormControl();
        }
    };
    ForgotpasswordeventComponent.prototype.onCancel = function () {
        this.dialogRef.close();
    };
    ForgotpasswordeventComponent.prototype.validateFormControl = function () {
        var _this = this;
        Object.keys(this.forgotForm.controls).forEach(function (field) {
            var control = _this.forgotForm.get(field);
            if (control instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]) {
                control.markAsTouched({
                    onlySelf: true
                });
            }
        });
    };
    ForgotpasswordeventComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__["MAT_DIALOG_DATA"],] }] },
        { type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_7__["UserService"] },
        { type: src_app_services_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"] },
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__["MatDialogRef"] }
    ]; };
    ForgotpasswordeventComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-forgotpasswordevent',
            template: _raw_loader_forgotpasswordevent_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_forgotpasswordevent_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
        })
    ], ForgotpasswordeventComponent);
    return ForgotpasswordeventComponent;
}());



/***/ }),

/***/ "SSQ5":
/*!*************************************************!*\
  !*** ./src/app/views/pages/auth/auth.module.ts ***!
  \*************************************************/
/*! exports provided: AuthModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthModule", function() { return AuthModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login/login.component */ "/2yL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _auth_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./auth.component */ "OgzM");
/* harmony import */ var src_app_services_authentication_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/authentication.service */ "ej43");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var src_app_services_role_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/role.service */ "3b5Z");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _forgotpassword_forgotpasswordevent_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./forgotpassword/forgotpasswordevent.component */ "S8rG");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "1kSV");
/* harmony import */ var _layout_directives_directives_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../layout/directives/directives.module */ "f7FI");














var routes = [
    {
        path: '',
        component: _auth_component__WEBPACK_IMPORTED_MODULE_5__["AuthComponent"],
        children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            {
                path: 'login',
                component: _login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"]
            },
            {
                path: 'ForgotpasswordeventComponent',
                component: _forgotpassword_forgotpasswordevent_component__WEBPACK_IMPORTED_MODULE_11__["ForgotpasswordeventComponent"]
            }
        ]
    },
];
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"], _auth_component__WEBPACK_IMPORTED_MODULE_5__["AuthComponent"], _forgotpassword_forgotpasswordevent_component__WEBPACK_IMPORTED_MODULE_11__["ForgotpasswordeventComponent"]],
            providers: [src_app_services_authentication_service__WEBPACK_IMPORTED_MODULE_6__["AuthenticationService"], src_app_services_role_service__WEBPACK_IMPORTED_MODULE_8__["RoleService"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__["TranslateModule"],
                _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__["MatDialogModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_12__["NgbModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                _layout_directives_directives_module__WEBPACK_IMPORTED_MODULE_13__["DirectivesModule"]
            ]
        })
    ], AuthModule);
    return AuthModule;
}());



/***/ }),

/***/ "Wi6q":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/pages/auth/forgotpassword/forgotpasswordevent.component.html ***!
  \**************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"d-flex justify-content-between align-items-center flex-wrap grid-margin\">\n    <div>\n        <h4 class=\"mb-3 mb-md-0\">&nbsp;Forgot Password</h4>\n    </div>\n</div>\n<div class=\"row text-left\">\n    <div class=\"col-md-12\">\n        <div class=\"card\">\n            <div class=\"card-content\">\n                <div class=\"card-body login-img\">\n                    <div class=\"px-3\">\n                        <form [formGroup]=\"forgotForm\" class=\"form form-horizontal\" novalidate>\n                            <div class=\"form-body pt-2\">\n\n                                <div class=\"row\">\n                                    <div class=\"col-sm-12\">\n                                        <div class=\"form-group\">\n                                            <label for=\"username\" class=\"mandatory\">Email</label>\n                                            <input type=\"text\" maxlength=\"50\" id=\"username\" class=\"form-control\" formControlName=\"username\" autocomplete=\"off\" placeholder=\"Email\"  pattern=\"[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}\" avoidscripttags>\n                                            <span\n                                            class=\"form-text text-muted danger\"\n                                            *ngIf=\"!forgotForm.get('username').valid && (forgotForm.get('username').dirty || forgotForm.get('username').touched)\">\n                                            Email is required\n                                        </span>\n                                        </div>\n                                    </div>\n                                </div>\n\n                                <div class=\"row\">\n                                    <div class=\"col-sm-12\">\n                                        <div class=\"form-group\">\n                                            <label class=\"label-captcha\" class=\"mandatory\">Captcha</label>\n                                            <div id=\"CaptchaDiv\">\n                                                <figure>\n                                                  <img class=\"forgot-captcha captcha-image\"\n                                                    src=\"assets/img/bg6.png\"\n                                                    alt=\"captcha image\">\n                                                  <!-- <div class=\"icon\">\n                                                      <a (click)=\"refresh($event)\">\n                                                        <img src=\"assets/img/reload.png\" alt=\"mr-2 reload image\"/>\n                                                      </a>\n                                                    </div> -->\n                                                  <img src=\"assets/img/reload1.svg\" width=\"30\" height=\"25\"\n                                                  class=\"icon captchaicon \"\n                                                    alt=\"reload image\"\n                                                    (click)=\"OnCaptachaValidators()\"\n                                                   title=\"Reload\">\n                                                  <div class=\"centered\">\n                                                    <input\n                                                    type=\"text\"\n                                                      formControlName=\"CaptchaDiv\"\n                                                      class=\"custom-captcha centered\"\n                                                      tabindex=\"-1\" avoidscripttags>\n                              \n                                                  </div>\n                                                </figure>\n                                              </div>\n                                        </div>\n                                    </div>\n                                </div>\n\n                                <div class=\"row\">\n                                    <div class=\"col-sm-12\">\n                                        <div class=\"form-group\">\n                                            <input \n                                            type=\"text\"\n                                            id=\"CaptchaInput\"\n                                            class=\"form-control\"\n                                            formControlName=\"txtCaptcha\"\n                                            autocomplete=\"off\"\n                                            placeholder=\"Enter the captcha\" avoidscripttags>                 \n                                            <span\n                                            class=\"form-text text-muted danger mandatory\"\n                                            *ngIf=\"!forgotForm.get('txtCaptcha').valid && (forgotForm.get('txtCaptcha').dirty || forgotForm.get('txtCaptcha').touched)\">\n                                            Captcha is required\n                                          </span>\n                                          <span\n                                          class=\"form-text text-muted danger mandatory\"\n                                          *ngIf=\"forgotForm.get('txtCaptcha').valid && (forgotForm.get('txtCaptcha').value != forgotForm.get('CaptchaDiv').value)\">\n                                          Please enter the vaild captcha\n                                        </span>\n                                        </div>\n                                    </div>\n                                </div>\n\n                                <div class=\"form-actions mb-2 mt-3 text-right\">\n                                    <button type=\"button\" class=\"btn btn-raised btn-warning mr-1 btncancel\" (click)=\"onCancel()\">\n                                        <i class=\"fa fa-close\"></i> Cancel\n                                      </button>\n                                      <button type=\"button\" class=\"button btn btn-primary mr-1 btnsubmit\" (click)=\"onSave()\">\n                                        <i class=\"fa fa-check-square-o\"></i> Submit\n                                      </button>\n                                </div>\n\n\n\n                            </div>\n                        </form>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>");

/***/ }),

/***/ "qVrc":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/pages/auth/login/login.component.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div *ngIf=\"loading\" class=\"loadesr\">\n</div>\n<div>\n<!-- <form name=\"loginForm\" [formGroup]=\"loginForm\" class=\"scrollstyle\" style=\" overflow-y: hidden; -->\noverflow-x: hidden;\">\n\n  \n  <section id=\"login\">\n    <div class=\"login_sec1 login-img1\">\n      <div class=\"row\">\n        <div class=\"col-lg-7 col-md-7 left-slider-content full-height-vh \">\n          \n        </div>\n        <div class=\"col-lg-5 col-md-5 loginpage login-img\" >\n          <div class=\"login_center\">\n            <div class=\"card d-block\" layout-align=\"center\">\n              <div class=\"card-content\">\n\n                <div class=\"col-lg-12 col-md-12 bg-white px-4 pt-3\">\n                  <div class=\"form-group row\">\n                    <div class=\"col-lg-12 col-md-12\">\n                      <h4 class=\"card-title mb-2\">Login</h4>\n                      <label for=\"email\" class=\"mandatory\">Username</label>\n                      <!-- Mobile Number/Username -->\n                      <input type=\"text\" id=\"email\" maxlength=\"25\" class=\"form-control\" formControlName=\"email\" avoidscripttags placeholder=\"Username\"\n                        autocomplete=\"off\" required >\n                        <!-- placeholder=\"Mobile Number/Username\" -->\n                      <span class=\"form-text text-muted danger mandatory\"\n                        *ngIf=\"!loginForm.get('email').valid && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n                        Username is required\n                      </span>\n                      <!-- Mobile Number/Username is required -->\n                    </div>\n                  </div>\n\n                  <div class=\"form-group row\">\n                    <div class=\"col-lg-12 col-md-12\">\n                      <label for=\"password\" class=\"mandatory\">Password</label>\n                      <div class=\"input_with_icon\">\n                        <i class=\"fa fa-eye pass_icon\" aria-hidden=\"true\"\n                          *ngIf=\"show && loginForm.get('password').value\" (click)=\"passwordclick()\"></i>\n                        <i class=\"fa fa-eye-slash pass_icon\" aria-hidden=\"true\"\n                          *ngIf=\"!show  && loginForm.get('password').value\" (click)=\"passwordclick()\"></i>\n                        <input [type]=\"show ? 'text' : 'password'\" class=\"form-control\"  formControlName=\"password\"\n                          id=\"password\" placeholder=\"Password\" autocomplete=\"off\" >\n                      </div>\n\n                      <span class=\"form-text text-muted danger mandatory\"\n                        *ngIf=\"!loginForm.get('password').valid && (loginForm.get('password').dirty || loginForm.get('password').touched)\">\n                        Password is required\n                      </span>\n                    </div>\n                  </div>\n                  <div class=\"fg-actions d-flex justify-content-between mt-3 col-12\">\n                    <div class=\"forgot-password-option\">\n                      <!-- <a (click)=\"openForgotPasswordDialog()\" class=\"text-color\">Forgot\n                        Password ?</a> -->\n                    </div>\n                    <button type=\"submit\" class=\"btn btn-primary mr-0\" (click)=\"onLogin()\">\n                      Login\n                    </button>\n                  </div>\n                </div>\n              </div>\n            </div>\n            <p class=\"text-muted text-center text-md-left\">Developed By <a href=\"https://www.xenovex.com\"\n              target=\"_blank\">Xenovex\n              Technologies</a></p>\n          </div>\n        </div>\n\n      </div>\n    </div>\n\n\n  </section>\n</form>\n</div>");

/***/ })

}]);
//# sourceMappingURL=views-pages-auth-auth-module.js.map