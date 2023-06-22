import type {TweetRequestDTO} from "../../server/business/tweets/core/dtos/tweet-request.dto";
import Tweet from "../../integration/tweet";


export const TweetStoreIdentifier = 'tweet-store';

export function TweetStore() {



    async function handleTweetSubmit(dto: TweetRequestDTO): Promise<void> {

        const response = await Tweet.submitTweet(dto);
        console.log('store response:', response);

    }

    return {
        handleTweetSubmit
    };
}
