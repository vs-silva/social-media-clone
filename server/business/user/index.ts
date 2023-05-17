import {UserService} from "./user.service";
import {DatabaseUserWriterAdapter} from "./adapters/database-user-writer.adapter";
import {DatabaseUserReaderAdapter} from "./adapters/database-user-reader.adapter";

export default UserService(DatabaseUserReaderAdapter(),DatabaseUserWriterAdapter());
