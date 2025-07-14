import { Component, inject, OnInit } from '@angular/core';
import { SidePanelBlockComponent } from '../micro/side-panel-block/side-panel-block.component';
import { GeneralService } from '../../services/general.service';
import { ThreadData } from '../../types/thread';
import { ThreadsService } from '../../services/threads.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-side-threads',
  imports: [SidePanelBlockComponent, NgFor],
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

  ngOnInit(): void {
    // grab threads that the user is joined too...
    // make sure
    console.log(
      'side panel threads oninit, grabbing threads now:  ',
      this.generalService.currentUserData
    );
    if (this.generalService.currentUserData) {
      console.log('User data exists within side USER threads');
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
