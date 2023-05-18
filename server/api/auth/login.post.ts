import {H3Event, sendError} from "h3";
import User from "../../business/user";
import Settings from "../../settings";
import {UserAuthDTO} from "../../business/user/core/dto/user-auth.dto";
import {UserTokenSecretDTO} from "../../business/user/core/dto/user-token-secret.dto";
import {UserResponseDTO} from "../../business/user/core/dto/user-response.dto";
import RefreshToken from "../../business/refresh-token";
import {RefreshTokenRegisterDTO} from "../../business/refresh-token/core/dto/refresh-token-register.dto";
import {RefreshTokenConstants} from "../../business/refresh-token/core/constants/refresh-token.constants";

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

    const refreshToken = await RefreshToken.saveRefreshToken(<RefreshTokenRegisterDTO>{
       token: user.token?.refreshToken as string,
       userId: user.id
    });

    if(!refreshToken) {
        return sendError(event, createError( {
            statusCode: 400,
            statusMessage: 'Invalid request parameters',
        }));
    }

    setCookie(event, RefreshTokenConstants.REFRESH_TOKEN, refreshToken.token, {
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
