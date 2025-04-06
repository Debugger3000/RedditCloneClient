import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { ThreadsService } from '../../../services/threads.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-thread',
  imports: [ReactiveFormsModule],
  templateUrl: './new-thread.component.html',
  styleUrl: './new-thread.component.scss'
})
export class NewThreadComponent {
    constructor(private threadService: ThreadsService, private router: Router) {}


    linkArray: string[] = [];

// create form items
threadForm = new FormGroup({
  title: new FormControl(''),
  bio: new FormControl(''),
  links: new FormControl(),
})


// add link
addLink() {

  const input = document.getElementById('links-input') as HTMLInputElement;

  // add link to array
  this.linkArray.push(input.value);

  const parent = document.getElementById('links-div')
  const newDiv = document.createElement('div');

  newDiv.classList.add('flex', 'justify-between', 'border', 'rounded', 'p-1');
  // newDiv.setAttribute('class','')
  newDiv.innerHTML = `<h4 class="text-xl font-semibold">${input.value}</h4>`;


  // <button type='button' class="p-2 bg-red-800 text-white rounded-full hover:cursor-pointer" (click)="deleteLink(${this.linkArray.length-1})">X</button>

  // Create the button dynamically
  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.classList.add('p-2', 'bg-red-800', 'text-white', 'rounded-full', 'hover:cursor-pointer');
  deleteButton.textContent = 'X';
  newDiv.appendChild(deleteButton);

  // Add event listener to the button to delete the link
  deleteButton.addEventListener('click', () => {
    this.deleteLink(this.linkArray.length - 1);
  });

  // add under div
  parent?.appendChild(newDiv);

  // clear links input field
  input.value = '';
}

deleteLink(link: number) {
  const newArray = this.linkArray.slice(link,1);
  this.linkArray = newArray;

  // remove div node from html
  // const parent = document.getElementById('links-div');
  // const child = parent?.childNodes[link];
  // parent?.removeChild(child);


  console.log("delete pressed and new array is: ", this.linkArray);
}


// on submit for thread
threadFormSubmit() {
  // this.threadForm.setValue()

  console.log("thread form: ", this.threadForm.value);
  const object = this.threadForm.value;
  console.log("array: ",this.linkArray);

  const newObject = {title: object.title, bio: object.bio, links: this.linkArray};
  console.log("new object: ", newObject);

  this.threadService.createThread(newObject).subscribe({
    next: (data: any) => {
      console.log("Data from new thread... ", data);
      this.router.navigate(['/thread', data.thread._id]);
    },
    error: (error) => {
      console.log("Error for creating new thread:", error);
    }
  });
}


}
