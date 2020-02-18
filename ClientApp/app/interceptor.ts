import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { AlertService } from './Shared/Services/alert.service';
import { Alert } from '../classes/alert';
import { AlertType } from '../enums/alert-type.enum';
import { AuthService } from './Shared/Services/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private alertServ: AlertService,
                private auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
        setHeaders: {
            Authorization : `Bearer ${this.auth.getToken()}`
          }
    });
    return next.handle(request).pipe( retry(1), catchError((err: HttpErrorResponse) => {
        let errMessage = '';
        if (err.error instanceof ErrorEvent) {
            errMessage = `Error: ${err.error.message}`;
        } else {
            errMessage = `Error Code: ${err.status}\nMessage: ${err.message}`;
        }
        this.alertServ.alerts.next(new Alert(errMessage, AlertType.Danger));
        throw(err.statusText);
    }));
}
}


