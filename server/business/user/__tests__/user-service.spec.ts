import {describe, expect, it, vi} from "vitest";
import {faker} from "@faker-js/faker";
import User from "../index";
import type {UserDTO} from "../core/dto/user.dto";
import type {UserRegisterDTO} from "../core/dto/user-register.dto";
import type {UserAuthDTO} from "../core/dto/user-auth.dto";
import type {UserAccessTokensDTO} from "../core/dto/user-access-tokens.dto";
import type {UserTokenSecretDTO} from "../core/dto/user-token-secret.dto";

describe('User service tests', () => {

    const idRegex = /\b[0-9a-f]{24}\b/;

    const fakePassword = faker.internet.password();

    const fakeNewUser: UserRegisterDTO = {
        email: faker.internet.email(),
        password: fakePassword,
        repeatPassword: fakePassword,
        username: '',
        name: `${faker.person.firstName()} ${faker.person.lastName()}`
    };

    it('registerUser should create a new user', async () => {

        fakeNewUser.username = faker.internet.userName();

        const spy = vi.spyOn(User, 'registerUser');
        const result = await User.registerUser(fakeNewUser);

        expect(spy).toHaveBeenCalledOnce();
        expect(spy).toHaveBeenCalledWith(fakeNewUser);

        expect(result).toBeTruthy();
        expect(result?.id).toBeTruthy();
        expect(result?.id).toMatch(idRegex);

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

    describe('authenticateUser port tests', () => {

        const fakeTokenSecrets: UserTokenSecretDTO = {
            accessTokenSecret: `${faker.word.words()}:${faker.word.words()}`,
            refreshTokenSecret: `${faker.word.words()}:${faker.word.words()}`
        };

        it('authenticateUser should return null if null is not registered', async () => {

            const fakeAuthDTO: UserAuthDTO = {
                username: faker.internet.userName(),
                password: faker.internet.password()
            };

            const spy = vi.spyOn(User, 'authenticateUser');
            const result = await User.authenticateUser(fakeAuthDTO, fakeTokenSecrets);

            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith(fakeAuthDTO, fakeTokenSecrets);

            expect(result).toBeNull();
        });

        it('authenticateUser should return null any if of login credentials are incorrect', async () => {

            fakeNewUser.username = faker.internet.userName();

            const userDTO = await User.registerUser(fakeNewUser);
            expect(userDTO).toBeTruthy();
            expect(userDTO?.username.trim()).toBeTruthy();
            expect(userDTO?.password.trim()).toBeTruthy();

            const authCredentials: UserAuthDTO = {
                username: userDTO?.username as string,
                password: faker.internet.password()
            };

            const spy = vi.spyOn(User, 'authenticateUser');
            const result = await User.authenticateUser(authCredentials, fakeTokenSecrets);

            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith(authCredentials, fakeTokenSecrets);

            expect(result).toBeNull();

        });

        it('authenticateUser should return UserDTO with access token if login credentials are correct', async () => {

            fakeNewUser.username = faker.internet.userName();

            const userDTO = await User.registerUser(fakeNewUser);
            expect(userDTO).toBeTruthy();
            expect(userDTO?.username.trim()).toBeTruthy();
            expect(userDTO?.password.trim()).toBeTruthy();

            const authCredentials: UserAuthDTO = {
                username: userDTO?.username as string,
                password: fakePassword
            };

            const spy = vi.spyOn(User, 'authenticateUser');
            const result = await User.authenticateUser(authCredentials, fakeTokenSecrets);

            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith(authCredentials, fakeTokenSecrets);

            expect(result).toBeTruthy();
            expect(result?.token).toBeTruthy();

            expect(result).toStrictEqual(expect.objectContaining(<UserDTO>{
                id: expect.any(String),
                email: expect.any(String),
                name: expect.any(String),
                username: expect.any(String),
                password: expect.any(String),
                profileImage: expect.any(String),
                profileCreateDate: expect.any(String),
                profileLastUpdateDate: expect.any(String),
                token: expect.objectContaining(<UserAccessTokensDTO> {
                    accessToken: expect.any(String),
                    refreshToken: expect.any(String),
                })
            }));

        });



    });



});
