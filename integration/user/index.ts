import {UserService} from "./user.service";
import {RestApiWriterAdapter} from "./adapter/rest-api-writer.adapter";
import {RestApiReaderAdapter} from "./adapter/rest-api-reader.adapter";

export default UserService(RestApiWriterAdapter(), RestApiReaderAdapter());
