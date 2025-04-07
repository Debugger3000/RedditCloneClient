import { Component, Input, OnInit } from '@angular/core';
import { ThreadData } from '../../../types/thread';
import { PostData } from '../../../types/post';
import { ThreadDisplayComponent } from '../../threads/thread-display/thread-display/thread-display.component';
import { ActivatedRoute } from '@angular/router';
import { Location, NgFor } from '@angular/common';
import { ThreadsService } from '../../../services/threads.service';
import { PostService } from '../../../services/post.service';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'app-post-view',
  imports: [ThreadDisplayComponent, NgFor],
  templateUrl: './post-view.component.html',
  styleUrl: './post-view.component.scss'
})
export class PostViewComponent implements OnInit{
    constructor(private activatedRoute: ActivatedRoute, private location: Location, private threadService: ThreadsService, private postService: PostService, private generalService:GeneralService) {}

   // thread data
    @Input() threadData: ThreadData = {_id: '', title: 'loading', bio: 'loading bio', followersCount: 0, followers: [''], posts: [''], links: [''], threadImage: 0, tags: [''], createdAt: '', updatedAt: '', __v: 0};
    // posts data for this thread
    @Input() postData: {posts: PostData} | null = null;

    // thread id
      threadId: string | null = '';
    // post id
      postId: string | null = '';

    // username
    username: string = '';



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

      //get users
    this.generalService.getUserById(this.postData!.posts!._id).subscribe({
      next: (data: any) => {
        console.log("Current User data on post...  ", data);
        this.username = data.username;
      },
      error: (error) => {
        console.log("Error for getting user by id for post data:", error);
      }

    });



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
