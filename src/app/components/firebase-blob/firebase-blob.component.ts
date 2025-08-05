import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { storage } from './firebaseInit';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { PostService } from '../../services/post.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-firebase-blob',
  imports: [],
  templateUrl: './firebase-blob.component.html',
  styleUrl: './firebase-blob.component.scss',
})
export class FirebaseBlobComponent implements OnChanges, OnInit {
  constructor(private postService: PostService) {}
  fileReady: string | ArrayBuffer | null = null;
  imagePreview: string | ArrayBuffer | null | undefined = null;
  // current image selected
  currentImage: ArrayBuffer | null = null;
  // image type
  currentImageType: string = '';

  // image binary string data, store to load into object...
  imageStore: string | ArrayBuffer | null = null;

  @Input() formSubmitted: boolean = false;
  @Input() firebaseCallBackParent!: (
    imageObject: {
      url: string;
      filePath: string;
    } | null
  ) => void;

  @Input() previousImage: string | null | undefined = '';

  ngOnInit(): void {
    // if editing, then we set imagePreview to whatever existing image for (Thread, profile...)
    console.log('previous image: ', this.previousImage);
    this.imagePreview = this.previousImage;
  }

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
      } else if (key === 'previousImage') {
        const newImage = changes['previousImage'].currentValue;
        this.imagePreview = newImage;
      }
    }
    // form submitted, value is true, so upload to firebase storage
  }

  async callUpload() {
    const url = await this.uploadToFirebase();
    this.firebaseCallBackParent(url);
  }

  // return url
  async uploadToFirebase(): Promise<{ url: string; filePath: string } | null> {
    // if image was never changed, then we dont run any upload to firebase.
    // Image never changed
    if (this.currentImage !== null) {
      // generate random string for filename

      try {
        // make request to server for SIGNED URL
        const fileName = Math.random().toString(36).substring(2, 10);
        const filePath = `images/${Date.now()}_${fileName}`;
        console.log(
          'file content type before signedurl GET: ',
          this.currentImageType
        );
        // make request
        const signedUrl = await firstValueFrom(
          this.postService.uploadFirebase(filePath, this.currentImageType)
        );

        console.log('fetched signed URL: ', signedUrl.toString());

        const response = await fetch(signedUrl.toString(), {
          method: 'PUT',
          headers: {
            'Content-Type': this.currentImageType,
          },
          body: this.currentImage,
        });

        // make sure response to upload photo is OK
        // IF upload is bad, we reject any image URL or PATH for whatever structure (profile image, thread image, etc...)
        if (!response.ok) {
          console.error('Upload failed:', response.status, response.statusText);
          return null;
        }

        // then grab image URL once its uploaded into firebase storage
        const storageRef = ref(storage, filePath);
        // const snapshot = await uploadBytes(storageRef, this.currentImage);
        const url = await getDownloadURL(storageRef);
        return { url: url, filePath: filePath };
      } catch (error) {
        this.formSubmitted = false;
        console.error('Upload failed:', error);
        return null;
      }
    }
    // submit thread with no image at this time. They can add one in edit later !
    else {
      return null;
    }
  }

  // Input that will let us know when user wants to submit form.
  // on form submit / ngOnChange we can send image to firebase storage
  // wait for response, and then allow the page to properly send data to server / DB accordingly

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.currentImage = file;
    this.currentImageType = file.type;
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
