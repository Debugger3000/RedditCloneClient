import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  // templateUrl: './app.component.html',
  // styleUrl: './app.component.scss',
  template: `
  
  <router-outlet/>
  `
})
export class AppComponent {
  title = 'myredditclone';
}
