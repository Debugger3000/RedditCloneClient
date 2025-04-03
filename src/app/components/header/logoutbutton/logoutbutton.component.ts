import { Component, inject } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logoutbutton',
  imports: [],
  templateUrl: './logoutbutton.component.html',
  styleUrl: './logoutbutton.component.scss'
})
export class LogoutbuttonComponent {
  constructor(private router : Router){}

  loginService = inject(LoginService);


  logout() { 
    this.loginService.logoutApi().subscribe({
      next: (data) => {
        console.log("Data received back from logout: ", data);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log("Error on logout: ", error);
      }
    })
  }

}
