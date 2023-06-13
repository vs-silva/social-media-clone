import type {TweetMapperInterface} from "../mappers/tweet-mapper.interface";
import type {TweetEntity} from "../entities/tweet.entity";
import type {TweetDTO} from "../dtos/tweet.dto";
import DateHandler from "../../../date-handler";

async function mapToTweetDTO(entity: TweetEntity): Promise<TweetDTO> {
    return <TweetDTO>{
        id: entity.id,
        text: entity.text,
        authorId: entity.authorId,
        replyToId: entity.replyToId,
        createdAt: DateHandler.formatToFullDate(entity.createdAt),
        updatedAt: DateHandler.formatToFullDate(entity.updatedAt)
    };
}

export const TweetMapperService: TweetMapperInterface = {
    mapToTweetDTO
};
