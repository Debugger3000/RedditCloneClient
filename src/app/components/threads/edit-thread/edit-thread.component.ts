import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ThreadData } from '../../../types/thread';
import { ThreadsService } from '../../../services/threads.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseBlobComponent } from '../../firebase-blob/firebase-blob.component';

@Component({
  selector: 'app-edit-thread',
  imports: [ReactiveFormsModule, FirebaseBlobComponent],
  templateUrl: './edit-thread.component.html',
  styleUrl: './edit-thread.component.scss',
})
export class EditThreadComponent implements OnInit {
  constructor(
    private threadService: ThreadsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  // thread data
  threadData: ThreadData = {
    _id: '',
    title: 'loading',
    bio: 'loading bio',
    followersCount: 0,
    followers: [''],
    posts: [''],
    links: [''],
    owner: '',
    threadImage: '',
    tags: [''],
    createdAt: '',
    updatedAt: '',
    __v: 0,
  };

  linkArray: string[] = [];
  tagArray: string[] = [];

  itemId: string | null = '';
  imagePreview: string = '';

  firebase: boolean = false;
  firebaseCallbackBound!: (
    imageObject: { url: string; filePath: string } | null
  ) => void;

  ngOnInit(): void {
    console.log(
      'EDITING A THREAD PAGE.............................................'
    );
    this.firebaseCallbackBound = this.threadFormSubmit.bind(this);

    // Access the 'id' route parameter
    this.activatedRoute.paramMap.subscribe((params) => {
      this.itemId = params.get('id');
      console.log('Item ID:', this.itemId);
    });

    this.getThreadCall();
  }

  // create form items
  threadForm = new FormGroup({
    title: new FormControl<string | null | undefined>(''),
    bio: new FormControl<string | null | undefined>(''),
  });

  //add tag
  addDiv(inputId: string, divId: string) {
    const input = document.getElementById(inputId) as HTMLInputElement;
    const parent = document.getElementById(divId);

    if (input.value !== '') {
      if (inputId === 'links-input') {
        // add link to array
        this.linkArray.push(input.value);
        console.log('linkarray:', this.linkArray);
      } else {
        this.tagArray.push(input.value);
      }
      const newDiv = document.createElement('div');
      newDiv.classList.add(
        'flex',
        'justify-between',
        'border',
        'rounded',
        'p-1'
      );
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
      const val = input.value;
      console.log('input value: ', input.value);
      // Add event listener to the button to delete the link
      deleteButton.addEventListener('click', () => {
        this.deleteItem(val, divId);
        console.log('delete button pressed...');
      });

      // add under div
      parent?.appendChild(newDiv);

      // clear links input field
      input.value = '';

      console.log('Links array: ', this.linkArray);
      console.log('tags array: ', this.tagArray);
    }
  }

  populateDivsOnLoad() {
    console.log('poulate divs has been run...');

    const parent = document.getElementById('tags-div');
    const parent2 = document.getElementById('links-div');
    // loop for tags
    for (let i = 0; i < this.tagArray.length; i++) {
      const newDiv = document.createElement('div');
      const val = this.tagArray[i];
      newDiv.classList.add(
        'flex',
        'justify-between',
        'border',
        'rounded',
        'p-1'
      );
      newDiv.innerHTML = `<h4 class="text-xl font-semibold">${this.tagArray[i]}</h4>`;

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
        this.deleteItem(val, 'tags-div');
        console.log('delete button pressed...');
      });

      // add under div
      parent?.appendChild(newDiv);
    }

    console.log('tag array size: ', this.tagArray.length);
    console.log('links array size: ', this.linkArray.length);

    // loop for links
    for (let i = 0; i < this.linkArray.length; i++) {
      const newDiv = document.createElement('div');
      const val = this.linkArray[i];
      newDiv.classList.add(
        'flex',
        'justify-between',
        'border',
        'rounded',
        'p-1'
      );
      newDiv.innerHTML = `<h4 class="text-xl font-semibold">${this.linkArray[i]}</h4>`;

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
        this.deleteItem(val, 'links-div');
        console.log('delete button pressed...');
      });

      // add under div
      parent2?.appendChild(newDiv);
    }
  }

  deleteItem(item: string, type: string) {
    console.log('delete item ran...');
    // tags delete
    if (type === 'tags-div') {
      console.log('item: ', item);
      let index = -1;
      for (let i = 0; i < this.tagArray.length; i++) {
        if (this.tagArray[i] === item) {
          index = i;
          break;
        }
      }
      this.tagArray.splice(index, 1);
      this.grabChild(index, type);
    }
    // links delete
    else {
      let index = -1;
      for (let i = 0; i < this.linkArray.length; i++) {
        if (this.linkArray[i] === item) {
          index = i;
          break;
        }
      }
      console.log('link array: ', this.linkArray);
      this.linkArray.splice(index, 1);
      console.log('link array: ', this.linkArray);
      this.grabChild(index, type);
    }
  }

  grabChild(index: number, type: string) {
    const parent = document.getElementById(type)!;
    const child = parent.children;
    if (child && index > -1) {
      console.log('index in delete: ', index);
      parent.removeChild(child[index]);
      console.log('removing child from parent: ', child);
    }
  }

  // populate arrays
  popArrays() {
    for (let i = 0; i < this.threadData!.links!.length; i++) {
      this.linkArray.push(this.threadData!.links![i]);
    }
    for (let i = 0; i < this.threadData!.tags!.length; i++) {
      this.tagArray.push(this.threadData!.tags![i]);
      console.log('tagarray: ', this.tagArray);
    }
  }

  // -------------------------------------------------------------------------

  // get Thread call function
  getThreadCall() {
    // should grab its own threads data from id in the url route
    this.threadService.getThread(this.itemId).subscribe({
      next: (data: any) => {
        console.log('Current THREAD PAGE DATA...  ', data);
        this.threadData = data;
        // populate divs for the arrays Tags and Links

        this.imagePreview = data.threadImage;
        this.popArrays();
        this.populateDivsOnLoad();

        // set thread form values...
        this.threadForm.setValue({
          title: this.threadData?.title,
          bio: this.threadData?.bio,
        });
      },
      error: (error) => {
        console.log('Error for getting current thread page data:', error);
      },
    });
  }

  // on submit for thread
  threadFormSubmit(imageObject: { url: string; filePath: string } | null) {
    console.log('thread form: ', this.threadForm.value);
    const object = this.threadForm.value;
    console.log('array: ', this.linkArray);

    console.log('thread data BEFORE SUBMITER........', this.threadData);

    const newObject = {
      title: object.title,
      bio: object.bio,
      links: this.linkArray,
      tags: this.tagArray,
      threadImage: imageObject?.url,
      threadImagePath: imageObject?.filePath,
    };
    console.log('new object: ', newObject);
    console.log('thread data before PATCH to API: ', this.threadData);

    this.threadService.editThread(this.threadData!._id, newObject).subscribe({
      next: (data: any) => {
        console.log('Data from new thread... ', data);
        this.router.navigate(['/thread', data._id]);
      },
      error: (error) => {
        console.log('Error for creating new thread:', error);
      },
    });
  }

  // on submit for
  formSubmit() {
    this.firebase = true; // should trigger firebase to submit its data first
  }
}
