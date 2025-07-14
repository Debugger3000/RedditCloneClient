import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { SideThreadsComponent } from '../side-threads/side-threads.component';
import { GroupThreadsComponent } from '../group-threads/group-threads.component';
import { ThreadsRecentComponent } from './threads-recent/threads-recent.component';

@Component({
  selector: 'app-side-panel',
  imports: [
    SideThreadsComponent,
    GroupThreadsComponent,
    ThreadsRecentComponent,
  ],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.scss',
})
export class SidePanelComponent implements OnInit {
  constructor(private generalService: GeneralService) {}

  // just for side panel
  sidePanelState = true;

  ngOnInit(): void {
    console.log("side panel OVERLORD has been init'd !!!", this.sidePanelState);
  }

  // side panel click
  sidePanelClick() {
    this.sidePanelState = !this.sidePanelState;
  }

  // router function to pass down
  routeTo(route: string) {
    this.generalService.LinkToPage(route);
  }
}
