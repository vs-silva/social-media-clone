import {H3Event, sendError} from "h3";
import {RequestLoginUserDTO} from "~/server/business/user/core/dto/request-login-user.dto";

export default defineEventHandler( async (event: H3Event) => {
    const body = await readBody(event);
    const { username, password } = body as RequestLoginUserDTO;

    //TODO: Update this to use JOI
    if(!username || !password) {
        return sendError(event, createError( {
            statusCode: 400,
            statusMessage: 'Invalid request parameters',
        }));
    }

    //TODO: check if user exists
    //TODO: check/compare password
    //TODO: provide token if user and password are valid

});
