import type {UserAccessTokensDTO} from "./user-access-tokens.dto";

export interface UserDTO {
    id: string;
    email: string;
    name?: string;
    username: string;
    password: string;
    profileImage: string;
    profileCreateDate: string;
    profileLastUpdateDate: string;
    token?: UserAccessTokensDTO;
}
