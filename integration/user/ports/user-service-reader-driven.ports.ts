import type {UserResponseDTO} from "../../../server/business/user/core/dto/user-response.dto";


export interface UserServiceReaderDrivenPorts {
    refresh(resource: string): Promise<string | null>;
    getUserInfo(resource: string): Promise<UserResponseDTO | null>;
}
