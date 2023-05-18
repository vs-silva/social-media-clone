import {ImageConstants} from "../constants/image.constants";
import {EncrypterService} from "../services/encrypter/encrypter.service";
import {DateHandlerService} from "../services/date-handler/date-handler.service";
import type {UserMapperInterface} from "./user-mapper.interface";
import type {UserDTO} from "../dto/user.dto";
import type {UserEntity} from "../entity/user.entity";
import type {UserCreateUpdateDTO} from "../dto/user-create-update.dto";
import type {UserRegisterDTO} from "../dto/user-register.dto";
import type {UserAccessTokensDTO} from "../dto/user-access-tokens.dto";

async function mapToUserDTO(entity: UserEntity, userTokens?: UserAccessTokensDTO): Promise<UserDTO> {

    const result : UserDTO = {
        id: entity.id,
        email: entity.email,
        name: entity.name,
        username: entity.username,
        password: entity.password,
        profileImage: entity.profileImage as string,
        profileCreateDate: DateHandlerService.formatDate(entity.createdAt),
        profileLastUpdateDate: DateHandlerService.formatDate(entity.updatedAt)
    };

    if(userTokens) {
        result.token = userTokens;
    }

    return result;
}

async function mapUserRegisterDTOToUserCreateUpdateDTO(dto: UserRegisterDTO): Promise<UserCreateUpdateDTO> {
    return <UserCreateUpdateDTO> {
        email: dto.email,
        name: dto.name,
        username: dto.username,
        profileImage: ImageConstants.PROFILE_IMAGE,
        password: EncrypterService.hashPassword(dto.password)
    };
}


export const UserMapperService: UserMapperInterface = {
    mapToUserDTO,
    mapUserRegisterDTOToUserCreateUpdateDTO
};
