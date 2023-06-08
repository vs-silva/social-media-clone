export interface DecodeAccessTokenDTO {
    userId: string;
    issuedAt: number;
    expiresAt: number;
    renewCountTimer: number;
}
