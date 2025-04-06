import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private router: Router) { }

  // controller for home/main middle section
  // variable controlling the current view of the middle section 
  // (new/edit thread, new post, home page showing threads, a thread / its posts)
  currentViewObject = '';

  private currentView = new BehaviorSubject<string>(''); // Initial value
  public currentView$ = this.currentView.asObservable(); // Observable for the component to subscribe to



  // Link to another page function for whole application
  LinkToPage(route: string) {
    this.router.navigate([route]);
  }

  // params link
  linkWithParams(page: string, param: string) {
    this.router.navigate([page,param]);
  }

  // change current View
  changeMainView(newView: string): void {
    this.currentView.next(newView);
  }

}
