import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-reply',
  imports: [],
  templateUrl: './reply.component.html',
  styleUrl: './reply.component.scss',
})
export class ReplyComponent {
  @Input() isDeleted: boolean = false;
  @Input() commentId: string = '';
  @Input() replyCall!: (id: string) => void;
}
