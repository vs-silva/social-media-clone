import {UserEntity} from "../entity/user.entity";
import {UserDTO} from "../dto/user.dto";
import {UserRegisterDTO} from "../dto/user-register.dto";
import {UserCreateUpdateDTO} from "../dto/user-create-update.dto";
import {UserAccessTokensDTO} from "../dto/user-access-tokens.dto";
import {UserResponseDTO} from "../dto/user-response.dto";

export interface UserMapperInterface {
    mapToUserDTO(entity: UserEntity, userTokens?: UserAccessTokensDTO): Promise<UserDTO>;
    mapUserRegisterDTOToUserCreateUpdateDTO(dto: UserRegisterDTO): Promise<UserCreateUpdateDTO>;
}
