import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  constructor(private router: Router){}

  loginService = inject(LoginService);
  generalService = inject(GeneralService);


  // create form items
  userLoginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  onSubmitLogin() {
    this.loginService.loginUser(this.userLoginForm.value).subscribe({
      next: (data) => {
        console.log("Data received back from login: ", data);
        // set user data
        this.generalService.setUserData({username: data.username, _id: data._id});
        this.router.navigate(['home']);
      },
      error: (error) => {
        console.log("Error on login: ", error);
      }
    });
  }


  ngOnInit(): void {
    //check if user is logged in...
    this.loginService.checkAuth().subscribe({
      next: (data) => {
        console.log("Data from is user Authenticated ", data);
        this.loginService.isAuthenticated = true;
      },
      error: (error) => {
        this.loginService.isAuthenticated = false;
        console.log("Error with checking if user is Authenticated:", error);
      }
    })
  }


  // login github
  loginGithub() {
    console.log("github button pressed.....");
    this.loginService.githubLogin();
    
    // .subscribe({
    //   next: (data) => {
    //     console.log("Data from GITHUB LOGIN ", data);
    //     this.loginService.isAuthenticated = true;
    //   },
    //   error: (error) => {
    //     this.loginService.isAuthenticated = false;
    //     console.log("Error with checking if GITHUB LOGIN WORKED:", error);
    //   }

    // })
  }

}
