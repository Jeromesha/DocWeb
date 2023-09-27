import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BaseComponent } from './base/base.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { TranslateLoader } from '@ngx-translate/core';
import { ContentAnimateDirective } from '../../core/content-animate/content-animate.directive';

import { NgbDropdownModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { FeahterIconModule } from '../../core/feather-icon/feather-icon.module';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { DirectivesModule } from './directives/directives.module';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
// import { MatDialogModule } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { TranslateModule } from '@ngx-translate/core';
import { NotifyService } from 'src/app/services/notifyService';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectFilterModule } from 'mat-select-filter';
import { DashboardService } from 'src/app/services/dashboard.service';
import { LayoutRoutingModule } from './layout-routing.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ReportsService } from 'src/app/services/reports.service';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  declarations: [BaseComponent, NavbarComponent, SidebarComponent, FooterComponent, ContentAnimateDirective, ChangepasswordComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbDropdownModule,
    NgbCollapseModule,
    PerfectScrollbarModule,
    FeahterIconModule,
    DirectivesModule,
    // MatDialogModule,
    TranslateModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSelectFilterModule,
    LayoutRoutingModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    // MatDialogModule

  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    UserService,
    NotifyService,
    DashboardService,
    ReportsService
  ]
})
export class LayoutModule { }
