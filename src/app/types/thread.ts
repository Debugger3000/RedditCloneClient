export type Thread = Partial<{
  title: string | null;
  bio: string | null;
  links: string[] | null;
  tags: string[] | null;
  threadImage: string | ArrayBuffer | null;
}>;

export type ThreadData = {
  _id: string | null;
  title: string | null;
  bio: string | null;
  links: string[] | null;
  threadImage: string | undefined | null;
  followers: string[] | null;
  posts: string[] | null;
  followersCount: number | null;
  tags: string[] | null;
  owner: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  __v: number | null;
} | null;
