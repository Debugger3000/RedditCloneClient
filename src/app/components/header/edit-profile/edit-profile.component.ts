import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { GeneralService } from '../../../services/general.service';
import { Router } from '@angular/router';
import { UserData } from '../../../types/user';

@Component({
  selector: 'app-edit-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit{
  constructor(private router: Router) {}
  generalService = inject(GeneralService);


  
  username: string | null = '';
  imagePreview: any = null;




  ngOnInit(): void {

    this.generalService.getUserById(this.generalService.currentUserData?._id).subscribe({
      next: (data: any) => {
        console.log("Data from new thread... ", data);
        this.username = data.username;
        this.imagePreview = data.profileImage;
        
      },
      error: (error) => {
        console.log("Error for creating new thread:", error);
      }

    })
  }


  onFileChange(event: any) {
    const file = event.target.files;
    const fileRead = new FileReader();
  
    fileRead.onloadend = () => {
      this.imagePreview = fileRead.result; // Set image preview (Base64 for display)
    }

    fileRead.readAsDataURL(file[0]);
  }

  // create form items
  userForm = new FormGroup({
    profileImage: new FormControl()
  })

  // on submit for thread
  postFormSubmit() {
    // this.threadForm.setValue()

    // console.log("thread form: ", this.threadForm.value);
    const object = this.userForm.value;
    // console.log("array: ",this.linkArray);

    const newObject = {profileImage: this.imagePreview };
    console.log("new object: ", newObject);


  

    this.generalService.editProfileApi(newObject, this.generalService.currentUserData?._id).subscribe({
      next: (data: any) => {
        console.log("Data from new thread... ", data);
        this.router.navigate(['home']);
      },
      error: (error) => {
        console.log("Error for creating new thread:", error);
      }
    });
  }

}
