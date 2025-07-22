import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostViewOutsideComponent } from '../post-view-outside/post-view-outside.component';
import { PostData } from '../../../types/post';
import { ThreadsService } from '../../../services/threads.service';
import { GeneralService } from '../../../services/general.service';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-post-container',
  imports: [PostViewOutsideComponent, CommonModule],
  templateUrl: './post-container.component.html',
  styleUrl: './post-container.component.scss',
})
export class PostContainerComponent implements OnInit, OnChanges {
  // this is the container for a collection of posts
  // such that, for home posts or thread posts, we can use this parent container to control the pagination of either
  //

  constructor(
    private threadService: ThreadsService,
    private generalService: GeneralService,
    private postService: PostService
  ) {}

  // type of post data here: 'home' / 'thread'
  @Input() type: string = '';
  @Input() threadId: string | null = null;

  // thread bottom control since its an embedded page
  @Input() threadAtBottom: boolean = false;
  @Input() flipBottom!: () => void;

  // posts data for this thread
  postData: PostData[] | null = null;

  isLoading = true;
  atBottomControl = false;
  endOfPosts = false;

  limit: number = 5;
  page: number = 1;

  // interaction bar toggle
  postSortToggle = false;
  // set default post sort to 'latest'
  feedType: string = 'latest';

  ngOnInit(): void {
    // console.log("post container is being init'd", this.type);
    if (this.type === 'home') {
      this.loadHomePosts();
    } else if (this.type === 'thread') {
      // console.log('calling posts for thread: ', this.threadId);
      this.loadThreadPosts();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log('Child @Input() changes:', changes);

    if (Object.keys(changes).length == 4) {
    } else {
      for (const key of Object.keys(changes)) {
        // console.log('key: ', key);
        // console.log('new value: ', changes[key].currentValue);

        if (key === 'threadId') {
          this.loadThreadPosts();
          this.page = 1;
        } else if (key === 'threadAtBottom') {
          if (key) {
            this.page = this.page + 1;
            this.loadThreadPosts();
          }
        }
      }
    }
  }

  // load home posts
  loadHomePosts() {
    this.postService.getPosts(this.page, this.limit, this.feedType).subscribe({
      next: (data: any) => {
        // console.log('Current data on home posts...  ', data);
        // console.log('page: ', this.page);
        // console.log('feedType: ', this.feedType);
        if (this.page == 1) {
          this.postData = data;
        } else {
          this.appendNextPosts(data);
        }
        // console.log('isLoading: ', this.isLoading);
        if (this.isLoading) {
          this.isLoading = !this.isLoading;
        }

        // console.log('isLoading: ', this.isLoading);
        // this.isLoading = !this.isLoading;
      },
      error: (error) => {
        console.log('Error for getting user by id for post data:', error);
      },
    });
  }

  // load thread posts
  loadThreadPosts() {
    // console.log('feed Type before loading threads call: ', this.feedType);
    this.postService
      .getPostsForThread(this.threadId, this.page, this.limit, this.feedType)
      .subscribe({
        next: (data: any) => {
          // console.log('Current Post data for this thread: ', data);
          if (this.page == 1) {
            this.postData = data;
          } else {
            this.appendNextPosts(data);
          }
          if (this.isLoading) {
            this.isLoading = !this.isLoading;
          }
          // console.log('isloading: ', this.isLoading);
        },
        error: (error) => {
          console.log('Error for getting current post data:', error);
        },
      });
  }

  // append further posts to existing array of post in postData
  appendNextPosts(nextPosts: PostData[]) {
    // console.log('apppend run...');
    if (nextPosts.length == 0) {
      this.endOfPosts = true;
    } else if (nextPosts.length == 0 && this.type === 'thread') {
      this.flipBottom();
    } else {
      // console.log('posts before appending: ', nextPosts);
      for (let i = 0; i < nextPosts.length; i++) {
        this.postData?.push(nextPosts[i]);
      }
      // console.log('POSTs PAGINATION NOW: ', this.postData);
      if (this.type === 'home') {
        this.atBottomControl = !this.atBottomControl;
      } else {
        this.threadAtBottom = !this.threadAtBottom;
        this.flipBottom();
      }
    }
  }

  onScroll(event: Event) {
    const target = event.target as HTMLElement;

    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const offsetHeight = target.offsetHeight;

    const atBottom = scrollTop + offsetHeight >= scrollHeight - 100;

    // console.log('Scroll Top:', scrollTop);

    if (atBottom && !this.atBottomControl) {
      // console.log('Scrolled to bottom of container');
      this.atBottomControl = !this.atBottomControl;
      this.page = this.page + 1;
      // console.log('limit just changed at bottom: ', this.limit);
      // call function to grab more data
      if (this.type === 'home') {
        this.loadHomePosts();
      }
    }
  }

  toggleSort() {
    this.postSortToggle = !this.postSortToggle;
  }

  loadPosts() {
    // grab new data...
    if (this.type === 'home') {
      this.loadHomePosts();
    } else {
      this.loadThreadPosts();
    }
  }

  changeSort(type: string) {
    if (type === 'latest' && this.feedType !== 'latest') {
      this.feedType = 'latest';
      this.page = 1;
      this.isLoading = !this.isLoading;
      this.loadPosts();
    } else if (type === 'oldest' && this.feedType !== 'oldest') {
      this.feedType = 'oldest';
      this.page = 1;
      this.isLoading = !this.isLoading;
      this.loadPosts();
    }
    this.postSortToggle = !this.postSortToggle;
  }
}
