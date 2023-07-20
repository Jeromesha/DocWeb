(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "+NYR":
/*!************************************************!*\
  !*** ./src/app/services/navigation.service.ts ***!
  \************************************************/
/*! exports provided: NavigationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavigationService", function() { return NavigationService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");



var NavigationService = /** @class */ (function () {
    function NavigationService(router) {
        this.router = router;
    }
    NavigationService.prototype.goToDashboard = function () {
        this.router.navigate(['/dashboard']);
    };
    NavigationService.prototype.goToViewRegistration = function (id, actionInfo) {
        this.router.navigate(['/dashboard/' + id, actionInfo]);
    };
    NavigationService.prototype.goTovillageuserEdit = function (VillagePanchayatId, userId, actionInfo) {
        this.router.navigate(['/villageuserdetail-edit/' + VillagePanchayatId + '/' + userId + '/' + actionInfo]);
    };
    NavigationService.prototype.goToLogin = function () {
        this.router.navigate(['/auth/login']);
    };
    NavigationService.prototype.goToUnAuthorized = function () {
        this.router.navigate(['/unauthorized']);
    };
    NavigationService.prototype.goTOMiPage = function () {
        this.router.navigate(['/ribbion']);
    };
    NavigationService.prototype.goTOMiDashboard = function () {
        this.router.navigate(['/minewdashboard']);
    };
    NavigationService.prototype.goToSessionTimedOut = function () {
        this.router.navigate(['/sessiontimedout']);
    };
    NavigationService.prototype.isOnLoginScreen = function () {
        return this.router.url === '/login';
    };
    NavigationService.prototype.goToUser = function (id, actionInfo) {
        this.router.navigate(['/users/' + id, actionInfo]);
    };
    NavigationService.prototype.goToProfile = function (id, actionInfo) {
        this.router.navigate(['/profile/' + id, actionInfo]);
    };
    NavigationService.prototype.goToDistrict = function (id, actionInfo) {
        this.router.navigate(['/district/' + id, actionInfo]);
    };
    NavigationService.prototype.goToBlock = function (id, actionInfo) {
        this.router.navigate(['/block/' + id, actionInfo]);
    };
    NavigationService.prototype.goToSector = function (id, actionInfo) {
        this.router.navigate(['/sector/' + id, actionInfo]);
    };
    NavigationService.prototype.goToAwc = function (id, actionInfo) {
        this.router.navigate(['/awc/' + id, actionInfo]);
    };
    NavigationService.prototype.goToAwcPage = function () {
        this.router.navigate(['/awc/']);
    };
    NavigationService.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
    ]; };
    NavigationService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], NavigationService);
    return NavigationService;
}());



/***/ }),

/***/ "/SMo":
/*!*******************************************************!*\
  !*** ./src/app/views/layout/layout-routing.module.ts ***!
  \*******************************************************/
/*! exports provided: LayoutRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutRoutingModule", function() { return LayoutRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_core_guard_auth_guard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/guard/auth.guard */ "3IAN");
/* harmony import */ var _base_base_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./base/base.component */ "RRVW");





var routes = [
    {
        path: "",
        component: _base_base_component__WEBPACK_IMPORTED_MODULE_4__["BaseComponent"],
        canActivate: [src_app_core_guard_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]],
        children: [
            {
                path: "dashboard",
                loadChildren: function () {
                    return Promise.all(/*! import() | views-pages-dashboard-dashboard-module */[__webpack_require__.e("default~views-pages-dashboard-dashboard-module~views-pages-profile-profile-profile-module"), __webpack_require__.e("views-pages-dashboard-dashboard-module")]).then(__webpack_require__.bind(null, /*! ./../../views/pages/dashboard/dashboard.module */ "r4FA")).then(function (m) { return m.DashboardModule; });
                },
            },
            {
                path: "",
                redirectTo: "dashboard",
                pathMatch: "full",
            },
            {
                path: "profile/:id/:actionInfo",
                loadChildren: function () {
                    return Promise.all(/*! import() | views-pages-profile-profile-profile-module */[__webpack_require__.e("default~views-pages-dashboard-dashboard-module~views-pages-profile-profile-profile-module"), __webpack_require__.e("views-pages-profile-profile-profile-module")]).then(__webpack_require__.bind(null, /*! ./../../views/pages/profile/profile/profile.module */ "CUip")).then(function (m) { return m.ProfileModule; });
                },
            },
        ],
    },
];
var LayoutRoutingModule = /** @class */ (function () {
    function LayoutRoutingModule() {
    }
    LayoutRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
        })
    ], LayoutRoutingModule);
    return LayoutRoutingModule;
}());



/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Ajith\EazyPM\EazyPMClient\src\main.ts */"zUnb");


/***/ }),

/***/ "0AbP":
/*!***********************************************!*\
  !*** ./src/app/services/dashboard.service.ts ***!
  \***********************************************/
/*! exports provided: DashboardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardService", function() { return DashboardService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data.service */ "EnSQ");



var DashboardService = /** @class */ (function () {
    function DashboardService(dataService) {
        this.dataService = dataService;
        this.getEventRoute = '/api/newevents/';
    }
    ;
    DashboardService.prototype.getRegistrationData = function (refresh) {
        return this.dataService.getData('/api/registration', refresh);
    };
    DashboardService.prototype.getRegistrationDataById = function (id, refresh) {
        return this.dataService.getData('/api/registration/' + id, refresh);
    };
    DashboardService.prototype.downloadReciept = function (data) {
        return this.dataService.post('/api/report', data);
    };
    DashboardService.ctorParameters = function () { return [
        { type: _data_service__WEBPACK_IMPORTED_MODULE_2__["DataService"] }
    ]; };
    DashboardService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], DashboardService);
    return DashboardService;
}());



/***/ }),

/***/ 1:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "1pOu":
/*!***********************************************!*\
  !*** ./src/app/views/layout/layout.module.ts ***!
  \***********************************************/
/*! exports provided: LayoutModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutModule", function() { return LayoutModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _base_base_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./base/base.component */ "RRVW");
/* harmony import */ var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./navbar/navbar.component */ "SNw6");
/* harmony import */ var _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./sidebar/sidebar.component */ "t09C");
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./footer/footer.component */ "VKDu");
/* harmony import */ var _core_content_animate_content_animate_directive__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../core/content-animate/content-animate.directive */ "N9F3");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "1kSV");
/* harmony import */ var _core_feather_icon_feather_icon_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../core/feather-icon/feather-icon.module */ "tyVc");
/* harmony import */ var ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngx-perfect-scrollbar */ "Kdsb");
/* harmony import */ var _directives_directives_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./directives/directives.module */ "f7FI");
/* harmony import */ var _changepassword_changepassword_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./changepassword/changepassword.component */ "yCcV");
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/services/user.service */ "qfBg");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var src_app_services_notifyService__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! src/app/services/notifyService */ "TSfr");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var mat_select_filter__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! mat-select-filter */ "Y70v");
/* harmony import */ var src_app_services_dashboard_service__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! src/app/services/dashboard.service */ "0AbP");
/* harmony import */ var _layout_routing_module__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./layout-routing.module */ "/SMo");
/* harmony import */ var ng_pick_datetime__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ng-pick-datetime */ "z17N");
















// import { MatDialogModule } from '@angular/material/dialog';








var DEFAULT_PERFECT_SCROLLBAR_CONFIG = {
    suppressScrollX: true
};
var LayoutModule = /** @class */ (function () {
    function LayoutModule() {
    }
    LayoutModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_base_base_component__WEBPACK_IMPORTED_MODULE_5__["BaseComponent"], _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_6__["NavbarComponent"], _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_7__["SidebarComponent"], _footer_footer_component__WEBPACK_IMPORTED_MODULE_8__["FooterComponent"], _core_content_animate_content_animate_directive__WEBPACK_IMPORTED_MODULE_9__["ContentAnimateDirective"], _changepassword_changepassword_component__WEBPACK_IMPORTED_MODULE_14__["ChangepasswordComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_10__["NgbDropdownModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_10__["NgbCollapseModule"],
                ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_12__["PerfectScrollbarModule"],
                _core_feather_icon_feather_icon_module__WEBPACK_IMPORTED_MODULE_11__["FeahterIconModule"],
                _directives_directives_module__WEBPACK_IMPORTED_MODULE_13__["DirectivesModule"],
                // MatDialogModule,
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__["TranslateModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
                _angular_material_select__WEBPACK_IMPORTED_MODULE_18__["MatSelectModule"],
                mat_select_filter__WEBPACK_IMPORTED_MODULE_19__["MatSelectFilterModule"],
                _layout_routing_module__WEBPACK_IMPORTED_MODULE_21__["LayoutRoutingModule"],
                ng_pick_datetime__WEBPACK_IMPORTED_MODULE_22__["OwlDateTimeModule"],
                ng_pick_datetime__WEBPACK_IMPORTED_MODULE_22__["OwlNativeDateTimeModule"],
            ],
            providers: [
                {
                    provide: ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_12__["PERFECT_SCROLLBAR_CONFIG"],
                    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
                },
                src_app_services_user_service__WEBPACK_IMPORTED_MODULE_15__["UserService"],
                src_app_services_notifyService__WEBPACK_IMPORTED_MODULE_17__["NotifyService"],
                src_app_services_dashboard_service__WEBPACK_IMPORTED_MODULE_20__["DashboardService"],
            ]
        })
    ], LayoutModule);
    return LayoutModule;
}());



/***/ }),

/***/ 2:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "2BMZ":
/*!****************************************!*\
  !*** ./src/assets/json/timezones.json ***!
  \****************************************/
