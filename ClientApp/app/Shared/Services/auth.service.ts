import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { User } from '../../../classes/User';
import { AlertService } from './alert.service';
import { Alert } from '../../../classes/alert';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: Observable<User | null>;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertService: AlertService
  ) {
    this.currentUser = of(null);
  }

  public getToken() {
    return localStorage.getItem('auth_token');
}

public signup(firstName: string, lastName: string, email: string, password: string): Observable<boolean> {
     // return this.httpClient.post<boolean>(`/api/account/register`, lastName);
     return of(true);

    }

public login(email: string, password: string): Observable<boolean> {
    //return this.httpClient.post<boolean>(`/api/account/login`, { email, password });
    this.currentUser = new Observable<User>();
    return of(true);
}

public logout(): void {
    //return this.httpClient.post(`/api/account/logout`, {});
    this.router.navigate(['/login']);
    this.alertService.alerts.next(new Alert('Signed out'));

}

public loginProviders() {
    return this.httpClient.get<string[]>(`/api/account/providers`);
}

public GetcurrentUser() {
    return this.httpClient.get<User>(`/api/account/current-user`);
}
}
