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
    tagArray: string[] = [];
    
    fileReady: string | ArrayBuffer | null = null;
    imagePreview: string | ArrayBuffer | null = null;
    // current image selected 
    currentImage: string | ArrayBuffer | null = null;

// create form items
threadForm = new FormGroup({
  title: new FormControl(''),
  bio: new FormControl(''),
  links: new FormControl(),
  image: new FormControl()
})

  //add tag
  addDiv(inputId: string, divId: string) {
    const input = document.getElementById(inputId) as HTMLInputElement;
    const parent = document.getElementById(divId);
    if(inputId === 'links-input'){
      // add link to array
      this.linkArray.push(input.value);
    }
    else{
      this.tagArray.push(input.value);
    }
    const newDiv = document.createElement('div');
    newDiv.classList.add('flex', 'justify-between', 'border', 'rounded', 'p-1');
    newDiv.innerHTML = `<h4 class="text-xl font-semibold">${input.value}</h4>`;


    // Create the button dynamically
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.classList.add('p-2', 'bg-red-800', 'text-white', 'rounded-full', 'hover:cursor-pointer');
    deleteButton.textContent = 'X';
    newDiv.appendChild(deleteButton);

  // Add event listener to the button to delete the link
  deleteButton.addEventListener('click', () => {
    // this.deleteLink(this.linkArray.length - 1);
    console.log("delete button pressed...");
  });

  // add under div
  parent?.appendChild(newDiv);

  // clear links input field
  input.value = '';

  console.log('Links array: ', this.linkArray);
  console.log("tags array: ",this.tagArray);
  }



// add link
// addLink() {

//   const input = document.getElementById('links-input') as HTMLInputElement;

//   // add link to array
//   this.linkArray.push(input.value);

//   const parent = document.getElementById('links-div')
//   const newDiv = document.createElement('div');

//   newDiv.classList.add('flex', 'justify-between', 'border', 'rounded', 'p-1');
//   // newDiv.setAttribute('class','')
//   newDiv.innerHTML = `<h4 class="text-xl font-semibold">${input.value}</h4>`;


//   // <button type='button' class="p-2 bg-red-800 text-white rounded-full hover:cursor-pointer" (click)="deleteLink(${this.linkArray.length-1})">X</button>

//   // Create the button dynamically
//   const deleteButton = document.createElement('button');
//   deleteButton.type = 'button';
//   deleteButton.classList.add('p-2', 'bg-red-800', 'text-white', 'rounded-full', 'hover:cursor-pointer');
//   deleteButton.textContent = 'X';
//   newDiv.appendChild(deleteButton);

//   // Add event listener to the button to delete the link
//   deleteButton.addEventListener('click', () => {
//     this.deleteLink(this.linkArray.length - 1);
//   });

//   // add under div
//   parent?.appendChild(newDiv);

//   // clear links input field
//   input.value = '';
// }

deleteLink(link: number) {
  const newArray = this.linkArray.slice(link,1);
  this.linkArray = newArray;

  // remove div node from html
  // const parent = document.getElementById('links-div');
  // const child = parent?.childNodes[link];
  // parent?.removeChild(child);


  console.log("delete pressed and new array is: ", this.linkArray);
}


onFileChange(event: any) {
  const file = event.target.files;
  const fileRead = new FileReader();

  console.log("event given: ",event);
  console.log("event given files: ",event.target.files);

  fileRead.onload = () => {
    // reader.result will contain the file content as Base64 string or binary data
    this.fileReady = fileRead.result; // Binary or Base64 data
    this.imagePreview = fileRead.result; // Set image preview (Base64 for display)
  }

  fileRead.onloadend = () => {
    this.fileReady = fileRead.result; 
    this.currentImage = fileRead.result;
    this.imagePreview = fileRead.result; // Set image preview (Base64 for display)
    console.log("file read and loaded....");
    console.log("Result: ",fileRead.result);
  }

  // Read the file as binary (ArrayBuffer) for processing binary data
  // fileRead.readAsArrayBuffer(file[0]);
  fileRead.readAsDataURL(file[0]);

  console.log("file: ",this.fileReady);
  console.log("file Reader object: ",fileRead);
  console.log("image preview: ",this.imagePreview);
}


// on submit for thread
threadFormSubmit() {
  // this.threadForm.setValue()

  console.log("thread form: ", this.threadForm.value);
  const object = this.threadForm.value;
  console.log("array: ",this.linkArray);

  const newObject = {title: object.title, bio: object.bio, links: this.linkArray, tags:this.tagArray};
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
