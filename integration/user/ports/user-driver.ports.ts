import type {UserDTO} from "../../../server/business/user/core/dto/user.dto";
import type {UserRegisterDTO} from "../../../server/business/user/core/dto/user-register.dto";
import type {UserAuthDTO} from "../../../server/business/user/core/dto/user-auth.dto";
import type {UserResponseDTO} from "../../../server/business/user/core/dto/user-response.dto";

export interface UserDriverPorts {
    signup(dto: UserRegisterDTO): Promise<UserDTO | null>;
    login(dto: UserAuthDTO): Promise<UserResponseDTO | null>;
    refreshToken(): Promise<string | null>;
}
