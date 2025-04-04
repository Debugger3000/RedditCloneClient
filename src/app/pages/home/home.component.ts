import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { GroupThreadsComponent } from '../../components/group-threads/group-threads.component';
import { SideThreadsComponent } from '../../components/side-threads/side-threads.component';
import { Subscription } from 'rxjs';
import { GeneralService } from '../../services/general.service';
import { MainSectionComponent } from '../main-section/main-section.component';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, GroupThreadsComponent, SideThreadsComponent, MainSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy{

  constructor(private generalService: GeneralService, private loginService: LoginService) {}

  // just for side panel
  sidePanelState = false;

  currentViewVariable: string = 'home'
  private subscription: Subscription = Subscription.EMPTY; // To hold the subscription for cleanup


  

  ngOnInit(): void {
    // Subscribe to the observable from the service
    this.subscription = this.generalService.currentView$.subscribe((value: string) => {
      this.currentViewVariable = value; // Update the component variable when the service variable changes
    });

    // check user auth to get header and stuff
    //check if user is logged in...
    this.loginService.checkAuth().subscribe({
      next: (data) => {
        console.log("Data from is user Authenticated ", data);
        this.loginService.isAuthenticated = true;
      },
      error: (error) => {
        console.log("Error with checking if user is Authenticated:", error);
      }
    })
  }

  ngOnDestroy(): void {
    // Always clean up the subscription to avoid memory leaks
    this.subscription.unsubscribe();
  }









  // side panel click
  sidePanelClick() {
    this.sidePanelState = !this.sidePanelState;
  }

}
