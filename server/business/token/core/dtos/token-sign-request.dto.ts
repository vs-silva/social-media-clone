export interface TokenSignRequestDTO {
    userId: string;
    accessSecret: string;
    refreshSecret: string;
    accessExpiresIn: string;
    refreshExpiresIn: string;
}
