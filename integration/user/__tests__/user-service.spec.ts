import {describe, expect, it, vi} from "vitest";
import {faker} from "@faker-js/faker";
import User from "../index";
import type {UserRegisterDTO} from "../../../server/business/user/core/dto/user-register.dto";
import type {UserDTO} from "../../../server/business/user/core/dto/user.dto";
import type {UserAuthDTO} from "../../../server/business/user/core/dto/user-auth.dto";
import type {UserResponseDTO} from "../../../server/business/user/core/dto/user-response.dto";

describe('User service tests', () => {

    const idRegex = /\b[0-9a-f]{24}\b/;
    const passwordHashRegex = /\$2b\$10\$[A-Za-z0-9./]{53}/;
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

        it('signup should create a new user and return a UserDTO', async () => {

            fakeNewUser.username = faker.internet.userName();

            const spy = vi.spyOn(User, 'signup');
            const result = await User.signup(fakeNewUser);

            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith(fakeNewUser);

            expect(result).toBeTruthy();
            expect(result?.id).toBeTruthy();
            expect(result?.id).toMatch(idRegex);
            expect(result?.password).toMatch(passwordHashRegex);

            expect(result).toStrictEqual(expect.objectContaining(<UserDTO>{
                id: expect.any(String),
                email: expect.any(String),
                name: expect.any(String),
                username: expect.any(String),
                password: expect.any(String),
                profileImage: expect.any(String),
                profileCreateDate: expect.any(String),
                profileLastUpdateDate: expect.any(String)
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

        it.only('refreshToken should return a accessToken for registered and logged in user', async () => {

            fakeNewUser.username = faker.internet.userName();
            const registeredUser = await User.signup(fakeNewUser);

            const userCredentials = <UserAuthDTO>{
                username: registeredUser?.username,
                password: fakePassword
            };

            const loggedInUser = await User.login(userCredentials);

            const spy = vi.spyOn(User, 'refreshToken');
            const result = await User.refreshToken();

            expect(spy).toHaveBeenCalledOnce();
            expect(result?.trim()).toBeTruthy();
            expect(result).toMatch(tokenRegex);

        });

    });

});
