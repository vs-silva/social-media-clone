export interface TweetDTO {
    id: string;
    text: string;
    authorId: string;
    createdAt: string;
    updatedAt: string;
    replyToId?: string;
    files?: object;
}
