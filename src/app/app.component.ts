import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  // template: `
  
  // <router-outlet/>
  // `
})
export class AppComponent implements OnInit{
  title = 'myredditclone';

  
  



  ngOnInit(): void {
    // log out the environment we are currently in
    console.log("Environment: ", environment.buildType);

    //check if user is logged in...

  }





}
