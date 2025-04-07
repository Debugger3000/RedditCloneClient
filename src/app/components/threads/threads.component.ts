import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../../services/threads.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ThreadDisplayComponent } from './thread-display/thread-display/thread-display.component';
import { ThreadData } from '../../types/thread';
import { NgForOf, NgFor, NgClass } from '@angular/common';
import { PostViewOutsideComponent } from '../posts/post-view-outside/post-view-outside.component';
import { PostData } from '../../types/post';
import { PostService } from '../../services/post.service';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-threads',
  imports: [ThreadDisplayComponent, NgForOf, PostViewOutsideComponent, NgClass],
  templateUrl: './threads.component.html',
  styleUrl: './threads.component.scss'
})
export class ThreadsComponent implements OnInit{
  constructor(private threadService: ThreadsService, private postService: PostService, private router: Router, private activatedRoute: ActivatedRoute, private generalService: GeneralService) {}
  itemId: string | null = null;

  // thread data
  threadData: ThreadData = {_id: '', title: 'loading', bio: 'loading bio', followersCount: 0, followers: [''], posts: [''], links: [''], threadImage: 0, tags: [''], createdAt: '', updatedAt: '', __v: 0};
  // posts data for this thread
  postData: {posts: PostData[]} | null = null;
  // check if user is joined
  isJoined: boolean = false;
  isLoading: boolean = true;

  ngOnInit(): void {
    // Access the 'id' route parameter
    this.activatedRoute.paramMap.subscribe(params => {
      this.itemId = params.get('id');
      console.log('Item ID:', this.itemId); // You can use this ID to fetch data or perform other operations
    });

    this.getThreadCall();

    // should grab its own threads data from id in the url route
    // this.threadService.getThread(this.itemId).subscribe({
    //   next: (data: any) => {
    //     console.log("Current THREAD PAGE DATA...  ", data);
    //     this.threadData = data;
    //   },
    //   error: (error) => {
    //     console.log("Error for getting current thread page data:", error);
    //   }
    // });


    // grab post data for this thread by using thread ID
    this.postService.getPostsForThread(this.itemId).subscribe({
      next: (data: any) => {
        console.log("Current Post data for this thread: ", data);
        this.postData = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.log("Error for getting current post data:", error);
      }
    });
  }

  // create a post for this thread, so reroute to new-post with thread id to display title and picture
  createPost() {
    this.router.navigate(['post-new',this.threadData?._id]);
  }

  // join thread
  joinThread() {
    if(this.threadData?._id){
      this.threadService.joinThread(this.threadData?._id).subscribe({
        next: (data: any) => {
          console.log("Current join thread return: ", data);
          this.getThreadCall();
        },
        error: (error) => {
          console.log("Error for joining a thread:", error);
        }
      })
    }
  }

  // check if user is joined to thread
  isUserJoined() {
    if(this.threadData?.followers?.includes(this.generalService.currentUserData!._id)){
      this.isJoined = true;
      console.log("User is joined, state is: ",this.isJoined);
    }
    else{
      this.isJoined = false;
      console.log("User is NOT joined, state is: ",this.isJoined);
    }
  }

  // get Thread call function
  getThreadCall() {
    // should grab its own threads data from id in the url route
    this.threadService.getThread(this.itemId).subscribe({
      next: (data: any) => {
        console.log("Current THREAD PAGE DATA...  ", data);
        this.threadData = data;
        this.isUserJoined();
      },
      error: (error) => {
        console.log("Error for getting current thread page data:", error);
      }
    });
  }

  // a post is clicked...
  postClicked(index: number) {
    console.log("post has been clicked...");
    this.router.navigate(['thread',this.threadData?._id,this.postData?.posts[index]?._id]);
  }






}
