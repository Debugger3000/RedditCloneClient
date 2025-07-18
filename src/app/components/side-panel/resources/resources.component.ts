import { Component } from '@angular/core';
import { SidePanelComponent } from '../side-panel.component';
import { SidePanelBlockComponent } from '../../micro/side-panel-block/side-panel-block.component';

@Component({
  selector: 'app-resources',
  imports: [SidePanelBlockComponent],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.scss',
})
export class ResourcesComponent {
  clickState: boolean = true;

  // title clicked, show no items or show items...
  titleClick() {
    this.clickState = !this.clickState;
  }
}
