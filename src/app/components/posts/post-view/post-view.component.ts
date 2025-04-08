import { Component, Input, OnInit } from '@angular/core';
import { ThreadData } from '../../../types/thread';
import { PostData } from '../../../types/post';
import { ThreadDisplayComponent } from '../../threads/thread-display/thread-display/thread-display.component';
import { ActivatedRoute } from '@angular/router';
import { Location, NgFor, NgClass } from '@angular/common';
import { ThreadsService } from '../../../services/threads.service';
import { PostService } from '../../../services/post.service';
import { GeneralService } from '../../../services/general.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-view',
  imports: [ThreadDisplayComponent, NgFor, NgClass],
  templateUrl: './post-view.component.html',
  styleUrl: './post-view.component.scss'
})
export class PostViewComponent implements OnInit{
    constructor(private activatedRoute: ActivatedRoute, private location: Location, private threadService: ThreadsService, private postService: PostService, private generalService:GeneralService) {}

   // thread data
    @Input() threadData: ThreadData = {_id: '', title: 'loading', bio: 'loading bio', followersCount: 0, followers: [''], posts: [''], owner: '', links: [''], threadImage: 0, tags: [''], createdAt: '', updatedAt: '', __v: 0};
    // posts data for this thread
    postData: {post: PostData} | null = {post: {_id: '',title: '', textContent: '', user: '', parentThread: '', tag: '', createdAt: '', updatedAt: '', __v: 0}};

    // postData$: Observable<{posts: PostData}>;

    // thread id
      threadId: string | null = '';
    // post id
      postId: string | null = '';

    // username
    username: string = '';

    // focus for comment
    isFocusComment: boolean = false;

    focusComment() {
      this.isFocusComment = !this.isFocusComment;
    }

    deFocusComment() {
      this.isFocusComment = !this.isFocusComment;
    }



    ngOnInit(): void {
      
      this.activatedRoute.paramMap.subscribe(params => {
        this.threadId = params.get('id');
        this.postId = params.get('idPost');
        console.log('thread ID:', this.threadId);
        console.log('post  ID:', this.postId);
      });
      
      // get thread data
      this.getThreadCall(); 
      //get post data
      this.getPost();

      console.log("postData before userGETBYID: ",this.postData);

    



    }


    // get Thread call function
  getThreadCall() {
    // should grab its own threads data from id in the url route
    this.threadService.getThread(this.threadId).subscribe({
      next: (data: any) => {
        console.log("Current THREAD PAGE DATA...  ", data);
        this.threadData = data;
      },
      error: (error) => {
        console.log("Error for getting current thread page data:", error);
      }
    });
  }

  // get a post by id
  getPost() {
    this.postService.getPost(this.postId).subscribe({
      next: (data: any) => {
        console.log("Current post data...  ", data);
        this.postData = data;

        console.log("log for data.post._id: ",data.post.user);
          //get user
        this.generalService.getUserById(data.post.user).subscribe({
          next: (data: any) => {
            console.log("Current User data on post...  ", data);
            this.username = data.username;
            console.log("Current username: ", this.username);
          },
          error: (error) => {
            console.log("Error for getting user by id for post data:", error);
          }

        });




      },
      error: (error) => {
        console.log("Error for getting current post page data:", error);
      }

    });
  }


  // go back button
  goBack() {
    this.location.back();
  }

}
