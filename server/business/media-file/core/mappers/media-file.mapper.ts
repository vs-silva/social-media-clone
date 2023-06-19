import type {MediaFileMapperPorts} from "./media-file-mapper.ports";
import type {MediaFileEntity} from "../entities/media-file.entity";
import type {MediaFileDTO} from "../dtos/media-file.dto";
import DateHandler from "../../../date-handler";

async function mapToMediaFileDTO(entity: MediaFileEntity): Promise<MediaFileDTO> {
    return <MediaFileDTO> {
      id: entity.id,
      userId: entity.userId,
      createAt: DateHandler.formatToFullDate(entity.createdAt),
      updatedAt: DateHandler.formatToFullDate(entity.updatedAt),
      url: entity.url,
      providerPublicId: entity.providerPublicId,
      tweetId: entity.tweetId
    };
}

export const MediaFileMapper: MediaFileMapperPorts = {
    mapToMediaFileDTO
};
