import type {UserEntity} from "../core/entity/user.entity";
import type {UserCreateUpdateDTO} from "../core/dto/user-create-update.dto";

export interface UserWriterDrivenPorts {
    save(dto: UserCreateUpdateDTO): Promise<UserEntity | null>;
}
