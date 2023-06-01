import {H3Event, RequestHeaders, sendError} from "h3";
import UrlPattern from "url-pattern";
import Token from "../../business/token";
import Settings from "../../settings";
import type {TokenVerifyRequestDTO} from "../../business/token/core/dtos/token-verify-request.dto";
import User from "~/server/business/user";
import {UserResponseDTO} from "~/server/business/user/core/dto/user-response.dto";

export default defineEventHandler( async (event: H3Event) => {
    const requestedURL = getRequestURL(event);
    const endpoints = [requestedURL.pathname];
    const headers: RequestHeaders = getRequestHeaders(event);

    const isHandled = endpoints.some((endpoint: string) => {
        const pattern = new UrlPattern(endpoint);
        return pattern.match(requestedURL.pathname);
    });

    if(!isHandled) {
        return;
    }

    const authorizationToken = headers['authorization']?.split(' ');

    if(!authorizationToken || !authorizationToken.length) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
        }));
    }

    const accessToken = authorizationToken[authorizationToken.length-1];

    const tokenValidationResult = await Token.validateToken(<TokenVerifyRequestDTO> {
        token: accessToken,
        tokenSecret: Settings.accessTokenSecret
    });

    if(!tokenValidationResult || !tokenValidationResult?.isValid) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
        }));
    }

    const user = await User.getUserById(tokenValidationResult.userId);

    if(!user) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
        }));
    }

    return <UserResponseDTO> {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        profileImage: user.profileImage,
        profileCreateDate: user.profileCreateDate,
        profileLastUpdateDate: user.profileLastUpdateDate,
        access_token: user.token?.accessToken
    };
});
