import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router){}

  loginService = inject(LoginService);


  // create form items
  userLoginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  onSubmitLogin() {
    this.loginService.loginUser(this.userLoginForm.value).subscribe({
      next: (data) => {
        console.log("Data received back from login: ", data);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log("Error on login: ", error);
      }
    });
  }

}
