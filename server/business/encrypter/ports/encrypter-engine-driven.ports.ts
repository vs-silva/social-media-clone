export interface EncrypterEngineDrivenPorts {
    hashPasswordSync(password: string, saltRounds: number): string;
    comparePasswords(incomingPassword: string, existentPassword: string): Promise<boolean>;
}
