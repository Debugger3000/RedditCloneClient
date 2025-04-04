import { Component } from '@angular/core';
import { LogoutbuttonComponent } from './logoutbutton/logoutbutton.component';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-header',
  imports: [LogoutbuttonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private generalService: GeneralService) {}

  actionClick(type: string){
    this.generalService.changeMainView('new-thread');
  }

}
