import type {TweetDriverPorts} from "./ports/tweet-driver.ports";
import type {TweetWriterDrivenPorts} from "./ports/tweet-writer-driven.ports";
import type {TweetCreateDTO} from "./core/dtos/tweet-create.dto";
import type {TweetDTO} from "./core/dtos/tweet.dto";
import {TweetMapperService} from "./core/mappers/tweet-mapper.service";
import MediaFile from "../media-file";
import type {MediaFileCreateDTO} from "../media-file/core/dtos/media-file-create,dto";
import {MediaFileConstants} from "~/server/business/media-file/core/constants/media-file.constants";

export function TweetService(writer: TweetWriterDrivenPorts): TweetDriverPorts {

    async function createTweet(dto: TweetCreateDTO): Promise<TweetDTO | null> {

        const result = await writer.save({
            text: dto.text,
            authorId: dto.authorId
        });

        if(!result) {
            return null;
        }

        if(dto.files) {

            const files = Object.keys(dto.files).map( async (key: string) => {

               const fileToUpload = Object(dto.files)[key][`${MediaFileConstants.FILE_PATH}`];

               return await MediaFile.createMediaFile(<MediaFileCreateDTO>{
                    userId: result.authorId,
                    tweetId: result.id,
                    resource: fileToUpload
                });
            });

            await Promise.all(files);
        }

        return TweetMapperService.mapToTweetDTO(result);
    }

    return {
        createTweet
    };
}
