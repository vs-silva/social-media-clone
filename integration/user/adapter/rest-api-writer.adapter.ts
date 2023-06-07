import type {UserServiceWriterDrivenPorts} from "../ports/user-service-writer-driven.ports";
import {AxiosInstance} from "axios";
import {ApiEngine} from "../../../api-engine";
import Eventbus from "../../../eventbus";
import type {UserRegisterDTO} from "../../../server/business/user/core/dto/user-register.dto";
import type {UserAuthDTO} from "../../../server/business/user/core/dto/user-auth.dto";
import type {UserResponseDTO} from "../../../server/business/user/core/dto/user-response.dto";
import {UserServiceResourcesConstants} from "../core/constants/user-service-resources.constants";

export function RestApiWriterAdapter(): UserServiceWriterDrivenPorts {

    const apiEngine: AxiosInstance = ApiEngine(UserServiceResourcesConstants.ROOT, Eventbus);
    
    async function register(dto: UserRegisterDTO, resource: string): Promise<UserResponseDTO | null> {
        
        try {
           const response = await apiEngine.post(resource, dto);
           return response.data as UserResponseDTO;
        }
        catch (error) {
            return null;
        }

    }

    async function login(dto: UserAuthDTO, resource: string): Promise<UserResponseDTO | null> {

        try {
            const response = await apiEngine.post(resource, dto);
            return response.data as UserResponseDTO;
        }
        catch (error) {
            return null;
        }

    }
    
    return {
      register,
      login
    };
}
