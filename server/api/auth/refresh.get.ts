import {H3Event, parseCookies, sendError} from "h3";
import {RefreshTokenConstants} from "../../business/refresh-token/core/constants/refresh-token.constants";

export default defineEventHandler( async (event: H3Event) => {

    const cookies = parseCookies(event);
    const refreshToken = cookies[RefreshTokenConstants.REFRESH_TOKEN];

    if(!refreshToken) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Refresh token is invalid',
        }));
    }

    return {
      hello: refreshToken
    };

});
