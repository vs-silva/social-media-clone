import {RefreshTokenMapper} from "./core/mappers/refresh-token.mapper";
import type {RefreshTokenDriverPorts} from "./ports/refresh-token-driver.ports";
import type {RefreshTokenReaderDrivenPorts} from "./ports/refresh-token-reader-driven.ports";
import type {RefreshTokenWriterDrivenPorts} from "./ports/refresh-token-writer-driven.ports";
import type {RefreshTokenDTO} from "./core/dto/refresh-token.dto";
import type {RefreshTokenRegisterDTO} from "./core/dto/refresh-token-register.dto";

export function RefreshTokenService(reader: RefreshTokenReaderDrivenPorts, writer: RefreshTokenWriterDrivenPorts): RefreshTokenDriverPorts {

    async function saveRefreshToken(dto: RefreshTokenRegisterDTO): Promise<RefreshTokenDTO | null> {

        const entity = await writer.save(dto);

        if(!entity) {
            return null;
        }

        return RefreshTokenMapper.mapToRefreshTokenDTO(entity);
    }

    async function getRefreshTokenByToken(token: string): Promise<RefreshTokenDTO | null> {

        const entity = await reader.getBy(() => ({token: token}));

        if(!entity) {
            return null;
        }

        return RefreshTokenMapper.mapToRefreshTokenDTO(entity);
    }

    async function removeRefreshToken(tokenId: string): Promise<RefreshTokenDTO | null> {

        const entity = await writer.remove(tokenId);

        if(!entity) {
            return null;
        }

        return RefreshTokenMapper.mapToRefreshTokenDTO(entity);
    }

    return {
        saveRefreshToken,
        getRefreshTokenByToken,
        removeRefreshToken
    };
}
