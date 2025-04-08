import { Component } from '@angular/core';
import { LogoutbuttonComponent } from './logoutbutton/logoutbutton.component';
import { GeneralService } from '../../services/general.service';
import { Router } from '@angular/router';
import { ThreadsService } from '../../services/threads.service';
import { ThreadData } from '../../types/thread';
import { ThreadDisplayComponent } from '../threads/thread-display/thread-display/thread-display.component';

@Component({
  selector: 'app-header',
  imports: [LogoutbuttonComponent, ThreadDisplayComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private generalService: GeneralService, private router: Router, private threadsService: ThreadsService) {}


  currentSearchData: ThreadData[] | null = null;
  focusState = false;

  // actionClick(type: string){
  //   this.generalService.changeMainView('new-thread');
  // }


  
  // connecting function to call link from service
  linkTo(route: string) {
    this.generalService.LinkToPage(route);
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

}
