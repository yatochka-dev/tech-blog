import dayjs from "dayjs";

export function displayDate(date: Date) {
  const djs = dayjs(date);

  return djs.format("MMMM D, YYYY");
}
