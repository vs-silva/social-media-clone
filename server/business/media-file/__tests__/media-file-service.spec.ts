import {describe, it, vi, expect} from "vitest";
import {faker} from "@faker-js/faker";
import MediaFile from "../index";
import type {MediaFileCreateDTO} from "../core/dtos/media-file-create,dto";
import type {MediaFileDTO} from "../core/dtos/media-file.dto";

describe('Media files service tests', () => {

    const idRegex = /\b[0-9a-f]{24}\b/;

    describe('createMediaFile port tests', () => {

        it('createMediaFile should save a MediaFile on the dataProvider and return a MediaFileDTO', async () => {

            const fakeRequestDTO: MediaFileCreateDTO = {
                userId: faker.database.mongodbObjectId(),
                tweetId: faker.database.mongodbObjectId(),
                resource: faker.image.url()
            };

            const spy = vi.spyOn(MediaFile, 'createMediaFile');
            const result = await MediaFile.createMediaFile(fakeRequestDTO);

            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith(fakeRequestDTO);

            expect(result).toBeTruthy();

            expect(result?.id).toMatch(idRegex);
            expect(result?.userId).toMatch(idRegex);
            expect(result?.tweetId).toMatch(idRegex);

            expect(result?.url.trim()).toBeTruthy();
            expect(result?.providerPublicId.trim()).toBeTruthy();

            expect(result?.userId).toEqual(fakeRequestDTO.userId);
            expect(result?.tweetId).toMatch(fakeRequestDTO.tweetId);

            expect(result).toStrictEqual(expect.objectContaining(<MediaFileDTO>{
                id: expect.any(String),
                userId: expect.any(String),
                tweetId: expect.any(String),
                providerPublicId: expect.any(String),
                url: expect.any(String),
                createAt: expect.any(String),
                updatedAt: expect.any(String)
            }));

        });

    });

});
