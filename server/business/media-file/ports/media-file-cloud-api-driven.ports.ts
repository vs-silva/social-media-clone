import type {MediaFileResourceEntity} from "../core/entities/media-file-resource.entity";

export interface MediaFileCloudApiDrivenPorts {
    upload(mediaFile: string): Promise<MediaFileResourceEntity | null>;
}
