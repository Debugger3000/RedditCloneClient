import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { LiveCommentSolo } from '../../../types/comment';
import { AwardsComponent } from '../../micro/awards/awards.component';
import { ShareComponent } from '../../micro/share/share.component';
import { MenuComponent } from '../../micro/menu/menu.component';
import { CommentsService } from '../../../services/comments.service';
import { ReplyComponent } from '../reply/reply.component';
import { CommentVotesComponent } from '../comment-votes/comment-votes.component';
import { TimestampComponent } from '../../micro/timestamp/timestamp.component';
import { DefaultProfilePictureComponent } from '../../micro/default-profile-picture/default-profile-picture.component';
import { LiveComment } from '../../../types/comment';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-comment',
  imports: [
    AwardsComponent,
    ShareComponent,
    MenuComponent,
    CommentVotesComponent,
    ReplyComponent,
    TimestampComponent,
    DefaultProfilePictureComponent,
    CommonModule,
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  constructor(private commentService: CommentsService) {}
  @Input() comment: LiveCommentSolo | null = null;
  @Input() comments: LiveComment | null = null;

  @Input() level: number = 0;
  @Input() isCollapsed: boolean = true;
  @Input() children: boolean = false;

  @Input() commentRefreshForPost!: (id: string | null | undefined) => void;
  @Input() replyHandleFunction!: (id: string | null | undefined) => void;

  // flip when user is editing there comment
  isEditing: boolean = false;

  // @Input() childReplyHandle!: (id: string | null | undefined) => void;

  // comment menu toggle variable
  menuToggle: { commentId: string; state: boolean } = {
    commentId: '',
    state: false,
  };

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

  collapseComments() {
    this.isCollapsed = !this.isCollapsed;
    console.log('collapsed comment: ', this.comment?.commentText);
    console.log('isCollapsed: ', this.isCollapsed);
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

  deleteCommentCallBack = (commentId: string | null | undefined) => {
    console.log(
      'comment delete callback in comment display has been called !!!!!!'
    );
    console.log('comment to be deleted id: ', commentId);
    // console.log('comment refresh function', this.commentRefresh);
    this.commentService.deleteComment(commentId).subscribe({
      next: (data: any) => {
        console.log('Current comment data for this post  ', data);
        this.commentRefreshForPost(commentId);
      },
      error: (error) => {
        console.log('Error for getting current comment data:', error);
      },
    });
  };

  // comment form
  commentEdit = new FormGroup({
    commentText: new FormControl(''),
  });

  @ViewChild('commentInputEdit') commentInput!: ElementRef;

  editComment(commentId: string | null | undefined) {
    console.log('edit comment callback in comment component');
    this.isEditing = true;

    // make textArea element available within comments field, and have it focus right off the bat
    setTimeout(() => {
      console.log('field focus inside first//', this.commentInput);
      console.log('isEditing: ', this.isEditing);
      if (this.commentInput) {
        const input = this.commentInput.nativeElement as HTMLTextAreaElement;
        input.focus({ preventScroll: false });
        console.log('we have focuysed the text area inside !!!');
      }
      // add text that was already there, and maybe add "Edited:" infront...
      const newComment = 'Edited' + this.comment?.commentText;
      this.commentEdit.get('commentText')?.setValue(newComment);
    }, 100);

    console.log('set new comment for edit !!');

    // make api call with new string in place...
  }

  editCommentSubmit() {
    // call api to
  }

  cancelEdit() {
    this.isEditing = !this.isEditing;
  }
}
