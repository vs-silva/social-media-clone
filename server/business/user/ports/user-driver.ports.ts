import {CreateUpdateUserDTO} from "../core/dto/create-update-user.dto";
import {UserDTO} from "../core/dto/user.dto";

export interface UserDriverPorts {
    save(dto: CreateUpdateUserDTO): Promise<UserDTO | null>;
}
