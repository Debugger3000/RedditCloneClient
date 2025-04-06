import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../../services/threads.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ThreadDisplayComponent } from './thread-display/thread-display/thread-display.component';
import { ThreadData } from '../../types/thread';
import { NgForOf } from '@angular/common';
import { PostViewOutsideComponent } from '../posts/post-view-outside/post-view-outside.component';

@Component({
  selector: 'app-threads',
  imports: [ThreadDisplayComponent, NgForOf, PostViewOutsideComponent],
  templateUrl: './threads.component.html',
  styleUrl: './threads.component.scss'
})
export class ThreadsComponent implements OnInit{
  constructor(private threadService: ThreadsService, private router: Router, private activatedRoute: ActivatedRoute) {}
  itemId: string | null = null;

  // thread data
  threadData: ThreadData = {_id: '', title: 'loading', bio: 'loading bio', followersCount: 0, followers: [''], posts: [''], links: [''], threadImage: 0};

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






}
