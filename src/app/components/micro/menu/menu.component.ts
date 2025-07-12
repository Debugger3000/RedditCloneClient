import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
  viewChild,
} from '@angular/core';

import { NgIf } from '@angular/common';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  constructor(public generalService: GeneralService) {}
  @Input() menuToggle: { commentId: string; state: boolean } = {
    commentId: '',
    state: false,
  };
  @Input() commentId: string = '';
  @Input() isDeleted: boolean = false;

  @Input() replyDeleteComment!: (id: string | null | undefined) => void;
  @Input() editCommentCall!: (id: string | null | undefined) => void;

  @Output() OpenEditEvent = new EventEmitter<void>();

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

  editComment() {
    console.log('editing comment ehheheehehehhe');
    // this.editCommentCall(this.commentId);
    this.OpenEditEvent.emit();
  }
}
