import { Component, inject, Input, OnInit } from '@angular/core';
import { GeneralService } from '../../../services/general.service';
import { DefaultUserImageComponent } from '../../micro/default-user-image/default-user-image.component';

@Component({
  selector: 'app-post-view-outside',
  imports: [DefaultUserImageComponent],
  templateUrl: './post-view-outside.component.html',
  styleUrl: './post-view-outside.component.scss'
})
export class PostViewOutsideComponent implements OnInit{
  constructor() {}
  generalService = inject(GeneralService);

  @Input() title: string | null = '';
  @Input() textContent: string | null = '';
  @Input() createdAt: string | null = '';
  @Input() user: string | null = '';
  @Input() postId: string | null = '';
  @Input() tag: string | null = '';
  @Input() parentThreadImage: string | null | undefined = '';

  // post outside in home or macro, shows thread image
  // post outside in the thread itself, should show user profileImage
  @Input() type: string = '';

  username: string | null = '';
  postUsersProfileImage: string = '';


  ngOnInit(): void {
    
    //get users
    this.generalService.getUserById(this.user).subscribe({
      next: (data: any) => {
        console.log("Current User data on post...  ", data);
        this.username = data.username;
        this.postUsersProfileImage = data.profileImage;
      },
      error: (error) => {
        console.log("Error for getting user by id for post data:", error);
      }

    });

  }



  // This will take post data for a single post

}
