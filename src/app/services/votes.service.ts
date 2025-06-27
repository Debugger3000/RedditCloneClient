import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { VoteType } from '../types/post';

@Injectable({
  providedIn: 'root',
})
export class VotesService {
  constructor(private http: HttpClient) {}

  // vote on a post...
  voteApi(voteType: VoteType) {
    console.log('vote api client side triggered and sent to backend !');
    return this.http.post(`${environment.apiRoute}/post/vote`, voteType, {
      withCredentials: true,
    });
  }

  // users history
  // show users posts that they voted on

  // show users comment history...
}
