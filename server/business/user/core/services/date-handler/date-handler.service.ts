import {DateHandlerInterface} from "./date-handler.interface";
import moment from "moment";

const engine = moment;
const formatType = 'LLLL';

function formatDate(date: Date): string {
    return engine(date).format(formatType);
}

export const DateHandlerService: DateHandlerInterface = {
    formatDate
};
