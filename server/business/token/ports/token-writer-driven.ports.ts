import type {TokenRegisterRequestDTO} from "../core/dtos/token-register-request.dto";
import type {RefreshTokenEntity} from "../core/entities/refresh-token.entity";

export interface TokenWriterDrivenPorts {
    save(dto: TokenRegisterRequestDTO): Promise<RefreshTokenEntity | null>;
}
