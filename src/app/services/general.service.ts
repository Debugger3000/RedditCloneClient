import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
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

  // private currentView = new BehaviorSubject<string>('');
  // public currentView$ = this.currentView.asObservable();
  currentUserData: UserData = null;
  showHeader: boolean = true;

  // auth.service.ts
  async initUser(): Promise<void> {
    console.log('grabbing user data if there is any in INIT USER');
    return firstValueFrom(
      this.http.post<{
        status: boolean;
        _id: string;
        username: string | null;
        profileImage: string | null | undefined;
        votes: Votes;
        voteOnComments: VotesComments;
      }>('/api/user/isAuth', {}, { withCredentials: true })
    )
      .then((user) => {
        this.currentUserData = user;
        console.log('Session restored:', user);
      })
      .catch(() => {
        this.currentUserData = null;
        console.log('No active session.');
      });
  }

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

  // change current View
  // changeMainView(newView: string): void {
  //   this.currentView.next(newView);
  // }

  // editprofie
  editProfileApi(
    object: { profileImage: string | ArrayBuffer | null | undefined },
    userId: string | null | undefined
  ) {
    return this.http.post(
      `${environment.apiRoute}/user/edit-profile/${userId}`,
      object,
      { withCredentials: true }
    );
  }
}
