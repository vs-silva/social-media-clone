export interface UserRegisterDTO {
    email: string;
    username: string;
    password: string;
    repeatPassword: string;
    name?: string;
}