/*! exports provided: timeZone, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"timeZone\":[{\"value\":\"Dateline Standard Time\",\"abbr\":\"DST\",\"offset\":-12,\"isdst\":false,\"text\":\"(UTC-12:00) International Date Line West\",\"utc\":[\"Etc/GMT+12\"]},{\"value\":\"UTC-11\",\"abbr\":\"U\",\"offset\":-11,\"isdst\":false,\"text\":\"(UTC-11:00) Coordinated Universal Time-11\",\"utc\":[\"Etc/GMT+11\",\"Pacific/Midway\",\"Pacific/Niue\",\"Pacific/Pago_Pago\"]},{\"value\":\"Hawaiian Standard Time\",\"abbr\":\"HST\",\"offset\":-10,\"isdst\":false,\"text\":\"(UTC-10:00) Hawaii\",\"utc\":[\"Etc/GMT+10\",\"Pacific/Honolulu\",\"Pacific/Johnston\",\"Pacific/Rarotonga\",\"Pacific/Tahiti\"]},{\"value\":\"Alaskan Standard Time\",\"abbr\":\"AKDT\",\"offset\":-8,\"isdst\":true,\"text\":\"(UTC-09:00) Alaska\",\"utc\":[\"America/Anchorage\",\"America/Juneau\",\"America/Nome\",\"America/Sitka\",\"America/Yakutat\"]},{\"value\":\"Pacific Standard Time (Mexico)\",\"abbr\":\"PDT\",\"offset\":-7,\"isdst\":true,\"text\":\"(UTC-08:00) Baja California\",\"utc\":[\"America/Santa_Isabel\"]},{\"value\":\"Pacific Standard Time\",\"abbr\":\"PDT\",\"offset\":-7,\"isdst\":true,\"text\":\"(UTC-08:00) Pacific Time (US & Canada)\",\"utc\":[\"America/Dawson\",\"America/Los_Angeles\",\"America/Tijuana\",\"America/Vancouver\",\"America/Whitehorse\",\"PST8PDT\"]},{\"value\":\"US Mountain Standard Time\",\"abbr\":\"UMST\",\"offset\":-7,\"isdst\":false,\"text\":\"(UTC-07:00) Arizona\",\"utc\":[\"America/Creston\",\"America/Dawson_Creek\",\"America/Hermosillo\",\"America/Phoenix\",\"Etc/GMT+7\"]},{\"value\":\"Mountain Standard Time (Mexico)\",\"abbr\":\"MDT\",\"offset\":-6,\"isdst\":true,\"text\":\"(UTC-07:00) Chihuahua, La Paz, Mazatlan\",\"utc\":[\"America/Chihuahua\",\"America/Mazatlan\"]},{\"value\":\"Mountain Standard Time\",\"abbr\":\"MDT\",\"offset\":-6,\"isdst\":true,\"text\":\"(UTC-07:00) Mountain Time (US & Canada)\",\"utc\":[\"America/Boise\",\"America/Cambridge_Bay\",\"America/Denver\",\"America/Edmonton\",\"America/Inuvik\",\"America/Ojinaga\",\"America/Yellowknife\",\"MST7MDT\"]},{\"value\":\"Central America Standard Time\",\"abbr\":\"CAST\",\"offset\":-6,\"isdst\":false,\"text\":\"(UTC-06:00) Central America\",\"utc\":[\"America/Belize\",\"America/Costa_Rica\",\"America/El_Salvador\",\"America/Guatemala\",\"America/Managua\",\"America/Tegucigalpa\",\"Etc/GMT+6\",\"Pacific/Galapagos\"]},{\"value\":\"Central Standard Time\",\"abbr\":\"CDT\",\"offset\":-5,\"isdst\":true,\"text\":\"(UTC-06:00) Central Time (US & Canada)\",\"utc\":[\"America/Chicago\",\"America/Indiana/Knox\",\"America/Indiana/Tell_City\",\"America/Matamoros\",\"America/Menominee\",\"America/North_Dakota/Beulah\",\"America/North_Dakota/Center\",\"America/North_Dakota/New_Salem\",\"America/Rainy_River\",\"America/Rankin_Inlet\",\"America/Resolute\",\"America/Winnipeg\",\"CST6CDT\"]},{\"value\":\"Central Standard Time (Mexico)\",\"abbr\":\"CDT\",\"offset\":-5,\"isdst\":true,\"text\":\"(UTC-06:00) Guadalajara, Mexico City, Monterrey\",\"utc\":[\"America/Bahia_Banderas\",\"America/Cancun\",\"America/Merida\",\"America/Mexico_City\",\"America/Monterrey\"]},{\"value\":\"Canada Central Standard Time\",\"abbr\":\"CCST\",\"offset\":-6,\"isdst\":false,\"text\":\"(UTC-06:00) Saskatchewan\",\"utc\":[\"America/Regina\",\"America/Swift_Current\"]},{\"value\":\"SA Pacific Standard Time\",\"abbr\":\"SPST\",\"offset\":-5,\"isdst\":false,\"text\":\"(UTC-05:00) Bogota, Lima, Quito\",\"utc\":[\"America/Bogota\",\"America/Cayman\",\"America/Coral_Harbour\",\"America/Eirunepe\",\"America/Guayaquil\",\"America/Jamaica\",\"America/Lima\",\"America/Panama\",\"America/Rio_Branco\",\"Etc/GMT+5\"]},{\"value\":\"Eastern Standard Time\",\"abbr\":\"EDT\",\"offset\":-4,\"isdst\":true,\"text\":\"(UTC-05:00) Eastern Time (US & Canada)\",\"utc\":[\"America/Detroit\",\"America/Havana\",\"America/Indiana/Petersburg\",\"America/Indiana/Vincennes\",\"America/Indiana/Winamac\",\"America/Iqaluit\",\"America/Kentucky/Monticello\",\"America/Louisville\",\"America/Montreal\",\"America/Nassau\",\"America/New_York\",\"America/Nipigon\",\"America/Pangnirtung\",\"America/Port-au-Prince\",\"America/Thunder_Bay\",\"America/Toronto\",\"EST5EDT\"]},{\"value\":\"US Eastern Standard Time\",\"abbr\":\"UEDT\",\"offset\":-4,\"isdst\":true,\"text\":\"(UTC-05:00) Indiana (East)\",\"utc\":[\"America/Indiana/Marengo\",\"America/Indiana/Vevay\",\"America/Indianapolis\"]},{\"value\":\"Venezuela Standard Time\",\"abbr\":\"VST\",\"offset\":-4.5,\"isdst\":false,\"text\":\"(UTC-04:30) Caracas\",\"utc\":[\"America/Caracas\"]},{\"value\":\"Paraguay Standard Time\",\"abbr\":\"PYT\",\"offset\":-4,\"isdst\":false,\"text\":\"(UTC-04:00) Asuncion\",\"utc\":[\"America/Asuncion\"]},{\"value\":\"Atlantic Standard Time\",\"abbr\":\"ADT\",\"offset\":-3,\"isdst\":true,\"text\":\"(UTC-04:00) Atlantic Time (Canada)\",\"utc\":[\"America/Glace_Bay\",\"America/Goose_Bay\",\"America/Halifax\",\"America/Moncton\",\"America/Thule\",\"Atlantic/Bermuda\"]},{\"value\":\"Central Brazilian Standard Time\",\"abbr\":\"CBST\",\"offset\":-4,\"isdst\":false,\"text\":\"(UTC-04:00) Cuiaba\",\"utc\":[\"America/Campo_Grande\",\"America/Cuiaba\"]},{\"value\":\"SA Western Standard Time\",\"abbr\":\"SWST\",\"offset\":-4,\"isdst\":false,\"text\":\"(UTC-04:00) Georgetown, La Paz, Manaus, San Juan\",\"utc\":[\"America/Anguilla\",\"America/Antigua\",\"America/Aruba\",\"America/Barbados\",\"America/Blanc-Sablon\",\"America/Boa_Vista\",\"America/Curacao\",\"America/Dominica\",\"America/Grand_Turk\",\"America/Grenada\",\"America/Guadeloupe\",\"America/Guyana\",\"America/Kralendijk\",\"America/La_Paz\",\"America/Lower_Princes\",\"America/Manaus\",\"America/Marigot\",\"America/Martinique\",\"America/Montserrat\",\"America/Port_of_Spain\",\"America/Porto_Velho\",\"America/Puerto_Rico\",\"America/Santo_Domingo\",\"America/St_Barthelemy\",\"America/St_Kitts\",\"America/St_Lucia\",\"America/St_Thomas\",\"America/St_Vincent\",\"America/Tortola\",\"Etc/GMT+4\"]},{\"value\":\"Pacific SA Standard Time\",\"abbr\":\"PSST\",\"offset\":-4,\"isdst\":false,\"text\":\"(UTC-04:00) Santiago\",\"utc\":[\"America/Santiago\",\"Antarctica/Palmer\"]},{\"value\":\"Newfoundland Standard Time\",\"abbr\":\"NDT\",\"offset\":-2.5,\"isdst\":true,\"text\":\"(UTC-03:30) Newfoundland\",\"utc\":[\"America/St_Johns\"]},{\"value\":\"E. South America Standard Time\",\"abbr\":\"ESAST\",\"offset\":-3,\"isdst\":false,\"text\":\"(UTC-03:00) Brasilia\",\"utc\":[\"America/Sao_Paulo\"]},{\"value\":\"Argentina Standard Time\",\"abbr\":\"AST\",\"offset\":-3,\"isdst\":false,\"text\":\"(UTC-03:00) Buenos Aires\",\"utc\":[\"America/Argentina/La_Rioja\",\"America/Argentina/Rio_Gallegos\",\"America/Argentina/Salta\",\"America/Argentina/San_Juan\",\"America/Argentina/San_Luis\",\"America/Argentina/Tucuman\",\"America/Argentina/Ushuaia\",\"America/Buenos_Aires\",\"America/Catamarca\",\"America/Cordoba\",\"America/Jujuy\",\"America/Mendoza\"]},{\"value\":\"SA Eastern Standard Time\",\"abbr\":\"SEST\",\"offset\":-3,\"isdst\":false,\"text\":\"(UTC-03:00) Cayenne, Fortaleza\",\"utc\":[\"America/Araguaina\",\"America/Belem\",\"America/Cayenne\",\"America/Fortaleza\",\"America/Maceio\",\"America/Paramaribo\",\"America/Recife\",\"America/Santarem\",\"Antarctica/Rothera\",\"Atlantic/Stanley\",\"Etc/GMT+3\"]},{\"value\":\"Greenland Standard Time\",\"abbr\":\"GDT\",\"offset\":-3,\"isdst\":true,\"text\":\"(UTC-03:00) Greenland\",\"utc\":[\"America/Godthab\"]},{\"value\":\"Montevideo Standard Time\",\"abbr\":\"MST\",\"offset\":-3,\"isdst\":false,\"text\":\"(UTC-03:00) Montevideo\",\"utc\":[\"America/Montevideo\"]},{\"value\":\"Bahia Standard Time\",\"abbr\":\"BST\",\"offset\":-3,\"isdst\":false,\"text\":\"(UTC-03:00) Salvador\",\"utc\":[\"America/Bahia\"]},{\"value\":\"UTC-02\",\"abbr\":\"U\",\"offset\":-2,\"isdst\":false,\"text\":\"(UTC-02:00) Coordinated Universal Time-02\",\"utc\":[\"America/Noronha\",\"Atlantic/South_Georgia\",\"Etc/GMT+2\"]},{\"value\":\"Mid-Atlantic Standard Time\",\"abbr\":\"MDT\",\"offset\":-1,\"isdst\":true,\"text\":\"(UTC-02:00) Mid-Atlantic - Old\",\"utc\":[]},{\"value\":\"Azores Standard Time\",\"abbr\":\"ADT\",\"offset\":0,\"isdst\":true,\"text\":\"(UTC-01:00) Azores\",\"utc\":[\"America/Scoresbysund\",\"Atlantic/Azores\"]},{\"value\":\"Cape Verde Standard Time\",\"abbr\":\"CVST\",\"offset\":-1,\"isdst\":false,\"text\":\"(UTC-01:00) Cape Verde Is.\",\"utc\":[\"Atlantic/Cape_Verde\",\"Etc/GMT+1\"]},{\"value\":\"Morocco Standard Time\",\"abbr\":\"MDT\",\"offset\":1,\"isdst\":true,\"text\":\"(UTC) Casablanca\",\"utc\":[\"Africa/Casablanca\",\"Africa/El_Aaiun\"]},{\"value\":\"UTC\",\"abbr\":\"UTC\",\"offset\":0,\"isdst\":false,\"text\":\"(UTC) Coordinated Universal Time\",\"utc\":[\"America/Danmarkshavn\",\"Etc/GMT\"]},{\"value\":\"GMT Standard Time\",\"abbr\":\"GDT\",\"offset\":1,\"isdst\":true,\"text\":\"(UTC) Dublin, Edinburgh, Lisbon, London\",\"utc\":[\"Atlantic/Canary\",\"Atlantic/Faeroe\",\"Atlantic/Madeira\",\"Europe/Dublin\",\"Europe/Guernsey\",\"Europe/Isle_of_Man\",\"Europe/Jersey\",\"Europe/Lisbon\",\"Europe/London\"]},{\"value\":\"Greenwich Standard Time\",\"abbr\":\"GST\",\"offset\":0,\"isdst\":false,\"text\":\"(UTC) Monrovia, Reykjavik\",\"utc\":[\"Africa/Abidjan\",\"Africa/Accra\",\"Africa/Bamako\",\"Africa/Banjul\",\"Africa/Bissau\",\"Africa/Conakry\",\"Africa/Dakar\",\"Africa/Freetown\",\"Africa/Lome\",\"Africa/Monrovia\",\"Africa/Nouakchott\",\"Africa/Ouagadougou\",\"Africa/Sao_Tome\",\"Atlantic/Reykjavik\",\"Atlantic/St_Helena\"]},{\"value\":\"W. Europe Standard Time\",\"abbr\":\"WEDT\",\"offset\":2,\"isdst\":true,\"text\":\"(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna\",\"utc\":[\"Arctic/Longyearbyen\",\"Europe/Amsterdam\",\"Europe/Andorra\",\"Europe/Berlin\",\"Europe/Busingen\",\"Europe/Gibraltar\",\"Europe/Luxembourg\",\"Europe/Malta\",\"Europe/Monaco\",\"Europe/Oslo\",\"Europe/Rome\",\"Europe/San_Marino\",\"Europe/Stockholm\",\"Europe/Vaduz\",\"Europe/Vatican\",\"Europe/Vienna\",\"Europe/Zurich\"]},{\"value\":\"Central Europe Standard Time\",\"abbr\":\"CEDT\",\"offset\":2,\"isdst\":true,\"text\":\"(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague\",\"utc\":[\"Europe/Belgrade\",\"Europe/Bratislava\",\"Europe/Budapest\",\"Europe/Ljubljana\",\"Europe/Podgorica\",\"Europe/Prague\",\"Europe/Tirane\"]},{\"value\":\"Romance Standard Time\",\"abbr\":\"RDT\",\"offset\":2,\"isdst\":true,\"text\":\"(UTC+01:00) Brussels, Copenhagen, Madrid, Paris\",\"utc\":[\"Africa/Ceuta\",\"Europe/Brussels\",\"Europe/Copenhagen\",\"Europe/Madrid\",\"Europe/Paris\"]},{\"value\":\"Central European Standard Time\",\"abbr\":\"CEDT\",\"offset\":2,\"isdst\":true,\"text\":\"(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb\",\"utc\":[\"Europe/Sarajevo\",\"Europe/Skopje\",\"Europe/Warsaw\",\"Europe/Zagreb\"]},{\"value\":\"W. Central Africa Standard Time\",\"abbr\":\"WCAST\",\"offset\":1,\"isdst\":false,\"text\":\"(UTC+01:00) West Central Africa\",\"utc\":[\"Africa/Algiers\",\"Africa/Bangui\",\"Africa/Brazzaville\",\"Africa/Douala\",\"Africa/Kinshasa\",\"Africa/Lagos\",\"Africa/Libreville\",\"Africa/Luanda\",\"Africa/Malabo\",\"Africa/Ndjamena\",\"Africa/Niamey\",\"Africa/Porto-Novo\",\"Africa/Tunis\",\"Etc/GMT-1\"]},{\"value\":\"Namibia Standard Time\",\"abbr\":\"NST\",\"offset\":1,\"isdst\":false,\"text\":\"(UTC+01:00) Windhoek\",\"utc\":[\"Africa/Windhoek\"]},{\"value\":\"GTB Standard Time\",\"abbr\":\"GDT\",\"offset\":3,\"isdst\":true,\"text\":\"(UTC+02:00) Athens, Bucharest\",\"utc\":[\"Asia/Nicosia\",\"Europe/Athens\",\"Europe/Bucharest\",\"Europe/Chisinau\"]},{\"value\":\"Middle East Standard Time\",\"abbr\":\"MEDT\",\"offset\":3,\"isdst\":true,\"text\":\"(UTC+02:00) Beirut\",\"utc\":[\"Asia/Beirut\"]},{\"value\":\"Egypt Standard Time\",\"abbr\":\"EST\",\"offset\":2,\"isdst\":false,\"text\":\"(UTC+02:00) Cairo\",\"utc\":[\"Africa/Cairo\"]},{\"value\":\"Syria Standard Time\",\"abbr\":\"SDT\",\"offset\":3,\"isdst\":true,\"text\":\"(UTC+02:00) Damascus\",\"utc\":[\"Asia/Damascus\"]},{\"value\":\"E. Europe Standard Time\",\"abbr\":\"EEDT\",\"offset\":3,\"isdst\":true,\"text\":\"(UTC+02:00) E. Europe\",\"utc\":[\"Asia/Nicosia\",\"Europe/Athens\",\"Europe/Bucharest\",\"Europe/Chisinau\",\"Europe/Helsinki\",\"Europe/Kiev\",\"Europe/Mariehamn\",\"Europe/Nicosia\",\"Europe/Riga\",\"Europe/Sofia\",\"Europe/Tallinn\",\"Europe/Uzhgorod\",\"Europe/Vilnius\",\"Europe/Zaporozhye\"]},{\"value\":\"South Africa Standard Time\",\"abbr\":\"SAST\",\"offset\":2,\"isdst\":false,\"text\":\"(UTC+02:00) Harare, Pretoria\",\"utc\":[\"Africa/Blantyre\",\"Africa/Bujumbura\",\"Africa/Gaborone\",\"Africa/Harare\",\"Africa/Johannesburg\",\"Africa/Kigali\",\"Africa/Lubumbashi\",\"Africa/Lusaka\",\"Africa/Maputo\",\"Africa/Maseru\",\"Africa/Mbabane\",\"Etc/GMT-2\"]},{\"value\":\"FLE Standard Time\",\"abbr\":\"FDT\",\"offset\":3,\"isdst\":true,\"text\":\"(UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius\",\"utc\":[\"Europe/Helsinki\",\"Europe/Kiev\",\"Europe/Mariehamn\",\"Europe/Riga\",\"Europe/Sofia\",\"Europe/Tallinn\",\"Europe/Uzhgorod\",\"Europe/Vilnius\",\"Europe/Zaporozhye\"]},{\"value\":\"Turkey Standard Time\",\"abbr\":\"TDT\",\"offset\":3,\"isdst\":false,\"text\":\"(UTC+03:00) Istanbul\",\"utc\":[\"Europe/Istanbul\"]},{\"value\":\"Israel Standard Time\",\"abbr\":\"JDT\",\"offset\":3,\"isdst\":true,\"text\":\"(UTC+02:00) Jerusalem\",\"utc\":[\"Asia/Jerusalem\"]},{\"value\":\"Libya Standard Time\",\"abbr\":\"LST\",\"offset\":2,\"isdst\":false,\"text\":\"(UTC+02:00) Tripoli\",\"utc\":[\"Africa/Tripoli\"]},{\"value\":\"Jordan Standard Time\",\"abbr\":\"JST\",\"offset\":3,\"isdst\":false,\"text\":\"(UTC+03:00) Amman\",\"utc\":[\"Asia/Amman\"]},{\"value\":\"Arabic Standard Time\",\"abbr\":\"AST\",\"offset\":3,\"isdst\":false,\"text\":\"(UTC+03:00) Baghdad\",\"utc\":[\"Asia/Baghdad\"]},{\"value\":\"Kaliningrad Standard Time\",\"abbr\":\"KST\",\"offset\":3,\"isdst\":false,\"text\":\"(UTC+03:00) Kaliningrad, Minsk\",\"utc\":[\"Europe/Kaliningrad\",\"Europe/Minsk\"]},{\"value\":\"Arab Standard Time\",\"abbr\":\"AST\",\"offset\":3,\"isdst\":false,\"text\":\"(UTC+03:00) Kuwait, Riyadh\",\"utc\":[\"Asia/Aden\",\"Asia/Bahrain\",\"Asia/Kuwait\",\"Asia/Qatar\",\"Asia/Riyadh\"]},{\"value\":\"E. Africa Standard Time\",\"abbr\":\"EAST\",\"offset\":3,\"isdst\":false,\"text\":\"(UTC+03:00) Nairobi\",\"utc\":[\"Africa/Addis_Ababa\",\"Africa/Asmera\",\"Africa/Dar_es_Salaam\",\"Africa/Djibouti\",\"Africa/Juba\",\"Africa/Kampala\",\"Africa/Khartoum\",\"Africa/Mogadishu\",\"Africa/Nairobi\",\"Antarctica/Syowa\",\"Etc/GMT-3\",\"Indian/Antananarivo\",\"Indian/Comoro\",\"Indian/Mayotte\"]},{\"value\":\"Moscow Standard Time\",\"abbr\":\"MSK\",\"offset\":3,\"isdst\":false,\"text\":\"(UTC+03:00) Moscow, St. Petersburg, Volgograd\",\"utc\":[\"Europe/Kirov\",\"Europe/Moscow\",\"Europe/Simferopol\",\"Europe/Volgograd\"]},{\"value\":\"Samara Time\",\"abbr\":\"SAMT\",\"offset\":4,\"isdst\":false,\"text\":\"(UTC+04:00) Samara, Ulyanovsk, Saratov\",\"utc\":[\"Europe/Astrakhan\",\"Europe/Samara\",\"Europe/Ulyanovsk\"]},{\"value\":\"Iran Standard Time\",\"abbr\":\"IDT\",\"offset\":4.5,\"isdst\":true,\"text\":\"(UTC+03:30) Tehran\",\"utc\":[\"Asia/Tehran\"]},{\"value\":\"Arabian Standard Time\",\"abbr\":\"AST\",\"offset\":4,\"isdst\":false,\"text\":\"(UTC+04:00) Abu Dhabi, Muscat\",\"utc\":[\"Asia/Dubai\",\"Asia/Muscat\",\"Etc/GMT-4\"]},{\"value\":\"Azerbaijan Standard Time\",\"abbr\":\"ADT\",\"offset\":5,\"isdst\":true,\"text\":\"(UTC+04:00) Baku\",\"utc\":[\"Asia/Baku\"]},{\"value\":\"Mauritius Standard Time\",\"abbr\":\"MST\",\"offset\":4,\"isdst\":false,\"text\":\"(UTC+04:00) Port Louis\",\"utc\":[\"Indian/Mahe\",\"Indian/Mauritius\",\"Indian/Reunion\"]},{\"value\":\"Georgian Standard Time\",\"abbr\":\"GST\",\"offset\":4,\"isdst\":false,\"text\":\"(UTC+04:00) Tbilisi\",\"utc\":[\"Asia/Tbilisi\"]},{\"value\":\"Caucasus Standard Time\",\"abbr\":\"CST\",\"offset\":4,\"isdst\":false,\"text\":\"(UTC+04:00) Yerevan\",\"utc\":[\"Asia/Yerevan\"]},{\"value\":\"Afghanistan Standard Time\",\"abbr\":\"AST\",\"offset\":4.5,\"isdst\":false,\"text\":\"(UTC+04:30) Kabul\",\"utc\":[\"Asia/Kabul\"]},{\"value\":\"West Asia Standard Time\",\"abbr\":\"WAST\",\"offset\":5,\"isdst\":false,\"text\":\"(UTC+05:00) Ashgabat, Tashkent\",\"utc\":[\"Antarctica/Mawson\",\"Asia/Aqtau\",\"Asia/Aqtobe\",\"Asia/Ashgabat\",\"Asia/Dushanbe\",\"Asia/Oral\",\"Asia/Samarkand\",\"Asia/Tashkent\",\"Etc/GMT-5\",\"Indian/Kerguelen\",\"Indian/Maldives\"]},{\"value\":\"Pakistan Standard Time\",\"abbr\":\"PST\",\"offset\":5,\"isdst\":false,\"text\":\"(UTC+05:00) Islamabad, Karachi\",\"utc\":[\"Asia/Karachi\"]},{\"value\":\"India Standard Time\",\"abbr\":\"IST\",\"offset\":5.5,\"isdst\":false,\"text\":\"(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi\",\"utc\":[\"Asia/Kolkata\"]},{\"value\":\"Sri Lanka Standard Time\",\"abbr\":\"SLST\",\"offset\":5.5,\"isdst\":false,\"text\":\"(UTC+05:30) Sri Jayawardenepura\",\"utc\":[\"Asia/Colombo\"]},{\"value\":\"Nepal Standard Time\",\"abbr\":\"NST\",\"offset\":5.75,\"isdst\":false,\"text\":\"(UTC+05:45) Kathmandu\",\"utc\":[\"Asia/Katmandu\"]},{\"value\":\"Central Asia Standard Time\",\"abbr\":\"CAST\",\"offset\":6,\"isdst\":false,\"text\":\"(UTC+06:00) Astana\",\"utc\":[\"Antarctica/Vostok\",\"Asia/Almaty\",\"Asia/Bishkek\",\"Asia/Qyzylorda\",\"Asia/Urumqi\",\"Etc/GMT-6\",\"Indian/Chagos\"]},{\"value\":\"Bangladesh Standard Time\",\"abbr\":\"BST\",\"offset\":6,\"isdst\":false,\"text\":\"(UTC+06:00) Dhaka\",\"utc\":[\"Asia/Dhaka\",\"Asia/Thimphu\"]},{\"value\":\"Ekaterinburg Standard Time\",\"abbr\":\"EST\",\"offset\":6,\"isdst\":false,\"text\":\"(UTC+06:00) Ekaterinburg\",\"utc\":[\"Asia/Yekaterinburg\"]},{\"value\":\"Myanmar Standard Time\",\"abbr\":\"MST\",\"offset\":6.5,\"isdst\":false,\"text\":\"(UTC+06:30) Yangon (Rangoon)\",\"utc\":[\"Asia/Rangoon\",\"Indian/Cocos\"]},{\"value\":\"SE Asia Standard Time\",\"abbr\":\"SAST\",\"offset\":7,\"isdst\":false,\"text\":\"(UTC+07:00) Bangkok, Hanoi, Jakarta\",\"utc\":[\"Antarctica/Davis\",\"Asia/Bangkok\",\"Asia/Hovd\",\"Asia/Jakarta\",\"Asia/Phnom_Penh\",\"Asia/Pontianak\",\"Asia/Saigon\",\"Asia/Vientiane\",\"Etc/GMT-7\",\"Indian/Christmas\"]},{\"value\":\"N. Central Asia Standard Time\",\"abbr\":\"NCAST\",\"offset\":7,\"isdst\":false,\"text\":\"(UTC+07:00) Novosibirsk\",\"utc\":[\"Asia/Novokuznetsk\",\"Asia/Novosibirsk\",\"Asia/Omsk\"]},{\"value\":\"China Standard Time\",\"abbr\":\"CST\",\"offset\":8,\"isdst\":false,\"text\":\"(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi\",\"utc\":[\"Asia/Hong_Kong\",\"Asia/Macau\",\"Asia/Shanghai\"]},{\"value\":\"North Asia Standard Time\",\"abbr\":\"NAST\",\"offset\":8,\"isdst\":false,\"text\":\"(UTC+08:00) Krasnoyarsk\",\"utc\":[\"Asia/Krasnoyarsk\"]},{\"value\":\"Singapore Standard Time\",\"abbr\":\"MPST\",\"offset\":8,\"isdst\":false,\"text\":\"(UTC+08:00) Kuala Lumpur, Singapore\",\"utc\":[\"Asia/Brunei\",\"Asia/Kuala_Lumpur\",\"Asia/Kuching\",\"Asia/Makassar\",\"Asia/Manila\",\"Asia/Singapore\",\"Etc/GMT-8\"]},{\"value\":\"W. Australia Standard Time\",\"abbr\":\"WAST\",\"offset\":8,\"isdst\":false,\"text\":\"(UTC+08:00) Perth\",\"utc\":[\"Antarctica/Casey\",\"Australia/Perth\"]},{\"value\":\"Taipei Standard Time\",\"abbr\":\"TST\",\"offset\":8,\"isdst\":false,\"text\":\"(UTC+08:00) Taipei\",\"utc\":[\"Asia/Taipei\"]},{\"value\":\"Ulaanbaatar Standard Time\",\"abbr\":\"UST\",\"offset\":8,\"isdst\":false,\"text\":\"(UTC+08:00) Ulaanbaatar\",\"utc\":[\"Asia/Choibalsan\",\"Asia/Ulaanbaatar\"]},{\"value\":\"North Asia East Standard Time\",\"abbr\":\"NAEST\",\"offset\":9,\"isdst\":false,\"text\":\"(UTC+09:00) Irkutsk\",\"utc\":[\"Asia/Irkutsk\"]},{\"value\":\"Tokyo Standard Time\",\"abbr\":\"TST\",\"offset\":9,\"isdst\":false,\"text\":\"(UTC+09:00) Osaka, Sapporo, Tokyo\",\"utc\":[\"Asia/Dili\",\"Asia/Jayapura\",\"Asia/Tokyo\",\"Etc/GMT-9\",\"Pacific/Palau\"]},{\"value\":\"Korea Standard Time\",\"abbr\":\"KST\",\"offset\":9,\"isdst\":false,\"text\":\"(UTC+09:00) Seoul\",\"utc\":[\"Asia/Pyongyang\",\"Asia/Seoul\"]},{\"value\":\"Cen. Australia Standard Time\",\"abbr\":\"CAST\",\"offset\":9.5,\"isdst\":false,\"text\":\"(UTC+09:30) Adelaide\",\"utc\":[\"Australia/Adelaide\",\"Australia/Broken_Hill\"]},{\"value\":\"AUS Central Standard Time\",\"abbr\":\"ACST\",\"offset\":9.5,\"isdst\":false,\"text\":\"(UTC+09:30) Darwin\",\"utc\":[\"Australia/Darwin\"]},{\"value\":\"E. Australia Standard Time\",\"abbr\":\"EAST\",\"offset\":10,\"isdst\":false,\"text\":\"(UTC+10:00) Brisbane\",\"utc\":[\"Australia/Brisbane\",\"Australia/Lindeman\"]},{\"value\":\"AUS Eastern Standard Time\",\"abbr\":\"AEST\",\"offset\":10,\"isdst\":false,\"text\":\"(UTC+10:00) Canberra, Melbourne, Sydney\",\"utc\":[\"Australia/Melbourne\",\"Australia/Sydney\"]},{\"value\":\"West Pacific Standard Time\",\"abbr\":\"WPST\",\"offset\":10,\"isdst\":false,\"text\":\"(UTC+10:00) Guam, Port Moresby\",\"utc\":[\"Antarctica/DumontDUrville\",\"Etc/GMT-10\",\"Pacific/Guam\",\"Pacific/Port_Moresby\",\"Pacific/Saipan\",\"Pacific/Truk\"]},{\"value\":\"Tasmania Standard Time\",\"abbr\":\"TST\",\"offset\":10,\"isdst\":false,\"text\":\"(UTC+10:00) Hobart\",\"utc\":[\"Australia/Currie\",\"Australia/Hobart\"]},{\"value\":\"Yakutsk Standard Time\",\"abbr\":\"YST\",\"offset\":10,\"isdst\":false,\"text\":\"(UTC+10:00) Yakutsk\",\"utc\":[\"Asia/Chita\",\"Asia/Khandyga\",\"Asia/Yakutsk\"]},{\"value\":\"Central Pacific Standard Time\",\"abbr\":\"CPST\",\"offset\":11,\"isdst\":false,\"text\":\"(UTC+11:00) Solomon Is., New Caledonia\",\"utc\":[\"Antarctica/Macquarie\",\"Etc/GMT-11\",\"Pacific/Efate\",\"Pacific/Guadalcanal\",\"Pacific/Kosrae\",\"Pacific/Noumea\",\"Pacific/Ponape\"]},{\"value\":\"Vladivostok Standard Time\",\"abbr\":\"VST\",\"offset\":11,\"isdst\":false,\"text\":\"(UTC+11:00) Vladivostok\",\"utc\":[\"Asia/Sakhalin\",\"Asia/Ust-Nera\",\"Asia/Vladivostok\"]},{\"value\":\"New Zealand Standard Time\",\"abbr\":\"NZST\",\"offset\":12,\"isdst\":false,\"text\":\"(UTC+12:00) Auckland, Wellington\",\"utc\":[\"Antarctica/McMurdo\",\"Pacific/Auckland\"]},{\"value\":\"UTC+12\",\"abbr\":\"U\",\"offset\":12,\"isdst\":false,\"text\":\"(UTC+12:00) Coordinated Universal Time+12\",\"utc\":[\"Etc/GMT-12\",\"Pacific/Funafuti\",\"Pacific/Kwajalein\",\"Pacific/Majuro\",\"Pacific/Nauru\",\"Pacific/Tarawa\",\"Pacific/Wake\",\"Pacific/Wallis\"]},{\"value\":\"Fiji Standard Time\",\"abbr\":\"FST\",\"offset\":12,\"isdst\":false,\"text\":\"(UTC+12:00) Fiji\",\"utc\":[\"Pacific/Fiji\"]},{\"value\":\"Magadan Standard Time\",\"abbr\":\"MST\",\"offset\":12,\"isdst\":false,\"text\":\"(UTC+12:00) Magadan\",\"utc\":[\"Asia/Anadyr\",\"Asia/Kamchatka\",\"Asia/Magadan\",\"Asia/Srednekolymsk\"]},{\"value\":\"Kamchatka Standard Time\",\"abbr\":\"KDT\",\"offset\":13,\"isdst\":true,\"text\":\"(UTC+12:00) Petropavlovsk-Kamchatsky - Old\",\"utc\":[\"Asia/Kamchatka\"]},{\"value\":\"Tonga Standard Time\",\"abbr\":\"TST\",\"offset\":13,\"isdst\":false,\"text\":\"(UTC+13:00) Nuku'alofa\",\"utc\":[\"Etc/GMT-13\",\"Pacific/Enderbury\",\"Pacific/Fakaofo\",\"Pacific/Tongatapu\"]},{\"value\":\"Samoa Standard Time\",\"abbr\":\"SST\",\"offset\":13,\"isdst\":false,\"text\":\"(UTC+13:00) Samoa\",\"utc\":[\"Pacific/Apia\"]}]}");

/***/ }),

/***/ 3:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "3IAN":
/*!******************************************!*\
  !*** ./src/app/core/guard/auth.guard.ts ***!
  \******************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_services_usersession_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/usersession.service */ "K0zP");




var AuthGuard = /** @class */ (function () {
    function AuthGuard(router, userSessionService) {
        this.router = router;
        this.userSessionService = userSessionService;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var menuItems = [];
        var paths = [];
        var menu = this.userSessionService.getLocalStorageWithKey('menu');
        if (menu) {
            menuItems = JSON.parse(menu);
        }
        if (localStorage.getItem('isLoggedin')) {
            if (state.url === '/dashboard')
                return true;
            if (menuItems && menuItems.length > 0 && localStorage.getItem('isLoggedin')) {
                menuItems.forEach(function (field) {
                    if (field.link) {
                        paths.push(field.link);
                    }
                    if (field.subItems && field.subItems.length > 0) {
                        field.subItems.forEach(function (sm) { if (sm.link) {
                            paths.push(sm.link);
                        } });
                    }
                });
                if (paths.indexOf(state.url) >= 0) {
                    return true;
                }
                else {
                    var urls = state.url.split('/');
                    if (urls.length > 1 && paths.indexOf('/' + urls[1]) >= 0) {
                        return true;
                    }
                }
            }
        }
        else {
            this.router.navigate(['/auth']);
        }
        this.router.navigate(['/auth']);
        // this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
        return true;
    };
    AuthGuard.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: src_app_services_usersession_service__WEBPACK_IMPORTED_MODULE_3__["UserSessionService"] }
    ]; };
    AuthGuard = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "3LUQ":
/*!*******************************************!*\
  !*** ./src/app/services/alert.service.ts ***!
  \*******************************************/
/*! exports provided: AlertService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlertService", function() { return AlertService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-toastr */ "5eHb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");




var AlertService = /** @class */ (function () {
    function AlertService(toastr, _location) {
        this.toastr = toastr;
        this._location = _location;
        this.toastr.toastrConfig.enableHtml = true;
    }
    AlertService.prototype.success = function (message, keepAfterNavigationChange) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
        this.toastr.success(message);
    };
    AlertService.prototype.error = function (message, keepAfterNavigationChange) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
        this.toastr.error(message);
    };
    AlertService.prototype.warning = function (message, keepAfterNavigationChange) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
        this.toastr.warning(message);
    };
    AlertService.prototype.info = function (message, keepAfterNavigationChange) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
        this.toastr.info(message);
    };
    AlertService.prototype.alert = function (message, title) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                this.toastr.info(message, title, { closeButton: true, positionClass: 'toast-top-center' });
                return [2 /*return*/];
            });
        });
    };
    AlertService.prototype.result = function (result, isSuccessGoBack, message) {
        if (isSuccessGoBack === void 0) { isSuccessGoBack = false; }
        if (message === void 0) { message = null; }
        if (result && result.isSuccess) {
            if (message) {
                this.success(message);
            }
            else {
                this.success('Requested information updated successfully');
            }
            if (isSuccessGoBack) {
                this._location.back();
            }
        }
        else {
            if (result && result.failures) {
                this.error(result.failures.toString());
            }
        }
    };
    AlertService.prototype.allocateresult = function (result, isSuccessGoBack, message) {
        if (isSuccessGoBack === void 0) { isSuccessGoBack = false; }
        if (message === void 0) { message = null; }
        if (result && result.isSuccess) {
            if (message) {
                this.success(message);
            }
            else {
                this.success('Requested information updated successfully');
            }
            if (isSuccessGoBack) {
                // this._location.back();
            }
        }
        else {
            if (result && result.failures) {
                this.error(result.failures.toString());
            }
        }
    };
    AlertService.ctorParameters = function () { return [
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_3__["Location"] }
    ]; };
    AlertService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], AlertService);
    return AlertService;
}());



