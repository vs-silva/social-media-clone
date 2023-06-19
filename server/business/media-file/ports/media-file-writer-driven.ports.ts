import type {MediaFileEntity} from "../core/entities/media-file.entity";
import type {MediaFileResourceCreateDTO} from "../core/dtos/media-file-resource-create.dto";

export interface MediaFileWriterDrivenPorts {
    save(dto: MediaFileResourceCreateDTO): Promise<MediaFileEntity | null>;
}
