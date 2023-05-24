import {describe, expect, it, vi, beforeEach, afterEach} from "vitest";
import {faker} from "@faker-js/faker";
import RefreshToken from "../index";
import User from "../../user";
import type {RefreshTokenRegisterDTO} from "../core/dto/refresh-token-register.dto";
import type {RefreshTokenDTO} from "../core/dto/refresh-token.dto";
import type {UserRegisterDTO} from "../../user/core/dto/user-register.dto";
import type {UserTokenSecretDTO} from "../../user/core/dto/user-token-secret.dto";
import type {UserAuthDTO} from "../../user/core/dto/user-auth.dto";
import {UserDTO} from "~/server/business/user/core/dto/user.dto";

describe('Refresh Token service tests', async () => {

    const timeout = 10*1000;
    const idRegex = /\b[0-9a-f]{24}\b/;

    const fakeTokenSecrets: UserTokenSecretDTO = {
        accessTokenSecret: `${faker.word.words()}:${faker.word.words()}`,
        refreshTokenSecret: `${faker.word.words()}:${faker.word.words()}`
    };

    let authenticatedUser: UserDTO | null = null;
    const userIDsToRemove: string[] = [];

    beforeEach( async () => {

        const fakePassword = faker.internet.password();

        const fakeNewUser: UserRegisterDTO = {
            email: faker.internet.email(),
            password: fakePassword,
            repeatPassword: fakePassword,
            username: faker.internet.userName(),
            name: `${faker.person.firstName()} ${faker.person.lastName()}`
        };

        const registeredUser = await User.registerUser(fakeNewUser) as UserDTO;

        const authCredentials: UserAuthDTO = {
            username: registeredUser?.username as string,
            password: fakePassword
        };

        authenticatedUser = await User.authenticateUser(authCredentials, fakeTokenSecrets);

    });

    afterEach( async () => {
        for (let i = 0; i < userIDsToRemove.length; i++) {
            await User.removeUser(userIDsToRemove[i]);
        }

        authenticatedUser = null;
    });

    it('saveRefreshToken should create a new refreshToken and return a RefreshTokenDTO', async () => {

        const fakeRefreshTokenDTO: RefreshTokenRegisterDTO = {
            token: authenticatedUser?.token?.refreshToken as string,
            userId: authenticatedUser?.id as string
        };

        const spy = vi.spyOn(RefreshToken, 'saveRefreshToken');
        const result = await RefreshToken.saveRefreshToken(fakeRefreshTokenDTO);

        expect(spy).toHaveBeenCalledOnce();
        expect(spy).toHaveBeenCalledWith(fakeRefreshTokenDTO);

        expect(result).toBeTruthy();
        expect(result?.token).toBeTruthy();
        expect(result?.id).toBeTruthy();
        expect(result?.userId).toMatch(idRegex);

        expect(result).toStrictEqual(expect.objectContaining(<RefreshTokenDTO>{
            id: expect.any(String),
            token: expect.any(String),
            userId: expect.any(String),
            tokenCreateDate: expect.any(String),
            tokenLastUpdateDate: expect.any(String)
        }));

        userIDsToRemove.push(authenticatedUser?.id as string);

    }, timeout);

    it('getRefreshTokenByToken should return a existent refresh token if the provided token exists in data provider', async () => {

        const fakeRefreshTokenDTO: RefreshTokenRegisterDTO = {
            token: authenticatedUser?.token?.refreshToken as string,
            userId: authenticatedUser?.id as string
        };

        await RefreshToken.saveRefreshToken(fakeRefreshTokenDTO);
        const token = authenticatedUser?.token?.refreshToken as string;

        const spy = vi.spyOn(RefreshToken, 'getRefreshTokenByToken');
        const result = await RefreshToken.getRefreshTokenByToken(token);

        expect(spy).toHaveBeenCalledOnce();
        expect(spy).toHaveBeenCalledWith(token);

        expect(result).toBeTruthy();
        expect(result?.token).toStrictEqual(token);

        userIDsToRemove.push(authenticatedUser?.id as string);

    });

    it('removeRefreshToken should return null if provided tokenId does not exists', async () => {

        const fakeTokenId = faker.database.mongodbObjectId();

        const spy = vi.spyOn(RefreshToken, 'removeRefreshToken');
        const result = await RefreshToken.removeRefreshToken(fakeTokenId);

        expect(spy).toHaveBeenCalledOnce();
        expect(spy).toHaveBeenCalledWith(fakeTokenId);

        expect(result).toBeNull();

    });

    it('removeRefreshToken should return RefreshTokenDTO if provided tokenId exists', async () => {

        const fakeRefreshTokenDTO: RefreshTokenRegisterDTO = {
            token: authenticatedUser?.token?.refreshToken as string,
            userId: authenticatedUser?.id as string
        };

        const refreshTokenDTO = await RefreshToken.saveRefreshToken(fakeRefreshTokenDTO);

        expect(refreshTokenDTO).toBeTruthy();
        expect(refreshTokenDTO?.id).toBeTruthy();

        const spy = vi.spyOn(RefreshToken, 'removeRefreshToken');
        const result = await RefreshToken.removeRefreshToken(refreshTokenDTO?.id as string);

        expect(spy).toHaveBeenCalledOnce();
        expect(spy).toHaveBeenCalledWith(refreshTokenDTO?.id as string);

        expect(result).toBeTruthy();
        expect(result?.id).toMatch(idRegex);

        expect(result).toStrictEqual(expect.objectContaining(<RefreshTokenDTO>{
            id: expect.any(String),
            token: expect.any(String),
            userId: expect.any(String),
            tokenCreateDate: expect.any(String),
            tokenLastUpdateDate: expect.any(String)
        }));

    });

    it.todo('removeUserRefreshTokens should remove all user refresh tokens if userId exists in data provider');

});
