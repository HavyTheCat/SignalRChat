import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { AuthService } from '../Shared/Services/auth.service';
import { AlertService } from '../Shared/Services/alert.service';
import { map, take, tap } from 'rxjs/operators';
import { Alert } from '../../classes/alert';
import { AlertType } from '../../enums/alert-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router,
              private alertService: AlertService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.currentUser.pipe(
      take(1),
      map((currentUser) => !!currentUser),
      tap((loggedIn) => {
        if (!loggedIn) {
          this.alertService.alerts.next(new Alert('Login to access', AlertType.Danger));
          this.router.navigate(['login'], {queryParams: {returnUrl: state.url}});
        }
      })
    );
  }
}
