import type {MediaFileDriverPorts} from "./ports/media-file-driver.ports";
import type {MediaFileWriterDrivenPorts} from "./ports/media-file-writer-driven.ports";
import type {MediaFileCloudApiDrivenPorts} from "./ports/media-file-cloud-api-driven.ports";
import type {MediaFileCreateDTO} from "./core/dtos/media-file-create.dto";
import type {MediaFileDTO} from "./core/dtos/media-file.dto";
import {MediaFileMapper} from "./core/mappers/media-file.mapper";
import type {MediaFileResourceCreateDTO} from "./core/dtos/media-file-resource-create.dto";


export function MediaFileService(engine: MediaFileCloudApiDrivenPorts, writer: MediaFileWriterDrivenPorts): MediaFileDriverPorts {

    async function createMediaFile (dto: MediaFileCreateDTO): Promise<MediaFileDTO | null> {

        const uploadResult = await engine.upload(dto.resource);

        if (!uploadResult) {
            return null;
        }

        const result = await writer.save(<MediaFileResourceCreateDTO>{
            url: uploadResult.url,
            providerPublicId: uploadResult.public_id,
            userId: dto.userId,
            tweetId: dto.tweetId
        });

        if(!result) {
            return null;
        }

        return MediaFileMapper.mapToMediaFileDTO(result);
    }

    return {
      createMediaFile
    };
}
