import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/app/services/usersession.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor
  (
    private router: Router,
    private userSessionService: UserSessionService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let menuItems = [];
    const paths = [];
    const menu = this.userSessionService.getLocalStorageWithKey('menu');
    if (menu) {
      menuItems = JSON.parse(menu);
    }
    if (localStorage.getItem('isLoggedin')) {
      if (state.url === '/dashboard') return true;
      if (menuItems && menuItems.length > 0 && localStorage.getItem('isLoggedin')) {
        menuItems.forEach(field => {
          if (field.link) { paths.push(field.link); }
          if (field.subItems && field.subItems.length > 0) {
            field.subItems.forEach(sm => { if (sm.link) { paths.push(sm.link); } });
          }
        });
        if (paths.indexOf(state.url) >= 0) {
          return true;
        } else {
          const urls = state.url.split('/');
          if (urls.length > 1 && paths.indexOf('/' + urls[1]) >= 0) {
            return true;
          }
        }
      }
    } else {
      this.router.navigate(['/auth']);
    }
    this.router.navigate(['/auth']);
    // this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
    return true;
  }
}