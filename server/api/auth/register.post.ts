import {H3Event, sendError} from "h3";
import User from "~/server/business/user";
import type {RequestCreateUserDTO} from "~/server/business/user/core/dto/request-create-user.dto";

export default defineEventHandler(async (event: H3Event) => {
    const body = await readBody(event);

    const {email, name, username, password, repeatPassword} = body as RequestCreateUserDTO;

    //TODO: Update this to use JOI
    if(!email || !username || !password || !repeatPassword) {
        return sendError(event, createError( {
            statusCode: 400,
            statusMessage: 'Invalid request parameters',
        }));
    }

    if(password !== repeatPassword) {
        return sendError(event, createError( {
            statusCode: 400,
            statusMessage: 'Passwords do not match',
        }));
    }

    return await User.save({
        username,
        email,
        name,
        password
    });

});
