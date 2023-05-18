import type {RefreshTokenDTO} from "../dto/refresh-token.dto";
import type {RefreshTokenEntity} from "../entity/refresh-token.entity";

export interface RefreshTokenMapperInterface {
    mapToRefreshTokenDTO(entity: RefreshTokenEntity): Promise<RefreshTokenDTO>;
}
