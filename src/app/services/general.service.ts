import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private router: Router) { }


  // Link to another page function for whole application
  LinkToPage(route: string) {
    this.router.navigate([route]);
  }

}
