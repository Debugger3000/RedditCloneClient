import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../../services/general.service';
import { ThreadsService } from '../../../services/threads.service';
import { ThreadData } from '../../../types/thread';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-threads-recent',
  imports: [CommonModule],
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

  ngOnInit(): void {
    console.log("recent threads init'd ");

    // grab thread stack on recent threads visited...
    // if (this.generalService.currentUserData) {
    //   this.threadService.getThreadByUser().subscribe({
    //     next: (data) => {
    //       // console.log("Data from is user Authenticated ", data);
    //       // console.log("side panel threads: ",data);
    //       this.currentJoinedThreads = data;
    //     },
    //     error: (error) => {
    //       console.log(
    //         'Error for getting threads for user on left side panel...',
    //         error
    //       );
    //     },
    //   });
    // }
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
