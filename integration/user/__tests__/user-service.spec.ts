import {describe, expect, it, vi} from "vitest";
import {faker} from "@faker-js/faker";
import User from "../index";
import type {UserRegisterDTO} from "../../../server/business/user/core/dto/user-register.dto";
import type {UserAuthDTO} from "../../../server/business/user/core/dto/user-auth.dto";
import type {UserResponseDTO} from "../../../server/business/user/core/dto/user-response.dto";
import type {DecodeAccessTokenDTO} from "../core/dto/decode-access-token.dto";

describe('User service tests', () => {

    const idRegex = /\b[0-9a-f]{24}\b/;
    const tokenRegex = /^([A-Za-z0-9-_=]+\.)+([A-Za-z0-9-_=]+)+(\.[A-Za-z0-9-_.+/=]+)?$/;
    const fakePassword = faker.internet.password();

    const fakeNewUser: UserRegisterDTO = {
        email: faker.internet.email(),
        password: fakePassword,
        repeatPassword: fakePassword,
        username: '',
        name: `${faker.person.firstName()} ${faker.person.lastName()}`
    };

    describe('signup port tests', () => {

        it('signup should create a new user and return a UserResponseDTO', async () => {

            fakeNewUser.username = faker.internet.userName();

            const spy = vi.spyOn(User, 'signup');
            const result = await User.signup(fakeNewUser);

            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith(fakeNewUser);

            expect(result).toBeTruthy();
            expect(result?.id).toBeTruthy();
            expect(result?.id).toMatch(idRegex);

            expect(result).toStrictEqual(expect.objectContaining(<UserResponseDTO>{
                id: expect.any(String),
                username: expect.any(String),
                email: expect.any(String),
                name: expect.any(String),
                profileImage: expect.any(String),
                profileCreateDate: expect.any(String),
                profileLastUpdateDate: expect.any(String),
            }));

        });

    });

    describe('login port tests', () => {

        it('login should allow access to a register user by providing a access and refresh Token', async () => {

            fakeNewUser.username = faker.internet.userName();
            const registeredUser = await User.signup(fakeNewUser);

            const spy = vi.spyOn(User, 'login');

            const requestPayload = <UserAuthDTO>{
                username: registeredUser?.username,
                password: fakePassword
            };

            const result = await User.login(requestPayload);

            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith(requestPayload);

            expect(result).toBeTruthy();

            expect(result).toStrictEqual(expect.objectContaining(<UserResponseDTO>{
                id: expect.any(String),
                email: expect.any(String),
                name: expect.any(String),
                username: expect.any(String),
                profileImage: expect.any(String),
                profileCreateDate: expect.any(String),
                profileLastUpdateDate: expect.any(String),
                access_token: expect.any(String)
            }));

        });

    });

    describe('refreshToken port tests', () => {

        it('refreshToken should return a accessToken for registered and logged in user', async () => {

            fakeNewUser.username = faker.internet.userName();
            const registeredUser = await User.signup(fakeNewUser);

            const userCredentials = <UserAuthDTO>{
                username: registeredUser?.username,
                password: fakePassword
            };

            const loggedInUser = await User.login(userCredentials);
            expect(loggedInUser?.id).toBeTruthy();
            expect(loggedInUser?.access_token).toBeTruthy();

            const spy = vi.spyOn(User, 'refreshToken');
            const result = await User.refreshToken();

            expect(spy).toHaveBeenCalledOnce();
            expect(result?.trim()).toBeTruthy();
            expect(result).toMatch(tokenRegex);

        });

    });

    describe('getUser port tests', () => {

        it('getUser should return a UserResponseDTO', async () => {

            fakeNewUser.username = faker.internet.userName();
            const registeredUser = await User.signup(fakeNewUser);

            const userCredentials = <UserAuthDTO>{
                username: registeredUser?.username,
                password: fakePassword
            };

            await User.login(userCredentials);
            await User.refreshToken();

            const spy = vi.spyOn(User, 'getUser');
            const result = await User.getUser();

            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith();

            expect(result).toStrictEqual(expect.objectContaining(<UserResponseDTO>{
                id: expect.any(String),
                email: expect.any(String),
                name: expect.any(String),
                username: expect.any(String),
                profileImage: expect.any(String),
                profileCreateDate: expect.any(String),
                profileLastUpdateDate: expect.any(String)
            }));

        });

    });

    describe('decodeAccessToken port tests', () => {

        it('decodeAccessToken should return DecodeAccessTokenDTO is provided accessToken is valid', async () => {

            fakeNewUser.username = faker.internet.userName();
            const registeredUser = await User.signup(fakeNewUser);

            const userCredentials = <UserAuthDTO>{
                username: registeredUser?.username,
                password: fakePassword
            };

            await User.login(userCredentials);
            const accessToken = await User.refreshToken();

            expect(accessToken?.trim()).toBeTruthy();

            const spy = vi.spyOn(User, 'decodeAccessToken');
            const result = await User.decodeAccessToken(accessToken as string);

            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith(accessToken as string);

            expect(result).toStrictEqual(expect.objectContaining(<DecodeAccessTokenDTO>{
                userId: expect.any(String),
                issuedAt: expect.any(Number),
                expiresAt: expect.any(Number),
                renewCountTimer: expect.any(Number)
            }));

        });

    });

});
