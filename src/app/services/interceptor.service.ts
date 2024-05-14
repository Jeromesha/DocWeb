import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { UserSessionService } from './usersession.service';
import { AuthenticationService } from './authentication.service';
import { AlertService } from './alert.service';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import swal from 'sweetalert2';
import { UserService } from './user.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from './loader.service';

@Injectable()

export class HttpInterceptorService implements HttpInterceptor {

    private baseUrl = environment.apiBaseUrl;

    constructor(
        private router: Router,
        private sessionService: UserSessionService,
        private authService: AuthenticationService,
        private alertService: AlertService,
        private toaster: ToastrService,
        private loaderService: LoaderService,
        public translate: TranslateService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.show();
        const started = Date.now();

        // add authorization header with jwt token if available
        const authToken = this.sessionService.authToken();
        const isTokenEndPoint = request.url.match('/api/token');
        if (isTokenEndPoint === null && this.sessionService.userId() && authToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${authToken}`,
                }
            });
        }

        return next.handle(request).pipe(tap((event: any) => {
            if (event instanceof HttpResponse) {
                const action = request.urlWithParams.replace(this.baseUrl, '');
                const elapsed = Date.now() - started;
                this.loaderService.hide();
            }
        }, (error: any) => {
            if (error instanceof HttpErrorResponse) {
                debugger
                if (error.status === 401) {
                    this.toaster.warning("Your session has timed out. Please log in again to continue.");
                    this.authService.logOut();
                    this.router.navigate(['/auth/login']);
                } else if (error.status === 403) {
                    this.forceLogout();
                } else {
                    this.broadcastFriendlyErrorMessage(error);
                }
                this.loaderService.hide();
            }
            return throwError(error);
        })) as any;
    }

    broadcastFriendlyErrorMessage(rejection) {
        let msg = '';
        if (rejection.status === 0 && (rejection.statusText === '' || rejection.statusText === 'Unknown Error')) {
            this.alertService.error('Unable to connect to the server, please try again in a couple of seconds.');
        } else if (rejection.status == 429) {
            this.alertService.error('You are allowed to send only one OTP every 3 minutes, so try after sometime.');
        } else if (rejection.status === 400) {
            if (rejection.error) {// jshint ignore:line
                msg = (rejection.error.message) ? rejection.error.message : rejection.error; // jshint ignore:line
            }
            this.alertService.error(msg);
        } else if (rejection.status === 404) {
            if (rejection.message) {
                this.alertService.error(rejection.message);
            }
        } else if (rejection.status === 500) {
            if (rejection.error && rejection.error.Message) {
                this.alertService.error(rejection.error.Message);
            } else if (rejection.message) {
                const message = rejection.message;
                this.alertService.error(message);
            }
        } else if (rejection.status === 409) {
            if (rejection.error && rejection.error.Message) {
                this.alertService.error(rejection.error.Message);
            } else if (rejection.message) {
                const message = rejection.message;
                this.alertService.error(message);
            }
        } else if (rejection.responseStatus === 401) {
            this.authService.logOut();
            this.router.navigate(['/login']);
        } else if (rejection.responseStatus === 0) {
            this.alertService.error('Error occured, while uploading file');
        } else if (rejection.responseStatus === 400) {
            if (rejection.response) { // jshint ignore:line
                msg = rejection.response; // jshint ignore:line
            }
            this.alertService.error(msg);
        }
    }

    forceLogout() {
        swal.fire({
            title: 'Logout',
            text: 'Another user logged in to your account',
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok',
        }).then((result) => {
            if (result.value) {
                this.authService.logOut();
                this.router.navigate(['/auth/login']);
            }
        })
    }
}
