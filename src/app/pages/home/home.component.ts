import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { GroupThreadsComponent } from '../../components/group-threads/group-threads.component';
import { SideThreadsComponent } from '../../components/side-threads/side-threads.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, GroupThreadsComponent, SideThreadsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  sidePanelState = false;














  // side panel click
  sidePanelClick() {
    this.sidePanelState = !this.sidePanelState;
  }

}
