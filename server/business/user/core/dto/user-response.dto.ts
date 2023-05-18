export interface UserResponseDTO {
    id: string;
    email: string;
    name?: string;
    username: string;
    profileImage: string;
    profileCreateDate: string;
    profileLastUpdateDate: string;
    access_token?: string;
}
