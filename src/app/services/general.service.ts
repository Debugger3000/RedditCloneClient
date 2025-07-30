import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserData, Votes, VotesComments } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor(private router: Router, private http: HttpClient) {}

  // controller for home/main middle section
  // variable controlling the current view of the middle section
  // (new/edit thread, new post, home page showing threads, a thread / its posts)
  // currentViewObject = '';
  private userData = new Subject<UserData>(); // or any payload
  userData$ = this.userData.asObservable();

  // private currentView = new BehaviorSubject<string>('');
  // public currentView$ = this.currentView.asObservable();
  currentUserData: UserData = null;
  showHeader: boolean = true;

  // Get and store current user Data
  setUserData(data: UserData) {
    if (data) {
      this.currentUserData = {
        username: data.username,
        _id: data._id,
        profileImage: data.profileImage,
        votes: data.votes,
        voteOnComments: data.voteOnComments,
      };
      // do this so we can observe this change and have components act well...
      this.userData.next(data);
    }
    console.log('Current user data variable: ', this.currentUserData);
  }

  // Get a user by ID
  getUserById(userId: string | null | undefined): Observable<any> {
    return this.http.get(`${environment.apiRoute}/user/${userId}`, {
      withCredentials: true,
    });
  }

  // Link to another page function for whole application
  LinkToPage(route: string) {
    this.router.navigate([route]);
  }

  // params link
  linkWithParams(page: string, param: string) {
    console.log('link with params ran with: ', page);
    console.log('link with params ran with: ', param);
    this.router.navigate([page, param]);
  }

  getCurrentUserData() {
    return this.currentUserData;
  }

  // editprofie
  editProfileApi(
    object: { profileImage: string; profileImagePath: string },
    userId: string | null | undefined
  ) {
    return this.http.post(
      `${environment.apiRoute}/user/edit-profile/${userId}`,
      object,
      { withCredentials: true }
    );
  }
}
