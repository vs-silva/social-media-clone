import {EncrypterInterface} from "./encrypter.interface";
import bcrypt from "bcrypt";

const engine = bcrypt;
const saltRounds = 10;

function hashPassword(password: string): string {
    return engine.hashSync(password, saltRounds);
}

async function isValidPassword(incomingPassword: string, existentPassword: string): Promise<boolean> {
    return await engine.compare(incomingPassword, existentPassword);
}

export const EncrypterService: EncrypterInterface = {
    hashPassword,
    isValidPassword
};
