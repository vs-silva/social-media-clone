import type {TweetDriverPort} from "./ports/tweet-driver.port";
import type {TweetResponseDTO} from "../../server/business/tweets/core/dtos/tweet-response.dto";
import type {TweetRequestDTO} from "../../server/business/tweets/core/dtos/tweet-request.dto";
import type {TweetServiceWriterDrivenPort} from "./ports/tweet-service-writer-driven.port";
import {TweetServiceResourcesConstants} from "./core/constants/tweet-service-resources.constants";

export function TweetService(writer:TweetServiceWriterDrivenPort): TweetDriverPort {

    async function submitTweet(dto: TweetRequestDTO): Promise<TweetResponseDTO | null > {

        const result = await writer.postTweet(dto, TweetServiceResourcesConstants.TWEETS);

        if(!result) {
            return null;
        }

        return result;
    }

    return {
        submitTweet
    }
}
