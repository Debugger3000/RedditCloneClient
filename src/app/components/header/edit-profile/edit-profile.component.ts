import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { GeneralService } from '../../../services/general.service';
import { Router } from '@angular/router';
import { UserData } from '../../../types/user';
import { FirebaseBlobComponent } from '../../firebase-blob/firebase-blob.component';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-edit-profile',
  imports: [ReactiveFormsModule, FirebaseBlobComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent implements OnInit {
  constructor(private router: Router, private loginService: LoginService) {}
  generalService = inject(GeneralService);

  username: string | null | undefined = '';
  imagePreview: string | null | undefined = '';
  firebase: boolean = false;

  // resource limiter
  isEditLimitReached = false;
  message = '';

  firebaseCallbackBound!: (
    imageObject: { url: string; filePath: string } | null
  ) => void;

  ngOnInit(): void {
    console.log('user data:', this.generalService.getCurrentUserData());
    this.username = this.generalService.currentUserData?.username;
    this.imagePreview = this.generalService.currentUserData?.profileImage;

    this.firebaseCallbackBound = this.postFormSubmit.bind(this);
  }

  // create form items
  userForm = new FormGroup({
    profileImage: new FormControl(),
  });

  // on submit for thread
  postFormSubmit(imageObject: { url: string; filePath: string } | null) {
    // this.threadForm.setValue()

    // make sure there is data to post...
    if (imageObject) {
      // console.log("thread form: ", this.threadForm.value);
      // const object = this.userForm.value;
      // console.log("array: ",this.linkArray);

      const newObject = {
        profileImage: imageObject.url,
        profileImagePath: imageObject.filePath,
      };
      console.log('new object: ', newObject);

      this.generalService
        .editProfileApi(newObject, this.generalService.currentUserData?._id)
        .subscribe({
          next: (data: any) => {
            console.log('Data from new thread... ', data);
            this.loginService.checkAuth().subscribe({
              next: (data) => {
                this.generalService.setUserData(data);
                this.loginService.isAuthenticated = true;
              },
              error: (error) => {
                console.log(
                  'Error with checking if user is Authenticated:',
                  error
                );
              },
            });
            // route to home after profile has updated...
            this.router.navigate(['home']);
          },
          error: (error) => {
            console.log('Error for editing profile:', error);
            if (error.status === 404 && !error.error.status) {
              this.isEditLimitReached = true;
              this.message = error.error.message;
            }
          },
        });
    }
  }

  // on submit for
  formSubmit() {
    this.firebase = true; // should trigger firebase to submit its data first
  }
}
