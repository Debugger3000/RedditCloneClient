

export type Thread = Partial<{
    title: string | null;
    bio: string | null;
    links: string[] | null;
    tags: string[] | null;
}>


export type ThreadData = {
    _id: string;
    title: string | null;
    bio: string | null;
    links: string[] | null;
    threadImage: number | null;
    followers: string[] | null;
    posts: string[] | null;
    followersCount: number | null;
    tags: string[] | null;
    owner: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    __v: number | null;
} | null;