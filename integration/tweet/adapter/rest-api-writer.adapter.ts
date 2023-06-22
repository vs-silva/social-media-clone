import type {TweetServiceWriterDrivenPort} from "../ports/tweet-service-writer-driven.port";
import type {TweetRequestDTO} from "../../../server/business/tweets/core/dtos/tweet-request.dto";
import type {TweetResponseDTO} from "../../../server/business/tweets/core/dtos/tweet-response.dto";
import {UserServiceResourcesConstants} from "../../user/core/constants/user-service-resources.constants";
import {ApiEngine} from "../../../api-engine";
import Eventbus from "../../../eventbus";
import {AxiosInstance} from "axios";

export function RestApiWriterAdapter(): TweetServiceWriterDrivenPort {

    const apiEngine: AxiosInstance = ApiEngine(UserServiceResourcesConstants.ROOT, Eventbus);

    async function postTweet(dto: TweetRequestDTO, resource: string): Promise<TweetResponseDTO | null> {

        try {
            const response = await apiEngine.post(resource, dto);
            return response.data as TweetResponseDTO;

        } catch (error) {
            return null;
        }
    }

    return {
      postTweet
    };
}