/***/ }),

/***/ "3b5Z":
/*!******************************************!*\
  !*** ./src/app/services/role.service.ts ***!
  \******************************************/
/*! exports provided: RoleService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoleService", function() { return RoleService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data.service */ "EnSQ");



var RoleService = /** @class */ (function () {
    function RoleService(dataService) {
        this.dataService = dataService;
        this.getEventRoute = '/api/role/';
    }
    ;
    RoleService.prototype.get = function (refresh) {
        return this.dataService.getData('/api/roles', refresh);
    };
    RoleService.prototype.getById = function (id) {
        return this.dataService.getRecord('/api/role/' + id);
    };
    RoleService.prototype.getMenu = function (refresh) {
        return this.dataService.getData('/api/user/menus', refresh);
    };
    RoleService.prototype.save = function (role) {
        var _this = this;
        return this.dataService.post('/api/role', role).map(function (response) {
            _this.dataService.clearRouteCache(_this.getEventRoute);
            return response;
        });
    };
    RoleService.prototype.saveActiveStatus = function (activeState) {
        return this.dataService.post('/api/role/activate', activeState);
    };
    RoleService.ctorParameters = function () { return [
        { type: _data_service__WEBPACK_IMPORTED_MODULE_2__["DataService"] }
    ]; };
    RoleService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], RoleService);
    return RoleService;
}());



/***/ }),

/***/ 4:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 5:
/*!************************!*\
  !*** stream (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "6xCu":
/*!***************************************************************************!*\
  !*** ./src/app/views/layout/changepassword/changepassword.component.scss ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".centered {\n  position: absolute;\n  background-color: transparent !important;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n\n.CaptchaDiv {\n  font: bold 17px verdana, arial, sans-serif;\n  font-style: italic;\n  color: #000000;\n  padding: 4px;\n  border-radius: 4px;\n}\n\n.input_with_icon {\n  position: relative;\n}\n\n.pass_icon {\n  position: absolute;\n  right: 2%;\n  top: 30%;\n}\n\n.CaptchaInput {\n  margin: 1px 0px 1px 0px;\n  width: 135px;\n}\n\n.custom-captcha {\n  color: white !important;\n  background: none;\n  margin-top: 3px;\n  margin-bottom: 0px;\n  border: none;\n  font-style: italic;\n  font-size: 26px;\n  margin-left: 3em;\n  pointer-events: none;\n  padding-left: 19px !important;\n}\n\nbutton.btn.btn-primary.recover-pass {\n  color: #fff !important;\n}\n\n.fm {\n  overflow: hidden !important;\n}\n\n.captchaicon {\n  vertical-align: middle;\n  border-style: none;\n  cursor: pointer;\n}\n\n.label-captcha {\n  width: 80px;\n  margin-top: -8px;\n}\n\n.row {\n  display: flex;\n  flex-wrap: wrap;\n  margin-right: -15px;\n  margin-left: -15px;\n}\n\n.danger {\n  color: #ff586b !important;\n  text-transform: capitalize;\n}\n\n.form-group label {\n  margin-bottom: 0.1rem;\n}\n\n.form-group {\n  margin-bottom: 0.5rem;\n}\n\n@media only screen and (min-device-width: 320px) and (max-device-width: 460px) {\n  .centered {\n    font-size: 23px;\n    top: 50%;\n    font-size: 14px !important;\n    left: 36%;\n  }\n\n  .icon.captchaicon {\n    width: 20px;\n  }\n}\n\n@media only screen and (min-device-width: 320px) and (max-device-width: 399px) {\n  .chgpwd-captcha {\n    width: 72% !important;\n    height: 27px;\n  }\n\n  .form-actions {\n    text-align: center !important;\n  }\n\n  .form-actions button {\n    margin-bottom: 10px;\n  }\n}\n\n@media only screen and (min-device-width: 400px) and (max-device-width: 720px) {\n  .chgpwd-captcha {\n    width: 84% !important;\n    height: 40px;\n  }\n}\n\n@media only screen and (max-width: 320px) {\n  .chgpwd-captcha {\n    width: 77% !important;\n    height: 40px;\n  }\n}\n\nform label {\n  text-transform: none !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcY2hhbmdlcGFzc3dvcmQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBQTtFQUNBLHdDQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSxnQ0FBQTtBQUNGOztBQUVBO0VBQ0UsMENBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxZQUFBO0VBR0Esa0JBQUE7QUFDRjs7QUFFQTtFQUNFLGtCQUFBO0FBQ0Y7O0FBRUE7RUFDQSxrQkFBQTtFQUNFLFNBQUE7RUFDQSxRQUFBO0FBQ0Y7O0FBRUE7RUFDRSx1QkFBQTtFQUNBLFlBQUE7QUFDRjs7QUFFQTtFQUNFLHVCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQkFBQTtFQUNBLDZCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxzQkFBQTtBQUNGOztBQUVBO0VBQ0UsMkJBQUE7QUFDRjs7QUFFQTtFQUNFLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0FBQ0Y7O0FBRUE7RUFDRSxXQUFBO0VBQ0EsZ0JBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtBQUNGOztBQUVBO0VBQ0UseUJBQUE7RUFDQSwwQkFBQTtBQUNGOztBQUVBO0VBQ0UscUJBQUE7QUFDRjs7QUFDQTtFQUNFLHFCQUFBO0FBRUY7O0FBQ0E7RUFDSTtJQUNFLGVBQUE7SUFDQSxRQUFBO0lBQ0EsMEJBQUE7SUFDQSxTQUFBO0VBRUo7O0VBQUU7SUFDRSxXQUFBO0VBR0o7QUFDRjs7QUFBQTtFQUNFO0lBQ0sscUJBQUE7SUFDQyxZQUFBO0VBRU47O0VBQUk7SUFDRSw2QkFBQTtFQUdOOztFQURJO0lBQ0UsbUJBQUE7RUFJTjtBQUNGOztBQURBO0VBQ0U7SUFDSyxxQkFBQTtJQUNDLFlBQUE7RUFHTjtBQUNGOztBQUNBO0VBQ0U7SUFDSyxxQkFBQTtJQUNDLFlBQUE7RUFDTjtBQUNGOztBQUVBO0VBQ0UsK0JBQUE7QUFBRiIsImZpbGUiOiJjaGFuZ2VwYXNzd29yZC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jZW50ZXJlZCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbiAgdG9wOiA1MCU7XG4gIGxlZnQ6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG59XG5cbi5DYXB0Y2hhRGl2IHtcbiAgZm9udDogYm9sZCAxN3B4IHZlcmRhbmEsIGFyaWFsLCBzYW5zLXNlcmlmO1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG4gIGNvbG9yOiAjMDAwMDAwO1xuICBwYWRkaW5nOiA0cHg7XG4gIC1tb3otYm9yZGVyLXJhZGl1czogNHB4O1xuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDRweDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xufVxuXG4uaW5wdXRfd2l0aF9pY29ue1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5wYXNzX2ljb257XG5wb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAyJTtcbiAgdG9wOiAzMCU7XG59XG5cbi5DYXB0Y2hhSW5wdXQge1xuICBtYXJnaW46IDFweCAwcHggMXB4IDBweDtcbiAgd2lkdGg6IDEzNXB4O1xufVxuXG4uY3VzdG9tLWNhcHRjaGEge1xuICBjb2xvcjogd2hpdGUgIWltcG9ydGFudDtcbiAgYmFja2dyb3VuZDogbm9uZTtcbiAgbWFyZ2luLXRvcDogM3B4O1xuICBtYXJnaW4tYm90dG9tOiAwcHg7XG4gIGJvcmRlcjogbm9uZTtcbiAgZm9udC1zdHlsZTogaXRhbGljO1xuICBmb250LXNpemU6IDI2cHg7XG4gIG1hcmdpbi1sZWZ0OiAzZW07XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICBwYWRkaW5nLWxlZnQ6IDE5cHggIWltcG9ydGFudDtcbn1cblxuYnV0dG9uLmJ0bi5idG4tcHJpbWFyeS5yZWNvdmVyLXBhc3Mge1xuICBjb2xvcjogI2ZmZiAhaW1wb3J0YW50O1xufVxuXG4uZm0ge1xuICBvdmVyZmxvdzogaGlkZGVuICFpbXBvcnRhbnQ7XG59XG5cbi5jYXB0Y2hhaWNvbiB7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIGJvcmRlci1zdHlsZTogbm9uZTtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4ubGFiZWwtY2FwdGNoYSB7XG4gIHdpZHRoOiA4MHB4O1xuICBtYXJnaW4tdG9wOiAtOHB4O1xufVxuXG4ucm93IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBtYXJnaW4tcmlnaHQ6IC0xNXB4O1xuICBtYXJnaW4tbGVmdDogLTE1cHg7XG59XG5cbi5kYW5nZXIge1xuICBjb2xvcjogI2ZmNTg2YiAhaW1wb3J0YW50O1xuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbn1cblxuLmZvcm0tZ3JvdXAgbGFiZWx7XG4gIG1hcmdpbi1ib3R0b206IDAuMXJlbTtcbn1cbi5mb3JtLWdyb3VwIHtcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xufVxuXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4tZGV2aWNlLXdpZHRoIDogMzIwcHgpIGFuZCAobWF4LWRldmljZS13aWR0aCA6IDQ2MHB4KSB7XG4gICAgLmNlbnRlcmVke1xuICAgICAgZm9udC1zaXplOiAyM3B4O1xuICAgICAgdG9wOiA1MCU7XG4gICAgICBmb250LXNpemU6IDE0cHggIWltcG9ydGFudDtcbiAgICAgIGxlZnQ6IDM2JTtcbiAgICB9XG4gICAgLmljb24uY2FwdGNoYWljb257XG4gICAgICB3aWR0aDogMjBweDtcbiAgICB9XG59XG5cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi1kZXZpY2Utd2lkdGggOiAzMjBweCkgYW5kIChtYXgtZGV2aWNlLXdpZHRoIDogMzk5cHgpIHtcbiAgLmNoZ3B3ZC1jYXB0Y2hhICB7XG4gICAgICAgd2lkdGg6IDcyJSAhaW1wb3J0YW50O1xuICAgICAgICBoZWlnaHQ6IDI3cHg7XG4gICAgICB9XG4gICAgICAuZm9ybS1hY3Rpb25ze1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXIhaW1wb3J0YW50O1xuICAgICAgfVxuICAgICAgLmZvcm0tYWN0aW9ucyBidXR0b257XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgICB9XG59XG5cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi1kZXZpY2Utd2lkdGggOiA0MDBweCkgYW5kIChtYXgtZGV2aWNlLXdpZHRoIDo3MjBweCkge1xuICAuY2hncHdkLWNhcHRjaGEgIHtcbiAgICAgICB3aWR0aDogODQlICFpbXBvcnRhbnQ7XG4gICAgICAgIGhlaWdodDogNDBweDtcbiAgICAgIH1cblxuICAgICBcbn1cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgIChtYXgtd2lkdGggOjMyMHB4KSB7XG4gIC5jaGdwd2QtY2FwdGNoYSAge1xuICAgICAgIHdpZHRoOiA3NyUgIWltcG9ydGFudDtcbiAgICAgICAgaGVpZ2h0OiA0MHB4O1xuICAgICAgfVxuICAgIH1cbiAgICBcbmZvcm0gbGFiZWwgeyBcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmUgIWltcG9ydGFudDtcbn1cbiJdfQ== */");

/***/ }),

/***/ "AXVw":
/*!***********************************************************!*\
  !*** ./src/app/views/layout/directives/role.directive.ts ***!
  \***********************************************************/
/*! exports provided: RoleDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoleDirective", function() { return RoleDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_usersession_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/usersession.service */ "K0zP");



// tslint:disable-next-line: directive-selector
var RoleDirective = /** @class */ (function () {
    function RoleDirective(elem, renderer, userSession) {
        this.elem = elem;
        this.renderer = renderer;
        this.userSession = userSession;
    }
    RoleDirective.prototype.ngOnInit = function () {
        this.renderer.setStyle(this.elem.nativeElement, 'display', 'none');
        var sessionValue = this.userSession.getLocalStorageWithKey('menu');
        if (sessionValue) {
            var roleData = JSON.parse(sessionValue);
            if (roleData) {
                for (var i = 0; i < roleData.length; i++) {
                    var result = this.checkPageRolePermission(roleData[i]);
                    if (result) {
                        return;
                    }
                }
            }
        }
    };
    RoleDirective.prototype.checkPageRolePermission = function (page) {
        var _this = this;
        if (page.label === this.pageName) {
            if (page.pageControls && page.pageControls.length > 0) {
                var pageControl = page.pageControls.filter(function (i) { return i.displayName === _this.controlName; });
                if (pageControl && pageControl.length > 0) {
                    this.renderer.setStyle(this.elem.nativeElement, 'display', 'initial');
                    return true;
                }
            }
        }
        else if (page.subItems && page.subItems.length > 0) {
            for (var i = 0; i < page.subItems.length; i++) {
                var result = this.checkPageRolePermission(page.subItems[i]);
                if (result) {
                    return true;
                }
            }
        }
        return false;
    };
    RoleDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"] },
        { type: src_app_services_usersession_service__WEBPACK_IMPORTED_MODULE_2__["UserSessionService"] }
    ]; };
    RoleDirective.propDecorators = {
        roleControl: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        controlName: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        pageName: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
    };
    RoleDirective = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({ selector: '[roleControl]' })
    ], RoleDirective);
    return RoleDirective;
}());



/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
var environment = {
    // apiBaseUrl: 'http://localhost:7000',
    apiBaseUrl: "https://api.agriexpo2023.in",
    // imageBaseUrl: "https://tnngsimages.tnega.org/",
    tokenEndPoint: "/api/token",
    production: false,
    environment: "Local",
    showEnvironment: true,
};


/***/ }),

/***/ "BKZR":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/layout/changepassword/changepassword.component.html ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"d-flex justify-content-between align-items-center flex-wrap grid-margin\">\n    <div>\n        <h4 class=\"mb-3 mb-md-0\">&nbsp;{{'ChangePassword' | translate}}</h4>\n    </div>\n</div>\n<div class=\"row text-left\">\n    <div class=\"col-md-12\">\n        <div class=\"card\">\n            <div class=\"card-content\">\n                <div class=\"card-body login-img\">\n                    <div class=\"px-3\">\n                        <form [formGroup]=\"form\" class=\"form form-horizontal\" novalidate>\n                            <div class=\"form-body pt-2\">\n\n                                <div class=\"row\">\n                                    <div class=\"col-sm-12\">\n                                        <div class=\"form-group\">\n                                            <label for=\"oldpassword\" class=\"mandatory\">{{'OldPassword' |\n                                                translate}}</label>\n                                            <div class=\"input_with_icon\">\n                                                <i class=\"fa fa-eye pass_icon\" aria-hidden=\"true\"\n                                                    *ngIf=\"showold && form.get('oldPassword').value\"\n                                                    (click)=\"oldPassword()\"></i>\n                                                <i class=\"fa fa-eye-slash pass_icon\" aria-hidden=\"true\"\n                                                    *ngIf=\"!showold  && form.get('oldPassword').value\"\n                                                    (click)=\"oldPassword()\"></i>\n                                                <input [type]=\"showold ? 'text' : 'password'\" id=\"oldpassword\"\n                                                    class=\"form-control\" formControlName=\"oldPassword\"\n                                                    placeholder=\"Old Password\" required autocomplete=\"off\" passwordOnly\n                                                    avoidscripttags>\n                                            </div>\n                                            <span class=\"form-text text-muted danger mandatory\"\n                                                *ngIf=\"!form.get('oldPassword').valid && (form.get('oldPassword').dirty || form.get('oldPassword').touched)\">\n                                                {{'OldPassword' | translate}} {{'IsRequired' | translate}}\n                                            </span>\n                                        </div>\n                                    </div>\n                                </div>\n\n                                <div class=\"row\">\n                                    <div class=\"col-sm-12\">\n                                        <div class=\"form-group\">\n                                            <label for=\"newpassword\" class=\"mandatory\">{{'NewPassword' |\n                                                translate}}</label>\n                                            <div class=\"input_with_icon\">\n                                                <i class=\"fa fa-eye pass_icon\" aria-hidden=\"true\"\n                                                    *ngIf=\"show && form.get('newPassword').value\"\n                                                    (click)=\"password()\"></i>\n                                                <i class=\"fa fa-eye-slash pass_icon\" aria-hidden=\"true\"\n                                                    *ngIf=\"!show  && form.get('newPassword').value\"\n                                                    (click)=\"password()\"></i>\n                                                <input [type]=\"show ? 'text' : 'password'\" id=\"newpassword\"\n                                                    class=\"form-control\" formControlName=\"newPassword\"\n                                                    placeholder=\"New Password\" minlength=\"8\" maxlength=\"12\"\n                                                    autocomplete=\"off\" required passwordOnly avoidscripttags>\n                                            </div>\n                                            <span class=\"form-text text-muted danger mandatory\"\n                                                *ngIf=\"form.get('newPassword').hasError('required') && form.get('newPassword').touched\">\n                                                {{'NewPassword' | translate}} {{'IsRequired' | translate}}\n                                            </span>\n                                            <span class=\"form-text text-muted danger mandatory\"\n                                                *ngIf=\"!form.get('newPassword').hasError('required') && (form.get('newPassword').value == form.get('oldPassword').value)\">\n                                                {{' Old and New Password should not be same' | translate}}\n                                            </span>\n                                            <span class=\"form-text text-muted danger mandatory\"\n                                                *ngIf=\"form.get('newPassword').hasError('passwordStrength')\">\n                                                {{form.get('newPassword').errors['passwordStrength'] | translate}}\n                                            </span>\n                                            <span class=\"form-text text-muted danger mandatory\" *ngIf=\"form.get('newPassword').hasError('minlength') && !form.get('newPassword').hasError('required')\n      && !form.get('newPassword').hasError('passwordStrength')\">\n                                                {{'Password Should Contains Minimum 8 Characters and Maximum of 12\n                                                characters' | translate}}\n                                            </span>\n                                        </div>\n                                    </div>\n                                </div>\n\n                                <div class=\"row\">\n                                    <div class=\"col-sm-12\">\n                                        <div class=\"form-group\">\n                                            <label for=\"confirmpassword\" class=\"mandatory\">{{'ConfirmPassword' |\n                                                translate}}</label>\n                                            <div class=\"input_with_icon\">\n                                                <i class=\"fa fa-eye pass_icon\" aria-hidden=\"true\"\n                                                    *ngIf=\"show2 && form.get('confirmpassword').value\"\n                                                    (click)=\"confirmpassword()\"></i>\n                                                <i class=\"fa fa-eye-slash pass_icon\" aria-hidden=\"true\"\n                                                    *ngIf=\"!show2  && form.get('confirmpassword').value\"\n                                                    (click)=\"confirmpassword()\"></i>\n                                                <input [type]=\"show2 ? 'text' : 'password'\" id=\"confirmpassword\"\n                                                    class=\"form-control\" formControlName=\"confirmpassword\"\n                                                    placeholder=\"Confirm Password\" minlength=\"8\" maxlength=\"12\"\n                                                    autocomplete=\"off\" required passwordOnly avoidscripttags>\n                                            </div>\n\n                                            <span class=\"form-text text-muted danger mandatory\"\n                                                *ngIf=\"!form.get('confirmpassword').valid && (form.get('confirmpassword').dirty || form.get('confirmpassword').touched)\">\n                                                {{'ConfirmPassword' | translate}} {{'IsRequired' | translate}}\n                                            </span>\n                                            <span class=\"form-text text-muted danger mandatory\"\n                                                *ngIf=\"form.get('confirmpassword').valid && (form.get('confirmpassword').value != form.get('newPassword').value)\">\n                                                {{'Please enter correct password' | translate}}\n                                            </span>\n                                        </div>\n                                    </div>\n                                </div>\n\n\n                                <div class=\"row mt-3\">\n                                    <div class=\"col-sm-12\">\n                                        <div class=\"form-group\">\n                                            <label class=\"label-captcha\" class=\"mandatory\">Captcha</label>\n                                            <div id=\"CaptchaDiv\">\n                                                <figure>\n                                                    <img class=\"chgpwd-captcha\" src=\"assets/img/bg6.png\"\n                                                        alt=\"captcha image\" style=\"width: 318px;\" />\n                                                    <img src=\"assets/img/reload1.svg\" width=\"40\" height=\"30\"\n                                                        class=\"icon captchaicon\" alt=\"reload image\"\n                                                        (click)=\"OnCaptachaValidators()\" title=\"Reload\">\n                                                    <div class=\"centered\">\n                                                        <input type=\"text\" formControlName=\"CaptchaDiv\"\n                                                            class=\"custom-captcha centered\" tabindex=\"-1\"\n                                                            avoidscripttags>\n                                                    </div>\n                                                </figure>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n\n\n                                <div class=\"row\">\n                                    <div class=\"col-sm-12\">\n                                        <div class=\"form-group\">\n                                            <div class=\"col-lg-12 col-md-12\">\n                                                <input type=\"text\" id=\"CaptchaInput\" class=\"form-control\"\n                                                    formControlName=\"txtCaptcha\" autocomplete=\"off\"\n                                                    placeholder=\"Enter the captcha\" avoidscripttags>\n                                                <span class=\"form-text text-muted danger mandatory\"\n                                                    *ngIf=\"!form.get('txtCaptcha').valid && (form.get('txtCaptcha').dirty || form.get('txtCaptcha').touched)\">\n                                                    {{'Captcha is required' | translate}}\n                                                </span>\n                                                <span class=\"form-text text-muted danger mandatory\"\n                                                    *ngIf=\"form.get('txtCaptcha').valid && (form.get('txtCaptcha').value != form.get('CaptchaDiv').value)\">\n                                                    {{'Please enter the vaild captcha' | translate}}\n                                                </span>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n\n                                <div class=\"form-actions mb-2 mt-3\" style=\"float: right;\">\n                                    <button type=\"button\" class=\"btn btn-raised btn-warning mr-1 btncancel\"\n                                        (click)=\"onCancel()\">\n                                        <i class=\"fa fa-close\"></i>\n                                        {{'Cancel' | translate}}\n                                    </button>\n                                    <button type=\"submit\" class=\"button btn btn-primary mr-1 btnsave\"\n                                        (click)=\"onSave()\">\n                                        <i class=\"fa fa-save\"></i>\n                                        {{'Save' | translate}}\n                                    </button>\n                                </div>\n                            </div>\n                        </form>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>");

/***/ }),

/***/ "Efog":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/layout/footer/footer.component.html ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<footer class=\"footer d-flex flex-column flex-md-row align-items-center justify-content-between\">\n        <p class=\"text-muted text-center text-md-left\"> Developed\n                By <a href=\"https://www.xenovex.com\" target=\"_blank\">Xenovex\n                        Technologies</a></p>\n        <p class=\"text-muted text-center\" *ngIf=\"appVersion\">Version : {{appVersion.version}}</p>\n        <p class=\"text-muted text-center text-md-left mb-0 d-none d-md-block\" *ngIf=\"currentYear\">Copyright ©\n                {{currentYear}} <a href=\"#\" target=\"_blank\">Agriculture</a>. All rights reserved</p>\n</footer>");

/***/ }),

/***/ "EnSQ":
/*!******************************************!*\
  !*** ./src/app/services/data.service.ts ***!
  \******************************************/
/*! exports provided: DataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataService", function() { return DataService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var rxjs_Rx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/Rx */ "M6kn");
/* harmony import */ var rxjs_Rx__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(rxjs_Rx__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment */ "AytR");





