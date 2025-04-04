import { Component, Input } from '@angular/core';
import { NewThreadComponent } from '../../components/threads/new-thread/new-thread.component';

@Component({
  selector: 'app-main-section',
  imports: [NewThreadComponent],
  templateUrl: './main-section.component.html',
  styleUrl: './main-section.component.scss'
})
export class MainSectionComponent {

  @Input() currentView: string = 'home';

}
