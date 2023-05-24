import type {RefreshTokenEntity} from "../core/entity/refresh-token.entity";
import type {RefreshTokenRegisterDTO} from "../core/dto/refresh-token-register.dto";

export interface RefreshTokenWriterDrivenPorts {
    save(dto: RefreshTokenRegisterDTO): Promise<RefreshTokenEntity | null>;
    remove(tokenId: string): Promise<RefreshTokenEntity | null>;
}
