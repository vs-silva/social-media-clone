import type {RefreshTokenDTO} from "../core/dto/refresh-token.dto";
import type {RefreshTokenRegisterDTO} from "../core/dto/refresh-token-register.dto";

export interface RefreshTokenDriverPorts {
    saveRefreshToken(dto: RefreshTokenRegisterDTO): Promise<RefreshTokenDTO | null>;
    getRefreshTokenByToken(token: string): Promise<RefreshTokenDTO | null>;
    removeRefreshToken(tokenId: string): Promise<RefreshTokenDTO | null>;
}
