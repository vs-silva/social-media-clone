import {describe, expect, it, vi, beforeAll} from "vitest";
import {faker} from "@faker-js/faker";
import Tweet from "../index";
import User from "../../user";
import type {TweetRequestDTO} from "../../../server/business/tweets/core/dtos/tweet-request.dto";
import type {UserRegisterDTO} from "../../../server/business/user/core/dto/user-register.dto";
import type {UserAuthDTO} from "../../../server/business/user/core/dto/user-auth.dto";
import type {TweetResponseDTO} from "../../../server/business/tweets/core/dtos/tweet-response.dto";

describe('Tweet service tests', () => {

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

    describe('postTweet port tests', async () => {

        beforeAll(async () => {
            fakeNewUser.username = faker.internet.userName();
            const registeredUser = await User.signup(fakeNewUser);

            const userCredentials = <UserAuthDTO>{
                username: registeredUser?.username,
                password: fakePassword
            };

            await User.login(userCredentials);
            await User.refreshToken();
        });

        it('submitTweet should create a tweet and return a TweetResponseDTO', async () => {

            const fakeTweet: TweetRequestDTO = {
                text: faker.word.words(10)
            };

            const spy = vi.spyOn(Tweet, 'submitTweet');
            const result = await Tweet.submitTweet(fakeTweet);

            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith(fakeTweet);

            expect(result).toBeTruthy();
            expect(result?.id).toBeTruthy();
            expect(result?.id).toMatch(idRegex);
            expect(result?.text).toEqual(fakeTweet.text);

            expect(result).toStrictEqual(expect.objectContaining(<TweetResponseDTO>{
                id: expect.any(String),
                text: expect.any(String)
            }));

        });


    });
});