var DataService = /** @class */ (function () {
    function DataService(http) {
        this.http = http;
        this.baseUrl = src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiBaseUrl;
        this.cache = {};
    }
    DataService.prototype.getData = function (route, refresh) {
        var _this = this;
        if (this.dataForRouteIsCached(route, refresh)) {
            return rxjs_Rx__WEBPACK_IMPORTED_MODULE_3__["Observable"].of(this.cache[route]);
        }
        else { // no cached data or refresh requested
            return this.http.get(this.baseUrl + route).map(function (response) {
                _this.cache[route] = response;
                return response;
            });
        }
    };
    DataService.prototype.getDataWithParams = function (route, params, refresh) {
        var _this = this;
        if (this.dataForRouteIsCached(route, refresh)) {
            return rxjs_Rx__WEBPACK_IMPORTED_MODULE_3__["Observable"].of(this.cache[route]);
        }
        else { // no cached data or refresh requested
            return this.http.get(this.baseUrl + route, { params: params }).map(function (response) {
                _this.cache[route] = response;
                return response;
            });
        }
    };
    DataService.prototype.getRecord = function (route) {
        return this.http.get(this.baseUrl + route);
    };
    DataService.prototype.getRecordWithParams = function (route, params) {
        return this.http.get(this.baseUrl + route, { params: params });
    };
    DataService.prototype.post = function (route, data) {
        return this.http.post(this.baseUrl + route, data);
    };
    DataService.prototype.delete = function (route) {
        return this.http.delete(this.baseUrl + route).map(function (response) {
            return response;
        });
    };
    DataService.prototype.getReport = function (route) {
        return this.http.get(this.baseUrl + route, { responseType: 'blob' });
    };
    DataService.prototype.getExternalData = function (route) {
        return this.http.get(route).map(function (response) {
            return response;
        });
    };
    DataService.prototype.dataForRouteIsCached = function (route, refresh) {
        return this.cache[route] && (refresh === false || refresh === undefined);
    };
    DataService.prototype.clearCache = function () {
        this.cache = {};
    };
    DataService.prototype.clearRouteCache = function (route) {
        this.cache[route] = null;
    };
    DataService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    DataService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], DataService);
    return DataService;
}());



/***/ }),

/***/ "G83Q":
/*!*************************************************************!*\
  !*** ./src/app/views/layout/sidebar/sidebar.component.scss ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".fonticon {\n  font-size: 17px;\n  width: 15px;\n}\n\n.sidebar_icon {\n  position: absolute;\n  top: 36%;\n  opacity: 0.1;\n  width: 100%;\n  text-align: center;\n}\n\n.sidebar .sidebar-header .sidebar-toggler {\n  cursor: pointer;\n  width: 12px;\n}\n\n.pointer {\n  cursor: pointer;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcc2lkZWJhci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGVBQUE7RUFDQSxXQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0FBQ0Y7O0FBR0U7RUFDRSxlQUFBO0VBQ0EsV0FBQTtBQUFKOztBQUlBO0VBQ0UsZUFBQTtBQURGIiwiZmlsZSI6InNpZGViYXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZm9udGljb24ge1xuICBmb250LXNpemU6IDE3cHg7XG4gIHdpZHRoOiAxNXB4O1xufVxuXG4uc2lkZWJhcl9pY29uIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDM2JTtcbiAgb3BhY2l0eTogMC4xO1xuICB3aWR0aDogMTAwJTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uc2lkZWJhciAuc2lkZWJhci1oZWFkZXIge1xuICAuc2lkZWJhci10b2dnbGVyIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgd2lkdGg6IDEycHg7XG4gIH1cbn1cblxuLnBvaW50ZXIge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59Il19 */");

/***/ }),

/***/ "IAMR":
/*!******************************************************************!*\
  !*** ./src/app/views/pages/error-page/error-page.component.scss ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJlcnJvci1wYWdlLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "IYwT":
/*!*************************************************************!*\
  !*** ./src/app/core/feather-icon/feather-icon.directive.ts ***!
  \*************************************************************/
/*! exports provided: FeatherIconDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeatherIconDirective", function() { return FeatherIconDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var feather_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! feather-icons */ "d8Z/");
/* harmony import */ var feather_icons__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(feather_icons__WEBPACK_IMPORTED_MODULE_2__);



var FeatherIconDirective = /** @class */ (function () {
    function FeatherIconDirective() {
    }
    FeatherIconDirective.prototype.ngAfterViewInit = function () {
        // feather icon
        feather_icons__WEBPACK_IMPORTED_MODULE_2___default.a.replace();
    };
    FeatherIconDirective.ctorParameters = function () { return []; };
    FeatherIconDirective = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: '[appFeatherIcon]'
        })
    ], FeatherIconDirective);
    return FeatherIconDirective;
}());



/***/ }),

/***/ "JSdJ":
/*!***************************************!*\
  !*** ./src/app/models/usersession.ts ***!
  \***************************************/
/*! exports provided: UserSession */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserSession", function() { return UserSession; });
var UserSession = /** @class */ (function () {
    function UserSession() {
        this.clientId = [];
        this.role = [];
    }
    return UserSession;
}());



/***/ }),

/***/ "JZAC":
/*!************************************************************************!*\
  !*** ./src/app/views/layout/directives/onlynumberSpecial.directive.ts ***!
  \************************************************************************/
/*! exports provided: onlynumberSpecialCharacter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onlynumberSpecialCharacter", function() { return onlynumberSpecialCharacter; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


var onlynumberSpecialCharacter = /** @class */ (function () {
    function onlynumberSpecialCharacter(el) {
        this.el = el;
        this.regexStr = '^[0-9. ]*$';
    }
    onlynumberSpecialCharacter.prototype.onKeyPress = function (event) {
        return new RegExp(this.regexStr).test(event.key);
    };
    // @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    //   this.validateFields(event);
    // }
    // validateFields(event) {
    //   setTimeout(() => {
    //     this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^A-Za-z. ]/g, '').replace(/\s/g, '');
    //     event.preventDefault();
    //   }, 100)
    // }
    onlynumberSpecialCharacter.prototype.paste = function (event) {
        this.validateFields(event);
    };
    onlynumberSpecialCharacter.prototype.validateFields = function (event) {
        var _this = this;
        setTimeout(function () {
            _this.el.nativeElement.value = _this.el.nativeElement.value.replace(/[^0-9. ]/g, '').replace(/\s/g, '');
            event.preventDefault();
        }, 100);
    };
    onlynumberSpecialCharacter.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] }
    ]; };
    onlynumberSpecialCharacter.propDecorators = {
        isAlphaNumeric: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        onKeyPress: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['keypress', ['$event'],] }],
        paste: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['paste', ['$event'],] }]
    };
    onlynumberSpecialCharacter = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: '[numberOnly]'
        })
    ], onlynumberSpecialCharacter);
    return onlynumberSpecialCharacter;
}());



/***/ }),

/***/ "K0zP":
/*!*************************************************!*\
  !*** ./src/app/services/usersession.service.ts ***!
  \*************************************************/
/*! exports provided: UserSessionService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserSessionService", function() { return UserSessionService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/environment */ "AytR");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _models_usersession__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../models/usersession */ "JSdJ");




var UserSessionService = /** @class */ (function () {
    function UserSessionService() {
        this.session = new _models_usersession__WEBPACK_IMPORTED_MODULE_3__["UserSession"]();
        this.localStorageSessionKey = 'eGramam-' + src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].apiBaseUrl + '-AuthData';
    }
    UserSessionService.prototype.create = function (session) {
        this.setLocalStorageProperties(session);
    };
    UserSessionService.prototype.destroy = function () {
        this.setLocalStorageProperties(new _models_usersession__WEBPACK_IMPORTED_MODULE_3__["UserSession"]());
        localStorage.removeItem('role');
        localStorage.clear();
    };
    UserSessionService.prototype.load = function () {
        var jsonData = localStorage.getItem(this.localStorageSessionKey);
        return jsonData;
    };
    UserSessionService.prototype.authToken = function () {
        var jsonData = localStorage.getItem(this.localStorageSessionKey);
        return jsonData == null ? '' : JSON.parse(jsonData).authToken;
    };
    UserSessionService.prototype.userId = function () {
        var jsonData = localStorage.getItem(this.localStorageSessionKey);
        return jsonData == null ? 0 : +JSON.parse(jsonData).userId;
    };
    UserSessionService.prototype.getUserName = function () {
        var jsonData = localStorage.getItem(this.localStorageSessionKey);
        return jsonData == null ? '' : JSON.parse(jsonData).userFullName;
    };
    UserSessionService.prototype.roleId = function () {
        var jsonData = localStorage.getItem(this.localStorageSessionKey);
        return jsonData == null ? 0 : +JSON.parse(jsonData).roleId;
    };
    UserSessionService.prototype.roleName = function () {
        var jsonData = localStorage.getItem(this.localStorageSessionKey);
        return jsonData == null ? '' : JSON.parse(jsonData).roleName;
    };
    UserSessionService.prototype.getClientId = function () {
        var jsonData = localStorage.getItem(this.localStorageSessionKey);
        return jsonData == null ? [] : JSON.parse(jsonData).clientId;
    };
    UserSessionService.prototype.getCurrentClientId = function () {
        var jsonData = localStorage.getItem(this.localStorageSessionKey);
        return jsonData == null ? [] : JSON.parse(jsonData).currentClientId;
    };
    UserSessionService.prototype.getCurrentClientName = function () {
        var jsonData = localStorage.getItem(this.localStorageSessionKey);
        return jsonData == null ? [] : JSON.parse(jsonData).currentClientName;
    };
    UserSessionService.prototype.getEmail = function () {
        var jsonData = localStorage.getItem(this.localStorageSessionKey);
        return jsonData == null ? [] : JSON.parse(jsonData).email;
    };
    UserSessionService.prototype.getLanguageType = function () {
        var jsonData = localStorage.getItem(this.localStorageSessionKey);
        return jsonData == null ? [] : JSON.parse(jsonData).languageType;
    };
    UserSessionService.prototype.referrence2 = function () {
        var jsonData = JSON.parse(localStorage.getItem(this.localStorageSessionKey));
        return JSON.parse(jsonData.departmentId).Services;
    };
    UserSessionService.prototype.setLocalStorageProperties = function (session) {
        localStorage.setItem(this.localStorageSessionKey, JSON.stringify(session));
    };
    UserSessionService.prototype.getLocalStorageWithKey = function (key) {
        return localStorage.getItem(key);
    };
    UserSessionService.prototype.setLocalStorageWithKey = function (key, session) {
        localStorage.setItem(key, JSON.stringify(session));
    };
    UserSessionService.prototype.isDynamicPassword = function () {
        var jsonData = localStorage.getItem(this.localStorageSessionKey);
        return jsonData == null ? '' : JSON.parse(jsonData);
    };
    UserSessionService.prototype.getPageUrl = function (key) {
        var _this = this;
        this.filterArr = [];
        var menu = JSON.parse(this.getLocalStorageWithKey('menucontrols'));
        var filterItems = menu.map(function (e) {
            e.submenu.forEach(function (element) {
                _this.filterArr.push(element);
            });
        });
        var output = this.filterArr.find(function (e) {
            return e.path === key;
        });
        // output.edit = true;
        // output.delete = true;
        // output.view = true;
        // output.approve = true;
        // output.copy = true;
        return output.controlAccess;
    };
    UserSessionService.ctorParameters = function () { return []; };
    UserSessionService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])()
    ], UserSessionService);
    return UserSessionService;
}());



/***/ }),

/***/ "KRBT":
/*!*************************************************!*\
  !*** ./src/app/services/interceptor.service.ts ***!
  \*************************************************/
/*! exports provided: HttpInterceptorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpInterceptorService", function() { return HttpInterceptorService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _usersession_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./usersession.service */ "K0zP");
/* harmony import */ var _authentication_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./authentication.service */ "ej43");
/* harmony import */ var _alert_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./alert.service */ "3LUQ");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/environments/environment */ "AytR");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! sweetalert2 */ "PSD3");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_11__);












var HttpInterceptorService = /** @class */ (function () {
    function HttpInterceptorService(router, sessionService, authService, alertService, translate) {
        this.router = router;
        this.sessionService = sessionService;
        this.authService = authService;
        this.alertService = alertService;
        this.translate = translate;
        this.baseUrl = src_environments_environment__WEBPACK_IMPORTED_MODULE_9__["environment"].apiBaseUrl;
    }
    HttpInterceptorService.prototype.intercept = function (request, next) {
        var _this = this;
        var started = Date.now();
        // add authorization header with jwt token if available
        var authToken = this.sessionService.authToken();
        var isTokenEndPoint = request.url.match('/api/token');
        if (isTokenEndPoint === null && this.sessionService.userId() && authToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: "Bearer " + authToken,
                }
            });
        }
        return next.handle(request).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])(function (event) {
            if (event instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpResponse"]) {
                var action = request.urlWithParams.replace(_this.baseUrl, '');
                var elapsed = Date.now() - started;
            }
        }, function (error) {
            if (error instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpErrorResponse"]) {
                if (error.status === 401) {
                    _this.authService.logOut();
                    _this.router.navigate(['/auth/login']);
                }
                else if (error.status === 403) {
                    _this.forceLogout();
                }
                else {
                    _this.broadcastFriendlyErrorMessage(error);
                }
            }
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["throwError"])(error);
        }));
    };
    HttpInterceptorService.prototype.broadcastFriendlyErrorMessage = function (rejection) {
        var msg = '';
        if (rejection.status === 0 && (rejection.statusText === '' || rejection.statusText === 'Unknown Error')) {
            this.alertService.error('Unable to connect to the server, please try again in a couple of seconds.');
        }
        else if (rejection.status == 429) {
            this.alertService.error('You are allowed to send only one OTP every 3 minutes, so try after sometime.');
        }
        else if (rejection.status === 400) {
            if (rejection.error) { // jshint ignore:line
                msg = (rejection.error.message) ? rejection.error.message : rejection.error; // jshint ignore:line
            }
            this.alertService.error(msg);
        }
        else if (rejection.status === 404) {
            if (rejection.message) {
                this.alertService.error(rejection.message);
            }
        }
        else if (rejection.status === 500) {
            if (rejection.error && rejection.error.Message) {
                this.alertService.error(rejection.error.Message);
            }
            else if (rejection.message) {
                var message = rejection.message;
                this.alertService.error(message);
            }
        }
        else if (rejection.status === 409) {
            if (rejection.error && rejection.error.Message) {
                this.alertService.error(rejection.error.Message);
            }
            else if (rejection.message) {
                var message = rejection.message;
                this.alertService.error(message);
            }
        }
        else if (rejection.responseStatus === 401) {
            this.authService.logOut();
            this.router.navigate(['/login']);
        }
        else if (rejection.responseStatus === 0) {
            this.alertService.error('Error occured, while uploading file');
        }
        else if (rejection.responseStatus === 400) {
            if (rejection.response) { // jshint ignore:line
                msg = rejection.response; // jshint ignore:line
            }
            this.alertService.error(msg);
        }
    };
    HttpInterceptorService.prototype.forceLogout = function () {
        var _this = this;
        sweetalert2__WEBPACK_IMPORTED_MODULE_11___default.a.fire({
            title: 'Logout',
            text: 'Another user logged in to your account',
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok',
        }).then(function (result) {
            if (result.value) {
                _this.authService.logOut();
                _this.router.navigate(['/auth/login']);
            }
        });
    };
    HttpInterceptorService.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _usersession_service__WEBPACK_IMPORTED_MODULE_4__["UserSessionService"] },
        { type: _authentication_service__WEBPACK_IMPORTED_MODULE_5__["AuthenticationService"] },
        { type: _alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"] },
        { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__["TranslateService"] }
    ]; };
    HttpInterceptorService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], HttpInterceptorService);
    return HttpInterceptorService;
}());



/***/ }),

/***/ "KmmY":
/*!****************************************************************!*\
  !*** ./src/app/views/layout/directives/inputtext.directive.ts ***!
  \****************************************************************/
/*! exports provided: inputText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inputText", function() { return inputText; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


var inputText = /** @class */ (function () {
    function inputText(el) {
        this.el = el;
        this.regexStr = '^[a-zA-Z0-9.,@/ ]*$';
    }
    inputText.prototype.onKeyPress = function (event) {
        return new RegExp(this.regexStr).test(event.key);
    };
    inputText.prototype.blockPaste = function (event) {
        this.validateFields(event);
    };
    inputText.prototype.validateFields = function (event) {
        var _this = this;
        setTimeout(function () {
            _this.el.nativeElement.value = _this.el.nativeElement.value.replace(/[^A-Za-z.,@/ ]/g, '').replace(/\s/g, '');
            event.preventDefault();
        }, 100);
    };
    inputText.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] }
    ]; };
    inputText.propDecorators = {
        isAlphaNumeric: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        onKeyPress: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['keypress', ['$event'],] }],
        blockPaste: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['paste', ['$event'],] }]
    };
    inputText = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: '[avoidscripttags]'
        })
    ], inputText);
    return inputText;
}());



/***/ }),

/***/ "LDmm":
/*!***********************************************************!*\
  !*** ./src/app/views/layout/directives/time.directive.ts ***!
  \***********************************************************/
/*! exports provided: TimeOnly */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimeOnly", function() { return TimeOnly; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


var TimeOnly = /** @class */ (function () {
    function TimeOnly(el) {
        this.el = el;
        this.regexStr = '^[0-9.: ]*$';
    }
    TimeOnly.prototype.onKeyPress = function (event) {
        return new RegExp(this.regexStr).test(event.key);
    };
    TimeOnly.prototype.blockPaste = function (event) {
        this.validateFields(event);
    };
    TimeOnly.prototype.validateFields = function (event) {
        var _this = this;
        setTimeout(function () {
            _this.el.nativeElement.value = _this.el.nativeElement.value.replace(/[^A-Za-z. ]/g, '').replace(/\s/g, '');
            event.preventDefault();
        }, 100);
    };
    TimeOnly.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] }
    ]; };
    TimeOnly.propDecorators = {
        isAlphaNumeric: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        onKeyPress: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['keypress', ['$event'],] }],
        blockPaste: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['paste', ['$event'],] }]
    };
    TimeOnly = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: '[timeOnly]'
        })
    ], TimeOnly);
    return TimeOnly;
}());



/***/ }),

/***/ "Ln4N":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/layout/navbar/navbar.component.html ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<nav class=\"navbar\" style=\"flex-wrap: nowrap;\">\n  <a href=\"\" class=\"sidebar-toggler\" (click)=\"toggleSidebar($event)\">\n    <i class=\"fa fa-bars\"></i>\n    <!-- <i class=\"feather icon-menu\"></i> -->\n  </a>\n\n  <div class=\"custom_sec d-none d-sm-none d-md-none d-lg-block\">\n    <div class=\"row afterhidefilter_sec\">\n\n      <div class=\"col-sm-8 todayDate\">\n        <span class=\"fontColor\">State Level Agricultural Exhibition 2023</span>\n      </div>\n      <div class=\"col-sm-3 usertext\">\n        <span class=\"nowrap\" style=\"color: black\"><b>{{username}}</b></span>\n      </div>\n\n      <div class=\"col-sm-1 userimage\">\n        <div class=\"\">\n          <ul class=\"profile_sec row align-items-center\">\n            <li class=\"nav-item nav-profile col-sm-2\" ngbDropdown>\n              <a class=\"nav-link\" ngbDropdownToggle id=\"profileDropdown\">\n                <img *ngIf=\"!userImg\" src=\"assets/images/profile.png\" width=\"40\" height=\"40\" alt=\"profile\">\n                <img data-toggle=\"tooltip\" *ngIf=\"userImg\" width=\"30\" height=\"30\" data-placement=\"bottom\"\n                  ngbTooltip=\"User\" class=\"userimg\" [src]=\"'data:image/jpg;base64,'+userImg\" />\n                <i class=\"fa fa-angle-down\" aria-hidden=\"true\"></i>\n              </a>\n              <div class=\"profile_drop\" ngbDropdownMenu aria-labelledby=\"profileDropdown\">\n                <div class=\"dropdown-header d-flex flex-column align-items-center\">\n                  <div class=\"figure mb-3\">\n                    <img *ngIf=\"!userImg\" src=\"assets/images/executive.png\" alt=\"profile\">\n                    <img data-toggle=\"tooltip\" *ngIf=\"userImg\" data-placement=\"bottom\" ngbTooltip=\"User\" class=\"userimg\"\n                      [src]=\"'data:image/jpg;base64,'+userImg\" />\n\n                  </div>\n                  <div class=\"info text-center\">\n                    <p class=\"name font-weight-bold mb-0\" style=\"color: #5E376D\">{{username}}</p>\n                    <p style=\"color: #5E376D\">{{roleName}}</p>\n                  </div>\n                </div>\n                <div class=\"dropdown-body\">\n                  <ul class=\"profile-nav p-0\">\n\n                    <li class=\"nav-item\">\n                      <a (click)=\"onLogout($event)\" class=\"nav-link\">\n                        <i class=\"fa fa-sign-out\"></i>\n                        <span>{{'Logout' | translate}}</span>\n                      </a>\n                    </li>\n                  </ul>\n                </div>\n              </div>\n            </li>\n          </ul>\n        </div>\n      </div>\n    </div>\n\n  </div>\n  <div class=\"custom_mobile_sec d-block d-sm-block d-md-block d-lg-none\">\n\n    <div class=\"navbar-content\" style=\"padding-right: 0px !important; width: auto !important; display: flex;\n    justify-content: center;\n    align-items: center;\">\n      <span class=\"mobileTitle\">Agriculutre</span>\n\n\n      <ul class=\"navbar-nav\">\n        <li class=\"nav-item nav-profile\" ngbDropdown>\n          <a class=\"nav-link\" ngbDropdownToggle id=\"profileDropdown\">\n            <img *ngIf=\"!userImg\" src=\"assets/images/profile.png\" width=\"30\" height=\"30\" alt=\"profile\">\n            <img data-toggle=\"tooltip\" *ngIf=\"userImg\" width=\"30\" height=\"30\" data-placement=\"bottom\" ngbTooltip=\"User\"\n              class=\"userimg\" [src]=\"'data:image/jpg;base64,'+userImg\" />\n          </a>\n          <div ngbDropdownMenu aria-labelledby=\"profileDropdown\">\n            <div class=\"dropdown-header d-flex flex-column align-items-center\">\n              <div class=\"figure mb-3\">\n                <img *ngIf=\"!userImg\" src=\"assets/images/executive.png\" alt=\"profile\">\n                <img data-toggle=\"tooltip\" *ngIf=\"userImg\" data-placement=\"bottom\" ngbTooltip=\"User\" class=\"userimg\"\n                  [src]=\"'data:image/jpg;base64,'+userImg\" />\n              </div>\n              <div class=\"info text-center\">\n                <p class=\"name font-weight-bold mb-0\">{{username}}</p>\n                <p>{{roleName}}</p>\n                <p class=\"email text-muted mb-3\">{{emailId}}</p>\n              </div>\n            </div>\n            <div class=\"dropdown-body\">\n              <ul class=\"profile-nav p-0 pt-3\">\n\n                <li class=\"nav-item\">\n                  <a (click)=\"onLogout($event)\" class=\"nav-link\">\n                    <i class=\"feather icon-log-out\"></i>\n                    <span>{{'Logout' | translate}}</span>\n                  </a>\n                </li>\n              </ul>\n            </div>\n          </div>\n        </li>\n      </ul>\n    </div>\n  </div>\n\n</nav>");

/***/ }),

/***/ "N9F3":
/*!*******************************************************************!*\
  !*** ./src/app/core/content-animate/content-animate.directive.ts ***!
  \*******************************************************************/
/*! exports provided: ContentAnimateDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentAnimateDirective", function() { return ContentAnimateDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/animations */ "R0Ic");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");

// Angular



/**
 * Page load animation
 */
var ContentAnimateDirective = /** @class */ (function () {
    function ContentAnimateDirective(el, router, animationBuilder) {
        this.el = el;
        this.router = router;
        this.animationBuilder = animationBuilder;
    }
    ContentAnimateDirective.prototype.ngOnInit = function () {
        var _this = this;
        // animate the content
        this.initAnimate();
        // animate page load
        this.events = this.router.events.subscribe(function (event) {
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_3__["NavigationEnd"]) {
                _this.player.play();
            }
        });
    };
    ContentAnimateDirective.prototype.ngOnDestroy = function () {
        this.events.unsubscribe();
        this.player.destroy();
    };
    /**
     * Animate page load
     */
    ContentAnimateDirective.prototype.initAnimate = function () {
        this.player = this.animationBuilder
            .build([
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ opacity: 0, transform: 'translateY(15px)' }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(500, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ opacity: 1, transform: 'translateY(0)' })),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'none' }),
        ])
            .create(this.el.nativeElement);
    };
    ContentAnimateDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _angular_animations__WEBPACK_IMPORTED_MODULE_2__["AnimationBuilder"] }
    ]; };
    ContentAnimateDirective = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: '[contentAnimate]'
        })
    ], ContentAnimateDirective);
    return ContentAnimateDirective;
}());



