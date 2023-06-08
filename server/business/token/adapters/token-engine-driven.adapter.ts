import jwt, {JwtPayload} from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import type {TokenEngineDrivenPorts} from "../ports/token-engine-driven.ports";
import type {TokenSignRequestDTO} from "../core/dtos/token-sign-request.dto";
import type {TokenDTO} from "../core/dtos/token.dto";
import type {TokenVerifyRequestDTO} from "../core/dtos/token-verify-request.dto";
import type {TokenValidationDTO} from "../core/dtos/token-validation.dto";
import type {TokenDecodeDTO} from "../core/dtos/token-decode.dto";
import {TokenDecodeEntity} from "~/server/business/token/core/entities/token-decode.entity";

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

    async function verify(dto: TokenVerifyRequestDTO): Promise<TokenValidationDTO> {

        const result: TokenValidationDTO = {
            userId: '',
            issuedAt: 0,
            expiredAt: 0,
            issuedAtDate: '',
            expireAtDate: '',
            isValid: false
        };

        try {

            const validationResult =  jwt.verify(dto.token, dto.tokenSecret) as JwtPayload;

            if(!validationResult.iat || !validationResult.exp) {
                result.isValid = false;
                return result;
            }

            result.userId = validationResult.userId;
            result.issuedAt = validationResult.iat as number;
            result.expiredAt = validationResult.exp as number;
            result.issuedAtDate = new Date(validationResult.iat as number * 1000).toISOString();
            result.expireAtDate = new Date(validationResult.exp as number * 1000).toISOString();
            result.isValid = true;

           return result;

        } catch (error) {
            return result;
        }
    }

    async function decode(token: string): Promise<TokenDecodeDTO> {

        const decodeResult = jwt_decode(token) as TokenDecodeEntity;

        return <TokenDecodeDTO>{
          userId: decodeResult.userId,
          expiredAt: decodeResult.exp,
          issuedAt: decodeResult.iat
        };
    }

    return {
        sign,
        verify,
        decode
    };
}
