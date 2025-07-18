import { Component, inject, OnInit } from '@angular/core';
import { SidePanelBlockComponent } from '../micro/side-panel-block/side-panel-block.component';
import { GeneralService } from '../../services/general.service';
import { ThreadData } from '../../types/thread';
import { ThreadsService } from '../../services/threads.service';
import { NgFor } from '@angular/common';
import { Subscription } from 'rxjs';
import { ThreadPanelViewComponent } from '../side-panel/thread-panel-view/thread-panel-view.component';

@Component({
  selector: 'app-side-threads',
  imports: [SidePanelBlockComponent, NgFor, ThreadPanelViewComponent],
  templateUrl: './side-threads.component.html',
  styleUrl: './side-threads.component.scss',
})
export class SideThreadsComponent implements OnInit {
  constructor(
    private generalService: GeneralService,
    private threadService: ThreadsService
  ) {}

  currentJoinedThreads: ThreadData[] | null = null;

  clickState: boolean = true;
  private sub!: Subscription;
  private subUser!: Subscription;

  ngOnInit(): void {
    // grab threads that the user is joined too...
    // make sure
    if (this.generalService.currentUserData) {
      this.getThreadsForUser();
    }

    this.subUser = this.generalService.userData$.subscribe((userData) => {
      // this.threadService.notifyThreadEntered(this.threadData!._id);
      if (userData) {
        this.getThreadsForUser();
      }
    });

    this.sub = this.threadService.threadJoined$.subscribe((threadId) => {
      // console.log('subscript in recent has been triggered,', this.sub);
      // run update threads, wait for changes, and then run get recent threads

      if (threadId) {
        this.getThreadsForUser();
      }
    });

    console.log('User data exists within side USER threads');
  }

  getThreadsForUser() {
    this.threadService.getThreadByUser().subscribe({
      next: (data) => {
        // console.log("Data from is user Authenticated ", data);
        console.log('side panel threads: ', data);

        this.currentJoinedThreads = data;
      },
      error: (error) => {
        console.log(
          'Error for getting threads for user on left side panel...',
          error
        );
      },
    });
  }

  // link
  threadLink(id: string | null) {
    if (id) {
      this.generalService.linkWithParams('thread', id);
    }
  }

  // title clicked, show no items or show items...
  titleClick() {
    this.clickState = !this.clickState;
  }
}
