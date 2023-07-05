import type {TweetDriverPort} from "./ports/tweet-driver.port";
import type {TweetResponseDTO} from "../../server/business/tweets/core/dtos/tweet-response.dto";
import type {TweetRequestDTO} from "../../server/business/tweets/core/dtos/tweet-request.dto";
import type {TweetServiceWriterDrivenPort} from "./ports/tweet-service-writer-driven.port";
import {TweetServiceResourcesConstants} from "./core/constants/tweet-service-resources.constants";
import {TweetFormFieldConstants} from "../../server/business/tweets/core/constants/tweet-form-field.constants";

export function TweetService(writer:TweetServiceWriterDrivenPort): TweetDriverPort {

    async function submitTweet(dto: TweetRequestDTO): Promise<TweetResponseDTO | null > {

        const formData = new FormData();
        formData.append(TweetFormFieldConstants.TEXT, dto?.text as string);

        if(dto.mediaFile) {

            for (let i = 0; i < dto.mediaFile.length; i++) {
                formData.append(TweetFormFieldConstants.IMAGE, dto.mediaFile[i]);
            }

        }

        const result = await writer.postTweet(formData, TweetServiceResourcesConstants.TWEETS);

        if(!result) {
            return null;
        }

        return result;
    }

    return {
        submitTweet
    }
}
