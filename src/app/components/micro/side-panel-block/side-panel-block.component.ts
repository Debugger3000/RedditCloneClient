import { Component, Input, input } from '@angular/core';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'app-side-panel-block',
  imports: [],
  templateUrl: './side-panel-block.component.html',
  styleUrl: './side-panel-block.component.scss'
})
export class SidePanelBlockComponent {
  constructor(private generalService: GeneralService) { }

  // @Input() image: int = 0;
  @Input() name: string = '';

  // Icon if given
  @Input() icon: string = '';

  // Link route
  @Input() routePath: string = '';

  // use general service route
  linkRoute() {
    this.generalService.LinkToPage(this.routePath);
  }

}

