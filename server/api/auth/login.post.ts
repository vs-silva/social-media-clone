import {H3Event, sendError} from "h3";
import Settings from "../../settings";
import User from "../../business/user";
import Token from "../../business/token";
import {TokenNamingConstants} from "../../business/token/core/constants/token-naming.constants";
import type {UserAuthDTO} from "../../business/user/core/dto/user-auth.dto";
import type {UserTokenSecretDTO} from "../../business/user/core/dto/user-token-secret.dto";
import type {UserResponseDTO} from "../../business/user/core/dto/user-response.dto";
import type {TokenRegisterRequestDTO} from "../../business/token/core/dtos/token-register-request.dto";

export default defineEventHandler( async (event: H3Event) => {
    const body = await readBody(event);
    const { username, password } = body as UserAuthDTO;

    //TODO: Update this to use JOI
    if(!username || !password) {
        return sendError(event, createError( {
            statusCode: 400,
            statusMessage: 'Invalid request parameters',
        }));
    }

    const authDTO: UserAuthDTO = {
        username,
        password
    };

    const secretsDTO: UserTokenSecretDTO = {
        accessTokenSecret: Settings.accessTokenSecret as string,
        refreshTokenSecret: Settings.refreshTokenSecret as string
    };

    const user = await User.authenticateUser(authDTO,secretsDTO);

    if(!user) {
        return sendError(event, createError( {
            statusCode: 400,
            statusMessage: 'Invalid request parameters',
        }));
    }

    const refreshToken = await Token.saveRefreshToken(<TokenRegisterRequestDTO> {
        userId: user.id,
        token: user.token?.refreshToken as string
    });

    if(!refreshToken) {
        return sendError(event, createError( {
            statusCode: 400,
            statusMessage: 'Invalid request parameters',
        }));
    }

    setCookie(event, TokenNamingConstants.REFRESH_TOKEN, refreshToken.refreshToken, {
        httpOnly: true,
        sameSite: true
    });

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
