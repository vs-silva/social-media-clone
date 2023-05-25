import DataProvider from "../../../data-provider";
import {RefreshToken} from "@prisma/client";
import type {TokenWriterDrivenPorts} from "../ports/token-writer-driven.ports";
import type {RefreshTokenEntity} from "../core/entities/refresh-token.entity";
import type {TokenRegisterRequestDTO} from "../core/dtos/token-register-request.dto";



export function TokenWriterDrivenAdapter(): TokenWriterDrivenPorts {

    const engine = DataProvider;

    async function save(dto: TokenRegisterRequestDTO): Promise<RefreshTokenEntity | null> {

        try {

            const dbEntity: RefreshToken = await engine.refreshToken.create({
               data: dto
            });

            return <RefreshTokenEntity>{
                id: dbEntity.id,
                refreshToken: dbEntity.token,
                userId: dbEntity.userId,
                createdAt: dbEntity.createdAt,
                updatedAt: dbEntity.updatedAt
            };

        } catch (error) {
            return null;
        }

    }

    return {
      save
    };
}
