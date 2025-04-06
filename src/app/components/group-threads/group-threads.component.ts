import { Component, Input } from '@angular/core';
import { SidePanelBlockComponent } from '../micro/side-panel-block/side-panel-block.component';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-group-threads',
  imports: [SidePanelBlockComponent],
  templateUrl: './group-threads.component.html',
  styleUrl: './group-threads.component.scss'
})
export class GroupThreadsComponent {

  constructor(private generalService : GeneralService) {}


}
