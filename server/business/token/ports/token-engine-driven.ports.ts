import type {TokenSignRequestDTO} from "../core/dtos/token-sign-request.dto";
import type {TokenDTO} from "../core/dtos/token.dto";
import type {TokenVerifyRequestDTO} from "../core/dtos/token-verify-request.dto";

export interface TokenEngineDrivenPorts {
    sign(dto: TokenSignRequestDTO): Promise<TokenDTO | null>;
    verify(dto: TokenVerifyRequestDTO): Promise<boolean>;
}
