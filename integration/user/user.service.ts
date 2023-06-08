import type {UserDriverPorts} from "./ports/user-driver.ports";
import type {UserServiceWriterDrivenPorts} from "./ports/user-service-writer-driven.ports";
import type {UserServiceReaderDrivenPorts} from "./ports/user-service-reader-driven.ports";
import type {UserServiceEngineDrivenPorts} from "./ports/user-service-engine-driven.ports";
import {UserServiceResourcesConstants} from "./core/constants/user-service-resources.constants";
import type {UserRegisterDTO} from "../../server/business/user/core/dto/user-register.dto";
import type {UserAuthDTO} from "../../server/business/user/core/dto/user-auth.dto";
import type {UserResponseDTO} from "../../server/business/user/core/dto/user-response.dto";
import type {DecodeAccessTokenDTO} from "./core/dto/decode-access-token.dto";


export function UserService(writer: UserServiceWriterDrivenPorts, reader: UserServiceReaderDrivenPorts, engine: UserServiceEngineDrivenPorts): UserDriverPorts {

    async function signup(dto: UserRegisterDTO): Promise<UserResponseDTO | null> {

        const result = await writer.register(dto, UserServiceResourcesConstants.REGISTER);

        if(!result) {
            return null;
        }

        return result;
    }

    async function login(dto: UserAuthDTO): Promise<UserResponseDTO | null> {

        const result = await writer.login(dto, UserServiceResourcesConstants.LOGIN);

        if(!result) {
            return null;
        }

        return result;

    }

    async function refreshToken(): Promise<string | null> {

        const result = await reader.refresh(UserServiceResourcesConstants.REFRESH);

        if(!result) {
            return null;
        }

        return result;
    }

    async function getUser(): Promise<UserResponseDTO | null> {

        const result = await reader.getUserInfo(UserServiceResourcesConstants.USER);

        if(!result) {
            return null;
        }

        return result;

    }

    async function decodeAccessToken(accessToken: string): Promise<DecodeAccessTokenDTO | null> {

        if(!accessToken.trim()) {
            return null;
        }

        const result = await engine.decode(accessToken);

        if(!result) {
            return null;
        }

        return <DecodeAccessTokenDTO>{
            userId: result.userId,
            issuedAt: result.iat,
            expiresAt: result.exp,
            renewCountTimer: (result.exp - 60000)
        };
    }

    return {
      signup,
      login,
      refreshToken,
      getUser,
      decodeAccessToken
    };
}
