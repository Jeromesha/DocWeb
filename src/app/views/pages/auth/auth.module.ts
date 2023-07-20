import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleService } from 'src/app/services/role.service';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ForgotpasswordeventComponent } from './forgotpassword/forgotpasswordevent.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DirectivesModule } from '../../layout/directives/directives.module';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'ForgotpasswordeventComponent',
        component: ForgotpasswordeventComponent
      }
    ]
  },
]

@NgModule({
  declarations: [LoginComponent, AuthComponent, ForgotpasswordeventComponent],
  providers: [AuthenticationService, RoleService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatDialogModule,
    NgbModule,
    RouterModule.forChild(routes),
    DirectivesModule
  ]
})
export class AuthModule { }
