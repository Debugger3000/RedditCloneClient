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
    // check to see if user has voted on this post or not
    this.userVote = this.voteService.checkUserVote(this.postData?._id);
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

  // refresh component after vote has been clicked
  refreshVote(state: boolean) {
    this.userVote = state;
    console.log('teheheheheheheheheheheheehehehe:', state);
  }

  // This will take post data for a single post
}
