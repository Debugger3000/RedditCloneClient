import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { LiveComment, SortComments } from '../../types/comment';
import { CommentsService } from '../../services/comments.service';
import { TimestampComponent } from '../micro/timestamp/timestamp.component';
import { CommentVotesComponent } from './comment-votes/comment-votes.component';
import { DefaultProfilePictureComponent } from '../micro/default-profile-picture/default-profile-picture.component';
import { AwardsComponent } from '../micro/awards/awards.component';
import { ShareComponent } from '../micro/share/share.component';
import { MenuComponent } from '../micro/menu/menu.component';
import { ReplyComponent } from './reply/reply.component';

import { CommentComponent } from './comment/comment.component';

@Component({
  selector: 'app-comment-display',
  imports: [
    NgFor,
    NgIf,
    NgClass,
    TimestampComponent,
    CommentVotesComponent,
    DefaultProfilePictureComponent,
    AwardsComponent,
    ShareComponent,
    MenuComponent,
    ReplyComponent,
    CommentComponent,
  ],
  templateUrl: './comment-display.component.html',
  styleUrl: './comment-display.component.scss',
})
export class CommentDisplayComponent {
  constructor(
    public generalService: GeneralService,
    public commentService: CommentsService
  ) {}

  @Input() comments: LiveComment | null = null;
  @Input() level: number = 0;
  @Input() isCollapsed: boolean = true;
  @Input() children: boolean = false;

  @Input() replyHandleFunction!: (id: string | null | undefined) => void;
  // given the initial replyHandle function from parent post component, to children further down the line...
  @Input() childReplyHandle!: (id: string | null | undefined) => void;
  @Input() commentRefresh!: (id: string | null | undefined) => void;

  // comment menu toggle variable
  menuToggle: { commentId: string; state: boolean } = {
    commentId: '',
    state: false,
  };

  // collapse comments
  collapseComments(commentId: string) {
    this.isCollapsed = !this.isCollapsed;
  }

  // somehow call back to parent component and update parent comment id to this comment id
  replyToComment = (commentId: string) => {
    console.log('you cliedk reply to comment in child !!!!');
    this.replyHandleFunction(commentId);
  };

  openCommentMenu(commentId: string) {
    this.menuToggle = { commentId: commentId, state: !this.menuToggle.state };
    // this.menuToggle = !this.menuToggle;
    console.log('clicked comment: ', commentId);
  }

  closeCommentMenu() {
    this.menuToggle = { commentId: '', state: false };
  }
}
