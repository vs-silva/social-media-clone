import {UserService} from "./user.service";
import {DatabaseUserWriterAdapter} from "./adapters/database-user-writer.adapter";

export default UserService(DatabaseUserWriterAdapter());
