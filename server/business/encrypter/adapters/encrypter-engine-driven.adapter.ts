import {EncrypterEngineDrivenPorts} from "../ports/encrypter-engine-driven.ports";
import bcrypt from "bcrypt";

export function EncrypterEngineDrivenAdapter(): EncrypterEngineDrivenPorts {

    const engine = bcrypt;

    function hashPasswordSync(password: string, saltRounds: number): string {
        return engine.hashSync(password, saltRounds);
    }

    async function comparePasswords(incomingPassword: string, existentPassword: string): Promise<boolean> {
        return await engine.compare(incomingPassword, existentPassword);
    }

    return {
      hashPasswordSync,
      comparePasswords
    };
}
