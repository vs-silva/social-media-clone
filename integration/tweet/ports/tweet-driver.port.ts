import type {TweetResponseDTO} from "../../../server/business/tweets/core/dtos/tweet-response.dto";
import type {TweetRequestDTO} from "../../../server/business/tweets/core/dtos/tweet-request.dto";

export interface TweetDriverPort {
    submitTweet(dto: TweetRequestDTO): Promise<TweetResponseDTO | null>;
}
