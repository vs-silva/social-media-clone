import {H3Event, parseCookies, sendError} from "h3";
import Settings from "../../settings";
import Token from "../../business/token";
import User from "../../business/user";
import {TokenNamingConstants} from "../../business/token/core/constants/token-naming.constants";
import type {TokenVerifyRequestDTO} from "../../business/token/core/dtos/token-verify-request.dto";
import {TokenGenerateRequestDTO} from "~/server/business/token/core/dtos/token-generate-request.dto";

export default defineEventHandler( async (event: H3Event) => {

    const cookies = parseCookies(event);
    const refreshToken = cookies[TokenNamingConstants.REFRESH_TOKEN];

    if(!refreshToken) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Refresh token is invalid',
        }));
    }

    const refreshTokenDTO = await Token.getRefreshTokenByToken(refreshToken);

    if(!refreshTokenDTO) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Refresh token is invalid',
        }));
    }

    const user = await User.getUserById(refreshTokenDTO.userId);

    if(!user) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Refresh token is invalid',
        }));
    }

    const isValid = await Token.validateRefreshToken(<TokenVerifyRequestDTO>{
       refreshToken: refreshTokenDTO.refreshToken,
       refreshTokenSecret: Settings.refreshTokenSecret
    });

    if(!isValid) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Refresh token is invalid',
        }));
    }

    const newTokens = await Token.generateTokens(<TokenGenerateRequestDTO>{
       userId: user.id,
       refreshSecret: Settings.refreshTokenSecret,
       accessSecret: Settings.accessTokenSecret
    });

    if(!newTokens) {
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error. Something went wrong',
        }));
    }

    return {
      access_token: newTokens.accessToken
    };

});
