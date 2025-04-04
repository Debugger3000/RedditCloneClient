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
    return this.http.post(`${environment.apiRoute}/threads`, threadData, {withCredentials: true});
  }


}
