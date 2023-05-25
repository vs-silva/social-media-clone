import type {TokenDriverPorts} from "./ports/token-driver.ports";
import type {TokenEngineDrivenPorts} from "./ports/token-engine-driven.ports";
import type {TokenWriterDrivenPorts} from "./ports/token-writer-driven.ports";
import {TokenLifespanConstants} from "./core/constants/token-lifespan.constants";
import type {TokenDTO} from "./core/dtos/token.dto";
import type {TokenGenerateRequestDTO} from "./core/dtos/token-generate-request.dto";
import type {RefreshTokenDTO} from "./core/dtos/refresh-token.dto";
import type {TokenRegisterRequestDTO} from "./core/dtos/token-register-request.dto";


export function TokenService(engine: TokenEngineDrivenPorts, writer: TokenWriterDrivenPorts): TokenDriverPorts {

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

        return <RefreshTokenDTO>{
            id: entity.id,
            userId: entity.userId,
            refreshToken: entity.refreshToken,
            tokenCreateDate: entity.createdAt.toString(),
            tokenLastUpdateDate: entity.updatedAt.toString()
        };
    }

    return {
       generateTokens,
       saveRefreshToken
    };
}
