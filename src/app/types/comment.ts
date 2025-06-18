

export type Comment = {
    parentThread: string | null | undefined,
    parentComment:  string | null | undefined,
    commentText: string | null | undefined,
    owner: string | undefined,
    ownerUserName:  string | null | undefined,
    ownerPicture:  string | null | undefined
}

export type LiveComment = {
    comments: {
    parentThread: string | null | undefined,
    parentComment:  string | null | undefined,
    commentText: string | null | undefined,
    owner: string | undefined,
    childComments: LiveComment[],
    ownerUserName:  string | null | undefined,
    ownerPicture:  string | null | undefined,
    createdAt: string,
    _id: string,
    updatedAt: string,
    __v: number
    }[]
}

export type SortComments = {
comments: {
    parentThread: string | null | undefined,
    parentComment:  string | null | undefined,
    commentText: string | null | undefined,
    owner: string | undefined,
    ownerUserName:  string | null | undefined,
    ownerPicture:  string | null | undefined,
    createdAt: string,
    _id: string,
    updatedAt: string,
    __v: number
    }[]
}