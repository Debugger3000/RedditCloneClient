import { Component } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { SideThreadsComponent } from '../side-threads/side-threads.component';
import { GroupThreadsComponent } from '../group-threads/group-threads.component';

@Component({
  selector: 'app-side-panel',
  imports: [SideThreadsComponent, GroupThreadsComponent],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.scss'
})
export class SidePanelComponent {
  constructor(private generalService: GeneralService) {}

  // just for side panel
  sidePanelState = false;



   // side panel click
   sidePanelClick() {
    this.sidePanelState = !this.sidePanelState;
  }

}
