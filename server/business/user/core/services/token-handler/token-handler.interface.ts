import type {UserAccessTokensDTO} from "../../dto/user-access-tokens.dto";
import type {UserTokenSecretDTO} from "../../dto/user-token-secret.dto";

export interface TokenHandlerInterface {
    generateTokens(userId: string, secretDTO: UserTokenSecretDTO): Promise<UserAccessTokensDTO>;
}
