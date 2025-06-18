import { Component, Input, OnInit } from '@angular/core';
import { ThreadData } from '../../../types/thread';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ThreadsService } from '../../../services/threads.service';
import { ThreadDisplayComponent } from '../../threads/thread-display/thread-display/thread-display.component';
import { NgFor } from '@angular/common';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'app-new-post',
  imports: [ReactiveFormsModule, ThreadDisplayComponent, NgFor],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss'
})
export class NewPostComponent implements OnInit{
  constructor(private postService: PostService, private threadService: ThreadsService, private generalService: GeneralService, private router: Router, private activatedRoute: ActivatedRoute) {}

  // id we use to query for thread data
  itemId: string | null = null;
  // thread data
  threadData: ThreadData = {_id: '', title: 'loading', bio: 'loading bio', followersCount: 0, followers: [''], posts: [''], links: [''], owner: '', threadImage: '', tags: [''], createdAt: '', updatedAt: '', __v: 0};

  selectedTags: string = '';

  ngOnInit(): void {
    
    // Access the 'id' route parameter
    this.activatedRoute.paramMap.subscribe(params => {
      this.itemId = params.get('id');
      console.log('Item ID:', this.itemId); // You can use this ID to fetch data or perform other operations
    });

    // should grab its own threads data from id in the url route
    this.threadService.getThread(this.itemId).subscribe({
      next: (data: any) => {
        console.log("Current THREAD PAGE DATA...  ", data);
        this.threadData = data;
      },
      error: (error) => {
        console.log("Error for getting current thread page data:", error);
      }
    });

  }


  addTag(tag: string) {
    const parent = document.getElementById('tag-selected-div');

    const newDiv = document.createElement('div');
    newDiv.classList.add('flex', 'justify-between', 'rounded-xl', 'p-1', 'bg-orange-400', 'w-fit', 'gap-1', 'items-center');
    newDiv.innerHTML = `<h4 class="font-semibold text-white">${tag}</h4><i class="bi bi-dash text-2xl text-white"></i>`;
    parent?.appendChild(newDiv);
    this.selectedTags = tag;
  }











  // form group
  // create form items
  postForm = new FormGroup({
    title: new FormControl(''),
    textContent: new FormControl(''),
    parentThread: new FormControl(),
  })

  // POST a post
  postFormSubmit() {


    console.log("post form: ", this.postForm.value);
    const object = this.postForm.value;

    const newObject = {title: object.title, textContent: object.textContent, owner: this.generalService.currentUserData?._id, ownerUserName: this.generalService.currentUserData?.username, parentThread: this.threadData?._id, parentThreadTitle: this.threadData?.title, tag: this.selectedTags, parentThreadImage: this.threadData?.threadImage};
    console.log("new object: ", newObject);
 

  this.postService.createPost(newObject).subscribe({
    next: (data: any) => {
      console.log("Data from new post... ", data);
      this.router.navigate(['/thread', this.threadData?._id]);
    },
    error: (error) => {
      console.log("Error for creating new post:", error);
    }
  });


  }

}