/***/ }),

/***/ "NA8d":
/*!*****************************************************************!*\
  !*** ./src/app/views/layout/directives/onlynumber.directive.ts ***!
  \*****************************************************************/
/*! exports provided: OnlyNumber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OnlyNumber", function() { return OnlyNumber; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


var OnlyNumber = /** @class */ (function () {
    function OnlyNumber(el) {
        this.el = el;
    }
    OnlyNumber.prototype.onKeyDown = function (event) {
        var e = event;
        if ([46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode === 65 && e.ctrlKey) ||
            // Allow: Ctrl+C
            (e.keyCode === 67 && e.ctrlKey) ||
            // Allow: Ctrl+X
            (e.keyCode === 88 && e.ctrlKey) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    };
    OnlyNumber.prototype.onMouseRightClick = function (event) {
        if (event.which === 3) {
            var e = event;
            e.preventDefault();
        }
    };
    OnlyNumber.prototype.onInputChange = function (event) {
        var initalValue = this.el.nativeElement.value;
        this.el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
        if (initalValue !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    };
    OnlyNumber.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] }
    ]; };
    OnlyNumber.propDecorators = {
        onKeyDown: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['keydown', ['$event'],] }],
        onMouseRightClick: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['contextmenu', ['$event'],] }],
        onInputChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['input', ['$event'],] }]
    };
    OnlyNumber = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            // tslint:disable-next-line:directive-selector
            selector: '[onlyNumber]'
        })
        // tslint:disable-next-line:directive-class-suffix
    ], OnlyNumber);
    return OnlyNumber;
}());



/***/ }),

/***/ "PwiY":
/*!*******************************************************!*\
  !*** ./src/app/views/layout/base/base.component.scss ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".page-content {\n  background-color: #FCFAFC;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcYmFzZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNDLHlCQUFBO0FBQ0QiLCJmaWxlIjoiYmFzZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5wYWdlLWNvbnRlbnQge1xuIGJhY2tncm91bmQtY29sb3I6ICNGQ0ZBRkM7XG59Il19 */");

/***/ }),

/***/ "RRVW":
/*!*****************************************************!*\
  !*** ./src/app/views/layout/base/base.component.ts ***!
  \*****************************************************/
/*! exports provided: BaseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseComponent", function() { return BaseComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_base_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./base.component.html */ "UbBy");
/* harmony import */ var _base_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base.component.scss */ "PwiY");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");





var BaseComponent = /** @class */ (function () {
    function BaseComponent(router) {
        var _this = this;
        this.router = router;
        router.events.forEach(function (event) {
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouteConfigLoadStart"]) {
                _this.isLoading = true;
            }
            else if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouteConfigLoadEnd"]) {
                _this.isLoading = false;
            }
        });
    }
    BaseComponent.prototype.ngOnInit = function () {
    };
    BaseComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }
    ]; };
    BaseComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-base',
            template: _raw_loader_base_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_base_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
        })
    ], BaseComponent);
    return BaseComponent;
}());



/***/ }),

/***/ "RnhZ":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "K/tc",
	"./af.js": "K/tc",
	"./ar": "jnO4",
	"./ar-dz": "o1bE",
	"./ar-dz.js": "o1bE",
	"./ar-kw": "Qj4J",
	"./ar-kw.js": "Qj4J",
	"./ar-ly": "HP3h",
	"./ar-ly.js": "HP3h",
	"./ar-ma": "CoRJ",
	"./ar-ma.js": "CoRJ",
	"./ar-sa": "gjCT",
	"./ar-sa.js": "gjCT",
	"./ar-tn": "bYM6",
	"./ar-tn.js": "bYM6",
	"./ar.js": "jnO4",
	"./az": "SFxW",
	"./az.js": "SFxW",
	"./be": "H8ED",
	"./be.js": "H8ED",
	"./bg": "hKrs",
	"./bg.js": "hKrs",
	"./bm": "p/rL",
	"./bm.js": "p/rL",
	"./bn": "kEOa",
	"./bn-bd": "loYQ",
	"./bn-bd.js": "loYQ",
	"./bn.js": "kEOa",
	"./bo": "0mo+",
	"./bo.js": "0mo+",
	"./br": "aIdf",
	"./br.js": "aIdf",
	"./bs": "JVSJ",
	"./bs.js": "JVSJ",
	"./ca": "1xZ4",
	"./ca.js": "1xZ4",
	"./cs": "PA2r",
	"./cs.js": "PA2r",
	"./cv": "A+xa",
	"./cv.js": "A+xa",
	"./cy": "l5ep",
	"./cy.js": "l5ep",
	"./da": "DxQv",
	"./da.js": "DxQv",
	"./de": "tGlX",
	"./de-at": "s+uk",
	"./de-at.js": "s+uk",
	"./de-ch": "u3GI",
	"./de-ch.js": "u3GI",
	"./de.js": "tGlX",
	"./dv": "WYrj",
	"./dv.js": "WYrj",
	"./el": "jUeY",
	"./el.js": "jUeY",
	"./en-au": "Dmvi",
	"./en-au.js": "Dmvi",
	"./en-ca": "OIYi",
	"./en-ca.js": "OIYi",
	"./en-gb": "Oaa7",
	"./en-gb.js": "Oaa7",
	"./en-ie": "4dOw",
	"./en-ie.js": "4dOw",
	"./en-il": "czMo",
	"./en-il.js": "czMo",
	"./en-in": "7C5Q",
	"./en-in.js": "7C5Q",
	"./en-nz": "b1Dy",
	"./en-nz.js": "b1Dy",
	"./en-sg": "t+mt",
	"./en-sg.js": "t+mt",
	"./eo": "Zduo",
	"./eo.js": "Zduo",
	"./es": "iYuL",
	"./es-do": "CjzT",
	"./es-do.js": "CjzT",
	"./es-mx": "tbfe",
	"./es-mx.js": "tbfe",
	"./es-us": "Vclq",
	"./es-us.js": "Vclq",
	"./es.js": "iYuL",
	"./et": "7BjC",
	"./et.js": "7BjC",
	"./eu": "D/JM",
	"./eu.js": "D/JM",
	"./fa": "jfSC",
	"./fa.js": "jfSC",
	"./fi": "gekB",
	"./fi.js": "gekB",
	"./fil": "1ppg",
	"./fil.js": "1ppg",
	"./fo": "ByF4",
	"./fo.js": "ByF4",
	"./fr": "nyYc",
	"./fr-ca": "2fjn",
	"./fr-ca.js": "2fjn",
	"./fr-ch": "Dkky",
	"./fr-ch.js": "Dkky",
	"./fr.js": "nyYc",
	"./fy": "cRix",
	"./fy.js": "cRix",
	"./ga": "USCx",
	"./ga.js": "USCx",
	"./gd": "9rRi",
	"./gd.js": "9rRi",
	"./gl": "iEDd",
	"./gl.js": "iEDd",
	"./gom-deva": "qvJo",
	"./gom-deva.js": "qvJo",
	"./gom-latn": "DKr+",
	"./gom-latn.js": "DKr+",
	"./gu": "4MV3",
	"./gu.js": "4MV3",
	"./he": "x6pH",
	"./he.js": "x6pH",
	"./hi": "3E1r",
	"./hi.js": "3E1r",
	"./hr": "S6ln",
	"./hr.js": "S6ln",
	"./hu": "WxRl",
	"./hu.js": "WxRl",
	"./hy-am": "1rYy",
	"./hy-am.js": "1rYy",
	"./id": "UDhR",
	"./id.js": "UDhR",
	"./is": "BVg3",
	"./is.js": "BVg3",
	"./it": "bpih",
	"./it-ch": "bxKX",
	"./it-ch.js": "bxKX",
	"./it.js": "bpih",
	"./ja": "B55N",
	"./ja.js": "B55N",
	"./jv": "tUCv",
	"./jv.js": "tUCv",
	"./ka": "IBtZ",
	"./ka.js": "IBtZ",
	"./kk": "bXm7",
	"./kk.js": "bXm7",
	"./km": "6B0Y",
	"./km.js": "6B0Y",
	"./kn": "PpIw",
	"./kn.js": "PpIw",
	"./ko": "Ivi+",
	"./ko.js": "Ivi+",
	"./ku": "JCF/",
	"./ku.js": "JCF/",
	"./ky": "lgnt",
	"./ky.js": "lgnt",
	"./lb": "RAwQ",
	"./lb.js": "RAwQ",
	"./lo": "sp3z",
	"./lo.js": "sp3z",
	"./lt": "JvlW",
	"./lt.js": "JvlW",
	"./lv": "uXwI",
	"./lv.js": "uXwI",
	"./me": "KTz0",
	"./me.js": "KTz0",
	"./mi": "aIsn",
	"./mi.js": "aIsn",
	"./mk": "aQkU",
	"./mk.js": "aQkU",
	"./ml": "AvvY",
	"./ml.js": "AvvY",
	"./mn": "lYtQ",
	"./mn.js": "lYtQ",
	"./mr": "Ob0Z",
	"./mr.js": "Ob0Z",
	"./ms": "6+QB",
	"./ms-my": "ZAMP",
	"./ms-my.js": "ZAMP",
	"./ms.js": "6+QB",
	"./mt": "G0Uy",
	"./mt.js": "G0Uy",
	"./my": "honF",
	"./my.js": "honF",
	"./nb": "bOMt",
	"./nb.js": "bOMt",
	"./ne": "OjkT",
	"./ne.js": "OjkT",
	"./nl": "+s0g",
	"./nl-be": "2ykv",
	"./nl-be.js": "2ykv",
	"./nl.js": "+s0g",
	"./nn": "uEye",
	"./nn.js": "uEye",
	"./oc-lnc": "Fnuy",
	"./oc-lnc.js": "Fnuy",
	"./pa-in": "8/+R",
	"./pa-in.js": "8/+R",
	"./pl": "jVdC",
	"./pl.js": "jVdC",
	"./pt": "8mBD",
	"./pt-br": "0tRk",
	"./pt-br.js": "0tRk",
	"./pt.js": "8mBD",
	"./ro": "lyxo",
	"./ro.js": "lyxo",
	"./ru": "lXzo",
	"./ru.js": "lXzo",
	"./sd": "Z4QM",
	"./sd.js": "Z4QM",
	"./se": "//9w",
	"./se.js": "//9w",
	"./si": "7aV9",
	"./si.js": "7aV9",
	"./sk": "e+ae",
	"./sk.js": "e+ae",
	"./sl": "gVVK",
	"./sl.js": "gVVK",
	"./sq": "yPMs",
	"./sq.js": "yPMs",
	"./sr": "zx6S",
	"./sr-cyrl": "E+lV",
	"./sr-cyrl.js": "E+lV",
	"./sr.js": "zx6S",
	"./ss": "Ur1D",
	"./ss.js": "Ur1D",
	"./sv": "X709",
	"./sv.js": "X709",
	"./sw": "dNwA",
	"./sw.js": "dNwA",
	"./ta": "PeUW",
	"./ta.js": "PeUW",
	"./te": "XLvN",
	"./te.js": "XLvN",
	"./tet": "V2x9",
	"./tet.js": "V2x9",
	"./tg": "Oxv6",
	"./tg.js": "Oxv6",
	"./th": "EOgW",
	"./th.js": "EOgW",
	"./tk": "Wv91",
	"./tk.js": "Wv91",
	"./tl-ph": "Dzi0",
	"./tl-ph.js": "Dzi0",
	"./tlh": "z3Vd",
	"./tlh.js": "z3Vd",
	"./tr": "DoHr",
	"./tr.js": "DoHr",
	"./tzl": "z1FC",
	"./tzl.js": "z1FC",
	"./tzm": "wQk9",
	"./tzm-latn": "tT3J",
	"./tzm-latn.js": "tT3J",
	"./tzm.js": "wQk9",
	"./ug-cn": "YRex",
	"./ug-cn.js": "YRex",
	"./uk": "raLr",
	"./uk.js": "raLr",
	"./ur": "UpQW",
	"./ur.js": "UpQW",
	"./uz": "Loxo",
	"./uz-latn": "AQ68",
	"./uz-latn.js": "AQ68",
	"./uz.js": "Loxo",
	"./vi": "KSF8",
	"./vi.js": "KSF8",
	"./x-pseudo": "/X5v",
	"./x-pseudo.js": "/X5v",
	"./yo": "fzPg",
	"./yo.js": "fzPg",
	"./zh-cn": "XDpg",
	"./zh-cn.js": "XDpg",
	"./zh-hk": "SatO",
	"./zh-hk.js": "SatO",
	"./zh-mo": "OmwH",
	"./zh-mo.js": "OmwH",
	"./zh-tw": "kOpN",
	"./zh-tw.js": "kOpN"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "RnhZ";

/***/ }),

/***/ "SNw6":
/*!*********************************************************!*\
  !*** ./src/app/views/layout/navbar/navbar.component.ts ***!
  \*********************************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_navbar_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./navbar.component.html */ "Ln4N");
/* harmony import */ var _navbar_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./navbar.component.scss */ "YEnQ");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_services_usersession_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/usersession.service */ "K0zP");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! sweetalert2 */ "PSD3");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var src_app_services_navigation_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/navigation.service */ "+NYR");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _changepassword_changepassword_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../changepassword/changepassword.component */ "yCcV");
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/services/user.service */ "qfBg");
/* harmony import */ var src_enum_roletype__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/enum/roletype */ "lOv1");
/* harmony import */ var src_app_services_authentication_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/services/authentication.service */ "ej43");
/* harmony import */ var src_app_services_dashboard_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/services/dashboard.service */ "0AbP");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! moment */ "wd/R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_17__);


















var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(document, translate, userSessionService, authService, navigationService, router, dialog, userService, dashboardService, formBuilder) {
        this.document = document;
        this.translate = translate;
        this.userSessionService = userSessionService;
        this.authService = authService;
        this.navigationService = navigationService;
        this.router = router;
        this.dialog = dialog;
        this.userService = userService;
        this.dashboardService = dashboardService;
        this.formBuilder = formBuilder;
        this.RoleEnumType = src_enum_roletype__WEBPACK_IMPORTED_MODULE_13__["RoleType"];
        this.districtId = 0;
        this.blockId = 0;
        var browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|ta|tl|de|af/) ? browserLang : 'en');
        this.languageType = userSessionService.getLanguageType();
        this.userId = userSessionService.userId();
        this.emailId = userSessionService.getEmail();
        this.roleId = this.userSessionService.roleId();
        this.currentDate = moment__WEBPACK_IMPORTED_MODULE_17__(new Date()).format('YYYY-MM-DD');
    }
    NavbarComponent.prototype.ngOnInit = function () {
        this.initializeValidators();
        this.username = this.userSessionService.getUserName();
        this.roleName = this.userSessionService.roleName();
        // this.getLanguage();
        this.getUserImg(true);
        // this.currentDate = moment(new Date()).format('YYYY-MM-DD');
        // this.form.controls['date'].setValue(this.currentDate);
        this.todayDate = moment__WEBPACK_IMPORTED_MODULE_17__(new Date()).format('dddd');
        // this.updateDistrict(0);
        // this.updateBlock(0);
        // this.updateDate(this.currentDate);
    };
    NavbarComponent.prototype.initializeValidators = function () {
        // this.form = this.formBuilder.group({
        //   districtId: [0],
        //   blockId: [0],
        //   date: ['']
        // });
    };
    NavbarComponent.prototype.getUserImg = function (refresh) {
        // this.userService.getById(this.userId, refresh).subscribe(result => {
        //   this.userdata = result;
        //   this.userImg = result.userPhoto;
        // });
    };
    NavbarComponent.prototype.updateParam = function () {
        var urls = this.router.url.split('?');
        var url2 = this.router.url.split('/');
        if (url2.length === 2) {
            this.router.navigate([urls[0]], {
                queryParams: { data: new Date().getTime() }
            });
        }
    };
    /**
     * Sidebar toggle on hamburger button click
     */
    NavbarComponent.prototype.toggleSidebar = function (e) {
        e.preventDefault();
        this.document.body.classList.toggle('sidebar-open');
    };
    /**
     * Logout
     */
    NavbarComponent.prototype.onLogout = function (e) {
        var _this = this;
        e.preventDefault();
        var title = this.translate.instant('LogoutConfirmation');
        var txt = this.translate.instant('Youwanttologout');
        var Yes = this.translate.instant('Yes');
        var No = this.translate.instant('No');
        sweetalert2__WEBPACK_IMPORTED_MODULE_7___default.a.fire({
            title: title,
            text: txt,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: Yes,
            cancelButtonText: No,
        }).then(function (result) {
            if (result.value) {
                var data = {
                    userId: _this.userId,
                };
                _this.userService.logout(data).subscribe(function (res) {
                    _this.navigationService.goToLogin();
                    _this.authService.logOut();
                });
            }
        });
    };
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
    NavbarComponent.prototype.openMyProfile = function () {
        var myuserId = this.userSessionService.userId();
        this.user_url = '/user/' + myuserId;
        this.navigationService.goToProfile(myuserId, 0);
    };
    NavbarComponent.prototype.openChangePasswordDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_changepassword_changepassword_component__WEBPACK_IMPORTED_MODULE_11__["ChangepasswordComponent"], {
            autoFocus: false,
            disableClose: true,
            panelClass: 'mat-dialog'
        });
        dialogRef.afterClosed().subscribe(function (data) {
            _this.authService.logOut();
            _this.navigationService.goToLogin();
        });
    };
    NavbarComponent.prototype.getLookupDistrict = function (refresh) {
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
    };
    NavbarComponent.prototype.districtChange = function (event) {
        // this.getLookupBlock(this.form.value.districtId);
        // this.districtId = this.form.value.districtId;
        // this.blockId = 0;
        // this.form.controls["blockId"].setValue(0);
        // this.updateDistrict(this.form.value.districtId);
        // this.updateBlock(0);
    };
    NavbarComponent.prototype.getLookupBlock = function (id) {
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
    };
    NavbarComponent.prototype.getDate = function (event) {
        // this.updateDate(event);
    };
    NavbarComponent.prototype.blockChange = function () {
        // this.blockId = this.form.value.blockId;
        // this.updateBlock(this.form.value.blockId);
    };
    NavbarComponent.ctorParameters = function () { return [
        { type: Document, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["DOCUMENT"],] }] },
        { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateService"] },
        { type: src_app_services_usersession_service__WEBPACK_IMPORTED_MODULE_6__["UserSessionService"] },
        { type: src_app_services_authentication_service__WEBPACK_IMPORTED_MODULE_14__["AuthenticationService"] },
        { type: src_app_services_navigation_service__WEBPACK_IMPORTED_MODULE_9__["NavigationService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__["MatDialog"] },
        { type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_12__["UserService"] },
        { type: src_app_services_dashboard_service__WEBPACK_IMPORTED_MODULE_15__["DashboardService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_16__["FormBuilder"] }
    ]; };
    NavbarComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-navbar',
            template: _raw_loader_navbar_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_navbar_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
        })
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_app_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./app.component.html */ "VzVu");
/* harmony import */ var _app_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component.scss */ "ynWL");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var ng_pick_datetime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng-pick-datetime */ "z17N");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/environments/environment */ "AytR");







var AppComponent = /** @class */ (function () {
    function AppComponent(dateTimeAdapter, router) {
        this.router = router;
        this.title = 'CM BFS';
        this.validinput = /^[^\s]+(\s+[^\s]+)*$/;
        dateTimeAdapter.setLocale('en-in');
    }
    AppComponent.prototype.ngOnInit = function () {
        if (src_environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].production) {
            if (location.protocol !== 'https:') {
                location.replace("https:" + location.href.substring(location.protocol.length));
            }
        }
        this.router.events.subscribe(function (e) {
            if (e instanceof _angular_router__WEBPACK_IMPORTED_MODULE_4__["NavigationEnd"]) {
                if (e.url === '/monthlyreport'
                    || e.url.startsWith('/users/')
                    || e.url.startsWith('/dashboard')) {
                    document.body.classList.add('removeglobalfilter');
                }
                else {
                    document.body.classList.remove('removeglobalfilter');
                }
            }
        });
    };
    AppComponent.prototype.clearAllData = function () {
    };
    AppComponent.ctorParameters = function () { return [
        { type: ng_pick_datetime__WEBPACK_IMPORTED_MODULE_5__["DateTimeAdapter"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }
    ]; };
    AppComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-root',
            template: _raw_loader_app_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_app_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "TSfr":
/*!*******************************************!*\
  !*** ./src/app/services/notifyService.ts ***!
  \*******************************************/
/*! exports provided: NotifyService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotifyService", function() { return NotifyService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");



var NotifyService = /** @class */ (function () {
    function NotifyService() {
        this.invokeFirstComponentFunction = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        // onFirstComponentButtonClick() {
        //   this.invokeFirstComponentFunction.emit();
        // }
        this.emitChangeSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.clientId$ = this.emitChangeSource.asObservable();
        this.clientName$ = this.emitChangeSource.asObservable();
        this.languageTpe$ = this.emitChangeSource.asObservable();
        this.regionId$ = this.emitChangeSource.asObservable();
    }
    NotifyService.prototype.emitChange = function (change) {
        this.emitChangeSource.next(change);
    };
    NotifyService.prototype.emitChange2 = function (change) {
        this.emitChangeSource.next(change);
    };
    NotifyService.prototype.emitChange3 = function (change) {
        this.emitChangeSource.next(change);
    };
    NotifyService.prototype.emitChange4 = function (change) {
        this.emitChangeSource.next(change);
    };
    NotifyService.ctorParameters = function () { return []; };
    NotifyService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
    ], NotifyService);
    return NotifyService;
}());



/***/ }),

/***/ "UbBy":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/layout/base/base.component.html ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"main-wrapper\">\n\n  <!-- partial:sidebar -->\n  <app-sidebar></app-sidebar>\n  <!-- partial -->\n\n  <div class=\"page-wrapper\">\n\n    <!-- partial:navbar -->\n    <app-navbar></app-navbar>\n    <!-- partial -->\n\n    <div class=\"page-content\">\n\n      <!-- Spinner for lazyload modules -->\n      <div *ngIf=\"isLoading\" class=\"spinner-wrapper\">\n        <div class=\"spinner\">Loading...</div>\n      </div>\n\n      <div contentAnimate *ngIf=\"!isLoading\">\n        <router-outlet></router-outlet>\n      </div>\n\n    </div>\n\n    <!-- partial:footer -->\n    <app-footer></app-footer>\n    <!-- partial -->\n\n  </div>\n\n\n</div>");

/***/ }),

/***/ "VKDu":
/*!*********************************************************!*\
  !*** ./src/app/views/layout/footer/footer.component.ts ***!
  \*********************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_footer_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./footer.component.html */ "Efog");
/* harmony import */ var _footer_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./footer.component.scss */ "m9CH");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/user.service */ "qfBg");





var FooterComponent = /** @class */ (function () {
    function FooterComponent(userService) {
        this.userService = userService;
        this.currentYear = new Date().getFullYear();
    }
    FooterComponent.prototype.ngOnInit = function () {
        this.getAppVersion(true);
    };
    FooterComponent.prototype.getAppVersion = function (refresh) {
        // this.userService.getAppVersion(3, true).subscribe(result => {
        //   if (result) {
        //     this.appVersion = result;
        //   }
        // });
    };
    FooterComponent.ctorParameters = function () { return [
        { type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"] }
    ]; };
    FooterComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-footer',
            template: _raw_loader_footer_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_footer_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
        })
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "VzVu":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<router-outlet></router-outlet>\n<!-- <ng-http-loader> </ng-http-loader> -->\n<div (window:beforeunload)=\"clearAllData()\"></div>");

/***/ }),

