import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import {map, switchMap} from 'rxjs/operators';

import { User } from '../../../classes/User';
import { AlertService } from './alert.service';
import { Alert } from '../../../classes/alert';
import { SignUpVM } from '../../../classes/SignUpVM';
import { UserStateResponse } from '../../../classes/UserStateResponse';
import { AlertType } from '../../../enums/alert-type.enum';
import { Loginvm } from '../../../classes/loginvm';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoginSubject = new BehaviorSubject<boolean>(this.isAuth());
  private currentUserSubject = new BehaviorSubject<User | null>(null);


  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertService: AlertService
  ) { }

  isLoggedIn(): Observable<boolean> {
    if(this.isExpirationDateValid) {
      this.isLoginSubject.next(true);
    }
    return this.isLoginSubject.asObservable();
  }

  currentUser(): Observable<User> {
    return this.currentUserSubject.asObservable();
  }

  public login(email: string, password: string): Observable<boolean> {
    const loginvm = new Loginvm(email, password);
    return this.httpClient.post<UserStateResponse>(`/api/account/login`, loginvm).pipe(map(resp => {
        if (resp.success) {
          this.isLoginSubject.next(true);
          this.currentUserSubject.next(resp.user);
          this.SetUserStateResponse(resp);
          return true;
        } else {
          this.alertService.alerts.next(new Alert(resp.message, AlertType.Danger));
          return false;
        }
      }));
}

      public isAuth(): boolean {
        if (localStorage.getItem('userState') === null) {
          return false;
        } else {
          const state: UserStateResponse = JSON.parse(localStorage.getItem('userState'));
          if (state.success && state.tokenExpiration > new Date()) {
            return true;
          } else {
            return false;
          }
        }
      }

public signup(firstName: string, lastName: string, email: string, password: string): Observable<boolean> {
      const vm =  new SignUpVM(firstName, lastName, email, password);
      return this.httpClient.post<UserStateResponse>(`/api/account/signup`, vm)
      .pipe(map(resp => {
        if (resp.success) {
          this.isLoginSubject.next(true);
          this.currentUserSubject.next(resp.user);
          this.SetUserStateResponse(resp);
          return true;
        } else {
          this.alertService.alerts.next(new Alert(resp.message, AlertType.Danger));
          return false;
        }
      }));
    }

    public updateProfile(user: User): Observable<boolean> {
      return this.httpClient.post<UserStateResponse>(`/api/account/updateProfile`, user)
      .pipe(map(resp => {
        if (resp.success) {
          this.currentUserSubject.next(resp.user);
          this.SetUserStateResponse(resp);
          return true;
        } else {
          this.alertService.alerts.next(new Alert(resp.message, AlertType.Danger));
          return false;
        }
      }));
    }

private SetUserStateResponse(resp: UserStateResponse): void {
  localStorage.setItem('userState', JSON.stringify(resp));
}

private isExpirationDateValid(): boolean {
  if (localStorage.getItem('userState') === null) {
    return false;
  } else {
    const state: UserStateResponse = JSON.parse(localStorage.getItem('userState'));
    if (new Date(state.tokenExpiration) > new Date) {
      return true
    } else {
      return false;
    }
  }
}

public getToken(): string {
  if (localStorage.getItem('userState') === null) {
    return null;
  } else {
    const state: UserStateResponse = JSON.parse(localStorage.getItem('userState'));
    if (state.tokenExpiration < new Date()) {
      localStorage.removeItem('userState');
      this.router.navigate(['/login']);
    }
    return state.token;
  }

}

public getCurrentUser(): Observable<User> {
  return this.isLoginSubject.pipe(switchMap((islogin)=>{
    if (islogin || this.isExpirationDateValid()) {
      return this.httpClient.get<User>(`/api/account/currentuser`);
    } else {
      return of(null);
        }
    }))
  }


public getUser(id: string): Observable<User> {
  return this.httpClient.get<User>(`/api/account/user/${id}`);
}

public logout(): void {
    this.httpClient.get(`/api/account/logout`);

    this.router.navigate(['/login']);
    this.alertService.alerts.next(new Alert('Signed out'));
    this.currentUserSubject.next(null);
    this.isLoginSubject.next(false);
    localStorage.removeItem('userState');

}

public loginProviders() {
    return this.httpClient.get<string[]>(`/api/account/providers`);
}
}
