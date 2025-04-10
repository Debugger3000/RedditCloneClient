import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserData } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private router: Router, private http: HttpClient) { }

  // controller for home/main middle section
  // variable controlling the current view of the middle section 
  // (new/edit thread, new post, home page showing threads, a thread / its posts)
  // currentViewObject = '';

  // private currentView = new BehaviorSubject<string>('');
  // public currentView$ = this.currentView.asObservable(); 
  currentUserData: UserData = null;
  showHeader: boolean = true;
  

  // Get and store current user Data
  setUserData(data: UserData) {
    this.currentUserData = data;
    console.log("Current user data variable: ",this.currentUserData);
  }

  // Get a user by ID
  getUserById(userId: string | null | undefined){
    return this.http.get(`${environment.apiRoute}/user/${userId}`,{withCredentials: true});
  }


  // Link to another page function for whole application
  LinkToPage(route: string) {
    this.router.navigate([route]);
  }

  // params link
  linkWithParams(page: string, param: string) {
    console.log("link with params ran with: ",page);
    console.log("link with params ran with: ",param);
    this.router.navigate([page,param]);
  }

  getCurrentUserData() {
    return this.currentUserData;
  }

  // change current View
  // changeMainView(newView: string): void {
  //   this.currentView.next(newView);
  // }

  // editprofie
  editProfileApi(object: {username: string | null | undefined; profileImage: string | ArrayBuffer | null | undefined;}, userId: string | null | undefined) {
    return this.http.post(`${environment.apiRoute}/user/edit-profile/${userId}`,object,{withCredentials: true});
  }

}
