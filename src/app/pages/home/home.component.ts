import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { GroupThreadsComponent } from '../../components/group-threads/group-threads.component';
import { SideThreadsComponent } from '../../components/side-threads/side-threads.component';
import { Subscription } from 'rxjs';
import { GeneralService } from '../../services/general.service';
import { MainSectionComponent } from '../main-section/main-section.component';
import { LoginService } from '../../services/login.service';
import { PostData } from '../../types/post';
import { PostService } from '../../services/post.service';
import { PostViewOutsideComponent } from '../../components/posts/post-view-outside/post-view-outside.component';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    GroupThreadsComponent,
    SideThreadsComponent,
    MainSectionComponent,
    PostViewOutsideComponent,
    NgFor,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private generalService: GeneralService,
    private loginService: LoginService,
    private postService: PostService,
    private router: Router
  ) {}

  // just for side panel
  sidePanelState = false;

  currentViewVariable: string = 'home';
  private subscription: Subscription = Subscription.EMPTY; // To hold the subscription for cleanup

  // posts data for this thread
  postData: { posts: PostData[] } | null = null;

  // isLoading
  isLoading = true;

  ngOnInit(): void {
    // check user auth to get header and stuff
    //check if user is logged in...
    this.loginService.checkAuth().subscribe({
      next: (data) => {
        console.log('Data from is user Authenticated ', data);
        this.loginService.isAuthenticated = true;
      },
      error: (error) => {
        console.log('Error with checking if user is Authenticated:', error);
      },
    });

    // Get posts
    this.postService.getPosts().subscribe({
      next: (data: any) => {
        // console.log("Current Post data for this thread: ", data);
        this.postData = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.log('Error for getting current post data:', error);
      },
    });
  }

  ngOnDestroy(): void {
    // Always clean up the subscription to avoid memory leaks
    this.subscription.unsubscribe();
  }

  // a post is clicked...
  postClicked(index: number) {
    console.log('post has been clicked...');
    this.router.navigate([
      'thread',
      this.postData?.posts[index]?.parentThread,
      this.postData?.posts[index]?._id,
    ]);
  }

  // side panel click
  sidePanelClick() {
    this.sidePanelState = !this.sidePanelState;
  }
}
