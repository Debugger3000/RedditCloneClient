import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Comment } from '../types/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private http: HttpClient) {}

  // comment level data denotion

  commentLevels = {
    0: 'ml-12',
    1: 'ml-24',
    2: 'ml-36',
    3: 'ml-48',
  };

  // Create a new thread
  createComment(commentData: Comment) {
    console.log('calling api for posting comment...');
    return this.http.post(`${environment.apiRoute}/comment`, commentData, {
      withCredentials: true,
    });
  }

  // Get comments for a post
  getCommentsByPost(postId: string | null) {
    return this.http.get(`${environment.apiRoute}/comment/${postId}`, {
      withCredentials: true,
    });
  }

  // delete a comment
  deleteComment(commentId: string | null | undefined) {
    console.log('calling api for deleting comment...');
    return this.http.delete(`${environment.apiRoute}/comment/${commentId}`, {
      withCredentials: true,
    });
  }

  // edit a comment
  editComment(commentData: {
    commentId: string | null | undefined;
    commentText: string | null | undefined;
  }) {
    console.log('calling api for editing comment...');
    return this.http.put(`${environment.apiRoute}/comment`, commentData, {
      withCredentials: true,
    });
  }
}