/***/ "YEnQ":
/*!***********************************************************!*\
  !*** ./src/app/views/layout/navbar/navbar.component.scss ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".custom_sec {\n  max-width: 100%;\n  width: 100%;\n  display: block;\n  padding: 0 1%;\n}\n\n.profile_sec {\n  margin: 0;\n  padding: 0;\n  width: 100%;\n}\n\n.toggleclass::after {\n  display: none !important;\n}\n\nli {\n  list-style: none;\n}\n\nli,\na:after {\n  content: none !important;\n}\n\n.profile_sec li {\n  list-style: none;\n  flex: 1;\n}\n\nli.nav-profile {\n  position: relative !important;\n}\n\n.dropdown-menu.show {\n  right: 0;\n  left: auto;\n}\n\n.custom_sec .profile_sec .profile_drop img {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  padding: 3px;\n}\n\n.custom_sec .profile_sec img {\n  border-radius: 50%;\n  padding: 3px;\n}\n\n.custom_sec .nav-link {\n  display: flex;\n  align-items: center;\n  margin-left: 0;\n  margin-right: 0;\n  color: #383838;\n  transition: color 0.2s ease-in-out;\n  padding: 4px 5px;\n}\n\n.custom_sec .nav-link i {\n  margin-right: 6px;\n}\n\n.justify {\n  justify-content: flex-end;\n}\n\n@media only screen and (max-width: 575px) {\n  .custom_sec {\n    max-width: 100%;\n    width: 100%;\n    display: block;\n    padding: 0 1%;\n    margin: 2%;\n  }\n\n  .custom_sec li {\n    margin: 10px 0px;\n  }\n\n  .form_drop {\n    left: auto !important;\n    right: 0 !important;\n  }\n\n  li.nav-profile {\n    position: relative !important;\n  }\n}\n\n@media only screen and (max-width: 480px) {\n  .custom_mobile_sec {\n    width: 80%;\n  }\n\n  ngx-select-dropdown {\n    width: 160px;\n  }\n\n  .custom_mobile_sec .navbar-content {\n    padding-left: 0;\n  }\n\n  .form_drop {\n    left: 20% !important;\n    right: auto !important;\n  }\n\n  li.nav-profile {\n    position: static !important;\n  }\n}\n\n@media only screen and (max-width: 400px) {\n  .custom_mobile_sec {\n    width: 76%;\n  }\n\n  ngx-select-dropdown {\n    width: 160px;\n  }\n\n  .custom_mobile_sec .navbar-content {\n    padding-left: 0;\n  }\n}\n\n.indicator .circle::before,\n.pulse {\n  -webkit-animation-name: pulse;\n  animation-name: pulse;\n  -webkit-animation-duration: 0.9s;\n  animation-duration: 0.9s;\n  -webkit-animation-iteration-count: infinite;\n  animation-iteration-count: infinite;\n  -webkit-animation-timing-function: ease-out;\n  animation-timing-function: ease-out;\n}\n\n@media only screen and (min-width: 320px) and (max-width: 480px) {\n  .swal2-popup {\n    width: 230px !important;\n  }\n}\n\n.imgwid {\n  max-width: 45%;\n}\n\n.pointer {\n  text-align: end;\n}\n\n.nowrap {\n  white-space: nowrap;\n}\n\n.usertext {\n  align-self: center;\n  padding: 0px 0px 0px 15px;\n  text-align: right;\n}\n\n.padding_left {\n  padding-left: 35px;\n}\n\n.userimage {\n  align-self: center;\n}\n\n.todayDate {\n  align-self: center;\n  text-align: left;\n}\n\n.fontColor {\n  color: black;\n  font-weight: bold;\n  font-size: 24px;\n}\n\n.fontColor1 {\n  color: #1C2B47;\n  font-size: 15px;\n}\n\n.formPadd {\n  padding-top: 18px;\n}\n\n.mobileTitle {\n  color: #1C2B47;\n  position: absolute;\n  left: 90px;\n  top: 34% px;\n  font-size: 24px;\n  font-weight: bold;\n  text-align: center;\n  padding-right: 42px;\n}\n\n@media only screen and (max-width: 750px) {\n  .mobileTitle {\n    font-size: 20px;\n  }\n}\n\n@media only screen and (max-width: 560px) {\n  .mobileTitle {\n    font-size: 18px;\n  }\n}\n\n@media only screen and (max-width: 428px) {\n  .mobileTitle {\n    font-size: 16px;\n  }\n}\n\n@media only screen and (max-width: 360px) {\n  .mobileTitle {\n    font-size: 12px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcbmF2YmFyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBQTtFQUNBLFdBQUE7RUFDQSxjQUFBO0VBQ0EsYUFBQTtBQUNKOztBQUVBO0VBQ0ksU0FBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0FBQ0o7O0FBRUE7RUFDSSx3QkFBQTtBQUNKOztBQUVBO0VBQ0ksZ0JBQUE7QUFDSjs7QUFFQTs7RUFFSSx3QkFBQTtBQUNKOztBQU9BO0VBQ0ksZ0JBQUE7RUFDQSxPQUFBO0FBSko7O0FBT0E7RUFDSSw2QkFBQTtBQUpKOztBQU9BO0VBQ0ksUUFBQTtFQUNBLFVBQUE7QUFKSjs7QUFPQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0FBSko7O0FBT0E7RUFDSSxrQkFBQTtFQUNBLFlBQUE7QUFKSjs7QUFPQTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtFQUNBLGtDQUFBO0VBQ0EsZ0JBQUE7QUFKSjs7QUFPQTtFQUNJLGlCQUFBO0FBSko7O0FBT0E7RUFDSSx5QkFBQTtBQUpKOztBQU9BO0VBQ0k7SUFDSSxlQUFBO0lBQ0EsV0FBQTtJQUNBLGNBQUE7SUFDQSxhQUFBO0lBQ0EsVUFBQTtFQUpOOztFQU9FO0lBQ0ksZ0JBQUE7RUFKTjs7RUFPRTtJQUNJLHFCQUFBO0lBQ0EsbUJBQUE7RUFKTjs7RUFPRTtJQUNJLDZCQUFBO0VBSk47QUFDRjs7QUFRQTtFQUNJO0lBQ0ksVUFBQTtFQU5OOztFQVNFO0lBQ0ksWUFBQTtFQU5OOztFQVNFO0lBQ0ksZUFBQTtFQU5OOztFQVNFO0lBQ0ksb0JBQUE7SUFDQSxzQkFBQTtFQU5OOztFQVNFO0lBQ0ksMkJBQUE7RUFOTjtBQUNGOztBQVVBO0VBQ0k7SUFDSSxVQUFBO0VBUk47O0VBV0U7SUFDSSxZQUFBO0VBUk47O0VBV0U7SUFDSSxlQUFBO0VBUk47QUFDRjs7QUFZQTs7RUFFSSw2QkFBQTtFQUNBLHFCQUFBO0VBQ0EsZ0NBQUE7RUFDQSx3QkFBQTtFQUNBLDJDQUFBO0VBQ0EsbUNBQUE7RUFDQSwyQ0FBQTtFQUNBLG1DQUFBO0FBVko7O0FBY0E7RUFFSTtJQUNJLHVCQUFBO0VBWk47QUFDRjs7QUFlQTtFQUlJLGNBQUE7QUFoQko7O0FBbUJBO0VBQ0ksZUFBQTtBQWhCSjs7QUFtQkE7RUFDSSxtQkFBQTtBQWhCSjs7QUFtQkE7RUFDSSxrQkFBQTtFQUNBLHlCQUFBO0VBQ0EsaUJBQUE7QUFoQko7O0FBbUJBO0VBQ0ksa0JBQUE7QUFoQko7O0FBbUJBO0VBQ0ksa0JBQUE7QUFoQko7O0FBbUJBO0VBQ0ksa0JBQUE7RUFDQSxnQkFBQTtBQWhCSjs7QUFtQkE7RUFDSSxZQUFBO0VBQ0EsaUJBQUE7RUFFQSxlQUFBO0FBakJKOztBQW9CQTtFQUNJLGNBQUE7RUFDQSxlQUFBO0FBakJKOztBQW9CQTtFQUNJLGlCQUFBO0FBakJKOztBQW9CQTtFQUNJLGNBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtBQWpCSjs7QUFtQkk7RUFWSjtJQVlRLGVBQUE7RUFqQk47QUFDRjs7QUFtQkk7RUFmSjtJQWlCUSxlQUFBO0VBakJOO0FBQ0Y7O0FBc0JJO0VBdkJKO0lBeUJRLGVBQUE7RUFwQk47QUFDRjs7QUFxQkk7RUEzQko7SUE2QlEsZUFBQTtFQW5CTjtBQUNGIiwiZmlsZSI6Im5hdmJhci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jdXN0b21fc2VjIHtcbiAgICBtYXgtd2lkdGg6IDEwMCU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgcGFkZGluZzogMCAxJTtcbn1cblxuLnByb2ZpbGVfc2VjIHtcbiAgICBtYXJnaW46IDA7XG4gICAgcGFkZGluZzogMDtcbiAgICB3aWR0aDogMTAwJTtcbn1cblxuLnRvZ2dsZWNsYXNzOjphZnRlciB7XG4gICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xufVxuXG5saSB7XG4gICAgbGlzdC1zdHlsZTogbm9uZTtcbn1cblxubGksXG5hOmFmdGVyIHtcbiAgICBjb250ZW50OiBub25lICFpbXBvcnRhbnQ7XG59XG5cbi8vICBhOjphZnRlclxuLy8gIHtcbi8vICAgICAgY29udGVudDogbm9uZTtcbi8vICB9XG5cbi5wcm9maWxlX3NlYyBsaSB7XG4gICAgbGlzdC1zdHlsZTogbm9uZTtcbiAgICBmbGV4OiAxO1xufVxuXG5saS5uYXYtcHJvZmlsZSB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlICFpbXBvcnRhbnQ7XG59XG5cbi5kcm9wZG93bi1tZW51LnNob3cge1xuICAgIHJpZ2h0OiAwO1xuICAgIGxlZnQ6IGF1dG87XG59XG5cbi5jdXN0b21fc2VjIC5wcm9maWxlX3NlYyAucHJvZmlsZV9kcm9wIGltZyB7XG4gICAgd2lkdGg6IDgwcHg7XG4gICAgaGVpZ2h0OiA4MHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBwYWRkaW5nOiAzcHg7XG59XG5cbi5jdXN0b21fc2VjIC5wcm9maWxlX3NlYyBpbWcge1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBwYWRkaW5nOiAzcHg7XG59XG5cbi5jdXN0b21fc2VjIC5uYXYtbGluayB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIG1hcmdpbi1sZWZ0OiAwO1xuICAgIG1hcmdpbi1yaWdodDogMDtcbiAgICBjb2xvcjogIzM4MzgzODtcbiAgICB0cmFuc2l0aW9uOiBjb2xvciAuMnMgZWFzZS1pbi1vdXQ7XG4gICAgcGFkZGluZzogNHB4IDVweDtcbn1cblxuLmN1c3RvbV9zZWMgLm5hdi1saW5rIGkge1xuICAgIG1hcmdpbi1yaWdodDogNnB4O1xufVxuXG4uanVzdGlmeSB7XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbn1cblxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZChtYXgtd2lkdGg6NTc1cHgpIHtcbiAgICAuY3VzdG9tX3NlYyB7XG4gICAgICAgIG1heC13aWR0aDogMTAwJTtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBwYWRkaW5nOiAwIDElO1xuICAgICAgICBtYXJnaW46IDIlO1xuICAgIH1cblxuICAgIC5jdXN0b21fc2VjIGxpIHtcbiAgICAgICAgbWFyZ2luOiAxMHB4IDBweDtcbiAgICB9XG5cbiAgICAuZm9ybV9kcm9wIHtcbiAgICAgICAgbGVmdDogYXV0byAhaW1wb3J0YW50O1xuICAgICAgICByaWdodDogMCAhaW1wb3J0YW50O1xuICAgIH1cblxuICAgIGxpLm5hdi1wcm9maWxlIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlICFpbXBvcnRhbnQ7XG4gICAgfVxufVxuXG5cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQobWF4LXdpZHRoOjQ4MHB4KSB7XG4gICAgLmN1c3RvbV9tb2JpbGVfc2VjIHtcbiAgICAgICAgd2lkdGg6IDgwJTtcbiAgICB9XG5cbiAgICBuZ3gtc2VsZWN0LWRyb3Bkb3duIHtcbiAgICAgICAgd2lkdGg6IDE2MHB4O1xuICAgIH1cblxuICAgIC5jdXN0b21fbW9iaWxlX3NlYyAubmF2YmFyLWNvbnRlbnQge1xuICAgICAgICBwYWRkaW5nLWxlZnQ6IDA7XG4gICAgfVxuXG4gICAgLmZvcm1fZHJvcCB7XG4gICAgICAgIGxlZnQ6IDIwJSAhaW1wb3J0YW50O1xuICAgICAgICByaWdodDogYXV0byAhaW1wb3J0YW50O1xuICAgIH1cblxuICAgIGxpLm5hdi1wcm9maWxlIHtcbiAgICAgICAgcG9zaXRpb246IHN0YXRpYyAhaW1wb3J0YW50O1xuICAgIH1cblxufVxuXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kKG1heC13aWR0aDo0MDBweCkge1xuICAgIC5jdXN0b21fbW9iaWxlX3NlYyB7XG4gICAgICAgIHdpZHRoOiA3NiU7XG4gICAgfVxuXG4gICAgbmd4LXNlbGVjdC1kcm9wZG93biB7XG4gICAgICAgIHdpZHRoOiAxNjBweDtcbiAgICB9XG5cbiAgICAuY3VzdG9tX21vYmlsZV9zZWMgLm5hdmJhci1jb250ZW50IHtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAwO1xuICAgIH1cblxufVxuXG4uaW5kaWNhdG9yIC5jaXJjbGU6OmJlZm9yZSxcbi5wdWxzZSB7XG4gICAgLXdlYmtpdC1hbmltYXRpb24tbmFtZTogcHVsc2U7XG4gICAgYW5pbWF0aW9uLW5hbWU6IHB1bHNlO1xuICAgIC13ZWJraXQtYW5pbWF0aW9uLWR1cmF0aW9uOiAuOXM7XG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAuOXM7XG4gICAgLXdlYmtpdC1hbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcbiAgICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcbiAgICAtd2Via2l0LWFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2Utb3V0O1xuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2Utb3V0O1xufVxuXG5cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aCA6IDMyMHB4KSBhbmQgKG1heC13aWR0aCA6IDQ4MHB4KSB7XG5cbiAgICAuc3dhbDItcG9wdXAge1xuICAgICAgICB3aWR0aDogMjMwcHggIWltcG9ydGFudDtcbiAgICB9XG59XG5cbi5pbWd3aWQge1xuICAgIC8vIHdpZHRoOiA2MHB4O1xuICAgIC8vIHdpZHRoOiAxMDAlO1xuICAgIC8vIG1heC13aWR0aDogNzAlO1xuICAgIG1heC13aWR0aDogNDUlO1xufVxuXG4ucG9pbnRlciB7XG4gICAgdGV4dC1hbGlnbjogZW5kO1xufVxuXG4ubm93cmFwIHtcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuXG4udXNlcnRleHQge1xuICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcbiAgICBwYWRkaW5nOiAwcHggMHB4IDBweCAxNXB4O1xuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xufVxuXG4ucGFkZGluZ19sZWZ0IHtcbiAgICBwYWRkaW5nLWxlZnQ6IDM1cHg7XG59XG5cbi51c2VyaW1hZ2Uge1xuICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcbn1cblxuLnRvZGF5RGF0ZSB7XG4gICAgYWxpZ24tc2VsZjogY2VudGVyO1xuICAgIHRleHQtYWxpZ246IGxlZnQ7XG59XG5cbi5mb250Q29sb3Ige1xuICAgIGNvbG9yOmJsYWNrO1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIC8vIGZvbnQtc2l6ZTogMTVweDtcbiAgICBmb250LXNpemU6IDI0cHg7XG59XG5cbi5mb250Q29sb3IxIHtcbiAgICBjb2xvcjogIzFDMkI0NztcbiAgICBmb250LXNpemU6IDE1cHg7XG59XG5cbi5mb3JtUGFkZCB7XG4gICAgcGFkZGluZy10b3A6IDE4cHg7XG59XG5cbi5tb2JpbGVUaXRsZSB7XG4gICAgY29sb3I6ICMxQzJCNDc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IDkwcHg7XG4gICAgdG9wOiAzNCVweDtcbiAgICBmb250LXNpemU6IDI0cHg7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHBhZGRpbmctcmlnaHQ6IDQycHg7XG5cbiAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kKG1heC13aWR0aDo3NTBweCkge1xuICAgICAgICAvLyB0b3A6IDMwJTtcbiAgICAgICAgZm9udC1zaXplOiAyMHB4O1xuICAgIH1cblxuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQobWF4LXdpZHRoOjU2MHB4KSB7XG4gICAgICAgIC8vIHRvcDogMTIlO1xuICAgICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgfVxuICAgIC8vIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQobWF4LXdpZHRoOjUyMHB4KSB7XG4gICAgLy8gICAgIHRvcDogMTYlO1xuICAgIC8vICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgLy8gfVxuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQobWF4LXdpZHRoOjQyOHB4KSB7XG4gICAgICAgIC8vIHRvcDogMTYlO1xuICAgICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgfVxuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQobWF4LXdpZHRoOjM2MHB4KSB7XG4gICAgICAgIC8vIHRvcDogMTUlO1xuICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgfVxufVxuXG4iXX0= */");

/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: createTranslateLoader, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTranslateLoader", function() { return createTranslateLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _views_layout_layout_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./views/layout/layout.module */ "1pOu");
/* harmony import */ var _core_guard_auth_guard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./core/guard/auth.guard */ "3IAN");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _views_pages_error_page_error_page_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./views/pages/error-page/error-page.component */ "cDE/");
/* harmony import */ var ngx_highlightjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-highlightjs */ "OtPg");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-toastr */ "5eHb");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _services_alert_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./services/alert.service */ "3LUQ");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./services/authentication.service */ "ej43");
/* harmony import */ var _services_data_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./services/data.service */ "EnSQ");
/* harmony import */ var _services_interceptor_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./services/interceptor.service */ "KRBT");
/* harmony import */ var _services_usersession_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./services/usersession.service */ "K0zP");
/* harmony import */ var _services_role_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./services/role.service */ "3b5Z");
/* harmony import */ var ng_pick_datetime__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ng-pick-datetime */ "z17N");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @ngx-translate/http-loader */ "mqiu");
/* harmony import */ var _services_navigation_service__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./services/navigation.service */ "+NYR");
/* harmony import */ var _services_excel_service__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./services/excel.service */ "g1/Y");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "1kSV");
/* harmony import */ var ngx_lightbox__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ngx-lightbox */ "m3o8");
/* harmony import */ var ngx_lightbox__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(ngx_lightbox__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var angular_user_idle__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! angular-user-idle */ "uuDO");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/table */ "+0xr");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/sort */ "Dh3D");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/material/paginator */ "M9IT");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _views_layout_directives_directives_module__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./views/layout/directives/directives.module */ "f7FI");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var mat_select_filter__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! mat-select-filter */ "Y70v");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @angular/material/datepicker */ "iadO");
/* harmony import */ var _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @angular/material-moment-adapter */ "1yaQ");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @angular/material/core */ "FKr1");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! @angular/material/tooltip */ "Qu3c");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! @angular/forms */ "3Pt+");










































function createTranslateLoader(http) {
    return new _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_20__["TranslateHttpLoader"](http);
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"],
                _views_pages_error_page_error_page_component__WEBPACK_IMPORTED_MODULE_8__["ErrorPageComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"],
                _views_layout_layout_module__WEBPACK_IMPORTED_MODULE_5__["LayoutModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_40__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_41__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_41__["ReactiveFormsModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_26__["MatButtonModule"],
                _angular_material_table__WEBPACK_IMPORTED_MODULE_27__["MatTableModule"],
                _angular_material_sort__WEBPACK_IMPORTED_MODULE_28__["MatSortModule"],
                _angular_material_paginator__WEBPACK_IMPORTED_MODULE_29__["MatPaginatorModule"],
                _angular_material_input__WEBPACK_IMPORTED_MODULE_30__["MatInputModule"],
                _angular_material_form_field__WEBPACK_IMPORTED_MODULE_31__["MatFormFieldModule"],
                _angular_material_dialog__WEBPACK_IMPORTED_MODULE_32__["MatDialogModule"],
                _views_layout_directives_directives_module__WEBPACK_IMPORTED_MODULE_33__["DirectivesModule"],
                _angular_material_select__WEBPACK_IMPORTED_MODULE_34__["MatSelectModule"],
                mat_select_filter__WEBPACK_IMPORTED_MODULE_35__["MatSelectFilterModule"],
                _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_36__["MatDatepickerModule"],
                _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_37__["MatMomentDateModule"],
                _angular_material_core__WEBPACK_IMPORTED_MODULE_38__["MatNativeDateModule"],
                _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_39__["MatTooltipModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_23__["NgbDropdownModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_11__["HttpClientModule"],
                ngx_toastr__WEBPACK_IMPORTED_MODULE_10__["ToastrModule"].forRoot({
                    timeOut: 5000,
                    positionClass: 'toast-top-right',
                    preventDuplicates: true,
                }),
                // NgHttpLoaderModule.forRoot(),
                ng_pick_datetime__WEBPACK_IMPORTED_MODULE_18__["OwlDateTimeModule"],
                ng_pick_datetime__WEBPACK_IMPORTED_MODULE_18__["OwlNativeDateTimeModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__["TranslateModule"].forRoot({
                    loader: {
                        provide: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__["TranslateLoader"],
                        useFactory: createTranslateLoader,
                        deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_11__["HttpClient"]]
                    }
                }),
                ngx_lightbox__WEBPACK_IMPORTED_MODULE_24__["LightboxModule"],
                angular_user_idle__WEBPACK_IMPORTED_MODULE_25__["UserIdleModule"].forRoot({ idle: 1200, timeout: 20, ping: 30 })
            ],
            providers: [
                _core_guard_auth_guard__WEBPACK_IMPORTED_MODULE_6__["AuthGuard"],
                _services_navigation_service__WEBPACK_IMPORTED_MODULE_21__["NavigationService"],
                {
                    provide: ngx_highlightjs__WEBPACK_IMPORTED_MODULE_9__["HIGHLIGHT_OPTIONS"],
                    useValue: {
                        coreLibraryLoader: function () { return __webpack_require__.e(/*! import() | highlight-js-lib-core */ "highlight-js-lib-core").then(__webpack_require__.t.bind(null, /*! highlight.js/lib/core */ "ECCn", 7)); },
                        languages: {
                            xml: function () { return __webpack_require__.e(/*! import() | highlight-js-lib-languages-xml */ "highlight-js-lib-languages-xml").then(__webpack_require__.t.bind(null, /*! highlight.js/lib/languages/xml */ "jctj", 7)); },
                            typescript: function () { return __webpack_require__.e(/*! import() | highlight-js-lib-languages-typescript */ "highlight-js-lib-languages-typescript").then(__webpack_require__.t.bind(null, /*! highlight.js/lib/languages/typescript */ "r0Rl", 7)); },
                            scss: function () { return __webpack_require__.e(/*! import() | highlight-js-lib-languages-scss */ "highlight-js-lib-languages-scss").then(__webpack_require__.t.bind(null, /*! highlight.js/lib/languages/scss */ "YROV", 7)); },
                        }
                    }
                },
                _services_data_service__WEBPACK_IMPORTED_MODULE_14__["DataService"],
                _services_authentication_service__WEBPACK_IMPORTED_MODULE_13__["AuthenticationService"],
                _services_alert_service__WEBPACK_IMPORTED_MODULE_12__["AlertService"],
                _services_role_service__WEBPACK_IMPORTED_MODULE_17__["RoleService"],
                _services_excel_service__WEBPACK_IMPORTED_MODULE_22__["ExcelService"],
                _services_usersession_service__WEBPACK_IMPORTED_MODULE_16__["UserSessionService"],
                {
                    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_11__["HTTP_INTERCEPTORS"],
                    useClass: _services_interceptor_service__WEBPACK_IMPORTED_MODULE_15__["HttpInterceptorService"],
                    multi: true
                },
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"]],
            entryComponents: [],
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "aFUD":
/*!*************************************************************************!*\
  !*** ./src/app/views/layout/validators/password-strength.validators.ts ***!
  \*************************************************************************/
/*! exports provided: PasswordStrengthValidator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordStrengthValidator", function() { return PasswordStrengthValidator; });
var PasswordStrengthValidator = function (control) {
    var value = control.value || '';
    if (!value) {
        return null;
    }
    var upperCaseCharacters = /[A-Z]+/g;
    if (upperCaseCharacters.test(value) === false) {
        return { passwordStrength: "Password has to contain upper case characters" };
    }
    var lowerCaseCharacters = /[a-z]+/g;
    if (lowerCaseCharacters.test(value) === false) {
        return { passwordStrength: "Password has to contain lower case characters" };
    }
    var numberCharacters = /[0-9]+/g;
    if (numberCharacters.test(value) === false) {
        return { passwordStrength: "Password has to contain number characters" };
    }
    var specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (specialCharacters.test(value) === false) {
        return { passwordStrength: "Password has to contain special characters" };
    }
    return null;
};


/***/ }),

