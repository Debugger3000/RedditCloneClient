import { Component, Input, OnInit } from '@angular/core';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'app-post-view-outside',
  imports: [],
  templateUrl: './post-view-outside.component.html',
  styleUrl: './post-view-outside.component.scss'
})
export class PostViewOutsideComponent implements OnInit{
  constructor(private generalService: GeneralService) {}

  @Input() title: string | null = '';
  @Input() textContent: string | null = '';
  @Input() createdAt: string | null = '';
  @Input() user: string | null = '';
  @Input() postId: string | null = '';
  @Input() tag: string | null = '';

  username: string | null = '';

  ngOnInit(): void {
    
    //get users
    this.generalService.getUserById(this.user).subscribe({
      next: (data: any) => {
        console.log("Current User data on post...  ", data);
        this.username = data.username;
      },
      error: (error) => {
        console.log("Error for getting user by id for post data:", error);
      }

    });

  }



  // This will take post data for a single post

}
