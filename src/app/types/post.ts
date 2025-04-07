



export type Post = Partial<{
    title: string | null;
    textContent: string | null;
    parentThread: string | null;
}>

export type PostData = {
    _id: string | null;
    title: string | null;
    textContent: string | null;
    parentThread: string | null;
    user: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    tag: string | null;
    __v: number | null;
} | null;