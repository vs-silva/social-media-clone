import {ImageConstants} from "../constants/image.constants";
import DateHandler from "../../../date-handler";
import Encrypter from "../../../encrypter";
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
        profileCreateDate: DateHandler.formatToFullDate(entity.createdAt),
        profileLastUpdateDate: DateHandler.formatToFullDate(entity.updatedAt)
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
        password: Encrypter.hashPassword(dto.password)
    };
}


export const UserMapperService: UserMapperInterface = {
    mapToUserDTO,
    mapUserRegisterDTOToUserCreateUpdateDTO
};
