import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { VotesService } from '../../../services/votes.service';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'app-comment-votes',
  imports: [],
  templateUrl: './comment-votes.component.html',
  styleUrl: './comment-votes.component.scss',
})
export class CommentVotesComponent implements OnInit, OnChanges {
  constructor(
    private voteService: VotesService,
    private generalService: GeneralService
  ) {}

  // hover variables
  isUpVote = false;
  isDownVote = false;

  // ------------------------------------------------------

  // VOTES for comments
  @Input() commentId: string | null | undefined = null;
  // this has to be grabbed on comment load from generalService...
  @Input() usersVoteType: boolean | null | undefined = null;
  @Input() voteCount: number | null | undefined = 0;

  ngOnInit(): void {
    // console.log('user vote value on VOTE COMP: ', this.usersVote);

    // grab usersVoteType from general service and assign to usersVoteType...
    if (this.generalService.currentUserData) {
      this.usersVoteType = this.voteService.checkUsersCommentsVote(
        this.commentId
      );
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usersVoteType']) {
      this.usersVoteType = changes['usersVoteType'].currentValue;
      console.log(
        'ng on changes we changed it to value....',
        changes['usersVoteType'].currentValue
      );
    }
  }

  // trigger when user votes on a comment
  // need to localize the vote here, so it is modular per comment
  voteClicked(type: boolean) {
    // if user logged in, then send request to add a vote to whatever comment...
    if (this.generalService.currentUserData == null) {
    } else if (this.usersVoteType == null || this.usersVoteType != type) {
      this.voteService
        .voteCommentApi({ commentId: this.commentId, voteType: type })
        .subscribe({
          next: (data: any) => {
            this.generalService
              .getUserById(this.generalService.currentUserData?._id)
              .subscribe({
                next: (data) => {
                  console.log('get new user data and set it to: ', data);
                  this.generalService.setUserData(data);
                },
                error: (error) => {
                  console.log('Error on login: ', error);
                },
              });
            if (type == true) {
              this.voteCount = this.voteCount! + 1;
            } else if (type == false) {
              if (this.voteCount! > 0) {
                this.voteCount = this.voteCount! - 1;
              }
            }
            this.usersVoteType = type;
          },
          error: (error) => {
            console.log('Error for creating vote:', error);
          },
        });
    }
  }

  // vote clicked
  // voteClicked(type: boolean) {
  //   if (this.generalService.currentUserData == null) {
  //     console.log('Cannot vote you need to be logged in !');
  //   } else if (this.usersVote == null || this.usersVote != type) {
  //     this.voteService
  //       .voteApi({ postId: this.postId, voteType: type })
  //       .subscribe({
  //         next: (data: any) => {
  //           this.generalService
  //             .getUserById(this.generalService.currentUserData?._id)
  //             .subscribe({
  //               next: (data) => {
  //                 console.log('get new user data and set it to: ', data);
  //                 this.generalService.setUserData(data);
  //               },
  //               error: (error) => {
  //                 console.log('Error on login: ', error);
  //               },
  //             });
  //           if (type == true) {
  //             this.voteCount = this.voteCount! + 1;
  //           } else if (type == false) {
  //             this.voteCount = this.voteCount! - 1;
  //           }
  //           this.usersVote = type;
  //         },
  //         error: (error) => {
  //           console.log('Error for creating vote:', error);
  //         },
  //       });
  //   }
  //   console.log('you voted: ', type);
  // }

  // hover up vote
  hoverUpVote() {
    this.isUpVote = !this.isUpVote;
  }

  // hover down vote
  hoverDownVote() {
    this.isDownVote = !this.isDownVote;
  }
}
