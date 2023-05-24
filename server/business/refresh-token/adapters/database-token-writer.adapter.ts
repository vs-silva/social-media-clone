import DataProvider from "../../../data-provider";
import {RefreshToken} from "@prisma/client";
import type {RefreshTokenWriterDrivenPorts} from "../ports/refresh-token-writer-driven.ports";
import type {RefreshTokenEntity} from "../core/entity/refresh-token.entity";
import type {RefreshTokenRegisterDTO} from "../core/dto/refresh-token-register.dto";

export function DatabaseTokenWriterAdapter(): RefreshTokenWriterDrivenPorts {

    const engine = DataProvider;
    async function save(dto: RefreshTokenRegisterDTO): Promise<RefreshTokenEntity | null> {

        try {

            const token: RefreshToken = await engine.refreshToken.create({
                data: dto
            });

            return <RefreshTokenEntity>{
                id: token.id,
                token: token.token,
                createdAt: token.createdAt,
                updatedAt: token.updatedAt,
                userId: token.userId,
            };

        } catch (error) {

            //TODO: HANDLE THE ERROR
            console.log(error);
            return null;

        }

    }

    async function remove(tokenId: string): Promise<RefreshTokenEntity | null> {

        try {

            const token: RefreshToken = await engine.refreshToken.delete({
                where: {
                    id: tokenId
                }
            });

            return <RefreshTokenEntity>{
                id: token.id,
                token: token.token,
                userId: token.userId,
                createdAt: token.createdAt,
                updatedAt: token.updatedAt
            };

        } catch (error) {
            return null;
        }

    }

    return {
        save,
        remove
    };
}
