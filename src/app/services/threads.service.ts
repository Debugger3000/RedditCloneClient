import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Thread, ThreadData } from '../types/thread';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThreadsService {
  constructor(private http: HttpClient) {}

  private threadEnteredSource = new Subject<string | null>(); // or any payload
  threadEntered$ = this.threadEnteredSource.asObservable();

  private threadJoined = new Subject<string | null>(); // or any payload
  threadJoined$ = this.threadJoined.asObservable();

  notifyThreadEntered(threadId: string | null) {
    console.log('notify thread entered has been called....', threadId);
    this.updateRecentThreads(threadId).subscribe({
      next: (data: any) => {
        console.log('update recent thread.... in services ', data);
      },
      error: (error) => {
        console.log('Error for getting current thread page data:', error);
      },
    });
    this.threadEnteredSource.next(threadId);
  }

  notifyThreadJoined(threadId: string | null) {
    this.threadJoined.next(threadId);
  }

  // Create a new thread
  createThread(threadData: Thread) {
    return this.http.post(`${environment.apiRoute}/thread`, threadData, {
      withCredentials: true,
    });
  }

  // get single thread by id
  getThread(id: string | null) {
    return this.http.get(`${environment.apiRoute}/thread/${id}`, {
      withCredentials: true,
    });
  }

  // search bar for a thread by title
  getThreadByTitle(title: string) {
    return this.http.get(`${environment.apiRoute}/thread/search/${title}`, {
      withCredentials: true,
    });
  }

  getThreadByUser() {
    return this.http.get<ThreadData[]>(
      `${environment.apiRoute}/thread/user/ya`,
      { withCredentials: true }
    );
  }

  // join Thread / Un join
  joinThread(threadId: string) {
    return this.http.post(`${environment.apiRoute}/thread/join/${threadId}`, {
      withCredentials: true,
    });
  }

  // delete thread
  deleteThread(threadId: string | null) {
    return this.http.delete(`${environment.apiRoute}/thread/${threadId}`, {
      withCredentials: true,
    });
  }

  // edit thread
  editThread(threadId: string | null, content: Thread) {
    return this.http.patch(
      `${environment.apiRoute}/thread/${threadId}`,
      content,
      { withCredentials: true }
    );
  }

  // --------------------------------
  // Recent threads section services

  // get recent user threads
  getRecentThreads() {
    return this.http.get<ThreadData[]>(
      `${environment.apiRoute}/userData/recentThreads`,
      {
        withCredentials: true,
      }
    );
  }

  // update recent threads - called when a thread page is accessed
  updateRecentThreads(threadId: string | null) {
    return this.http.patch(
      `${environment.apiRoute}/userData/recentThreads`,
      { threadId: threadId },
      {
        withCredentials: true,
      }
    );
  }
}
