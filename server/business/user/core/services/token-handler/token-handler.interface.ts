import type {UserAccessTokensDTO} from "../../dto/user-access-tokens.dto";
import type {UserTokenSecretDTO} from "../../dto/user-token-secret.dto";
import {JwtPayload} from "jsonwebtoken";

export interface TokenHandlerInterface {
    generateTokens(userId: string, secretDTO: UserTokenSecretDTO): Promise<UserAccessTokensDTO>;
    decodeRefreshToken(refreshToken: string, secretDTO: UserTokenSecretDTO): Promise<string | JwtPayload | null>;
}
