import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-side-panel-block',
  imports: [],
  templateUrl: './side-panel-block.component.html',
  styleUrl: './side-panel-block.component.scss'
})
export class SidePanelBlockComponent {
  constructor() { }

  // @Input() image: int = 0;
  @Input() name: string = '';

  // Icon if given
  @Input() icon: string = '';

}

