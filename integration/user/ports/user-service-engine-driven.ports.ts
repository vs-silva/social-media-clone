import type {DecodeTokenDTO} from "../core/dto/decode-token.dto";

export interface UserServiceEngineDrivenPorts {
    decode(token: string): Promise<DecodeTokenDTO | null>;
}
