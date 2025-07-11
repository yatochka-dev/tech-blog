import dayjs from "dayjs";

export function displayDate(date: Date, noYear = false) {
  const djs = dayjs(date);

  if (noYear) {
    return djs.format("MMMM, D");
  }

  return djs.format("MMMM D, YYYY");
}
