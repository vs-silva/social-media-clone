import type {UserRegisterDTO} from "../../../server/business/user/core/dto/user-register.dto";
import type {UserAuthDTO} from "../../../server/business/user/core/dto/user-auth.dto";
import type {UserResponseDTO} from "../../../server/business/user/core/dto/user-response.dto";

export interface UserServiceWriterDrivenPorts {
    register(dto: UserRegisterDTO, resource: string): Promise<UserResponseDTO | null>;
    login(dto: UserAuthDTO, resource: string): Promise<UserResponseDTO | null>;
}
