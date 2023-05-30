import {describe, expect, it, vi} from "vitest";
import {faker} from "@faker-js/faker";
import DateHandler from "../../date-handler";

describe('Date Handler service tests', () => {

    describe('formatDateTo port tests', () => {

        it('Should return the formatted string version of the provided Date', () => {

            const fullDateRegexPattern = /^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday), (January|February|March|April|May|June|July|August|September|October|November|December) [0-3]?[0-9], [0-9]{4} [0-1]?[0-9]:[0-5][0-9] (AM|PM)$/;

            const fakeDate = faker.date.anytime();

            const spy = vi.spyOn(DateHandler, 'formatToFullDate');
            const result = DateHandler.formatToFullDate(fakeDate);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(fakeDate);

            expect(result.trim()).toBeTruthy();
            expect(result.trim()).toMatch(fullDateRegexPattern);
            expect(fullDateRegexPattern.test(result.trim())).toBeTruthy();

        });

    });

});
