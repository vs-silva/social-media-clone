import jwt from "jsonwebtoken";
import {TokenLifespanConstants} from "../../constants/token-lifespan.constants";
import type {TokenHandlerInterface} from "./token-handler.interface";
import type {UserAccessTokensDTO} from "../../dto/user-access-tokens.dto";
import type {UserTokenSecretDTO} from "../../dto/user-token-secret.dto";

const engine = jwt;

async function generateTokens(userId: string, secretDTO: UserTokenSecretDTO): Promise<UserAccessTokensDTO> {

    return <UserAccessTokensDTO> {
        accessToken: engine.sign({userId}, secretDTO.accessTokenSecret, {
            expiresIn: TokenLifespanConstants.TEN_MINUTES
        }),
        refreshToken: engine.sign({userId}, secretDTO.refreshTokenSecret, {
            expiresIn: TokenLifespanConstants.FOUR_HOURS
        }),
    };
}

export const TokenHandlerService: TokenHandlerInterface = {
    generateTokens
};
