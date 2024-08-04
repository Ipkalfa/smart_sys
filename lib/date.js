import { DateTime } from "luxon";

export const formatDate = (isoDate) => {
  return DateTime.fromISO(isoDate).toLocaleString(DateTime.DATETIME_FULL);
};

// iot - connected to esp32
//
