import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/sk";
import dayjsRelativePlugin from "dayjs/plugin/relativeTime";

dayjs.extend(dayjsRelativePlugin);

/**
 *
 * @param date
 * @returns
 */
export function printDateInPastRelative(date: Date | Dayjs): string {
  return dayjs().locale("sk").to(dayjs(date));
}
