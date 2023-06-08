import type {UserRegisterDTO} from "../../../server/business/user/core/dto/user-register.dto";
import type {UserAuthDTO} from "../../../server/business/user/core/dto/user-auth.dto";
import type {UserResponseDTO} from "../../../server/business/user/core/dto/user-response.dto";
import type {DecodeAccessTokenDTO} from "../core/dto/decode-access-token.dto";

export interface UserDriverPorts {
    signup(dto: UserRegisterDTO): Promise<UserResponseDTO | null>;
    login(dto: UserAuthDTO): Promise<UserResponseDTO | null>;
    refreshToken(): Promise<string | null>;
    getUser(): Promise<UserResponseDTO | null>;
    decodeAccessToken(accessToken: string): Promise<DecodeAccessTokenDTO | null>;
}
