import {describe, expect, it, vi} from "vitest";
import {faker} from "@faker-js/faker";
import RefreshToken from "../index";
import User from "../../user";
import type {RefreshTokenRegisterDTO} from "../core/dto/refresh-token-register.dto";
import type {RefreshTokenDTO} from "../core/dto/refresh-token.dto";
import type {UserRegisterDTO} from "../../user/core/dto/user-register.dto";
import type {UserTokenSecretDTO} from "../../user/core/dto/user-token-secret.dto";
import type {UserAuthDTO} from "../../user/core/dto/user-auth.dto";

describe('Refresh Token service tests', () => {

    const timeout = 10*1000;

    it('saveRefreshToken should create a new refreshToken and return a RefreshTokenDTO', async () => {

        const idRegex = /\b[0-9a-f]{24}\b/;

        const fakePassword = faker.internet.password();

        const fakeNewUser: UserRegisterDTO = {
            email: faker.internet.email(),
            password: fakePassword,
            repeatPassword: fakePassword,
            username: faker.internet.userName(),
            name: `${faker.person.firstName()} ${faker.person.lastName()}`
        };

        const fakeTokenSecrets: UserTokenSecretDTO = {
            accessTokenSecret: `${faker.word.words()}:${faker.word.words()}`,
            refreshTokenSecret: `${faker.word.words()}:${faker.word.words()}`
        };

        const registeredUser = await User.registerUser(fakeNewUser);

        const authCredentials: UserAuthDTO = {
          username: registeredUser?.username as string,
          password: fakePassword
        };

        const authenticatedUser = await User.authenticateUser(authCredentials, fakeTokenSecrets);


        const fakeRefreshTokenDTO: RefreshTokenRegisterDTO = {
            token: authenticatedUser?.token?.refreshToken as string,
            userId: authenticatedUser?.id as  string
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

        //TODO: clear test data

    }, timeout);

});
