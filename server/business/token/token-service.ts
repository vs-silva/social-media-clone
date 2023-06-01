import type {TokenDriverPorts} from "./ports/token-driver.ports";
import type {TokenEngineDrivenPorts} from "./ports/token-engine-driven.ports";
import type {TokenWriterDrivenPorts} from "./ports/token-writer-driven.ports";
import type {TokenReaderDrivenPorts} from "./ports/token-reader-driven.ports";
import {TokenLifespanConstants} from "./core/constants/token-lifespan.constants";
import {TokenMapper} from "./core/mapper/token.mapper";
import type {TokenDTO} from "./core/dtos/token.dto";
import type {TokenGenerateRequestDTO} from "./core/dtos/token-generate-request.dto";
import type {RefreshTokenDTO} from "./core/dtos/refresh-token.dto";
import type {TokenRegisterRequestDTO} from "./core/dtos/token-register-request.dto";
import type {TokenVerifyRequestDTO} from "./core/dtos/token-verify-request.dto";
import type {TokenValidationDTO} from "./core/dtos/token-validation.dto";

export function TokenService(engine: TokenEngineDrivenPorts, writer: TokenWriterDrivenPorts, reader: TokenReaderDrivenPorts): TokenDriverPorts {

    async function generateTokens(dto: TokenGenerateRequestDTO): Promise<TokenDTO | null> {

        if(!dto.userId || !dto.accessSecret || !dto.refreshSecret) {
            return null;
        }

        const result = await engine.sign({
            userId: dto.userId,
            accessSecret: dto.accessSecret,
            refreshSecret: dto.refreshSecret,
            accessExpiresIn: TokenLifespanConstants.TEN_MINUTES,
            refreshExpiresIn: TokenLifespanConstants.FOUR_HOURS
        });

        if(!result) {
            return null;
        }

        return result;
    }

    async function saveRefreshToken(dto: TokenRegisterRequestDTO): Promise<RefreshTokenDTO | null> {

        if(!dto.userId || !dto.token ) {
            return null;
        }

        const entity = await writer.save(dto);

        if(!entity) {
          return null;
        }

        return TokenMapper.mapToRefreshTokenDTO(entity);
    }

    async function getRefreshTokenByToken(refreshToken: string): Promise<RefreshTokenDTO | null> {

        if(!refreshToken) {
            return null;
        }

        const entity = await reader.getBy(() => ({ token: refreshToken }));

        if(!entity) {
            return null;
        }

        return TokenMapper.mapToRefreshTokenDTO(entity);
    }

    async function removeRefreshToken(refreshTokenId: string): Promise<RefreshTokenDTO | null> {

        if(!refreshTokenId) {
            return null;
        }

        const entity = await writer.remove(refreshTokenId);

        if(!entity) {
            return null;
        }

        return TokenMapper.mapToRefreshTokenDTO(entity);
    }

    async function validateToken(dto: TokenVerifyRequestDTO): Promise<TokenValidationDTO | null> {

        if(!dto.token || !dto.tokenSecret) {
            return null;
        }

        return await engine.verify(dto);
    }


    return {
       generateTokens,
       saveRefreshToken,
       getRefreshTokenByToken,
       removeRefreshToken,
       validateToken
    };
}
