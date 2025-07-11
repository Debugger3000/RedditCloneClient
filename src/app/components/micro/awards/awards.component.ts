import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-awards',
  imports: [],
  templateUrl: './awards.component.html',
  styleUrl: './awards.component.scss',
})
export class AwardsComponent {
  @Input() isDeleted: boolean = false;
}
