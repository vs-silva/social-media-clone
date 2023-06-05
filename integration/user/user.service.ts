import type {UserDriverPorts} from "./ports/user-driver.ports";
import type {UserServiceWriterDrivenPorts} from "./ports/user-service-writer-driven.ports";
import type {UserServiceReaderDrivenPorts} from "./ports/user-service-reader-driven.ports";
import {UserServiceResourcesConstants} from "./core/constants/user-service-resources.constants";
import type {UserDTO} from "../../server/business/user/core/dto/user.dto";
import type {UserRegisterDTO} from "../../server/business/user/core/dto/user-register.dto";
import type {UserAuthDTO} from "../../server/business/user/core/dto/user-auth.dto";
import type {UserResponseDTO} from "../../server/business/user/core/dto/user-response.dto";

export function UserService(writer: UserServiceWriterDrivenPorts, reader: UserServiceReaderDrivenPorts): UserDriverPorts {

    async function signup(dto: UserRegisterDTO): Promise<UserDTO | null> {

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

    return {
      signup,
      login,
      refreshToken
    };
}
