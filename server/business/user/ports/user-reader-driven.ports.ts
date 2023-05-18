import type {UserEntity} from "../core/entity/user.entity";

export interface UserReaderDrivenPorts {
    getBy(expression: () => {}): Promise<UserEntity | null>;
}
