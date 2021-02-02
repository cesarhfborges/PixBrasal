import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';
import {LoadingController} from '@ionic/angular';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService,
        private loadingController: LoadingController,
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(e => {
            if (e.status === 401 && e.error.error === 'Provided token is expired.') {
                this.refreshToken();
            }
            return throwError(e);
        }));
    }


    private refreshToken() {
        if (this.authService.isAuthenticated()) {
            this.authService.tokenRefresh().subscribe(
                response => {
                    if (response && response.access_token) {
                        this.loadingController.create({
                            spinner: 'circles',
                            message: 'Aguarde atualizando sessão...',
                            translucent: true,
                            duration: 20000,
                            cssClass: 'custom-loading',
                            backdropDismiss: false,
                        }).then(l => l.present());
                        const credentials = JSON.parse(localStorage.getItem('credentials'));
                        credentials.access_token = response.access_token;
                        localStorage.setItem('credentials', JSON.stringify(credentials));
                        setTimeout(_ => {
                            window.location.reload();
                        }, 1200);
                    }
                },
                error => {
                    console.log(error);
                }
            );
        }
    }
}
