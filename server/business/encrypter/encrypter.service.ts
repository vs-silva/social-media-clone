import type {EncrypterDriverPorts} from "./ports/encrypter-driver.ports";
import type {EncrypterEngineDrivenPorts} from "./ports/encrypter-engine-driven.ports";
import {EncrypterSaltRoundsConstants} from "./core/constants/encrypter-salt-rounds.constants";

export function EncrypterService(engine: EncrypterEngineDrivenPorts): EncrypterDriverPorts {

    function hashPassword(password: string): string | null {

        if(!password.trim()) {
           return null;
        }

        return engine.hashPasswordSync(password, EncrypterSaltRoundsConstants.TEN_SALT_ROUNDS);
    }

    async function isPasswordValid(incomingPassword: string, existentPassword: string): Promise<boolean | null> {

        if(!incomingPassword.trim() || !existentPassword.trim()) {
            return null;
        }

        return engine.comparePasswords(incomingPassword, existentPassword);
    }

    return {
      hashPassword,
      isPasswordValid
    };
}
