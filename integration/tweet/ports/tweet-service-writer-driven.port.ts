import type {TweetResponseDTO} from "../../../server/business/tweets/core/dtos/tweet-response.dto";

export interface TweetServiceWriterDrivenPort {
    postTweet(dto: FormData, resource: string): Promise<TweetResponseDTO | null>;
}
