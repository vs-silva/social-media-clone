import {describe, it, vi, expect} from "vitest";
import {faker} from "@faker-js/faker";
import Token from "../index";
import type {TokenGenerateRequestDTO} from "../core/dtos/token-generate-request.dto";
import type {TokenDTO} from "../core/dtos/token.dto";
import type {TokenRegisterRequestDTO} from "../core/dtos/token-register-request.dto";
import type {RefreshTokenDTO} from "../core/dtos/refresh-token.dto";


describe('Token service tests', () => {

    it.todo('validateRefreshToken should return true if provided refreshToken is valid and has not expired yet');
    it.todo('validateRefreshToken should return false if provided refreshToken is not valid and has expired');

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



});
