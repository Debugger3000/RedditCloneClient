import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { HeaderComponent } from './components/header/header.component';
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { MainSectionComponent } from './pages/main-section/main-section.component';
import { LoginService } from './services/login.service';
import { GeneralService } from './services/general.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    HeaderComponent,
    SidePanelComponent,
    MainSectionComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  // template: `

  // <router-outlet/>
  // `
})
export class AppComponent implements OnInit {
  loginService = inject(LoginService);
  generalService = inject(GeneralService);
  router = inject(Router);

  title = 'myredditclone';

  currentRoute: string = '';

  ngOnInit() {
    // log out the environment we are currently in
    console.log('Environment: ', environment.buildType);

    // await this.generalService.initUser();

    console.log('done running await in app comp...');

    this.currentRoute = this.router.url;

    // console.log('current route: ', this.currentRoute);

    // if(this.generalService.currentUserData == null){
    //   this.router.navigate(['home']);
    // }

    //check if user is logged in...
    this.loginService.checkAuth().subscribe({
      next: (data) => {
        // console.log("Data from is user Authenticated ", data);

        this.generalService.setUserData({
          _id: data._id,
          username: data.username,
          profileImage: data.profileImage,
          votes: data.votes,
          voteOnComments: data.voteOnComments,
        });

        console.log('set user data from app component: ', data);
        this.loginService.isAuthenticated = true;

        // console.log(this.router.url);
        // console.log('cookie: ', document.cookie);
      },
      error: (error) => {
        console.log('Error with checking if user is Authenticated:', error);
      },
    });
  }
}
