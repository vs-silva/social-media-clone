import type {UserEntity} from "../entity/user.entity";
import type {UserDTO} from "../dto/user.dto";
import type {UserRegisterDTO} from "../dto/user-register.dto";
import type {UserCreateUpdateDTO} from "../dto/user-create-update.dto";
import type {UserAccessTokensDTO} from "../dto/user-access-tokens.dto";

export interface UserMapperInterface {
    mapToUserDTO(entity: UserEntity, userTokens?: UserAccessTokensDTO): Promise<UserDTO>;
    mapUserRegisterDTOToUserCreateUpdateDTO(dto: UserRegisterDTO): Promise<UserCreateUpdateDTO>;
}
