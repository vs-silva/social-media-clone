import type {RefreshTokenEntity} from "../core/entities/refresh-token.entity";

export interface TokenReaderDrivenPorts {
    getBy(expression: () => {}):Promise<RefreshTokenEntity | null>;
}
