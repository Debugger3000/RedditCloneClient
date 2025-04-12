import { Component, inject, OnInit } from '@angular/core';
import { LogoutbuttonComponent } from './logoutbutton/logoutbutton.component';
import { GeneralService } from '../../services/general.service';
import { Router } from '@angular/router';
import { ThreadsService } from '../../services/threads.service';
import { ThreadData } from '../../types/thread';
import { ThreadDisplayComponent } from '../threads/thread-display/thread-display/thread-display.component';
import { LoginService } from '../../services/login.service';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [LogoutbuttonComponent, ThreadDisplayComponent, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  constructor(private router: Router, private threadsService: ThreadsService) {}
  generalService = inject(GeneralService);
  loginService = inject(LoginService);

  currentSearchData: ThreadData[] | null = null;
  focusState = false;
  profileClicked = false;
  profilePicture: string | null | undefined = '';
  username: string | null = '';


  ngOnInit(): void {
    
  //check if user is logged in...
  this.loginService.checkAuth().subscribe({
    next: (data) => {
      // console.log("Data from is user Authenticated ", data);

      this.generalService.setUserData({_id: data._id, username: data.username, profileImage: data.profileImage});
      this.profilePicture = data.profileImage;
      this.username = data.username;
      this.loginService.isAuthenticated = true;
      
      
      console.log(this.router.url);
      console.log("cookie: ",document.cookie);
    },
    error: (error) => {
      console.log("Error with checking if user is Authenticated:", error);
    }
  })


  }
  


  // actionClick(type: string){
  //   this.generalService.changeMainView('new-thread');
  // }


  
  // connecting function to call link from service
  linkTo(route: string, header: boolean) {
      this.generalService.LinkToPage(route);
      this.generalService.showHeader = header;
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
    this.focusState = false;
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
