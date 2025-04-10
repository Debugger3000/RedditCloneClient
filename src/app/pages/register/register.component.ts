import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private router: Router) {}
  
  registerService = inject(RegisterService);
  generalService = inject(GeneralService);

  // create form items
  userRegisterForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  })


  onSubmitRegister() {
    this.registerService.registerUser(this.userRegisterForm.value).subscribe({
      next: (data) => {
        console.log("Data received back from Register: ", data);
        this.generalService.setUserData({username: data.username, _id: data._id, profileImage: data.profileImage});
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log("Error on login: ", error);
      }
    });
  }

  // go home
  goHome(route: string) {
    this.generalService.LinkToPage(route);
    this.generalService.showHeader = true;
  }

}
