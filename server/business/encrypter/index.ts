import {EncrypterService} from "./encrypter.service";
import {EncrypterEngineDrivenAdapter} from "./adapters/encrypter-engine-driven.adapter";

export default EncrypterService(EncrypterEngineDrivenAdapter());
