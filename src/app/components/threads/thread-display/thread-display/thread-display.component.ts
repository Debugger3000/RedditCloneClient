import { Component, Input } from '@angular/core';
import { GeneralService } from '../../../../services/general.service';
import { PostData } from '../../../../types/post';
import { TimestampComponent } from '../../../micro/timestamp/timestamp.component';

@Component({
  selector: 'app-thread-display',
  imports: [TimestampComponent],
  templateUrl: './thread-display.component.html',
  styleUrl: './thread-display.component.scss',
})
export class ThreadDisplayComponent {
  constructor(private generalService: GeneralService) {}

  @Input() title: string | null = '';
  @Input() image: string | null = '';
  @Input() threadId: string = '';
  @Input() type: string = '';
  @Input() threadImage: string | null | undefined = '';

  // post stuff
  @Input() postObject: PostData | null = null;
  @Input() username: string = '';

  // use general service route
  linkRoute() {
    this.generalService.linkWithParams('/thread', this.threadId);
    console.log('thread display clicked and route called.');
  }
}