/***/ "cDE/":
/*!****************************************************************!*\
  !*** ./src/app/views/pages/error-page/error-page.component.ts ***!
  \****************************************************************/
/*! exports provided: ErrorPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorPageComponent", function() { return ErrorPageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_error_page_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./error-page.component.html */ "tDLP");
/* harmony import */ var _error_page_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./error-page.component.scss */ "IAMR");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");





var ErrorPageComponent = /** @class */ (function () {
    function ErrorPageComponent(route) {
        this.route = route;
    }
    ErrorPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.type = this.route.snapshot.paramMap.get('type');
        this.sub = this.route.data.subscribe(function (param) {
            if (param.type) {
                _this.type = param.type;
            }
            if (param.title) {
                _this.title = param.title;
            }
            if (param.desc) {
                _this.desc = param.desc;
            }
        });
        switch (this.type) {
            case '404':
                if (!this.title) {
                    this.title = 'Page Not Found';
                }
                if (!this.desc) {
                    this.desc = 'Oopps!! The page you were looking for doesn\'t exist.';
                }
                break;
            case '500':
                if (!this.title) {
                    this.title = 'Internal server error';
                }
                if (!this.desc) {
                    this.desc = 'Oopps!! There wan an error. Please try agin later.';
                }
                break;
            default:
                this.type = 'Ooops..';
                if (!this.title) {
                    this.title = 'Something went wrong';
                }
                if (!this.desc) {
                    this.desc = 'Looks like something went wrong.<br>' + 'We\'re working on it';
                }
        }
    };
    ErrorPageComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ErrorPageComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] }
    ]; };
    ErrorPageComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-error-page',
            template: _raw_loader_error_page_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_error_page_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
        })
    ], ErrorPageComponent);
    return ErrorPageComponent;
}());



/***/ }),

/***/ "ej43":
/*!****************************************************!*\
  !*** ./src/app/services/authentication.service.ts ***!
  \****************************************************/
/*! exports provided: AuthenticationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticationService", function() { return AuthenticationService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ "AytR");
/* harmony import */ var _usersession_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./usersession.service */ "K0zP");
/* harmony import */ var _data_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./data.service */ "EnSQ");
/* harmony import */ var _models_usersession__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../models/usersession */ "JSdJ");
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! jwt-decode */ "BOF4");
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(jwt_decode__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! moment-timezone */ "f0Wu");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/add/operator/map */ "4XzM");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var node_forge__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! node-forge */ "XBrZ");
/* harmony import */ var node_forge__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(node_forge__WEBPACK_IMPORTED_MODULE_10__);











var timezone = __webpack_require__(/*! src/assets/json/timezones.json */ "2BMZ");
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http, dataService, sessionService) {
        this.http = http;
        this.dataService = dataService;
        this.sessionService = sessionService;
        // publicKey: string = `-----BEGIN PUBLIC KEY-----
        //   MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAskgPKBcNpz71mi4NSYa5
        //   mazJrO0WZim7T2yy7qPxk2NqQE7OmWWakLJcaeUYnI0kO3yC57vck66RPCjKxWuW
        //   SGZ7dHXe0bWb5IXjcT4mNdnUIalR+lV8czsoH/wDUvkQdG1SJ+IxzW64WvoaCRZ+
        //   /4wBF2cSUh9oLwGEXiodUJ9oJXFZVPKGCEjPcBI0vC2ADBRmVQ1sKsZg8zbHN+gu
        //   U9rPLFzN4YNrCnEsSezVw/W1FKVS8J/Xx4HSSg7AyVwniz8eHi0e3a8VzFg+H09I
        //   5wK+w39sjDYfAdnJUkr6PjtSbN4/Sg/NMkKB2Ngn8oj7LCfe/7RNqIdiS+dQuSFg
        //   eQIDAQAB
        //   -----END PUBLIC KEY-----`;
        this.publicKey = "-----BEGIN PUBLIC KEY-----\n  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqz2JycS8IDJE8BDz75By\n  e/uZEgpPfGfzFbx4PDel97uRrsZz3eSbu3m/kKP8CWpanjSEchw7Ly4IovKU966Y\n  kY9OkhcwKiEsEmUIbs7N4rIz5Xn/UhVTKzcI5fdds11WhYC7mrP0qCReBsXvjt9e\n  WgMCBcm4z2vPflEzI7l7xESnB4NQt1uDb4QKTRLD5Ms47rGZdlVnDjR/c9RX3jLd\n  tcyfehguT7ZOTgWVW2pX7vaB+gRuJNwfMSlHoVcTaw3VFNCRtANgsbrobeOqzsoM\n  t3cvgJlr85s6kPVxivl1AYGTOpkz5GsNw06quynTM54+8iFxaiTVPQ92XWRE4Dg1\n  2wIDAQAB\n  -----END PUBLIC KEY-----";
        this.baseUrl = src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiBaseUrl;
        this.pageAccess = true;
        this.sessionData = new _models_usersession__WEBPACK_IMPORTED_MODULE_6__["UserSession"]();
        this.tokenFromUI = "1e2f3g4c5h7a8x9q";
        this.getTimeZones();
    }
    AuthenticationService.prototype.login = function (username, password, isLogin) {
        var _this = this;
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            "Content-Type": "application/json",
        });
        var timeZone = this.getBrowserTimeZone();
        // // this.tokenFromIV = (Math.random() + ' ').substring(2, 10) + (Math.random() + ' ').substring(2, 10);
        // if (password) {
        //   let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
        //   let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromIV);
        //   let encrypted = CryptoJS.AES.encrypt(
        //     JSON.stringify(password), _key, {
        //     keySize: 16,
        //     // iv: _iv,
        //     mode: CryptoJS.mode.ECB,
        //     padding: CryptoJS.pad.Pkcs7
        //   });
        //   var encryptKeyIv = this.tokenFromIV + encrypted.toString();
        // }
        // // result.password = btoa(result.password);
        // password = btoa(encryptKeyIv);
        // console.log(password)
        // if (password === 'dW5kZWZpbmVkNFArRW9qU3JpSThINW9VOGEzUWZLQT09') {
        //   password = 'seJOOB7ho8MIuJYK44ZvePWPGI+QUBS7wMkw30QgstY='
        // }
        var rsa = node_forge__WEBPACK_IMPORTED_MODULE_10__["pki"].publicKeyFromPem(this.publicKey);
        var encryptedPassword = window.btoa(rsa.encrypt(password));
        // const pwd = this.encryptDecryptService.encryptUsingAES256(password);
        // console.log("Enc-->" + password + "*****" + pwd);
        // console.log("Enc-->" + password + "#####" + btoa(pwd));
        // this.tokenFromIV = (Math.random() + ' ').substring(2, 10) + (Math.random() + ' ').substring(2, 10);
        // if(password){
        //   let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
        //   let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromIV);
        //   let encrypted = CryptoJS.AES.encrypt(
        //     JSON.stringify(password), _key, {
        //     keySize: 16,
        //     iv: _iv,
        //     mode: CryptoJS.mode.ECB,
        //     padding: CryptoJS.pad.Pkcs7
        //   });
        //   var encryptKeyIv = this.tokenFromIV + encrypted.toString();
        // }
        // const pwd = btoa(encryptKeyIv);
        // const data = { username, password: password, };
        // const data = { username: username, password: password, isForceLogout: true };
        var data = {
            username: username,
            password: encryptedPassword,
            isForceLogout: isLogin,
        };
        return this.http
            .post(this.baseUrl + "/api/token", data, { headers: headers })
            .map(function (user) {
            if (user && user.access_token) {
                _this.clearCachedMenu();
                var decodedToken = jwt_decode__WEBPACK_IMPORTED_MODULE_7__(user.access_token);
                _this.sessionData.email = decodedToken["user.email"];
                _this.sessionData.mobileNumber = decodedToken["user.mobilenumber"];
                _this.sessionData.authToken = user.access_token;
                _this.sessionData.userId = decodedToken["user.id"];
                _this.sessionData.roleId = decodedToken["user.roleId"];
                _this.sessionData.roleName = decodedToken["user.rolename"];
                _this.sessionData.userFullName = decodedToken["user.fullname"];
                _this.sessionData.isDynamicPassword =
                    decodedToken.referrence1 === "True";
                _this.sessionData.districtId = decodedToken["user.districtId"];
                _this.sessionData.filterblockId = decodedToken["user.blockId"];
                _this.sessionData.languageType = parseInt(decodedToken["user.languagetype"]);
                _this.sessionService.create(_this.sessionData);
            }
            return user;
        });
    };
    AuthenticationService.prototype.isAuthenticated = function () {
        return !!this.sessionService.userId() && !!this.sessionService.authToken();
    };
    AuthenticationService.prototype.isPageAccessAvailable = function (pageUrl, pageTitle) {
        var rolePages = this.sessionService.getLocalStorageWithKey("role")
            ? this.sessionService.getLocalStorageWithKey("role")
            : "[]";
        var pages = JSON.parse(rolePages);
        var paths = ["/unauthorized", "/dashboard"];
        if (pages && pages.length > 0) {
            pages.forEach(function (field) {
                if (field.path) {
                    paths.push(field.path);
                    paths.push(field.title);
                }
                if (field.submenu && field.submenu.length > 0) {
                    field.submenu.forEach(function (field1) {
                        if (field1.path) {
                            paths.push(field1.path);
                            paths.push(field1.title);
                            if (field1.path === "/beneficiaries/1" ||
                                field1.path === "/beneficiaries/2") {
                                paths.push("beneficiaries");
                            }
                        }
                    });
                }
            });
            this.pageAccess =
                paths.indexOf(pageUrl) >= 0 || paths.indexOf(pageTitle) >= 0
                    ? true
                    : false;
        }
        return this.pageAccess;
    };
    AuthenticationService.prototype.hasRequiredPermission = function (permission) {
        for (var i = 0; i < permission.length; i++) {
            if (permission[i] === this.sessionService.roleId()) {
                return true;
            }
        }
        return false;
    };
    AuthenticationService.prototype.getTimeZones = function () {
        this.timeZones = timezone.timeZone;
    };
    AuthenticationService.prototype.getBrowserTimeZone = function () {
        var zoneName = moment_timezone__WEBPACK_IMPORTED_MODULE_8__["tz"].guess();
        var temptimezone = moment_timezone__WEBPACK_IMPORTED_MODULE_8__["tz"](zoneName).zoneAbbr();
        var filterZone = this.timeZones.find(function (i) { return i.abbr === temptimezone; });
        if (filterZone) {
            return filterZone.value;
        }
        return "";
    };
    AuthenticationService.prototype.clearCachedMenu = function () {
        this.dataService.clearCache();
    };
    AuthenticationService.prototype.clearSession = function () {
        this.sessionService.destroy();
        this.clearCachedMenu();
    };
    AuthenticationService.prototype.logOut = function () {
        this.clearCachedMenu();
        this.sessionService.destroy();
    };
    AuthenticationService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
        { type: _data_service__WEBPACK_IMPORTED_MODULE_5__["DataService"] },
        { type: _usersession_service__WEBPACK_IMPORTED_MODULE_4__["UserSessionService"] }
    ]; };
    AuthenticationService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], AuthenticationService);
    return AuthenticationService;
}());



/***/ }),

/***/ "f7FI":
/*!**************************************************************!*\
  !*** ./src/app/views/layout/directives/directives.module.ts ***!
  \**************************************************************/
/*! exports provided: components, DirectivesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DirectivesModule", function() { return DirectivesModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _onlynumber_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./onlynumber.directive */ "NA8d");
/* harmony import */ var _onlychar_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./onlychar.directive */ "iNSg");
/* harmony import */ var _onlycharSpecial_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./onlycharSpecial.directive */ "i8N+");
/* harmony import */ var _onlynumberSpecial_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./onlynumberSpecial.directive */ "JZAC");
/* harmony import */ var _inputtext_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./inputtext.directive */ "KmmY");
/* harmony import */ var _password_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./password.directive */ "khPu");
/* harmony import */ var _time_directive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./time.directive */ "LDmm");
/* harmony import */ var _role_directive__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./role.directive */ "AXVw");










var components = [
    _onlynumber_directive__WEBPACK_IMPORTED_MODULE_2__["OnlyNumber"], _onlychar_directive__WEBPACK_IMPORTED_MODULE_3__["SpecialCharacter"], _onlycharSpecial_directive__WEBPACK_IMPORTED_MODULE_4__["onlycharSpecialCharacter"],
    _onlynumberSpecial_directive__WEBPACK_IMPORTED_MODULE_5__["onlynumberSpecialCharacter"], _inputtext_directive__WEBPACK_IMPORTED_MODULE_6__["inputText"], _password_directive__WEBPACK_IMPORTED_MODULE_7__["PasswordOnly"], _time_directive__WEBPACK_IMPORTED_MODULE_8__["TimeOnly"], _role_directive__WEBPACK_IMPORTED_MODULE_9__["RoleDirective"]
];
var DirectivesModule = /** @class */ (function () {
    function DirectivesModule() {
    }
    DirectivesModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [components],
            exports: [components]
        })
    ], DirectivesModule);
    return DirectivesModule;
}());



/***/ }),

/***/ "g1/Y":
/*!*******************************************!*\
  !*** ./src/app/services/excel.service.ts ***!
  \*******************************************/
/*! exports provided: ExcelService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExcelService", function() { return ExcelService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! file-saver */ "Iab2");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! xlsx */ "EUZL");
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(xlsx__WEBPACK_IMPORTED_MODULE_3__);




var EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
var EXCEL_EXTENSION = '.xlsx';
var ExcelService = /** @class */ (function () {
    function ExcelService() {
    }
    ExcelService.prototype.exportAsExcelFile = function (json, excelFileName, cols) {
        var worksheet = xlsx__WEBPACK_IMPORTED_MODULE_3__["utils"].json_to_sheet(json);
        var workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        var range = xlsx__WEBPACK_IMPORTED_MODULE_3__["utils"].decode_range(worksheet['!ref']);
        for (var index = range.s.r; index <= range.e.c; ++index) {
            var address = xlsx__WEBPACK_IMPORTED_MODULE_3__["utils"].encode_col(index) + '1';
            worksheet[address].v = cols[index];
        }
        var excelBuffer = xlsx__WEBPACK_IMPORTED_MODULE_3__["write"](workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    };
    ExcelService.prototype.saveAsExcelFile = function (buffer, fileName) {
        var data = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        file_saver__WEBPACK_IMPORTED_MODULE_2__["saveAs"](data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    };
    ExcelService.ctorParameters = function () { return []; };
    ExcelService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], ExcelService);
    return ExcelService;
}());



/***/ }),

/***/ "i8N+":
/*!**********************************************************************!*\
  !*** ./src/app/views/layout/directives/onlycharSpecial.directive.ts ***!
  \**********************************************************************/
/*! exports provided: onlycharSpecialCharacter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onlycharSpecialCharacter", function() { return onlycharSpecialCharacter; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


var onlycharSpecialCharacter = /** @class */ (function () {
    function onlycharSpecialCharacter(el) {
        this.el = el;
        this.regexStr = '^[a-zA-Z. ]*$';
    }
    onlycharSpecialCharacter.prototype.onKeyPress = function (event) {
        return new RegExp(this.regexStr).test(event.key);
    };
    onlycharSpecialCharacter.prototype.blockPaste = function (event) {
        this.validateFields(event);
    };
    onlycharSpecialCharacter.prototype.validateFields = function (event) {
        var _this = this;
        setTimeout(function () {
            _this.el.nativeElement.value = _this.el.nativeElement.value.replace(/[^A-Za-z. ]/g, '').replace(/\s/g, '');
            event.preventDefault();
        }, 100);
    };
    onlycharSpecialCharacter.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] }
    ]; };
    onlycharSpecialCharacter.propDecorators = {
        isAlphaNumeric: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        onKeyPress: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['keypress', ['$event'],] }],
        blockPaste: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['paste', ['$event'],] }]
    };
    onlycharSpecialCharacter = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: '[nameOnly]'
        })
    ], onlycharSpecialCharacter);
    return onlycharSpecialCharacter;
}());



/***/ }),

/***/ "iNSg":
/*!***************************************************************!*\
  !*** ./src/app/views/layout/directives/onlychar.directive.ts ***!
  \***************************************************************/
/*! exports provided: SpecialCharacter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpecialCharacter", function() { return SpecialCharacter; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


var SpecialCharacter = /** @class */ (function () {
    function SpecialCharacter(el) {
        this.el = el;
        this.regexStr = '^[a-zA-Z ]*$';
    }
    SpecialCharacter.prototype.onKeyPress = function (event) {
        return new RegExp(this.regexStr).test(event.key);
    };
    SpecialCharacter.prototype.blockPaste = function (event) {
        this.validateFields(event);
    };
    SpecialCharacter.prototype.validateFields = function (event) {
        var _this = this;
        setTimeout(function () {
            _this.el.nativeElement.value = _this.el.nativeElement.value.replace(/[^A-Za-z ]/g, '').replace(/\s/g, '');
            event.preventDefault();
        }, 100);
    };
    SpecialCharacter.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] }
    ]; };
    SpecialCharacter.propDecorators = {
        isAlphaNumeric: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        onKeyPress: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['keypress', ['$event'],] }],
        blockPaste: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['paste', ['$event'],] }]
    };
    SpecialCharacter = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: '[specialIsAlphaNumeric]'
        })
    ], SpecialCharacter);
    return SpecialCharacter;
}());



/***/ }),

/***/ "khPu":
/*!***************************************************************!*\
  !*** ./src/app/views/layout/directives/password.directive.ts ***!
  \***************************************************************/
/*! exports provided: PasswordOnly */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordOnly", function() { return PasswordOnly; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


var PasswordOnly = /** @class */ (function () {
    function PasswordOnly(el) {
        this.el = el;
        this.regexStr = '^[a-zA-Z0-9.@: ]*$';
    }
    PasswordOnly.prototype.onKeyPress = function (event) {
        return new RegExp(this.regexStr).test(event.key);
    };
    PasswordOnly.prototype.blockPaste = function (event) {
        this.validateFields(event);
    };
    PasswordOnly.prototype.validateFields = function (event) {
        var _this = this;
        setTimeout(function () {
            _this.el.nativeElement.value = _this.el.nativeElement.value.replace(/[^A-Za-z. ]/g, '').replace(/\s/g, '');
            event.preventDefault();
        }, 100);
    };
    PasswordOnly.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] }
    ]; };
    PasswordOnly.propDecorators = {
        isAlphaNumeric: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        onKeyPress: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['keypress', ['$event'],] }],
        blockPaste: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['paste', ['$event'],] }]
    };
    PasswordOnly = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: '[passwordOnly]'
        })
    ], PasswordOnly);
    return PasswordOnly;
}());



/***/ }),

/***/ "lOv1":
/*!******************************!*\
  !*** ./src/enum/roletype.ts ***!
  \******************************/
/*! exports provided: RoleType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoleType", function() { return RoleType; });
var RoleType;
(function (RoleType) {
    RoleType[RoleType["Root"] = 1] = "Root";
    RoleType[RoleType["AnganwadiWorker"] = 2] = "AnganwadiWorker";
    RoleType[RoleType["Agency"] = 3] = "Agency";
    RoleType[RoleType["DistrictCollector"] = 4] = "DistrictCollector";
    RoleType[RoleType["DHO"] = 5] = "DHO";
    RoleType[RoleType["DPO"] = 6] = "DPO";
    RoleType[RoleType["BHO"] = 7] = "BHO";
    RoleType[RoleType["BIO"] = 8] = "BIO";
    RoleType[RoleType["HOHLTH"] = 9] = "HOHLTH";
    RoleType[RoleType["Supervisor"] = 10] = "Supervisor";
})(RoleType || (RoleType = {}));


/***/ }),

/***/ "m9CH":
/*!***********************************************************!*\
  !*** ./src/app/views/layout/footer/footer.component.scss ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmb290ZXIuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "qfBg":
/*!******************************************!*\
  !*** ./src/app/services/user.service.ts ***!
  \******************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data.service */ "EnSQ");
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! crypto-js */ "NFKh");
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_3__);




