import type {TweetDTO} from "../core/dtos/tweet.dto";
import type {TweetCreateDTO} from "../core/dtos/tweet-create.dto";

export interface TweetDriverPorts {
    createTweet(dto: TweetCreateDTO): Promise<TweetDTO | null>;
}
