import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLoginData } from '../types/user';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {}

  // if user is authenticated
  isAuthenticated = false;


  // User Register api call
  loginUser(userData: UserLoginData): Observable<any> {
    return this.http.post(`${environment.apiRoute}/user/login`, userData, {withCredentials: true});
  }

  // User logout 
  logoutApi(){
    return this.http.post(`${environment.apiRoute}/user/logout`,{}, {withCredentials: true});
  }

  // check if user is authenticated
  checkAuth() : Observable<{status: boolean, _id: string, username: string | null}> {
    return this.http.post<{status: boolean, _id: string, username: string | null}>(`${environment.apiRoute}/user/isAuth`,{}, {withCredentials: true});
  }

  // login for github
  githubLogin() {
    // return this.http.get(`${environment.apiRoute}/user/auth/github`, {withCredentials: true});
    window.location.href = `${environment.apiRoute}/user/auth/github`;
    console.log("back in github login first window redirect from github button press");
    
    console.log(document.cookie);
    this.router.navigate(['/home']);
  }
}
