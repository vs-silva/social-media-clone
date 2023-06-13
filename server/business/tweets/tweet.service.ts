import type {TweetDriverPorts} from "./ports/tweet-driver.ports";
import type {TweetWriterDrivenPorts} from "./ports/tweet-writer-driven.ports";
import type {TweetCreateDTO} from "./core/dtos/tweet-create.dto";
import type {TweetDTO} from "./core/dtos/tweet.dto";
import {TweetMapperService} from "./core/mappers/tweet-mapper.service";

export function TweetService(writer: TweetWriterDrivenPorts): TweetDriverPorts {

    async function createTweet(dto: TweetCreateDTO): Promise<TweetDTO | null> {

        const result = await writer.save(dto);

        if(!result) {
            return null;
        }

        return TweetMapperService.mapToTweetDTO(result);
    }

    return {
        createTweet
    };
}
