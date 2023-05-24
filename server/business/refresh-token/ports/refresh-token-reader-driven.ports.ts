import type {RefreshTokenEntity} from "../core/entity/refresh-token.entity";

export interface RefreshTokenReaderDrivenPorts {
    getBy(expression: () => {}):Promise<RefreshTokenEntity | null>;
}
