import { Component, Input } from '@angular/core';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'app-thread-panel-view',
  imports: [],
  templateUrl: './thread-panel-view.component.html',
  styleUrl: './thread-panel-view.component.scss',
})
export class ThreadPanelViewComponent {
  constructor(private generalService: GeneralService) {}

  @Input() threadId: string | null = '';
  @Input() threadImage: string | null | undefined = '';
  @Input() title: string | null = '';

  // link
  threadLink(id: string | null) {
    if (id) {
      this.generalService.linkWithParams('thread', id);
    }
  }
}
