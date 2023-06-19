import type {MediaFileCreateDTO} from "../core/dtos/media-file-create,dto";
import type {MediaFileDTO} from "../core/dtos/media-file.dto";

export interface MediaFileDriverPorts {
    createMediaFile(dto: MediaFileCreateDTO): Promise<MediaFileDTO | null>;
}
