import { Component, Input, OnInit } from '@angular/core';
import { ThreadData } from '../../../types/thread';
import { TimestampComponent } from '../../micro/timestamp/timestamp.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-thread-sideinfo',
  imports: [TimestampComponent, NgFor],
  templateUrl: './thread-sideinfo.component.html',
  styleUrl: './thread-sideinfo.component.scss',
})
export class ThreadSideinfoComponent implements OnInit {
  @Input() threadData: ThreadData | null = null;
  @Input() type: string = '';

  ngOnInit(): void {}
}
