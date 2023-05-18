export interface EncrypterInterface {
    hashPassword(password: string): string;
    isValidPassword(incomingPassword: string, existentPassword:string): Promise<boolean>;
}
