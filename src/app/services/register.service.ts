import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserRegister, UserRegisterData } from '../types/user';
import { Observable } from 'rxjs';
import { GeneralService } from './general.service';

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
