import type {MediaFileWriterDrivenPorts} from "../ports/media-file-writer-driven.ports";
import type {MediaFileEntity} from "../core/entities/media-file.entity";
import {MediaFile} from "@prisma/client";
import DataProvider from "../../../data-provider";
import type {MediaFileResourceCreateDTO} from "../core/dtos/media-file-resource-create.dto";

export function MediaFileDrivenAdapter(): MediaFileWriterDrivenPorts {

    const engine = DataProvider;
    async function save(dto: MediaFileResourceCreateDTO): Promise<MediaFileEntity | null> {

        try {

            const dbEntity: MediaFile = await engine.mediaFile.create({
               data: dto
            });

            return <MediaFileEntity> {
              id: dbEntity.id,
              userId: dbEntity.userId,
              createdAt: dbEntity.createdAt,
              updatedAt: dbEntity.updatedAt,
              url: dbEntity.url,
              providerPublicId: dbEntity.providerPublicId,
              tweetId: dbEntity.tweetId
            };

        }
        catch (error) {
            return null;
        }
    }

    return {
      save
    };
}
