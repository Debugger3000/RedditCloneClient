import { Component, Input, OnInit } from '@angular/core';
import { ThreadData } from '../../../types/thread';
import { Post, PostData } from '../../../types/post';
import { ThreadDisplayComponent } from '../../threads/thread-display/thread-display/thread-display.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, NgFor, NgClass } from '@angular/common';
import { ThreadsService } from '../../../services/threads.service';
import { PostService } from '../../../services/post.service';
import { GeneralService } from '../../../services/general.service';
import { Observable } from 'rxjs';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { CommentsService } from '../../../services/comments.service';
import { Comment, LiveComment } from '../../../types/comment';
import { CommentDisplayComponent } from '../../comment-display/comment-display.component';
import { VotesComponent } from '../votes/votes.component';
import { VotesService } from '../../../services/votes.service';
import { TimestampComponent } from '../../micro/timestamp/timestamp.component';
import { ThreadSideinfoComponent } from '../../threads/thread-sideinfo/thread-sideinfo.component';

@Component({
  selector: 'app-post-view',
  imports: [
    ThreadDisplayComponent,
    NgFor,
    NgClass,
    ReactiveFormsModule,
    CommentDisplayComponent,
    VotesComponent,
    TimestampComponent,
    ThreadSideinfoComponent,
  ],
  templateUrl: './post-view.component.html',
  styleUrl: './post-view.component.scss',
})
export class PostViewComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private threadService: ThreadsService,
    private postService: PostService,
    public generalService: GeneralService,
    private commentService: CommentsService,
    private voteService: VotesService
  ) {}

  // thread data
  @Input() threadData: ThreadData = {
    _id: '',
    title: 'loading',
    bio: 'loading bio',
    followersCount: 0,
    followers: [''],
    posts: [''],
    owner: '',
    links: [''],
    threadImage: '',
    tags: [''],
    createdAt: '',
    updatedAt: '',
    __v: 0,
  };
  // posts data for this thread
  postData: PostData | null = {
    _id: '',
    title: '',
    textContent: '',
    commentCount: null,
    voteCount: null,
    owner: '',
    parentThread: '',
    parentThreadImage: '',
    parentThreadTitle: '',
    tag: '',
    createdAt: '',
    updatedAt: '',
    __v: 0,
  };

  // postData$: Observable<{posts: PostData}>;
  commentData: LiveComment | null = null;

  // amount of

  // thread id
  threadId: string | null = '';
  // post id
  postId: string | null = '';

  // username
  username: string = '';

  // commentParent id
  commentParent: string | null | undefined = '';

  // focus for comment
  isFocusComment: boolean = false;

  // upvote boolean
  isUpVote = false;
  isDownVote = false;
  userVote: boolean | null | undefined = null;

  // form group
  // create form items
  postComment = new FormGroup({
    commentText: new FormControl(''),
  });

  // ---------------- VOTE
  // refresh component after vote has been clicked
  refreshVote(state: boolean) {
    this.userVote = state;
    console.log('teheheheheheheheheheheheehehehe:', state);
  }

  // set comment id for a reply onto another comment...
  // callback function to child component
  handleCommentReply = (commentId: string | null | undefined) => {
    console.log(
      'You just pressed reply to a comment on the child component! ',
      commentId
    );
    this.isFocusComment = !this.isFocusComment;
    // change parent comment to commentId parameter
    this.commentParent = commentId;
  };

  postCommentForm() {
    // post through api...
    const newObject: Comment = {
      parentThread: this.postData?._id,
      parentComment: this.commentParent,
      commentText: this.postComment.value.commentText,
      owner: this.generalService.currentUserData?._id,
      ownerUserName: this.generalService.currentUserData?.username,
      ownerPicture: this.generalService.currentUserData?.profileImage,
    };

    // call comment api to post...
    this.commentService.createComment(newObject).subscribe({
      next: (data: any) => {
        console.log('posting comment worked well haha !', data);
        this.postComment.reset(); // empty text area comment field
        this.deFocusComment(); // close text area
        // successful comment so now refresh comments !!!
        this.getComments();
      },
      error: (error) => {
        console.log('Error for posting comment:', error);
      },
    });
    console.log('Posting the comment form calling client api point...');
  }

  // user clicks on general 'add a comment' field, so they are commenting on the thread, therefore commentParent is ''
  focusComment() {
    this.isFocusComment = !this.isFocusComment;
    // clicked on master comment so user is commenting on the thread, and NOT a comment
    this.commentParent = '';
  }

  // cancel is clicked so commentId needs to be set to '', such that reply comment id is not set anymore
  deFocusComment() {
    this.isFocusComment = !this.isFocusComment;
    this.commentParent = '';
  }

  // commentOnComment(commentId: string) {
  //   this.isFocusComment = !this.isFocusComment;
  //   this.commentParent = commentId;
  // }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.threadId = params.get('id');
      this.postId = params.get('idPost');
      // console.log('thread ID:', this.threadId);
      // console.log('post  ID:', this.postId);
    });

    //get post data
    this.getPost();

    // get users vote
    if (this.generalService.currentUserData) {
      this.userVote = this.voteService.checkUserVote(this.postId);
    }

    // get thread data
    this.getThreadCall();

    // get comments for this post
    this.getComments();
  }

  // get all comments for a post
  getComments() {
    this.commentService.getCommentsByPost(this.postId).subscribe({
      next: (data: any) => {
        console.log('Current comment data for this post  ', data);
        this.commentData = data;
      },
      error: (error) => {
        console.log('Error for getting current comment data:', error);
      },
    });
  }

  // get Thread call function
  getThreadCall() {
    // should grab its own threads data from id in the url route
    this.threadService.getThread(this.threadId).subscribe({
      next: (data: any) => {
        // console.log('Current THREAD PAGE DATA...  ', data);
        this.threadData = data;
      },
      error: (error) => {
        console.log('Error for getting current thread page data:', error);
      },
    });
  }

  // get a post by id
  getPost() {
    this.postService.getPost(this.postId).subscribe({
      next: (data: any) => {
        // console.log('Current post data...  ', data);
        this.postData = data;

        console.log('log for data.post._id: ', data!.user);
        //get user
        this.generalService.getUserById(data!.user).subscribe({
          next: (data: any) => {
            // console.log('Current User data on post...  ', data);
            this.username = data.username;
            // console.log('Current username: ', this.username);
          },
          error: (error) => {
            console.log('Error for getting user by id for post data:', error);
          },
        });
      },
      error: (error) => {
        console.log('Error for getting current post page data:', error);
      },
    });
  }

  // delete this post
  deletePost() {
    this.postService.deletePost(this.postData?._id).subscribe({
      next: (data: any) => {
        console.log('deleted post data...  ', data);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log('Error for deleting post', error);
      },
    });
  }

  // go back button
  goBack() {
    this.location.back();
  }

  // go to thread page
  // thread Clicked
  threadClicked() {
    this.router.navigate(['thread', this.postData?.parentThread]);
  }

  // hover up vote
  hoverUpVote() {
    this.isUpVote = !this.isUpVote;
  }
  // hover up vote
  hoverDownVote() {
    this.isDownVote = !this.isDownVote;
  }
}
