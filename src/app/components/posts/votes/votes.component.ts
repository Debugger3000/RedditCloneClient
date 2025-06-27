import { Component, Input } from '@angular/core';
import { VotesService } from '../../../services/votes.service';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'app-votes',
  imports: [],
  templateUrl: './votes.component.html',
  styleUrl: './votes.component.scss',
})
export class VotesComponent {
  constructor(
    private voteService: VotesService,
    private generalService: GeneralService
  ) {}

  // hover variables
  isUpVote = false;
  isDownVote = false;

  // vote user state
  // either true (UP VOTE) or false (DOWN VOTE)
  @Input() usersVote: boolean | null = false;
  @Input() voteCount: number | null | undefined = 0;
  // post id so vote knows what post is being clicked
  @Input() postId: string | null | undefined = null;

  // vote clicked
  voteClicked(type: boolean) {
    // user needs to be logged in to be able to vote on posts...
    if (this.generalService.currentUserData == null) {
      console.log('Cannot vote you need to be logged in !');
    } else if (this.usersVote == null || this.usersVote != type) {
      this.voteService
        .voteApi({ postId: this.postId, voteType: type })
        .subscribe({
          next: (data: any) => {
            console.log('Data from new VOTE VOTE VOTE... ', data);
          },
          error: (error) => {
            console.log('Error for creating vote:', error);
          },
        });
    }
    console.log('you voted: ', type);
  }

  // hover up vote
  hoverUpVote() {
    this.isUpVote = !this.isUpVote;
  }

  // hover down vote
  hoverDownVote() {
    this.isDownVote = !this.isDownVote;
  }
}
