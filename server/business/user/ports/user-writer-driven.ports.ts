import type {CreateUpdateUserDTO} from "../core/dto/create-update-user.dto";
import type {UserEntity} from "../core/entity/user.entity";

export interface UserWriterDrivenPorts {
    createUser(dto: CreateUpdateUserDTO): Promise<UserEntity | null>;
}
