import { Component, inject, Input, OnInit } from '@angular/core';
import { GeneralService } from '../../../services/general.service';
import { DefaultUserImageComponent } from '../../micro/default-user-image/default-user-image.component';
import { Router } from '@angular/router';
import { PostData } from '../../../types/post';
import { VotesComponent } from '../votes/votes.component';
import { TimestampComponent } from '../../micro/timestamp/timestamp.component';
import { VotesService } from '../../../services/votes.service';

@Component({
  selector: 'app-post-view-outside',
  imports: [DefaultUserImageComponent, VotesComponent, TimestampComponent],
  templateUrl: './post-view-outside.component.html',
  styleUrl: './post-view-outside.component.scss',
})
export class PostViewOutsideComponent implements OnInit {
  constructor(private router: Router, private voteService: VotesService) {}
  generalService = inject(GeneralService);

  // posts data for this thread
  @Input() postData: PostData | null = null;
  // post outside in home or macro, shows thread image
  // post outside in the thread itself, should show user profileImage
  @Input() type: string = '';

  // @Input() title: string | null = '';
  // @Input() textContent: string | null = '';
  // @Input() user: string | null = '';
  // @Input() postId: string | null = '';
  // @Input() tag: string | null = '';
  // @Input() parentThreadId: string | null | undefined = '';
  // @Input() parentThreadImage: string | null | undefined = '';
  // @Input() parentThreadTitle: string | null | undefined = '';
  // @Input() commentCount: number | null | undefined = null;

  username: string | null = '';
  postUsersProfileImage: string = '';

  // upvote / downvote var
  isUpVote = false;
  isDownVote = false;
  // true - UP
  // false - DOWN
  // null - no vote
  userVote: boolean | null | undefined = null;

  ngOnInit(): void {
    //get users
    // this.generalService.getUserById(this.user).subscribe({
    //   next: (data: any) => {
    //     // console.log("Current User data on post...  ", data);
    //     this.username = data.username;
    //     this.postUsersProfileImage = data.profileImage;
    //   },
    //   error: (error) => {
    //     console.log('Error for getting user by id for post data:', error);
    //   },
    // });

    // check to see if user has voted on this post or not
    this.userVote = this.voteService.checkUserVote(this.postData?._id);
    // console.log('usersvote: ', this.userVote);

    // console.log('post data ID: ', this.postData?._id);
    // console.log('Comment count value: ', this.commentCount);
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
  // checkUserVote() {
  //   // console.log(
  //   //   'users data from VOTE POST: ',
  //   //   this.generalService.currentUserData
  //   // );
  //   let votes = this.generalService.currentUserData?.votes;
  //   for (let i = 0; i < votes!.length; i++) {
  //     let id = votes![i].postId;
  //     let type = votes![i].voteType;
  //     // console.log('current vote ID:', votes![i]);
  //     // console.log('post id: ', this.postData?._id);
  //     // console.log('TYPE OF FCKN: ', type);
  //     if (id == this.postData?._id) {
  //       if (type !== null) {
  //         this.userVote = type;
  //         console.log('assigning a value i think now; ', type);
  //       }
  //       // console.log('users vote for this post is: ', item.typeOfVote);
  //     }
  //     // console.log('votes on index', i, votes![i]);
  //   }
  //   console.log('value of user vote now: ', this.userVote);
  // }

  // refresh component after vote has been clicked
  refreshVote(state: boolean) {
    this.userVote = state;
    console.log('teheheheheheheheheheheheehehehe:', state);
  }

  // This will take post data for a single post
}
