export interface TokenValidationDTO {
    issuedAt: number;
    issuedAtDate: string;
    expiredAt: number;
    expireAtDate: string;
    isValid: boolean;
    userId: string;
}
