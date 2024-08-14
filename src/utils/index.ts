const setTimeToMidnight = (date: Date): Date => {
  return new Date(date.setHours(0, 0, 0, 0));
};

export const parseDateStringToMidnight = (dateString: string): Date => {
  const JSTInDate = new Date(dateString);
  return setTimeToMidnight(JSTInDate);
};

export const formatDateToJST = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
