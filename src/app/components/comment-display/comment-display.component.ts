import { Component, Input } from '@angular/core';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-comment-display',
  imports: [],
  templateUrl: './comment-display.component.html',
  styleUrl: './comment-display.component.scss'
})
export class CommentDisplayComponent {
  constructor(public generalService : GeneralService) {}


  // @Input() image: string | null | undefined = '';
  // @Input() type: string = '';
  @Input() userImage: string | null | undefined = '';

  // post stuff
  @Input() username: string | null | undefined = '';
  @Input() createdAt: string | null | undefined = '';
  @Input() comment: string | null | undefined = '';
  @Input() commentId: string | null | undefined = '';

  @Input() replyHandleFunction!: (id: string | null | undefined) => void;



  // somehow call back to parent component and update parent comment id to this comment id
  replyToComment() {
    console.log("you cliedk reply to comment in child !!!!");
    this.replyHandleFunction(this.commentId);


  }

}
