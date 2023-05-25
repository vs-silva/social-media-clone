import {TokenService} from "./token-service";
import {TokenEngineDrivenAdapter} from "./adapters/token-engine-driven.adapter";
import {TokenWriterDrivenAdapter} from "./adapters/token-writer-driven.adapter";
import {TokenReaderDrivenAdapter} from "./adapters/token-reader-driven.adapter";

export default TokenService(TokenEngineDrivenAdapter(), TokenWriterDrivenAdapter(), TokenReaderDrivenAdapter());
