import {DateHandlerService} from "./date-handler.service";
import {DateHandlerEngineDrivenAdapter} from "./adapters/date-handler-engine-driven.adapter";

export default DateHandlerService(DateHandlerEngineDrivenAdapter());
