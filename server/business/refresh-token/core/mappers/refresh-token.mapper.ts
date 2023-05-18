import type {RefreshTokenMapperInterface} from "./refresh-token-mapper.interface";
import type {RefreshTokenEntity} from "../entity/refresh-token.entity";
import type {RefreshTokenDTO} from "../dto/refresh-token.dto";
import {DateHandlerService} from "../../../user/core/services/date-handler/date-handler.service";

async function mapToRefreshTokenDTO(entity: RefreshTokenEntity): Promise<RefreshTokenDTO> {
    return <RefreshTokenDTO>{
        id: entity.id,
        token: entity.token,
        userId: entity.userId,
        tokenCreateDate: DateHandlerService.formatDate(entity.createdAt),
        tokenLastUpdateDate: DateHandlerService.formatDate(entity.updatedAt)
    };
}

export const RefreshTokenMapper: RefreshTokenMapperInterface = {
    mapToRefreshTokenDTO
} as const;
