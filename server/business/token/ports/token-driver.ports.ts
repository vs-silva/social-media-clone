import type {TokenDTO} from "../core/dtos/token.dto";
import type {TokenGenerateRequestDTO} from "../core/dtos/token-generate-request.dto";
import type {TokenRegisterRequestDTO} from "../core/dtos/token-register-request.dto";
import type {TokenVerifyRequestDTO} from "../core/dtos/token-verify-request.dto";
import type {RefreshTokenDTO} from "../core/dtos/refresh-token.dto";

export interface TokenDriverPorts {
    generateTokens(dto: TokenGenerateRequestDTO): Promise<TokenDTO | null>;
    saveRefreshToken(dto: TokenRegisterRequestDTO):Promise<RefreshTokenDTO | null>;
    getRefreshTokenByToken(refreshToken: string): Promise<RefreshTokenDTO | null>;
    removeRefreshToken(refreshTokenId: string): Promise<RefreshTokenDTO | null>;
    validateRefreshToken(dto: TokenVerifyRequestDTO): Promise<boolean>;
}
