import type {TweetDTO} from "../dtos/tweet.dto";
import type {TweetEntity} from "../entities/tweet.entity";

export interface TweetMapperInterface {
    mapToTweetDTO(entity: TweetEntity): Promise<TweetDTO>;
}
