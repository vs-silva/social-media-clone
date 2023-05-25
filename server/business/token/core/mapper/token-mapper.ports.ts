import type {RefreshTokenDTO} from "../dtos/refresh-token.dto";
import type {RefreshTokenEntity} from "../entities/refresh-token.entity";

export interface TokenMapperPorts {
    mapToRefreshTokenDTO(entity: RefreshTokenEntity): Promise<RefreshTokenDTO>;
}
