import {MediaFileService} from "./media-file.service";
import {MediaFileDrivenAdapter} from "./adapters/media-file-driven.adapter";
import {MediaFileCloudApiAdapter} from "./adapters/media-file-cloud-api.adapter";

export default MediaFileService(MediaFileCloudApiAdapter(),MediaFileDrivenAdapter());
