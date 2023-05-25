import jwt from "jsonwebtoken";
import type {TokenEngineDrivenPorts} from "../ports/token-engine-driven.ports";
import type {TokenSignRequestDTO} from "../core/dtos/token-sign-request.dto";
import type {TokenDTO} from "../core/dtos/token.dto";
import type {TokenVerifyRequestDTO} from "../core/dtos/token-verify-request.dto";

export function TokenEngineDrivenAdapter(): TokenEngineDrivenPorts {

    async function sign(dto: TokenSignRequestDTO): Promise<TokenDTO | null> {

        try {

            const userId = dto.userId;

            return <TokenDTO>{
                accessToken: jwt.sign({userId}, dto.accessSecret, { expiresIn: dto.accessExpiresIn }),
                refreshToken: jwt.sign( {userId}, dto.refreshSecret, {expiresIn: dto.refreshExpiresIn})
            };

        }  catch (error) {
            return null;
        }
    }

    async function verify(dto: TokenVerifyRequestDTO): Promise<boolean> {

        try {

            const result =  jwt.verify(dto.refreshToken, dto.refreshTokenSecret);
            console.log(result);

            return true;

        } catch (error) {
            return false;
        }
    }

    return {
        sign,
        verify
    };
}
