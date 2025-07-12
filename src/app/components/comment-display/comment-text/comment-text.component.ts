import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment-text',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comment-text.component.html',
  styleUrl: './comment-text.component.scss',
})
export class CommentTextComponent implements OnInit, OnChanges {
  @Input() isEditing: boolean = false;
  @Input() commentText: string | null | undefined = null;
  @Input() cancelEditCall!: () => void;
  @Input() submitEdit!: (commentText: string | null | undefined) => void;

  ngOnInit(): void {
    console.log('isEditing value within comment-text comper: ', this.isEditing);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('changes made to comment text', changes);
    if (changes['isEditing']) {
      if (changes['isEditing'].currentValue) {
        this.editComment();
      }
    }
  }

  @Output() cancelEditEvent = new EventEmitter<void>();

  // comment form
  commentEdit = new FormGroup({
    commentText: new FormControl(''),
  });

  @ViewChild('commentText') commentInput!: ElementRef;

  editComment() {
    console.log('edit comment callback in comment component');
    // this.isEditing = true;

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
      const newComment = 'Edited: ' + this.commentText;
      this.commentEdit.get('commentText')?.setValue(newComment);
    }, 100);

    console.log('set new comment for edit !!');

    // make api call with new string in place...
  }

  editCommentSubmit() {
    // call api from callback to parent
    this.submitEdit(this.commentEdit.value.commentText);
  }

  cancelEdit() {
    // callback to parent to switch variable
    this.cancelEditCall();
  }
}
