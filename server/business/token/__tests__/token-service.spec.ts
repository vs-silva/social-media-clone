import {describe, it, vi, expect} from "vitest";
import {faker} from "@faker-js/faker";
import Token from "../index";
import type {TokenGenerateRequestDTO} from "../core/dtos/token-generate-request.dto";
import type {TokenDTO} from "../core/dtos/token.dto";
import type {TokenRegisterRequestDTO} from "../core/dtos/token-register-request.dto";
import type {RefreshTokenDTO} from "../core/dtos/refresh-token.dto";
import type {TokenVerifyRequestDTO} from "../core/dtos/token-verify-request.dto";
import type {TokenValidationDTO} from "../core/dtos/token-validation.dto";
import type {TokenDecodeDTO} from "../core/dtos/token-decode.dto";

describe('Token service tests', () => {

    describe('generateTokens port tests', () => {

        const fakeGenerateTokenRequestDTO = <TokenGenerateRequestDTO>{
            userId: faker.database.mongodbObjectId(),
            accessSecret: `${faker.word.words(1)}_${faker.word.words(1)}`,
            refreshSecret: `${faker.word.words(1)}_${faker.word.words(1)}`,
        };

        it('generateTokens should return TokenDTO', async () => {

            const spy = vi.spyOn(Token, 'generateTokens');
            const result = await Token.generateTokens(fakeGenerateTokenRequestDTO);

            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith(fakeGenerateTokenRequestDTO);

            expect(result).toBeTruthy();
            expect(result).toStrictEqual(expect.objectContaining(<TokenDTO>{
                accessToken: expect.any(String),
                refreshToken: expect.any(String)
            }));

        });

        it('generateTokens should return null if userId is not provided', async () => {

            fakeGenerateTokenRequestDTO.userId = '';

            const result = await Token.generateTokens(fakeGenerateTokenRequestDTO);
            expect(result).toBeNull();

        });

        it('generateTokens should return null if accessSecret is not provided', async () => {

            fakeGenerateTokenRequestDTO.accessSecret = '';

            const result = await Token.generateTokens(fakeGenerateTokenRequestDTO);
            expect(result).toBeNull();

        });

        it('generateTokens should return null if refreshSecret is not provided', async () => {

            fakeGenerateTokenRequestDTO.refreshSecret = '';

            const result = await Token.generateTokens(fakeGenerateTokenRequestDTO);
            expect(result).toBeNull();

        });

    });


    describe('saveRefreshToken port tests', () => {

        const fakeTokenRegistrationDTO: TokenRegisterRequestDTO = {
            userId: faker.database.mongodbObjectId(),
            token: `${faker.word.words(1)}_${faker.word.words(1)}`
        };

        it('saveRefreshToken should return a RefreshTokenDTO', async () => {

            const spy = vi.spyOn(Token, 'saveRefreshToken');
            const result = await Token.saveRefreshToken(fakeTokenRegistrationDTO);

            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith(fakeTokenRegistrationDTO);

            expect(result).toBeTruthy();
            expect(result).toStrictEqual(expect.objectContaining(<RefreshTokenDTO>{
                id: expect.any(String),
                refreshToken: expect.any(String),
                userId: expect.any(String),
                tokenCreateDate: expect.any(String),
                tokenLastUpdateDate: expect.any(String)
            }));

        });

        it('saveRefreshToken should return null if userId is not provided', async () => {

            fakeTokenRegistrationDTO.userId = '';

            const result = await Token.saveRefreshToken(fakeTokenRegistrationDTO);
            expect(result).toBeNull();

        });

        it('saveRefreshToken should return null if refreshToken is not provided', async () => {

            fakeTokenRegistrationDTO.token = '';

            const result = await Token.saveRefreshToken(fakeTokenRegistrationDTO);
            expect(result).toBeNull();

        });

    });

    describe('getRefreshTokenByToken port tests', () => {


        it('getRefreshTokenByToken should return a RefreshTokenDTO', async () => {

            const savedRefreshTokenDTO = await Token.saveRefreshToken({
               userId: faker.database.mongodbObjectId(),
               token: `${faker.word.words(1)}_${faker.word.words(1)}`
            });

            const spy = vi.spyOn(Token, 'getRefreshTokenByToken');
            const result = await Token.getRefreshTokenByToken(savedRefreshTokenDTO?.refreshToken as string);

            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith(savedRefreshTokenDTO?.refreshToken as string);

            expect(result).toBeTruthy();
            expect(result).toStrictEqual(expect.objectContaining(<RefreshTokenDTO>{
                id: expect.any(String),
                refreshToken: expect.any(String),
                userId: expect.any(String),
                tokenCreateDate: expect.any(String),
                tokenLastUpdateDate: expect.any(String)
            }));

        });

        it('getRefreshTokenByToken should return null if refreshToken is not found on data provider', async () => {

            const fakeRefreshToken = `${faker.word.words(1)}_${faker.word.words(1)}`;

            const result = await Token.getRefreshTokenByToken(fakeRefreshToken);
            expect(result).toBeNull();

        });

        it('getRefreshTokenByToken should return null if refreshToken is not provided', async () => {

            const fakeRefreshToken = '';

            const result = await Token.getRefreshTokenByToken(fakeRefreshToken);
            expect(result).toBeNull();

        });

    });

    describe('removeRefreshToken port tests', () => {

        it('removeRefreshToken should remove an existent refreshToken from data provider and return the removed RefreshTokenDTO information', async () => {

            const savedRefreshTokenDTO = await Token.saveRefreshToken({
                userId: faker.database.mongodbObjectId(),
                token: `${faker.word.words(1)}_${faker.word.words(1)}`
            });

            const spy = vi.spyOn(Token, 'removeRefreshToken');
            const result = await Token.removeRefreshToken(savedRefreshTokenDTO?.id as string);

            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith(savedRefreshTokenDTO?.id as string);

            const refreshTokenResult = await Token.getRefreshTokenByToken(savedRefreshTokenDTO?.refreshToken as string);
            expect(refreshTokenResult).toBeNull();

            expect(result).toBeTruthy();
            expect(result).toStrictEqual(expect.objectContaining(<RefreshTokenDTO>{
                id: expect.any(String),
                refreshToken: expect.any(String),
                userId: expect.any(String),
                tokenCreateDate: expect.any(String),
                tokenLastUpdateDate: expect.any(String)
            }));

        });

        it('removeRefreshToken should return null if provided refreshTokenId is not existent on data provider', async () => {

            const fakeRefreshTokenId = faker.database.mongodbObjectId();

            const result = await Token.removeRefreshToken(fakeRefreshTokenId);
            expect(result).toBeNull();

        });

        it('removeRefreshToken should return null if refreshTokenId is not provided', async () => {

            const fakeRefreshTokenId = '';

            const result = await Token.removeRefreshToken(fakeRefreshTokenId);
            expect(result).toBeNull();

        });


    });

    describe('validateToken port tests', () => {

        const fakeGenerateTokenRequestDTO = <TokenGenerateRequestDTO>{
            userId: faker.database.mongodbObjectId(),
            accessSecret: `${faker.word.words(1)}_${faker.word.words(1)}`,
            refreshSecret: `${faker.word.words(1)}_${faker.word.words(1)}`,
        };

        it('validateToken should return TokenValidationDTO and its isValid property should be true if provided token is valid and has not expired yet', async () => {

            const generatedToken = await Token.generateTokens(fakeGenerateTokenRequestDTO);

            const savedRefreshTokenDTO = await Token.saveRefreshToken({
                userId: fakeGenerateTokenRequestDTO.userId,
                token: generatedToken?.refreshToken as string
            });

            const refreshTokenResult = await Token.getRefreshTokenByToken(savedRefreshTokenDTO?.refreshToken as string);

            const fakePayload: TokenVerifyRequestDTO = {
                token: refreshTokenResult?.refreshToken as string,
                tokenSecret: fakeGenerateTokenRequestDTO.refreshSecret
            };

            const spy = vi.spyOn(Token, 'validateToken');
            const result = await Token.validateToken(fakePayload);

            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith(fakePayload);

            expect(result).toStrictEqual(expect.objectContaining(<TokenValidationDTO>{
                issuedAt: expect.any(Number),
                issuedAtDate: expect.any(String),
                expiredAt: expect.any(Number),
                expireAtDate: expect.any(String),
                isValid: expect.any(Boolean),
                userId: expect.any(String)
            }));

        });

        it('validateToken should return NULL if any of the TokenVerifyRequestDTO properties is not provided', async () => {

            const fakePayload: TokenVerifyRequestDTO = {
                token: '',
                tokenSecret: fakeGenerateTokenRequestDTO.refreshSecret
            };

            const spy = vi.spyOn(Token, 'validateToken');
            const result = await Token.validateToken(fakePayload);

            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith(fakePayload);

            expect(result).toBeNull();
        });

    });

    describe('decodeToken port tests', () => {

        const fakeGenerateTokenRequestDTO = <TokenGenerateRequestDTO>{
            userId: faker.database.mongodbObjectId(),
            accessSecret: `${faker.word.words(1)}_${faker.word.words(1)}`,
            refreshSecret: `${faker.word.words(1)}_${faker.word.words(1)}`,
        };

        it('decodeToken should return TokenDecodeDTO if provided token is valid', async () => {

            const generatedToken = await Token.generateTokens(fakeGenerateTokenRequestDTO);

            const spy = vi.spyOn(Token, 'decodeToken');
            const result = await Token.decodeToken(generatedToken?.accessToken as string);

            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith(generatedToken?.accessToken as string);

            expect(result).toBeTruthy();
            expect(result).toStrictEqual(<TokenDecodeDTO>{
                userId: expect.any(String),
                issuedAt: expect.any(Number),
                expiredAt: expect.any(Number)
            });

        });

        it('decodeToken should return NULL if invalid empty string token is provided', async () => {

            const fakeToken = ' ';
            const result = await Token.decodeToken(fakeToken);

            expect(result).toBeNull();
        });

    });

});
