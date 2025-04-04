import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { HeaderComponent } from './components/header/header.component';
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { MainSectionComponent } from "./pages/main-section/main-section.component";
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, HeaderComponent, SidePanelComponent, MainSectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  // template: `
  
  // <router-outlet/>
  // `
})
export class AppComponent implements OnInit{
  loginService = inject(LoginService);

  title = 'myredditclone';

  


  



  ngOnInit(): void {
    // log out the environment we are currently in
    console.log("Environment: ", environment.buildType);

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





}
