import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Post } from '../types/post';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }



  // Create a new thread
  createPost(postData: Post){
    return this.http.post(`${environment.apiRoute}/post`, postData, {withCredentials: true});
  }

  // get posts for a thread
  getPostsForThread(threadId: string | null) {
    return this.http.get(`${environment.apiRoute}/post/${threadId}`,{withCredentials: true});
  }

  // get posts ALL
  getPosts(){
    return this.http.get(`${environment.apiRoute}/post/`,{withCredentials: true});
  }

  // Get post by id
  getPost(postId: string | null){
    return this.http.get(`${environment.apiRoute}/post/single/${postId}`,{withCredentials: true})
  }
}
