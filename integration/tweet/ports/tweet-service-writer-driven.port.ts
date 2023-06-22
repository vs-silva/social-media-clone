import type {TweetResponseDTO} from "../../../server/business/tweets/core/dtos/tweet-response.dto";
import type {TweetRequestDTO} from "../../../server/business/tweets/core/dtos/tweet-request.dto";

export interface TweetServiceWriterDrivenPort {
    postTweet(dto: TweetRequestDTO, resource: string): Promise<TweetResponseDTO | null>;
}
