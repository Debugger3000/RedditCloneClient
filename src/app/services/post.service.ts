import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Post } from '../types/post';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  // Create a new thread
  createPost(postData: Post) {
    return this.http.post(`${environment.apiRoute}/post`, postData, {
      withCredentials: true,
    });
  }

  // get posts for a thread
  getPostsForThread(threadId: string | null, page: number, limit: number) {
    return this.http.get(
      `${environment.apiRoute}/post/${threadId}?page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      }
    );
  }

  // get posts ALL
  getPosts(page: number, limit: number) {
    console.log('get posts in general called ehhehehe');
    return this.http.get(
      `${environment.apiRoute}/post?page=${page}&limit=${limit}`,
      { withCredentials: true }
    );
  }

  // Get post by id
  getPost(postId: string | null) {
    return this.http.get(`${environment.apiRoute}/post/single/${postId}`, {
      withCredentials: true,
    });
  }

  // delete post by user who created it
  deletePost(postId: string | null | undefined) {
    console.log('calling api to delete this post');
    return this.http.delete(`${environment.apiRoute}/post/${postId}`, {
      withCredentials: true,
    });
  }
}
