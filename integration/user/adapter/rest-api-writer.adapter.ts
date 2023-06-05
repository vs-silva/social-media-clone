import type {UserServiceWriterDrivenPorts} from "../ports/user-service-writer-driven.ports";
import {AxiosInstance} from "axios";
import {ApiEngine} from "../../../api-engine";
import {ApiEngineResourceEndpointConstants} from "../../../api-engine/constants/api-engine-resource-endpoint.constants";
import Eventbus from "../../../eventbus";
import type {UserDTO} from "../../../server/business/user/core/dto/user.dto";
import type {UserRegisterDTO} from "../../../server/business/user/core/dto/user-register.dto";
import type {UserAuthDTO} from "../../../server/business/user/core/dto/user-auth.dto";

export function RestApiWriterAdapter(): UserServiceWriterDrivenPorts {

    const apiEngine: AxiosInstance = ApiEngine(ApiEngineResourceEndpointConstants.ROOT, Eventbus);
    
    async function register(dto: UserRegisterDTO, resource: string): Promise<UserDTO | null> {
        
        try {
           const response = await apiEngine.post(resource, dto);
           return response.data as UserDTO;
        }
        catch (error) {
            return null;
        }

    }

    async function login(dto: UserAuthDTO, resource: string): Promise<UserDTO | null> {

        try {
            const response = await apiEngine.post(resource, dto);
            return response.data as UserDTO;
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
