import type {MediaFileEntity} from "../entities/media-file.entity";
import type {MediaFileDTO} from "../dtos/media-file.dto";

export interface MediaFileMapperPorts {
    mapToMediaFileDTO(entity: MediaFileEntity): Promise<MediaFileDTO>;
}
