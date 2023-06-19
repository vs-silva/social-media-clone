import type {MediaFileCloudApiDrivenPorts} from "../ports/media-file-cloud-api-driven.ports";
import type {MediaFileResourceEntity} from "../core/entities/media-file-resource.entity";
import CloudMediaProvider from "../../../cloud-media-provider";

export function MediaFileCloudApiAdapter(): MediaFileCloudApiDrivenPorts {

    const engine = CloudMediaProvider;

    async function upload(mediaFile: string): Promise<MediaFileResourceEntity | null> {

        try {

            const uploadResult = await engine.uploader.upload(mediaFile);

            return <MediaFileResourceEntity>{
                id: uploadResult.asset_id,
                public_id: uploadResult.public_id,
                type: uploadResult.type,
                bytes: uploadResult.bytes,
                format: uploadResult.format,
                resource_type: uploadResult.resource_type,
                height: uploadResult.height,
                width: uploadResult.width,
                created_at: uploadResult.created_at,
                url: uploadResult.url,
                secure_url: uploadResult.secure_url,
                signature: uploadResult.signature,
                version: uploadResult.version
            };

        } catch (error) {
            return null;
        }

    }

    return {
        upload
    }
}
