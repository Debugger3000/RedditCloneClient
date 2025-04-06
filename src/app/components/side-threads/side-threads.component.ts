import { Component } from '@angular/core';
import { SidePanelBlockComponent } from '../micro/side-panel-block/side-panel-block.component';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-side-threads',
  imports: [SidePanelBlockComponent],
  templateUrl: './side-threads.component.html',
  styleUrl: './side-threads.component.scss'
})
export class SideThreadsComponent {

  constructor(private generalService : GeneralService) {}
  

  clickState = false;

  // title clicked, show no items or show items...
  titleClick() {
    this.clickState = !this.clickState;
  }

}
