import { Component, Input } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { LiveComment, SortComments } from '../../types/comment';
import { CommentsService } from '../../services/comments.service';

@Component({
  selector: 'app-comment-display',
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './comment-display.component.html',
  styleUrl: './comment-display.component.scss'
})
export class CommentDisplayComponent {
  constructor(public generalService : GeneralService, public commentService: CommentsService) {}

  @Input() comments: LiveComment | null = null;
  @Input() level: number = 0;
  @Input() isCollapsed: boolean = true;


  // @Input() image: string | null | undefined = '';
  // @Input() type: string = '';
  @Input() userImage: string | null | undefined = '';

  // post stuff
  @Input() username: string | null | undefined = '';
  @Input() createdAt: string | null | undefined = '';
  @Input() comment: string | null | undefined = '';
  @Input() commentId: string | null | undefined = '';

  @Input() replyHandleFunction!: (id: string | null | undefined) => void;
  @Input() childReplyHandle!: (id: string | null | undefined) => void;


  // somewhat hardcoded comment indent nesting... for now...
  get dynamicClasses(): { [key: string]: boolean } {
    // const level = this.levelService.currentLevel;
    return {
      'ml-12': this.level === 1,
      'ml-24': this.level === 2,
      'ml-36': this.level === 3,
      'ml-48': this.level === 4,
      'ml-60': this.level === 5,
      'ml-72': this.level === 6,
    };
  }


  // collapse comments
  collapseComments() {
    this.isCollapsed = !this.isCollapsed;
  }


  // somehow call back to parent component and update parent comment id to this comment id
  replyToComment(commentId: string) {
    console.log("you cliedk reply to comment in child !!!!");
    this.replyHandleFunction(commentId);
  }

}
