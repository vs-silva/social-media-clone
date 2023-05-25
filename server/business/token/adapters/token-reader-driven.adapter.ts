import type {TokenReaderDrivenPorts} from "../ports/token-reader-driven.ports";
import type {RefreshTokenEntity} from "../core/entities/refresh-token.entity";
import DataProvider from "../../../data-provider";
import {RefreshToken} from "@prisma/client";

export function TokenReaderDrivenAdapter(): TokenReaderDrivenPorts {

    const engine = DataProvider;
    async function getBy(expression: () => {}): Promise<RefreshTokenEntity | null> {

        try {

            const dbEntity: RefreshToken | null = await engine.refreshToken.findUnique({
                where: expression()
            });

            if(!dbEntity) {
                return null;
            }

            return <RefreshTokenEntity> {
              id: dbEntity.id,
              refreshToken: dbEntity.token,
              userId: dbEntity.userId,
              createdAt: dbEntity.createdAt,
              updatedAt: dbEntity.updatedAt
            };

        }  catch (error) {
            return null;
        }

    }

    return {
       getBy
    };
}
