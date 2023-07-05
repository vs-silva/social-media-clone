import {H3Event, parseCookies, sendError} from "h3";
import Fromidable from "formidable";
import {TokenNamingConstants} from "../../../business/token/core/constants/token-naming.constants";
import Token from "../../../business/token";
import {TweetFormFieldConstants} from "../../../business/tweets/core/constants/tweet-form-field.constants";
import Tweets from "../../../business/tweets";
import type {TweetCreateDTO} from "../../../business/tweets/core/dtos/tweet-create.dto";
import type {TweetResponseDTO} from "../../../business/tweets/core/dtos/tweet-response.dto";

export default defineEventHandler(async (event: H3Event) => {

    const form = Fromidable({});
    const cookies = parseCookies(event);
    const refreshToken = cookies[TokenNamingConstants.REFRESH_TOKEN];
    const refreshTokenDTO = await Token.getRefreshTokenByToken(refreshToken);

    if(!refreshTokenDTO) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Refresh token is invalid',
        }));
    }

    const formResponse: { fields: Fromidable.Fields, files: Fromidable.Files } = await new Promise((resolve, reject) => {
        form.parse(event.node.req, (error, fields, files) => {

            if(error) {
                reject(error);
            }

            resolve({fields, files});

        });
    });

    const userId = refreshTokenDTO.userId;

    const tweetDTO = await Tweets.createTweet(<TweetCreateDTO>{
        authorId: userId,
        text: formResponse.fields[TweetFormFieldConstants.TEXT],
        files: formResponse.files
    });

    if(!tweetDTO) {
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: 'Internal server error',
        }));
    }

    console.log('HERE::::',tweetDTO);

    return <TweetResponseDTO>{
        id: tweetDTO.id,
        text: tweetDTO.text
    };
});
