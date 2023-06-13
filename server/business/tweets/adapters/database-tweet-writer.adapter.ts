import type {TweetWriterDrivenPorts} from "../ports/tweet-writer-driven.ports";
import type {TweetCreateDTO} from "../core/dtos/tweet-create.dto";
import type {TweetEntity} from "../core/entities/tweet.entity";
import {Tweet} from "@prisma/client";
import DataProvider from "../../../data-provider";

export function DatabaseTweetWriterAdapter(): TweetWriterDrivenPorts {

    const engine = DataProvider;

    async function save(dto: TweetCreateDTO): Promise<TweetEntity | null> {

        try {

            const dbEntity: Tweet = await engine.tweet.create({
                data: dto
            });

            return <TweetEntity> {
              id: dbEntity.id,
              text: dbEntity.text,
              authorId: dbEntity.authorId,
              replyToId: dbEntity.replyToId,
              createdAt: dbEntity.createdAt,
              updatedAt: dbEntity.updatedAt
            };

        } catch (error) {
            return null;
        }
    }

    return {
       save
    };
}
