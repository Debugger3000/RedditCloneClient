import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserRegister, UserRegisterData } from '../types/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient) {}


  // User Register api call
  registerUser(userData: UserRegisterData): Observable<any> {
    return this.http.post(`${environment.apiRoute}/user/register`, userData, {withCredentials: true});
  }
}
