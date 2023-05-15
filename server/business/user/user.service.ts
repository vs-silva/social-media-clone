import type {UserWriterDrivenPorts} from "./ports/user-writer-driven.ports";
import type {UserDriverPorts} from "./ports/user-driver.ports";
import type {CreateUpdateUserDTO} from "./core/dto/create-update-user.dto";
import type {UserDTO} from "./core/dto/user.dto";

export function UserService(writer: UserWriterDrivenPorts): UserDriverPorts {

    async function save(dto: CreateUpdateUserDTO): Promise<UserDTO | null> {

        const entity = await writer.createUser(dto);

        if(!entity) {
            return null;
        }

        return <UserDTO> {
          id: entity.id,
          email: entity.email,
          name: entity.name,
          username: entity.username,
          profileImage: entity.profileImage,
          profileCreateDate: entity.createdAt,
          profileLastUpdateDate: entity.updatedAt
        };

    }

    return {
        save
    };
}
