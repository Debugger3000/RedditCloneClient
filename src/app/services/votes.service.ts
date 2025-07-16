import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { VoteType } from '../types/post';
import { GeneralService } from './general.service';
import { commentVoteType } from '../types/comment';

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

  // vote on a comment...
  voteCommentApi(voteType: commentVoteType) {
    console.log(
      'vote on comment api client side triggered and sent to backend !'
    );
    return this.http.post(`${environment.apiRoute}/comment/vote`, voteType, {
      withCredentials: true,
    });
  }

  // check users vote array against current post
  // outsourced to votes service since it will share this function with some other components
  // check is user has voted on this post
  checkUserVote(postId: string | null | undefined): boolean | null | undefined {
    if (this.generalService.currentUserData) {
      let votes = this.generalService.currentUserData?.votes;
      for (let i = 0; i < votes!.length; i++) {
        let id = votes![i].postId;
        let type = votes![i].voteType;

        if (id == postId) {
          if (type !== null) {
            return type;
            console.log('assigning a value i think now; ', type);
          }
        }
      }
    }

    return null;
  }

  // grab users comment vote type
  checkUsersCommentsVote(
    commentId: string | null | undefined
  ): boolean | null | undefined {
    let commentVotes = this.generalService.currentUserData?.voteOnComments;

    if (this.generalService.currentUserData) {
      if (commentVotes!.length < 1) {
        return null;
      }

      for (let i = 0; i < commentVotes!.length; i++) {
        let id = commentVotes![i].commentId;
        let type = commentVotes![i].voteType;

        if (id == commentId) {
          if (type !== null) {
            return type;
            console.log('assigning a value i think now; ', type);
          }
        }
      }
    }

    return null;
  }

  // users history
  // show users posts that they voted on

  // show users comment history...
}
