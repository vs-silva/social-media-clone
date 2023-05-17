import type {UserDTO} from "../core/dto/user.dto";
import type {UserRegisterDTO} from "../core/dto/user-register.dto";
import type {UserAuthDTO} from "../core/dto/user-auth.dto";
import type {UserTokenSecretDTO} from "../core/dto/user-token-secret.dto";

export interface UserDriverPorts {
    registerUser(dto: UserRegisterDTO):Promise<UserDTO | null>;
    authenticateUser(dto: UserAuthDTO, secretDTO: UserTokenSecretDTO): Promise<UserDTO | null>;
}
