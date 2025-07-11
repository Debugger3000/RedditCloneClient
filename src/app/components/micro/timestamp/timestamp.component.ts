import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timestamp',
  imports: [],
  templateUrl: './timestamp.component.html',
  styleUrl: './timestamp.component.scss',
})
export class TimestampComponent implements OnInit {
  constructor() {}

  @Input() timeStamp: string | null | undefined = null;
  // check for type of timestamp...
  // Thread, post, comment...
  @Input() type: string | null = null;

  // set this variable once we receive timeStamp and alter it to the proper...
  altTimeStamp: string | number | null = null;

  ngOnInit(): void {
    // console.log('we are in timestamper !!!!!');
    // console.log('date from input: ', this.timeStamp);

    // set altTimeStamp to be used in actual display...
    // for thread, just display month day and year of creation !
    let stamper = this.compD();
    // console.log('DATE STAMP: ', stamper);
    this.altTimeStamp = stamper;
  }

  // compare dates
  compD(): string | number {
    let today = new Date();
    let stamp = new Date();
    // console.log('type: ', this.type);
    // console.log('Raw DAte String: ', this.timeStamp);
    // set stamp to actual timestamp of inputted createdAt string...
    if (this.timeStamp != null) {
      stamp.setTime(Date.parse(this.timeStamp));
    }
    //
    // console.log('DATE GIVEN: ', stamp);
    // console.log('get month: ', stamp.getMonth());
    // console.log('get date: ', stamp.getDate());

    // if type is full date
    if (this.type == 'full-date') {
      // return stamp.toISOString();
      // console.log('getting full date here........................');
      return `${stamp.getMonth() + 1}-${
        stamp.getDate() + 1
      }-${stamp.getFullYear()}`;
    }

    // check same year, month, day, to hour
    // whatever one fails, we use the next one down the chain...
    // comments / posts
    // Same day - hours ago
    // same month - days ago
    // same year - months ago
    // different year - years ago
    if (today.getFullYear() != stamp.getFullYear()) {
      return `${today.getFullYear() - stamp.getFullYear()}yrs ago`;
    } else if (today.getMonth() != stamp.getMonth()) {
      return `${today.getMonth() - stamp.getMonth()}mo ago`;
    } else if (today.getDate() != stamp.getDate()) {
      return `${today.getDate() - stamp.getDate()}days ago`;
    } else {
      return `${today.getHours() - stamp.getHours()}days ago`;
    }
  }
}
