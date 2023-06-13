import {describe, it, vi, expect} from "vitest";
import {faker} from "@faker-js/faker";
import Tweets from "../index";
import type {TweetCreateDTO} from "../core/dtos/tweet-create.dto";
import {TweetDTO} from "~/server/business/tweets/core/dtos/tweet.dto";

describe('Tweet service tests', () => {

    const idRegex = /\b[0-9a-f]{24}\b/;

    describe('createTweet port tests', () => {

        it('createTweet should create a tweet on the data provider and return a TweetDTO', async () => {

            const fakeTweet: TweetCreateDTO = {
                authorId: faker.database.mongodbObjectId(),
                text: faker.word.words(4)
            };

            const spy = vi.spyOn(Tweets, 'createTweet');
            const result = await Tweets.createTweet(fakeTweet)

            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith(fakeTweet);

            expect(result).not.toBeNull();
            expect(result).toBeTruthy();
            expect(result?.authorId).toMatch(idRegex);

            expect(result).toStrictEqual(expect.objectContaining(<TweetDTO>{
                id: expect.any(String),
                authorId: expect.any(String),
                text: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }));

        });

    });

});
