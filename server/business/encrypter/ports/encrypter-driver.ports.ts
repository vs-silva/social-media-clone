export interface EncrypterDriverPorts {
    hashPassword(password: string): string | null;
    isPasswordValid(incomingPassword: string, existentPassword:string): Promise<boolean | null>;
}
