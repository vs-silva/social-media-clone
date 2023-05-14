import {H3Event, sendError} from "h3";

export default defineEventHandler(async (event: H3Event) => {
    const body = await readBody(event);

    const {email, name, username, password, repeatPassword} = body;

    //TODO: Update this to use JOI
    if(!email || !name || !username || !password || !repeatPassword) {
        return sendError(event, createError( {
            statusCode: 400,
            statusMessage: 'Invalid request parameters',
        }));
    }

    return { body };
});
