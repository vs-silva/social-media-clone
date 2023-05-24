import type {RefreshTokenReaderDrivenPorts} from "../ports/refresh-token-reader-driven.ports";
import type {RefreshTokenEntity} from "../core/entity/refresh-token.entity";
import DataProvider from "../../../data-provider";
import {RefreshToken} from "@prisma/client";

export function DatabaseTokenReaderAdapter(): RefreshTokenReaderDrivenPorts {

    const engine = DataProvider;
    async function getBy(expression: () => {}): Promise<RefreshTokenEntity | null> {

        try{

            const refreshToken: RefreshToken | null = await engine.refreshToken.findUnique({
                where: expression()
            });

            if(!refreshToken){
                return null;
            }

            return <RefreshTokenEntity>{
                id: refreshToken.id,
                token: refreshToken.token,
                createdAt: refreshToken.createdAt,
                updatedAt: refreshToken.updatedAt,
                userId: refreshToken.userId
            };


        } catch (error) {

            //TODO: HANDLE THE ERROR
            console.log(error);
            return null;
        }

    }

    return {
        getBy
    };
}
