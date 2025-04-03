import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLoginData } from '../types/user';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}


  // User Register api call
  loginUser(userData: UserLoginData): Observable<any> {
    return this.http.post(`${environment.apiRoute}/user/login`, userData, {withCredentials: true});
  }

  // User logout 
  logoutApi(){
    return this.http.post(`${environment.apiRoute}/user/logout`,{}, {withCredentials: true});
  }
}
