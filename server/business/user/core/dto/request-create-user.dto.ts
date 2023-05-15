export interface RequestCreateUserDTO {
    email: string;
    username: string;
    password: string;
    repeatPassword: string;
    name?: string;
}
