import type {UserServiceEngineDrivenPorts} from "../ports/user-service-engine-driven.ports";
import jwt_decode from "jwt-decode";
import type {DecodeTokenDTO} from "../core/dto/decode-token.dto";

export function JwtTokenDecoderAdapter(): UserServiceEngineDrivenPorts {

    async function decode(token: string): Promise<DecodeTokenDTO | null> {

        try {
            return jwt_decode(token) as DecodeTokenDTO;
        }
        catch (error) {
            return null;
        }

    }

    return {
      decode
    };
}
