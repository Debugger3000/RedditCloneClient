import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { VoteType } from '../types/post';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root',
})
export class VotesService {
  constructor(
    private http: HttpClient,
    private generalService: GeneralService
  ) {}

  // vote on a post...
  voteApi(voteType: VoteType) {
    console.log('vote api client side triggered and sent to backend !');
    return this.http.post(`${environment.apiRoute}/post/vote`, voteType, {
      withCredentials: true,
    });
  }

  // check users vote array against current post
  // outsourced to votes service since it will share this function with some other components
  // check is user has voted on this post
  checkUserVote(postId: string | null | undefined): boolean | null | undefined {
    // console.log(
    //   'users data from VOTE POST: ',
    //   this.generalService.currentUserData
    // );
    let votes = this.generalService.currentUserData?.votes;
    for (let i = 0; i < votes!.length; i++) {
      let id = votes![i].postId;
      let type = votes![i].voteType;
      // console.log('current vote ID:', votes![i]);
      // console.log('post id: ', this.postData?._id);
      // console.log('TYPE OF FCKN: ', type);
      if (id == postId) {
        if (type !== null) {
          // this.userVote = type;
          return type;
          console.log('assigning a value i think now; ', type);
        }
        // console.log('users vote for this post is: ', item.typeOfVote);
      }
      // console.log('votes on index', i, votes![i]);
    }
    return null;
  }

  // users history
  // show users posts that they voted on

  // show users comment history...
}
