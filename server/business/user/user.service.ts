import {UserMapperService} from "./core/mappers/user-mapper.service";
import {EncrypterService} from "./core/services/encrypter/encrypter.service";
import {TokenHandlerService} from "./core/services/token-handler/token-handler.service";
import type {UserWriterDrivenPorts} from "./ports/user-writer-driven.ports";
import type {UserReaderDrivenPorts} from "./ports/user-reader-driven.ports";
import type {UserDriverPorts} from "./ports/user-driver.ports";
import type {UserDTO} from "./core/dto/user.dto";
import type {UserRegisterDTO} from "./core/dto/user-register.dto";
import type {UserAuthDTO} from "./core/dto/user-auth.dto";
import type {UserTokenSecretDTO} from "./core/dto/user-token-secret.dto";


export function UserService(reader: UserReaderDrivenPorts, writer: UserWriterDrivenPorts): UserDriverPorts {

    async function registerUser(dto: UserRegisterDTO): Promise<UserDTO | null> {

        const userCreateUpdateDTO = await UserMapperService.mapUserRegisterDTOToUserCreateUpdateDTO(dto);
        const entity = await writer.save(userCreateUpdateDTO);

        if(!entity) {
            return null;
        }

        return await UserMapperService.mapToUserDTO(entity);
    }

    async function authenticateUser(dto: UserAuthDTO, secretDTO: UserTokenSecretDTO): Promise<UserDTO | null> {

        const entity = await reader.getBy(() => ({username: dto.username}));

        if(!entity) {
            return null;
        }

        if(!await EncrypterService.isValidPassword(dto.password, entity.password)) {
            return null;
        }

        const tokens = await TokenHandlerService.generateTokens(entity.id,secretDTO);
        return await UserMapperService.mapToUserDTO(entity, tokens);
    }

    async function removeUser(userId: string): Promise<UserDTO | null> {

        const entity = await writer.remove(userId);

        if(!entity) {
            return null;
        }

        return await UserMapperService.mapToUserDTO(entity);
    }


    return {
        registerUser,
        authenticateUser,
        removeUser
    };
}
