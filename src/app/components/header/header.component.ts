import { Component, inject } from '@angular/core';
import { LogoutbuttonComponent } from './logoutbutton/logoutbutton.component';
import { GeneralService } from '../../services/general.service';
import { Router } from '@angular/router';
import { ThreadsService } from '../../services/threads.service';
import { ThreadData } from '../../types/thread';
import { ThreadDisplayComponent } from '../threads/thread-display/thread-display/thread-display.component';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  imports: [LogoutbuttonComponent, ThreadDisplayComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private router: Router, private threadsService: ThreadsService) {}
  generalService = inject(GeneralService);
  loginService = inject(LoginService);

  currentSearchData: ThreadData[] | null = null;
  focusState = false;
  profileClicked = false;

  // actionClick(type: string){
  //   this.generalService.changeMainView('new-thread');
  // }


  
  // connecting function to call link from service
  linkTo(route: string) {
    this.generalService.LinkToPage(route);
    this.generalService.showHeader = false;
  }


  // Search bar to search for threads...
  searchThreads(id: string) {
    const searchNode = document.getElementById(id) as HTMLInputElement;

    if(searchNode.value.length != 0){

    this.threadsService.getThreadByTitle(searchNode.value).subscribe({
      next: (data: any) => {
        console.log("Search for thread data: ", data);
        this.currentSearchData = data;
      },
      error: (error) => {
        console.log("Error searching for a thread with search bar: ", error);
      }
    })
    }
  }

  // wipe search array

  onFocus() {
    this.focusState = !this.focusState;
    console.log("focus state: ", this.focusState);
  }

  onBlur() {
    this.focusState = !this.focusState;
    console.log("focus blur state: ", this.focusState);
  }

  openProfile() {
    this.profileClicked = !this.profileClicked;
  }


  // logout 
  logout() { 
    this.loginService.logoutApi().subscribe({
      next: (data) => {
        console.log("Data received back from logout: ", data);
        this.generalService.showHeader = false;
        this.router.navigate(['login']);
        this.generalService.currentUserData = null;
        setTimeout(() => {
          this.generalService.showHeader = true;
          this.router.navigate(['home']);

        }, 2000)
        
      },
      error: (error) => {
        console.log("Error on logout: ", error);
      }
    })
  }

}
