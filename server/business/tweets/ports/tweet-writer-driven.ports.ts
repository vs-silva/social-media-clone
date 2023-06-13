import type {TweetEntity} from "../core/entities/tweet.entity";
import type {TweetCreateDTO} from "../core/dtos/tweet-create.dto";

export interface TweetWriterDrivenPorts {
    save(dto: TweetCreateDTO): Promise<TweetEntity | null>;
}
