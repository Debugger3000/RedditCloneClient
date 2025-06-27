import { Component, inject, Input, OnInit } from '@angular/core';
import { GeneralService } from '../../../services/general.service';
import { DefaultUserImageComponent } from '../../micro/default-user-image/default-user-image.component';
import { Router } from '@angular/router';
import { PostData } from '../../../types/post';
import { VotesComponent } from '../votes/votes.component';

@Component({
  selector: 'app-post-view-outside',
  imports: [DefaultUserImageComponent, VotesComponent],
  templateUrl: './post-view-outside.component.html',
  styleUrl: './post-view-outside.component.scss',
})
export class PostViewOutsideComponent implements OnInit {
  constructor(private router: Router) {}
  generalService = inject(GeneralService);

  // posts data for this thread
  @Input() postData: PostData | null = null;

  @Input() title: string | null = '';
  @Input() textContent: string | null = '';
  @Input() createdAt: string | null = '';
  @Input() user: string | null = '';
  @Input() postId: string | null = '';
  @Input() tag: string | null = '';
  @Input() parentThreadId: string | null | undefined = '';
  @Input() parentThreadImage: string | null | undefined = '';
  @Input() parentThreadTitle: string | null | undefined = '';
  @Input() commentCount: number | null | undefined = null;

  // post outside in home or macro, shows thread image
  // post outside in the thread itself, should show user profileImage
  @Input() type: string = '';

  username: string | null = '';
  postUsersProfileImage: string = '';

  // upvote / downvote var
  isUpVote = false;
  isDownVote = false;
  // true - UP
  // false - DOWN
  // null - no vote
  userVote: boolean | null = null;

  ngOnInit(): void {
    //get users
    this.generalService.getUserById(this.user).subscribe({
      next: (data: any) => {
        // console.log("Current User data on post...  ", data);
        this.username = data.username;
        this.postUsersProfileImage = data.profileImage;
      },
      error: (error) => {
        console.log('Error for getting user by id for post data:', error);
      },
    });

    // check to see if user has voted on this post or not
    this.checkUserVote();

    console.log('Comment count value: ', this.commentCount);
  }

  // post clicked
  // a post is clicked...
  postClicked() {
    console.log('post has been clicked...');
    this.router.navigate([
      'thread',
      this.postData?.parentThread,
      this.postData?._id,
    ]);
  }

  // thread Clicked
  threadClicked() {
    this.router.navigate(['thread', this.postData?.parentThread]);
  }

  // hover up vote
  hoverUpVote() {
    this.isUpVote = !this.isUpVote;
  }

  // hover down vote
  hoverDownVote() {
    this.isDownVote = !this.isDownVote;
  }

  // outsourced to votes service since it will share this function with some other components
  // check is user has voted on this post
  checkUserVote() {
    this.generalService.currentUserData?.votes.forEach((item) => {
      // if item.postId is equal to postData._id then check for vote status, either up or down...
      if (item.postId === this.postData?._id) {
        if (item.typeOfVote) {
          this.userVote = true;
        } else {
          this.userVote = false;
        }
      }
    });
  }

  // This will take post data for a single post
}
