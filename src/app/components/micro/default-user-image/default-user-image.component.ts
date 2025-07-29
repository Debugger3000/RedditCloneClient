import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-default-user-image',
  imports: [],
  templateUrl: './default-user-image.component.html',
  styleUrl: './default-user-image.component.scss',
})
export class DefaultUserImageComponent {
  @Input() image: string = '';
  @Input() type: string = '';
}
