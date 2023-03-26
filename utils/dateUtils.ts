/**
 * Format date to "MM/DD/YYYY"
 */
export function formatDate(date: number | string) {
  let d = typeof date === "string" ? new Date(date).getTime() : date;
  return new Date(d).toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
}

export function getDateWithOrdinalNum(date: string | number): string {
  const d = +date;
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function getDaysBetween(
  startDate: Date | string,
  endDate: Date | string
): number {
  let start = typeof startDate === "string" ? new Date(startDate) : startDate;
  let end = typeof endDate === "string" ? new Date(endDate) : endDate;
  const diffInMs = end.getTime() - start.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  return diffInDays;
}
