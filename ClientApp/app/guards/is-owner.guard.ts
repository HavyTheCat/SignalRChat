import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../Shared/Services/auth.service';
import { AlertService } from '../Shared/Services/alert.service';
import { User } from '../../classes/User';
import { Alert } from '../../classes/alert';
import { AlertType } from '../../enums/alert-type.enum';

@Injectable({
  providedIn: 'root'
})
export class IsOwnerGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router,
              private alert: AlertService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.getCurrentUser().pipe(
      take(1),
      map((currUser: User) => !!currUser && currUser.id === next.params.userId),
      tap((isOwner) =>{
        if (!isOwner) {
          this.alert.alerts.next(new Alert('Not your profile', AlertType.Danger))
          this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        }
      } )
    )
  }
}
