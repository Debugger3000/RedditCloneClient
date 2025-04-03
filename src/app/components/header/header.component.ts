import { Component } from '@angular/core';
import { LogoutbuttonComponent } from './logoutbutton/logoutbutton.component';

@Component({
  selector: 'app-header',
  imports: [LogoutbuttonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
