export function setHoursToMidnight(date: Date = new Date()): Date {
  return new Date(date.setHours(0, 0, 0, 0));
}

export function formatDateToString(date: Date | ""): string | "" {
  if (!date) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatDateToJPString(date: Date | ""): string | "" {
  if (!date) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}年${month}月${day}日`;
}

export function addDaysToDate(date: Date = new Date(), days: number = 1): Date {
  return new Date(date.setDate(date.getDate() + days));
}

export function calcDateFromToday(additionalDays: number = 0): Date {
  const todayAtMidnight = setHoursToMidnight(new Date());
  return addDaysToDate(todayAtMidnight, additionalDays);
}

export function isValidDate(dateString: string | null = ""): boolean {
  if (!dateString) return false;
  return !isNaN(Date.parse(dateString));
}
