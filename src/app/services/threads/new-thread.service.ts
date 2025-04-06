import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NewThreadService {

  constructor(private http: HttpClient) { }


  // // Post a new thread
  // createThread(threadData){
  //   return this.http.post(`${environment}/thread`,{}, {withCredentials:true});
  // }

}
