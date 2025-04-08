import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Thread } from '../types/thread';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThreadsService {
  constructor(private http: HttpClient) {}



  // Create a new thread
  createThread(threadData: Thread){
    return this.http.post(`${environment.apiRoute}/thread`, threadData, {withCredentials: true});
  }

  // get single thread by id
  getThread(id: string | null) {
    return this.http.get(`${environment.apiRoute}/thread/${id}`, {withCredentials: true});
  }

  // search bar for a thread by title
  getThreadByTitle(title: string) {
    return this.http.get(`${environment.apiRoute}/thread/search/${title}`, {withCredentials: true});
  }

  // join Thread / Un join 
  joinThread(threadId: string) {
    return this.http.post(`${environment.apiRoute}/thread/join/${threadId}`, {withCredentials: true});
  }

  // delete thread
  deleteThread(threadId: string | undefined) {
    return this.http.delete(`${environment.apiRoute}/thread/${threadId}`, {withCredentials: true});
  }

  // edit thread
  editThread(threadId: string | undefined, content: Thread) {
    return this.http.patch(`${environment.apiRoute}/thread/${threadId}`, content, {withCredentials: true});
  }


}
