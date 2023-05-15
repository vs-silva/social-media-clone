export interface CreateUpdateUserDTO {
    id?: string;
    email: string;
    name?: string;
    username: string;
    password: string;
    profileImage?: string;
    createdAt?: string;
    updatedAt?: string;
}
