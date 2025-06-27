export type UserRegister = {
  status: boolean;
};

export type UserRegisterData = Partial<{
  email: String | null;
  password: String | null;
  username: String | null;
}>;

export type UserLoginData = Partial<{
  email: String | null;
  password: String | null;
}>;

export type Votes = {
  postId: string | null | undefined;
  typeOfVote: boolean | null | undefined;
}[];

export type UserData = {
  _id: string;
  username: string | null;
  // image eventually....
  profileImage: string | null | undefined;
  votes: Votes;
} | null;
