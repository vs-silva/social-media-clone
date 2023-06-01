import {DateHandlerDriverPorts} from "./ports/date-handler-driver.ports";
import {DateHandlerDrivenPorts} from "./ports/date-handler-driven.ports";
import {DateFormatTypeConstants} from "./core/constants/date-format-type.constants";

export function DateHandlerService(engine: DateHandlerDrivenPorts): DateHandlerDriverPorts {

    function formatToFullDate(date: Date): string {
        return  engine.formatDate(date, DateFormatTypeConstants.FULL_DATE_FORMAT);
    }

    return {
       formatToFullDate
    };
}
