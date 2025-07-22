import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../../services/general.service';
import { ThreadsService } from '../../../services/threads.service';
import { ThreadData } from '../../../types/thread';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ThreadPanelViewComponent } from '../thread-panel-view/thread-panel-view.component';

@Component({
  selector: 'app-threads-recent',
  imports: [CommonModule, ThreadPanelViewComponent],
  templateUrl: './threads-recent.component.html',
  styleUrl: './threads-recent.component.scss',
})
export class ThreadsRecentComponent implements OnInit {
  constructor(
    private generalService: GeneralService,
    private threadService: ThreadsService
  ) {}

  currentJoinedThreads: ThreadData[] | null = null;

  clickState: boolean = true;
  private sub!: Subscription;
  private subUser!: Subscription;

  ngOnInit(): void {
    if (this.generalService.currentUserData) {
      this.getRecentThreads();
    }
    this.subUser = this.generalService.userData$.subscribe((userData) => {
      if (userData) {
        this.getRecentThreads();
      }
    });

    // console.log("recent threads init'd ");
    this.sub = this.threadService.threadEntered$.subscribe((threadId) => {
      // console.log('subscript in recent has been triggered,', this.sub);
      // run update threads, wait for changes, and then run get recent threads

      if (threadId) {
        this.updateThreads(threadId);
      }
    });
  }

  // get recent threads
  updateThreads(threadId: string | null) {
    this.threadService.updateRecentThreads(threadId).subscribe({
      next: (data) => {
        this.getRecentThreads();
      },
      error: (error) => {
        console.log(
          'Error for getting threads for user on left side panel...',
          error
        );
      },
    });
  }

  getRecentThreads() {
    this.threadService.getRecentThreads().subscribe({
      next: (data) => {
        // console.log("Data from is user Authenticated ", data);
        // console.log('recent thread data: ', data);
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