var UserService = /** @class */ (function () {
    function UserService(dataService) {
        this.dataService = dataService;
        this.getEventRoute = '/api/user/';
        this.getVillageUserEventRoute = '/api/user';
        this.tokenFromUI = "1e2f3g4c5h7a8x9q";
    }
    ;
    UserService.prototype.getLookUp = function (refresh) {
        return this.dataService.getData('/api/user/lookup', refresh);
    };
    UserService.prototype.getAppVersion = function (apptype, refresh) {
        return this.dataService.getData('/api/common/version/' + apptype, refresh);
    };
    UserService.prototype.logout = function (data) {
        var _this = this;
        return this.dataService.post('/api/user/logout', data).map(function (response) {
            _this.dataService.clearRouteCache(_this.getEventRoute);
            return response;
        });
    };
    UserService.prototype.get = function (refresh) {
        return this.dataService.getData('/api/user', refresh);
    };
    UserService.prototype.getById = function (id, refresh) {
        return this.dataService.getData('/api/user/' + id, refresh);
    };
    UserService.prototype.save = function (result) {
        var _this = this;
        this.tokenFromIV = (Math.random() + ' ').substring(2, 10) + (Math.random() + ' ').substring(2, 10);
        if (result.password) {
            var _key = crypto_js__WEBPACK_IMPORTED_MODULE_3__["enc"].Utf8.parse(this.tokenFromUI);
            var _iv = crypto_js__WEBPACK_IMPORTED_MODULE_3__["enc"].Utf8.parse(this.tokenFromIV);
            var encrypted = crypto_js__WEBPACK_IMPORTED_MODULE_3__["AES"].encrypt(JSON.stringify(result.password), _key, {
                keySize: 16,
                iv: _iv,
                mode: crypto_js__WEBPACK_IMPORTED_MODULE_3__["mode"].ECB,
                padding: crypto_js__WEBPACK_IMPORTED_MODULE_3__["pad"].Pkcs7
            });
            var encryptKeyIv = this.tokenFromIV + encrypted.toString();
        }
        // result.password = btoa(result.password);
        result.password = btoa(encryptKeyIv);
        return this.dataService.post('/api/user', result).map(function (response) {
            _this.dataService.clearRouteCache(_this.getEventRoute);
            return response;
        });
    };
    UserService.prototype.delete = function (id, status) {
        var _this = this;
        return this.dataService.post('/api/user/update/' + id + '/' + status, null).map(function (response) {
            _this.dataService.clearRouteCache(_this.getEventRoute);
            return response;
        });
    };
    UserService.prototype.forgotpasswordUser = function (user) {
        var _this = this;
        return this.dataService.post('/api/user/forgotpassword', user).map(function (response) {
            _this.dataService.clearRouteCache(_this.getEventRoute);
            return response;
        });
    };
    UserService.prototype.changepasswordUser = function (user) {
        var _this = this;
        // this.tokenFromIV = (Math.random() + ' ').substring(2, 10) + (Math.random() + ' ').substring(2, 10);
        // if (user.newPassword) {
        //     let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
        //     let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromIV);
        //     let encrypted = CryptoJS.AES.encrypt(
        //         JSON.stringify(user.newPassword), _key, {
        //         keySize: 16,
        //         iv: _iv,
        //         mode: CryptoJS.mode.ECB,
        //         padding: CryptoJS.pad.Pkcs7
        //     });
        //     var newEncryptKeyIv = this.tokenFromIV + encrypted.toString();
        // }
        // if (user.oldPassword) {
        //     let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
        //     let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromIV);
        //     let encrypted = CryptoJS.AES.encrypt(
        //         JSON.stringify(user.oldPassword), _key, {
        //         keySize: 16,
        //         iv: _iv,
        //         mode: CryptoJS.mode.ECB,
        //         padding: CryptoJS.pad.Pkcs7
        //     });
        //     var oldEncryptKeyIv = this.tokenFromIV + encrypted.toString();
        // }
        //  const request = {
        //     newPassword: btoa(newEncryptKeyIv),
        //     oldPassword: btoa(oldEncryptKeyIv),
        //     userId: user.userId
        // };
        var request = {
            newPassword: user.newPassword,
            oldPassword: user.oldPassword,
            userId: user.userId
        };
        return this.dataService.post('/api/user/changepassword', request).map(function (response) {
            _this.dataService.clearRouteCache(_this.getEventRoute);
            return response;
        });
    };
    UserService.prototype.newpaswordUser = function (user) {
        var _this = this;
        return this.dataService.post('/api/user/newpasword', user).map(function (response) {
            _this.dataService.clearRouteCache(_this.getEventRoute);
            return response;
        });
    };
    UserService.prototype.getRoll = function (refresh) {
        return this.dataService.getData('/api/user/role', refresh);
    };
    UserService.prototype.getUserImg = function (userid, refresh) {
        return this.dataService.getData('/api/user/' + userid, refresh);
    };
    UserService.prototype.getMenu = function (refresh) {
        return this.dataService.getData('/api/user/menus', refresh);
    };
    UserService.prototype.getchildDetails = function (data, refresh) {
        return this.dataService.getData('/api/child/details/' + data.districtId + '/' + data.blockId + '/' + data.sectorId + '/' + data.awcId, refresh);
    };
    UserService.prototype.getchildDetailsType = function (data, refresh) {
        return this.dataService.getData('/api/child/details/' + data.districtId + '/' + data.blockId + '/' + data.sectorId + '/' + data.awcId + '/' + data.severityType, refresh);
    };
    UserService.prototype.getchildAliveDetailsType = function (data, refresh) {
        return this.dataService.getData('/api/child/alivedetail/' + data.districtId + '/' + data.blockId + '/' + data.sectorId + '/' + data.awcId + '/' + data.severityType, refresh);
    };
    UserService.prototype.getmiDetailsType = function (data, refresh) {
        return this.dataService.getData('/api/child/mi/' + data.districtId + '/' + data.blockId + '/' + data.sectorId + '/' + data.awcId + '/' + data.severityType, refresh);
    };
    UserService.prototype.getmiEvaluation = function (data, refresh) {
        return this.dataService.getData('/api/report/mireview/' + data.districtId + '/' + data.blockId + '/' + data.sectorId + '/' + data.awcId, refresh);
    };
    UserService.prototype.getScreeningStatus = function (data, refresh) {
        return this.dataService.getData('/api/report/screeningstatus/' + data.districtId + '/' + data.blockId, refresh);
    };
    UserService.prototype.getMichildStatus = function (data, refresh) {
        return this.dataService.getData('/api/report/michildstatus/' + data.districtId + '/' + data.blockId + '/' + data.isZeroToSixMonth, refresh);
    };
    UserService.prototype.getMeSummary = function (data, refresh) {
        return this.dataService.getData('/api/report/mesummary/' + data.districtId + '/' + data.blockId, refresh);
    };
    // getTimeline(id: any, refresh: boolean) {
    //     return this.dataService.getData('/api/beneficiary/' + id, refresh)
    // }
    UserService.prototype.getTimeline = function (id, type, refresh) {
        return this.dataService.getData('/api/beneficiary/' + id + '/' + type, refresh);
    };
    UserService.ctorParameters = function () { return [
        { type: _data_service__WEBPACK_IMPORTED_MODULE_2__["DataService"] }
    ]; };
    UserService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "rJzq":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/layout/sidebar/sidebar.component.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<nav class=\"sidebar\">\n  <div class=\"sidebar-header\">\n    <!--- Logo -->\n    <!-- <a routerLink=\"/\" class=\"sidebar-brand\"> -->\n    <a class=\"sidebar-brand pointer\">\n      <img (click)=\"dashboardReload()\" alt=\"AED\" src=\"assets/img/logos/agriexpologo.jpeg\" style=\"height:73px;\">\n    </a>\n    <!--- Toggler -->\n    <div class=\"sidebar-toggler not-active\" #sidebarToggler (click)=\"toggleSidebar($event)\">\n      <span></span>\n      <span></span>\n      <span></span>\n    </div>\n  </div>\n  <div class=\"sidebar-body\" (mouseenter)=\"operSidebarFolded()\" (mouseleave)=\"closeSidebarFolded()\" [perfectScrollbar]>\n    <div class=\"sidebar_icon\">\n      <img width=\"100%\" alt=\"sidebar\" src=\"assets/img/logos/agriexpologo.jpeg\">\n    </div>\n    <!--- Sidemenu start -->\n    <ul class=\"sidebar-nav metismenu\" id=\"sidebar-menu\" #sidebarMenu>\n      <ng-container *ngFor=\"let item of menuItems\">\n        <li class=\"nav-item nav-category\" *ngIf=\"item.isTitle && item.isVisible\">{{ item.label }}</li>\n        <li class=\"nav-item\" *ngIf=\"!item.isTitle && item.isVisible\">\n          <a class=\"nav-link\" *ngIf=\"hasItems(item)\" href=\"javascript:void(0);\">\n            <i class=\"fonticon {{ item.icon }}\" *ngIf=\"item.icon\"></i>\n            <span class=\"link-title\"> {{ item.label | translate }}</span>\n            <span class=\"link-arrow\" data-feather=\"chevron-down\" appFeatherIcon></span>\n          </a>\n\n          <a class=\"nav-link nav-link-ref\" [routerLink]=\"item.link\" *ngIf=\"!hasItems(item)\"\n            [attr.data-parent]=\"item.parentId\">\n            <i class=\"fonticon {{ item.icon }}\" *ngIf=\"item.icon\"></i>\n            <span class=\"link-title\"> {{ item.label | translate }}</span>\n            <span class=\"badge badge-{{item.badge.variant}}\" *ngIf=\"item.badge\">{{item.badge.text}}</span>\n          </a>\n\n          <ul class=\"sidebar-nav sub-menu nav-second-level\" *ngIf=\"hasItems(item)\" aria-expanded=\"false\">\n\n            <li class=\"nav-item\" *ngFor=\"let subitem of item.subItems\">\n              <a class=\"nav-link side-nav-link-a-ref\" *ngIf=\"hasItems(subitem) && subitem.isVisible\"\n                href=\"javascript:void(0);\">\n                <i class=\"fonticon {{ subitem.icon }}\" *ngIf=\"subitem.icon\"></i>\n                <span class=\"link-title\"> &nbsp;&nbsp;&nbsp;&nbsp;{{ subitem.label | translate}}</span>\n                <span class=\"link-arrow\" data-feather=\"chevron-down\" appFeatherIcon></span>\n              </a>\n\n              <a class=\"nav-link nav-link-ref\" [routerLink]=\"subitem.link\"\n                *ngIf=\"!hasItems(subitem) && subitem.isVisible\" [attr.data-parent]=\"subitem.parentId\">\n                <i class=\"fonticon {{ subitem.icon }}\" *ngIf=\"subitem.icon\"></i>\n                &nbsp;&nbsp;&nbsp;&nbsp;{{ subitem.label | translate}}\n              </a>\n\n              <ul class=\"sidebar-nav sub-menu nav-third-level\" *ngIf=\"hasItems(subitem) && subitem.isVisible\"\n                aria-expanded=\"false\">\n                <li class=\"nav-item\" *ngFor=\"let subSubitem of subitem.subItems\">\n                  <a class=\"nav-link nav-link-ref\" [routerLink]=\"subSubitem.link\" [routerLinkActive]=\"['active']\"\n                    [attr.data-parent]=\"subSubitem.parentId\">\n                    <i class=\"fonticon {{ subSubitem.icon }}\" *ngIf=\"subitem.icon\"></i>\n                    &nbsp;&nbsp;&nbsp;&nbsp;{{ subSubitem.label | translate}}\n                  </a>\n                </li>\n              </ul>\n            </li>\n          </ul>\n        </li>\n      </ng-container>\n      <!-- <li class=\"nav-item nav-category\">AWC</li> -->\n      <!-- <li class=\"nav-item\">\n        <a [routerLink]=\"'/dashboard'\" class=\"nav-link\">\n          <i class=\"link-icon\" data-feather=\"hash\" appFeatherIcon></i>\n          <span class=\"link-title\">Registration Details</span>\n        </a>\n      </li> -->\n    </ul>\n\n    <!--- Sidemenu end -->\n\n  </div>\n</nav>");

/***/ }),

/***/ "t09C":
/*!***********************************************************!*\
  !*** ./src/app/views/layout/sidebar/sidebar.component.ts ***!
  \***********************************************************/
/*! exports provided: SidebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarComponent", function() { return SidebarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_sidebar_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./sidebar.component.html */ "rJzq");
/* harmony import */ var _sidebar_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sidebar.component.scss */ "G83Q");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var metismenujs_dist_metismenujs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! metismenujs/dist/metismenujs */ "WFFF");
/* harmony import */ var metismenujs_dist_metismenujs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(metismenujs_dist_metismenujs__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_services_usersession_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/usersession.service */ "K0zP");








var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(document, userSessionService, router) {
        var _this = this;
        this.document = document;
        this.userSessionService = userSessionService;
        this.menuItems = [];
        router.events.forEach(function (event) {
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_6__["NavigationEnd"]) {
                /**
                 * Activating the current active item dropdown
                 */
                _this._activateMenuDropdown();
                /**
                 * closing the sidebar
                 */
                if (window.matchMedia('(max-width: 991px)').matches) {
                    _this.document.body.classList.remove('sidebar-open');
                }
            }
        });
    }
    SidebarComponent.prototype.ngOnInit = function () {
        // this.menuItems = MENU;
        this.menuItems = [];
        var menu = this.userSessionService.getLocalStorageWithKey('menu');
        var menus = JSON.parse(menu);
        this.menuItems = JSON.parse(menu);
        /**
         * Sidebar-folded on desktop (min-width:992px and max-width: 1199px)
         */
        var desktopMedium = window.matchMedia('(min-width:992px) and (max-width: 1199px)');
        desktopMedium.addListener(this.iconSidebar);
        this.iconSidebar(desktopMedium);
    };
    SidebarComponent.prototype.ngAfterViewInit = function () {
        // activate menu item
        new metismenujs_dist_metismenujs__WEBPACK_IMPORTED_MODULE_5___default.a(this.sidebarMenu.nativeElement);
        this._activateMenuDropdown();
    };
    /**
     * Toggle sidebar on hamburger button click
     */
    SidebarComponent.prototype.toggleSidebar = function (e) {
        this.sidebarToggler.nativeElement.classList.toggle('active');
        this.sidebarToggler.nativeElement.classList.toggle('not-active');
        if (window.matchMedia('(min-width: 992px)').matches) {
            e.preventDefault();
            this.document.body.classList.toggle('sidebar-folded');
        }
        else if (window.matchMedia('(max-width: 991px)').matches) {
            e.preventDefault();
            this.document.body.classList.toggle('sidebar-open');
        }
    };
    /**
     * Toggle settings-sidebar
     */
    SidebarComponent.prototype.toggleSettingsSidebar = function (e) {
        e.preventDefault();
        this.document.body.classList.toggle('settings-open');
    };
    /**
     * Open sidebar when hover (in folded folded state)
     */
    SidebarComponent.prototype.operSidebarFolded = function () {
        if (this.document.body.classList.contains('sidebar-folded')) {
            this.document.body.classList.add("open-sidebar-folded");
        }
    };
    /**
     * Fold sidebar after mouse leave (in folded state)
     */
    SidebarComponent.prototype.closeSidebarFolded = function () {
        if (this.document.body.classList.contains('sidebar-folded')) {
            this.document.body.classList.remove("open-sidebar-folded");
        }
    };
    /**
     * Sidebar-folded on desktop (min-width:992px and max-width: 1199px)
     */
    SidebarComponent.prototype.iconSidebar = function (e) {
        if (e.matches) {
            this.document.body.classList.add('sidebar-folded');
        }
        else {
            this.document.body.classList.remove('sidebar-folded');
        }
    };
    /**
     * Switching sidebar light/dark
     */
    SidebarComponent.prototype.onSidebarThemeChange = function (event) {
        this.document.body.classList.remove('sidebar-light', 'sidebar-dark');
        this.document.body.classList.add(event.target.value);
        this.document.body.classList.remove('settings-open');
    };
    /**
     * Returns true or false if given menu item has child or not
     * @param item menuItem
     */
    SidebarComponent.prototype.hasItems = function (item) {
        return item.subItems !== undefined ? item.subItems.length > 0 : false;
    };
    /**
     * Reset the menus then hilight current active menu item
     */
    SidebarComponent.prototype._activateMenuDropdown = function () {
        this.resetMenuItems();
        this.activateMenuItems();
    };
    /**
     * Resets the menus
     */
    SidebarComponent.prototype.resetMenuItems = function () {
        var links = document.getElementsByClassName('nav-link-ref');
        for (var i = 0; i < links.length; i++) {
            var menuItemEl = links[i];
            menuItemEl.classList.remove('mm-active');
            var parentEl = menuItemEl.parentElement;
            if (parentEl) {
                parentEl.classList.remove('mm-active');
                var parent2El = parentEl.parentElement;
                if (parent2El) {
                    parent2El.classList.remove('mm-show');
                }
                var parent3El = parent2El.parentElement;
                if (parent3El) {
                    parent3El.classList.remove('mm-active');
                    if (parent3El.classList.contains('side-nav-item')) {
                        var firstAnchor = parent3El.querySelector('.side-nav-link-a-ref');
                        if (firstAnchor) {
                            firstAnchor.classList.remove('mm-active');
                        }
                    }
                    var parent4El = parent3El.parentElement;
                    if (parent4El) {
                        parent4El.classList.remove('mm-show');
                        var parent5El = parent4El.parentElement;
                        if (parent5El) {
                            parent5El.classList.remove('mm-active');
                        }
                    }
                }
            }
        }
    };
    ;
    /**
     * Toggles the menu items
     */
    SidebarComponent.prototype.activateMenuItems = function () {
        var links = document.getElementsByClassName('nav-link-ref');
        var menuItemEl = null;
        for (var i = 0; i < links.length; i++) {
            // tslint:disable-next-line: no-string-literal
            if (window.location.pathname === links[i]['pathname'] || window.location.pathname.startsWith(links[i]['pathname'])) {
                menuItemEl = links[i];
                break;
            }
        }
        if (menuItemEl) {
            menuItemEl.classList.add('mm-active');
            var parentEl = menuItemEl.parentElement;
            if (parentEl) {
                parentEl.classList.add('mm-active');
                var parent2El = parentEl.parentElement;
                if (parent2El) {
                    parent2El.classList.add('mm-show');
                }
                var parent3El = parent2El.parentElement;
                if (parent3El) {
                    parent3El.classList.add('mm-active');
                    if (parent3El.classList.contains('side-nav-item')) {
                        var firstAnchor = parent3El.querySelector('.side-nav-link-a-ref');
                        if (firstAnchor) {
                            firstAnchor.classList.add('mm-active');
                        }
                    }
                    var parent4El = parent3El.parentElement;
                    if (parent4El) {
                        parent4El.classList.add('mm-show');
                        var parent5El = parent4El.parentElement;
                        if (parent5El) {
                            parent5El.classList.add('mm-active');
                        }
                    }
                }
            }
        }
    };
    ;
    SidebarComponent.prototype.dashboardReload = function () {
        window.location.reload();
    };
    SidebarComponent.ctorParameters = function () { return [
        { type: Document, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["DOCUMENT"],] }] },
        { type: src_app_services_usersession_service__WEBPACK_IMPORTED_MODULE_7__["UserSessionService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] }
    ]; };
    SidebarComponent.propDecorators = {
        sidebarToggler: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['sidebarToggler',] }],
        sidebarMenu: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['sidebarMenu',] }]
    };
    SidebarComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-sidebar',
            template: _raw_loader_sidebar_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_sidebar_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
        })
    ], SidebarComponent);
    return SidebarComponent;
}());



/***/ }),

/***/ "tDLP":
/*!********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/pages/error-page/error-page.component.html ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"main-wrapper\">\n  <div class=\"page-wrapper full-page\">\n    <div class=\"page-content d-flex align-items-center justify-content-center\">\n\n      <div class=\"row w-100 mx-0 auth-page\">\n        <div class=\"col-md-8 col-xl-6 mx-auto d-flex flex-column align-items-center\">\n          <img src=\"assets/images/404.svg\" class=\"img-fluid mb-2\" alt=\"404\">\n          <h1 class=\"font-weight-bold mb-22 mt-2 tx-80 text-muted\">{{type}}</h1>\n          <h4 class=\"mb-2\">{{title}}</h4>\n          <h6 class=\"text-muted mb-3 text-center\" [innerHTML]=\"desc\"></h6>\n          <a routerLink=\"/auth/login\" class=\"btn btn-primary\">Back to Login</a>\n        </div>\n      </div>\n\n    </div>\n  </div>\n</div>");

/***/ }),

/***/ "tyVc":
/*!**********************************************************!*\
  !*** ./src/app/core/feather-icon/feather-icon.module.ts ***!
  \**********************************************************/
/*! exports provided: FeahterIconModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeahterIconModule", function() { return FeahterIconModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _feather_icon_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./feather-icon.directive */ "IYwT");




var FeahterIconModule = /** @class */ (function () {
    function FeahterIconModule() {
    }
    FeahterIconModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_feather_icon_directive__WEBPACK_IMPORTED_MODULE_3__["FeatherIconDirective"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            ],
            exports: [_feather_icon_directive__WEBPACK_IMPORTED_MODULE_3__["FeatherIconDirective"]]
        })
    ], FeahterIconModule);
    return FeahterIconModule;
}());



/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _views_layout_base_base_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./views/layout/base/base.component */ "RRVW");
/* harmony import */ var _core_guard_auth_guard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core/guard/auth.guard */ "3IAN");
/* harmony import */ var _views_pages_error_page_error_page_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./views/pages/error-page/error-page.component */ "cDE/");






var routes = [
    {
        path: '',
        loadChildren: function () { return Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ../app/views/layout/layout.module */ "1pOu")).then(function (m) { return m.LayoutModule; }); }
    },
    { path: 'auth', loadChildren: function () { return __webpack_require__.e(/*! import() | views-pages-auth-auth-module */ "views-pages-auth-auth-module").then(__webpack_require__.bind(null, /*! ./views/pages/auth/auth.module */ "SSQ5")).then(function (m) { return m.AuthModule; }); } },
    {
        path: '',
        component: _views_layout_base_base_component__WEBPACK_IMPORTED_MODULE_3__["BaseComponent"],
        canActivate: [_core_guard_auth_guard__WEBPACK_IMPORTED_MODULE_4__["AuthGuard"]],
    },
    {
        path: 'error',
        component: _views_pages_error_page_error_page_component__WEBPACK_IMPORTED_MODULE_5__["ErrorPageComponent"],
        data: {
            type: 404,
            title: 'Page Not Found',
            desc: 'Oopps!! The page you were looking for doesn\'t exist.'
        }
    },
    {
        path: 'error/:type',
        component: _views_pages_error_page_error_page_component__WEBPACK_IMPORTED_MODULE_5__["ErrorPageComponent"]
    },
    { path: '**', redirectTo: 'error', pathMatch: 'full' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes, { scrollPositionRestoration: 'top' })],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "yCcV":
/*!*************************************************************************!*\
  !*** ./src/app/views/layout/changepassword/changepassword.component.ts ***!
  \*************************************************************************/
/*! exports provided: ChangepasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangepasswordComponent", function() { return ChangepasswordComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_changepassword_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./changepassword.component.html */ "BKZR");
/* harmony import */ var _changepassword_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./changepassword.component.scss */ "6xCu");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var src_app_services_alert_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/alert.service */ "3LUQ");
/* harmony import */ var src_app_services_usersession_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/usersession.service */ "K0zP");
/* harmony import */ var src_app_views_layout_validators_password_strength_validators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/views/layout/validators/password-strength.validators */ "aFUD");
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/user.service */ "qfBg");
/* harmony import */ var src_app_services_authentication_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/services/authentication.service */ "ej43");











var ChangepasswordComponent = /** @class */ (function () {
    function ChangepasswordComponent(data, authService, userService, alertService, dialogRef, userSessionService) {
        this.data = data;
        this.authService = authService;
        this.userService = userService;
        this.alertService = alertService;
        this.dialogRef = dialogRef;
        this.userSessionService = userSessionService;
        if (this.data) {
            this.eventData = JSON.stringify(data);
        }
        this.userId = this.userSessionService.userId();
        this.showold = false;
        this.show = false;
        this.show2 = false;
    }
    ChangepasswordComponent.prototype.ngOnInit = function () {
        this.initializeValidators();
        this.OnCaptachaValidators();
    };
    ChangepasswordComponent.prototype.initializeValidators = function () {
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormGroup"]({
            oldPassword: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            newPassword: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, src_app_views_layout_validators_password_strength_validators__WEBPACK_IMPORTED_MODULE_8__["PasswordStrengthValidator"]]),
            confirmpassword: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            txtCaptcha: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            CaptchaDiv: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](this.captchacode, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            userId: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](this.userId, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
        });
    };
    ChangepasswordComponent.prototype.OnCaptachaValidators = function () {
        this.captchaGenerate();
        this.form.controls['CaptchaDiv'].setValue(this.captchacode);
        this.form.controls['txtCaptcha'].setValue(null);
    };
    ChangepasswordComponent.prototype.captchaGenerate = function () {
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
    ChangepasswordComponent.prototype.onSave = function () {
        var _this = this;
        this.showold = false;
        this.show = false;
        this.show2 = false;
        if (this.form.valid) {
            if (this.captchacode === this.form.controls['txtCaptcha'].value) {
                if (this.form.controls['newPassword'].value === this.form.controls['confirmpassword'].value) {
                    this.userService.changepasswordUser(this.form.value).subscribe(function (result) {
                        if (result && result.isSuccess) {
                            _this.alertService.success('Password has been Updated Successfully');
                            _this.dialogRef.close(result);
                        }
                        else {
                            if (result && result.failures) {
                                _this.alertService.error(result.failures.toString());
                            }
                        }
                    });
                }
            }
            else {
                this.alertService.error('Please enter the vaild captcha');
            }
        }
        else {
            this.validateFormControl();
        }
    };
    ChangepasswordComponent.prototype.onCancel = function () {
        this.dialogRef.close();
    };
    ChangepasswordComponent.prototype.password = function () {
        this.show = !this.show;
    };
    ChangepasswordComponent.prototype.confirmpassword = function () {
        this.show2 = !this.show2;
    };
    ChangepasswordComponent.prototype.oldPassword = function () {
        this.showold = !this.showold;
    };
    ChangepasswordComponent.prototype.validateFormControl = function () {
        var _this = this;
        Object.keys(this.form.controls).forEach(function (field) {
            var control = _this.form.get(field);
            if (control instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]) {
                control.markAsTouched({
                    onlySelf: true
                });
            }
        });
    };
    ChangepasswordComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__["MAT_DIALOG_DATA"],] }] },
        { type: src_app_services_authentication_service__WEBPACK_IMPORTED_MODULE_10__["AuthenticationService"] },
        { type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_9__["UserService"] },
        { type: src_app_services_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"] },
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__["MatDialogRef"] },
        { type: src_app_services_usersession_service__WEBPACK_IMPORTED_MODULE_7__["UserSessionService"] }
    ]; };
    ChangepasswordComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-changepassword',
            template: _raw_loader_changepassword_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_changepassword_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
        })
    ], ChangepasswordComponent);
    return ChangepasswordComponent;
}());



/***/ }),

/***/ "ynWL":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "a3Wg");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map