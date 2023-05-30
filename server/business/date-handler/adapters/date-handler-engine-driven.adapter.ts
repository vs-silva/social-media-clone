import type {DateHandlerDrivenPorts} from "../ports/date-handler-driven.ports";
import moment from "moment";

export function DateHandlerEngineDrivenAdapter(): DateHandlerDrivenPorts {

    const engine = moment;

    function formatDate(date: Date, formatOption: string): string {
        return engine(date).format(formatOption);
    }

    return {
      formatDate
    };
}
