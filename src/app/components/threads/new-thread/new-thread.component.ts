import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { ThreadsService } from '../../../services/threads.service';
import { Router } from '@angular/router';
import { GeneralService } from '../../../services/general.service';
import { FirebaseBlobComponent } from '../../firebase-blob/firebase-blob.component';

@Component({
  selector: 'app-new-thread',
  imports: [ReactiveFormsModule, FirebaseBlobComponent],
  templateUrl: './new-thread.component.html',
  styleUrl: './new-thread.component.scss',
})
export class NewThreadComponent implements OnInit {
  constructor(
    private threadService: ThreadsService,
    private router: Router,
    private generalService: GeneralService
  ) {}

  linkArray: string[] = [];
  tagArray: string[] = [];

  // firebase - send image to storage / get url
  firebase: boolean = false;
  firebaseCallbackBound!: (url: string) => void;

  // create form items
  threadForm = new FormGroup({
    title: new FormControl(''),
    bio: new FormControl(''),
    links: new FormControl(),
    image: new FormControl(),
  });

  ngOnInit(): void {
    this.firebaseCallbackBound = this.firebaseCallBack.bind(this);
  }

  //add tag
  addDiv(inputId: string, divId: string) {
    const input = document.getElementById(inputId) as HTMLInputElement;
    const parent = document.getElementById(divId);
    if (inputId === 'links-input') {
      // add link to array
      this.linkArray.push(input.value);
    } else {
      this.tagArray.push(input.value);
    }
    const newDiv = document.createElement('div');
    newDiv.classList.add('flex', 'justify-between', 'border', 'rounded', 'p-1');
    newDiv.innerHTML = `<h4 class="text-xl font-semibold">${input.value}</h4>`;

    // Create the button dynamically
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.classList.add(
      'p-2',
      'bg-red-800',
      'text-white',
      'rounded-full',
      'hover:cursor-pointer'
    );
    deleteButton.textContent = 'X';
    newDiv.appendChild(deleteButton);

    // Add event listener to the button to delete the link
    deleteButton.addEventListener('click', () => {
      // this.deleteLink(this.linkArray.length - 1);
      console.log('delete button pressed...');
    });

    // add under div
    parent?.appendChild(newDiv);

    // clear links input field
    input.value = '';

    console.log('Links array: ', this.linkArray);
    console.log('tags array: ', this.tagArray);
  }

  deleteLink(link: number) {
    const newArray = this.linkArray.slice(link, 1);
    this.linkArray = newArray;

    // remove div node from html
    // const parent = document.getElementById('links-div');
    // const child = parent?.childNodes[link];
    // parent?.removeChild(child);

    console.log('delete pressed and new array is: ', this.linkArray);
  }

  firebaseCallBack(url: string) {
    // run submit code sending post for thread
    console.log('firebase callback in new-thead, url value: ', url);

    console.log('thread form: ', this.threadForm.value);
    const object = this.threadForm.value;

    const newObject = {
      title: object.title,
      bio: object.bio,
      links: this.linkArray,
      tags: this.tagArray,
      username: this.generalService.currentUserData?.username,
      threadImage: url,
    };
    console.log('new object: ', newObject);

    this.threadService.createThread(newObject).subscribe({
      next: (data: any) => {
        console.log('Data from new thread... ', data);
        this.router.navigate(['/thread', data.thread._id]);
      },
      error: (error) => {
        console.log('Error for creating new thread:', error);
      },
    });
  }
  // on submit for thread
  threadFormSubmit() {
    // on thread submit, get firebase to send image to storage, when it receives response firebase component will call actually submit
    // passing its url to the image uploaded...

    // firebase set to true
    this.firebase = true; // should trigger firebase to submit its data first
  }
}
