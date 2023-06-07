import {UserService} from "./user.service";
import {RestApiWriterAdapter} from "./adapter/rest-api-writer.adapter";
import {RestApiReaderAdapter} from "./adapter/rest-api-reader.adapter";
import {JwtTokenDecoderAdapter} from "./adapter/jwt-token-decoder.adapter";

export default UserService(RestApiWriterAdapter(), RestApiReaderAdapter(), JwtTokenDecoderAdapter());
