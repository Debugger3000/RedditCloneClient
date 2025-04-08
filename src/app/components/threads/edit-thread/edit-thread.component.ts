import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ThreadData } from '../../../types/thread';
import { ThreadsService } from '../../../services/threads.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-thread',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-thread.component.html',
  styleUrl: './edit-thread.component.scss'
})
export class EditThreadComponent implements OnInit{
  constructor(private threadService: ThreadsService, private router: Router, private activatedRoute: ActivatedRoute) {}


  // thread data
  threadData: ThreadData = {_id: '', title: 'loading', bio: 'loading bio', followersCount: 0, followers: [''], posts: [''], links: [''], owner: '', threadImage: 0, tags: [''], createdAt: '', updatedAt: '', __v: 0};

  linkArray: string[] = [];
  tagArray: string[] = [];

  itemId: string | null = '';


  ngOnInit(): void {

    console.log("EDITING A THREAD PAGE.............................................");

    // Access the 'id' route parameter
    this.activatedRoute.paramMap.subscribe(params => {
      this.itemId = params.get('id');
      console.log('Item ID:', this.itemId);
      
    });

    this.getThreadCall();

    

    
  }


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


  populateDivsOnLoad() {
    console.log("poulate divs has been run...");
    
    const parent = document.getElementById('tags-div');
    const parent2 = document.getElementById('links-div');
    // loop for tags
    for(let i = 0; i <this.tagArray.length; i++) {
      const newDiv = document.createElement('div');
      newDiv.classList.add('flex', 'justify-between', 'border', 'rounded', 'p-1');
      newDiv.innerHTML = `<h4 class="text-xl font-semibold">${this.tagArray[i]}</h4>`;
      
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

    }

    console.log("tag array size: ",this.tagArray.length);
    console.log("links array size: ",this.linkArray.length);


    // loop for links
    for(let i = 0; i <this.linkArray.length; i++) {
      const newDiv = document.createElement('div');
      newDiv.classList.add('flex', 'justify-between', 'border', 'rounded', 'p-1');
      newDiv.innerHTML = `<h4 class="text-xl font-semibold">${this.linkArray[i]}</h4>`;
      
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
      parent2?.appendChild(newDiv);

    }
  }




// populate arrays
popArrays() {
  for(let i = 0; i <this.threadData!.links!.length; i++) {
    this.linkArray.push(this.threadData!.links![i]);
  }
  for(let i = 0; i <this.threadData!.tags!.length; i++) {
    this.linkArray.push(this.threadData!.tags![i]);
  }
}






// get Thread call function
getThreadCall() {
  // should grab its own threads data from id in the url route
  this.threadService.getThread(this.itemId).subscribe({
    next: (data: any) => {
      console.log("Current THREAD PAGE DATA...  ", data);
      this.threadData = data;
      // populate divs for the arrays Tags and Links
      this.popArrays();
      this.populateDivsOnLoad();

    },
    error: (error) => {
      console.log("Error for getting current thread page data:", error);
    }
  });
}



// on submit for thread
threadFormSubmit() {
  // this.threadForm.setValue()

  console.log("thread form: ", this.threadForm.value);
  const object = this.threadForm.value;
  console.log("array: ",this.linkArray);

  const newObject = {title: object.title, bio: object.bio, links: this.linkArray, tags:this.tagArray};
  console.log("new object: ", newObject);
 

  this.threadService.editThread(this.threadData?._id,newObject).subscribe({
    next: (data: any) => {
      console.log("Data from new thread... ", data);
      this.router.navigate(['/thread', data.thread._id]);
    },
    error: (error) => {
      console.log("Error for creating new thread:", error);
    }
  });

  // this.threadService.createThread(newObject).subscribe({
  //   next: (data: any) => {
  //     console.log("Data from new thread... ", data);
  //     this.router.navigate(['/thread', data.thread._id]);
  //   },
  //   error: (error) => {
  //     console.log("Error for creating new thread:", error);
  //   }
  // });
}


}



