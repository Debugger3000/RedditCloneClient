import { Component, Input } from '@angular/core';
import { GeneralService } from '../../../../services/general.service';

@Component({
  selector: 'app-thread-display',
  imports: [],
  templateUrl: './thread-display.component.html',
  styleUrl: './thread-display.component.scss'
})
export class ThreadDisplayComponent {
  constructor(private generalService: GeneralService) {}

  @Input() title: string | null = '';
  @Input() image: string | null = '';
  @Input() threadId: string = '';
  @Input() type: string = '';

  // use general service route
  linkRoute() {
    this.generalService.linkWithParams('/thread',this.threadId);
    console.log("thread display clicked and route called.");
  }

}
