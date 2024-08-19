export const setHoursToMidnight = (date: Date = new Date()): Date => {
  return new Date(date.setHours(0, 0, 0, 0));
};

export const parseDateStringToMidnight = (dateString: string): Date | "" => {
  if (!dateString) return "";

  const JSTInDate = new Date(dateString);
  return setHoursToMidnight(JSTInDate);
};

export const formatDateToJST = (date: Date | ""): string | "" => {
  if (!date) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const addDaysToDate = (
  date: Date = new Date(),
  days: number = 1
): Date => {
  return new Date(date.setDate(date.getDate() + days));
};
