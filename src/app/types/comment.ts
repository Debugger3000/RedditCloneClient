export type Comment = {
  parentThread: string | null | undefined;
  parentComment: string | null | undefined;
  commentText: string | null | undefined;
  owner: string | undefined;
  ownerUserName: string | null | undefined;
  ownerPicture: string | null | undefined;
};

export type SortComments = {
  parentThread: string | null | undefined;
  parentComment: string | null | undefined;
  commentText: string | null | undefined;
  owner: string | undefined;
  childComments: SortComments[];
  ownerUserName: string | null | undefined;
  ownerPicture: string | null | undefined;
  createdAt: string;
  _id: string;
  updatedAt: string;
  __v: number;
};

export type LiveComment = {
  parentThread: string | null | undefined;
  parentComment: string | null | undefined;
  commentText: string | null | undefined;
  owner: string | undefined;
  childComments: LiveComment;
  ownerUserName: string | null | undefined;
  ownerPicture: string | null | undefined;
  voteCount: number | null | undefined;
  createdAt: string;
  _id: string;
  updatedAt: string;
  __v: number;
}[];

export type LiveCommentSolo = {
  parentThread: string | null | undefined;
  parentComment: string | null | undefined;
  commentText: string | null | undefined;
  owner: string | undefined;
  childComments: LiveComment;
  ownerUserName: string | null | undefined;
  ownerPicture: string | null | undefined;
  voteCount: number | null | undefined;
  createdAt: string;
  _id: string;
  updatedAt: string;
  __v: number;
};

export type commentVoteType = {
  commentId: string | null | undefined;
  voteType: boolean;
};
