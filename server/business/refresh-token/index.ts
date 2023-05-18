import {RefreshTokenService} from "./refresh-token.service";
import {DatabaseTokenReaderAdapter} from "./adapters/database-token-reader.adapter";
import {DatabaseTokenWriterAdapter} from "./adapters/database-token-writer.adapter";

export default RefreshTokenService(DatabaseTokenReaderAdapter(), DatabaseTokenWriterAdapter());
