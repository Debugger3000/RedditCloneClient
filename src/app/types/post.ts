export type Post = Partial<{
  title: string | null;
  textContent: string | null;
  parentThread: string | null;
  parentThreadTitle: string | null;
  parentThreadImage: string | null | undefined;
  tag: string | null;
}>;

export type PostData = {
  _id: string | null;
  title: string | null;
  textContent: string | null;
  parentThread: string | null;
  parentThreadTitle: string | null;
  parentThreadImage: string | null | undefined;
  ownerPicture: string | null | undefined;
  ownerUsername: string | null | undefined;
  commentCount: number | null | undefined;
  voteCount: number | null | undefined;
  owner: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  tag: string | null;
  __v: number | null;
} | null;

export type VoteType = {
  postId: string | null | undefined;
  voteType: boolean;
};
