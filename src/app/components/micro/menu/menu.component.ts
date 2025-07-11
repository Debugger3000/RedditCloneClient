import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
  viewChild,
} from '@angular/core';

import { NgIf } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  @Input() menuToggle: { commentId: string; state: boolean } = {
    commentId: '',
    state: false,
  };
  @Input() commentId: string = '';
  @Input() isDeleted: boolean = false;

  @Input() replyDeleteComment!: (id: string | null | undefined) => void;

  @ViewChild('myDiv') myDiv!: ElementRef;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.myDiv || !this.myDiv.nativeElement) return;
    const clickedInside = this.myDiv.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.closeCommentMenu();
    }
  }

  openCommentMenu(commentId: string) {
    this.menuToggle = { commentId: commentId, state: !this.menuToggle.state };
    // this.menuToggle = !this.menuToggle;
    console.log('clicked comment: ', commentId);
  }

  closeCommentMenu() {
    this.menuToggle = { commentId: '', state: false };
  }

  deleteComment() {
    console.log('you clicked delete for function in menu ............');
    this.replyDeleteComment(this.commentId);
  }
}
