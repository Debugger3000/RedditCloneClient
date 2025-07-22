import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { storage } from './firebaseInit';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

@Component({
  selector: 'app-firebase-blob',
  imports: [],
  templateUrl: './firebase-blob.component.html',
  styleUrl: './firebase-blob.component.scss',
})
export class FirebaseBlobComponent implements OnChanges {
  fileReady: string | ArrayBuffer | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  // current image selected
  currentImage: ArrayBuffer | null = null;

  // image binary string data, store to load into object...
  imageStore: string | ArrayBuffer | null = null;

  @Input() formSubmitted: boolean = false;
  @Input() firebaseCallBackParent!: (url: string) => void;

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['formSubmitted'].currentValue) {
    //   console.log('formsubmitted: ', this.formSubmitted);
    // }
    for (const key of Object.keys(changes)) {
      console.log('key: ', key);
      console.log('new value: ', changes[key].currentValue);
      if (key === 'formSubmitted') {
        const cur = changes['formSubmitted'].currentValue;
        console.log('formsubmitted: ', cur);
        if (cur) {
          this.callUpload();
        }
      }
    }
    // form submitted, value is true, so upload to firebase storage
  }

  async callUpload() {
    const url = await this.uploadToFirebase();
    this.firebaseCallBackParent(url);
  }

  // return url
  async uploadToFirebase(): Promise<string> {
    // upload image
    if (this.currentImage !== null) {
      // generate random string for filename

      try {
        const fileName = Math.random().toString(36).substring(2, 10);

        const filePath = `images/${Date.now()}_${fileName}`;
        const storageRef = ref(storage, filePath);

        const snapshot = await uploadBytes(storageRef, this.currentImage);
        const url = getDownloadURL(snapshot.ref);
        return url;
      } catch (error) {
        this.formSubmitted = false;
        console.error('Upload failed:', error);
        return '';
      }
    }
    // submit thread with no image at this time. They can add one in edit later !
    else {
      return '';
    }
  }

  // Input that will let us know when user wants to submit form.
  // on form submit / ngOnChange we can send image to firebase storage
  // wait for response, and then allow the page to properly send data to server / DB accordingly

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.currentImage = file;
    console.log('current image file: ', this.currentImage);
    const fileRead = new FileReader();
    // const fileReadStore = new FileReader();

    fileRead.onload = () => {
      // reader.result will contain the file content as Base64 string or binary data
      // this.fileReady = fileRead.result; // Binary or Base64 data
      this.imagePreview = fileRead.result; // Set image preview (Base64 for display)
    };

    fileRead.readAsDataURL(file);

    // fileRead.onloadend = () => {
    //   this.fileReady = fileRead.result;
    //   this.currentImage = fileRead.result;
    //   this.imagePreview = fileRead.result; // Set image preview (Base64 for display)
    //   console.log('file read and loaded....');
    //   console.log('Result: ', fileRead.result);
    // };

    // fileReadStore.onloadend = () => {
    //   this.imageStore = fileReadStore.result;
    //   console.log('image store: ', this.imageStore);
    // };

    // Read the file as binary (ArrayBuffer) for processing binary data
    // fileRead.readAsArrayBuffer(file[0]);
    // fileReadStore.readAsText(file[0]);

    // console.log('file: ', this.fileReady);
    // console.log('file Reader object: ', fileRead);
    // console.log('image preview: ', this.imagePreview);
  }
}
