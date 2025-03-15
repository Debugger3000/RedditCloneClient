import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  
  registerService = inject(RegisterService);

  onSubmit() {
    this.registerService.testAPI().subscribe(data => {
      console.log("Data received from register GET: ", data);

    });
  }
}
