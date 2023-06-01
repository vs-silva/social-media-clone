import type {TokenMapperPorts} from "./token-mapper.ports";
import type {RefreshTokenDTO} from "../dtos/refresh-token.dto";
import type {RefreshTokenEntity} from "../entities/refresh-token.entity";

async function mapToRefreshTokenDTO(entity: RefreshTokenEntity): Promise<RefreshTokenDTO> {
    return <RefreshTokenDTO> {
        id: entity.id,
        userId: entity.userId,
        refreshToken: entity.refreshToken,
        tokenCreateDate: entity.createdAt.toString(),
        tokenLastUpdateDate: entity.updatedAt.toString()
    };
}

export const TokenMapper: TokenMapperPorts = {
    mapToRefreshTokenDTO
};
