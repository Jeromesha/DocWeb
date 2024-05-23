import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './views/layout/layout.module';
import { AuthGuard } from './core/guard/auth.guard';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { ToastrModule } from 'ngx-toastr';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertService } from './services/alert.service';
import { AuthenticationService } from './services/authentication.service';
import { DataService } from './services/data.service';
import { HttpInterceptorService } from './services/interceptor.service';
import { UserSessionService } from './services/usersession.service';
import { RoleService } from './services/role.service';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NavigationService } from './services/navigation.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { LightboxModule } from 'ngx-lightbox';
import { UserIdleModule } from 'angular-user-idle';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { DirectivesModule } from './views/layout/directives/directives.module';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectFilterModule } from 'mat-select-filter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { NgApexchartsModule } from 'ng-apexcharts'
import { EmployeedetailsComponent } from './views/pages/employeedetails/employeedetails.component';
import { ShowreportComponent } from './views/pages/employeeleaverecords/showreport/showreport.component';
import { TimechampReportComponent } from './views/pages/timechamp-report/timechamp-report.component';
import { MonthlyWorkingHoursReportComponent } from './views/pages/monthly-working-hours-report/monthly-working-hours-report.component';
import { LoaderModule } from './views/layout/loader/loader.module';
import { SchedularGridComponent } from './views/pages/KRA/schedular-grid/schedular-grid.component';
import { KraTaskAttachComponent } from './views/pages/KRA/kra-task-attach/kra-task-attach.component';
import { KraTaskGridComponent } from './views/pages/KRA/kra-task-grid/kra-task-grid.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    ShowreportComponent,
    TimechampReportComponent,
    MonthlyWorkingHoursReportComponent,
    SchedularGridComponent,
    KraTaskAttachComponent,
    KraTaskGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    DirectivesModule,
    MatSelectModule,
    MatSelectFilterModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatNativeDateModule,
    MatTooltipModule,
    NgbDropdownModule,
    UiSwitchModule,
    HttpClientModule,
    NgApexchartsModule,
    LoaderModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }),
    // NgHttpLoaderModule.forRoot(),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    LightboxModule,
    UserIdleModule.forRoot({ idle: 1200, timeout: 20, ping: 30 })
  ],
  providers: [
    AuthGuard,
    NavigationService,
    {
      provide: HIGHLIGHT_OPTIONS, // https://www.npmjs.com/package/ngx-highlightjs
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          xml: () => import('highlight.js/lib/languages/xml'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
          scss: () => import('highlight.js/lib/languages/scss'),
        }
      }
    },
    DataService,
    AuthenticationService,
    AlertService,
    RoleService,
    UserSessionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
  ],

})
export class AppModule { }
