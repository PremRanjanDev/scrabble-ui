export const getTimeDifference = (date: Date | string): string => {
  const inputDate: Date = typeof date === "string" ? new Date(date) : date;
  const currentDate: Date = new Date();

  const timeDifference: number = currentDate.getTime() - inputDate.getTime();

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30.44 * day;
  const year = 365.25 * day;

  const minutesDiff: number = Math.floor(timeDifference / minute);
  const hoursDiff: number = Math.floor(timeDifference / hour);
  const daysDiff: number = Math.floor(timeDifference / day);
  const monthsDiff: number = Math.floor(timeDifference / month);
  const yearsDiff: number = Math.floor(timeDifference / year);

  if (yearsDiff > 0) {
    return `${yearsDiff} year${yearsDiff > 1 ? "s" : ""} ago`;
  } else if (monthsDiff > 0) {
    return `${monthsDiff} month${monthsDiff > 1 ? "s" : ""} ago`;
  } else if (daysDiff > 0) {
    return `${daysDiff} day${daysDiff > 1 ? "s" : ""} ago`;
  } else if (hoursDiff > 0) {
    return `${hoursDiff} hour${hoursDiff > 1 ? "s" : ""} ago`;
  } else if (minutesDiff > 0) {
    return `${minutesDiff} minute${minutesDiff > 1 ? "s" : ""} ago`;
  } else {
    return "Just now";
  }
};

// const exampleDate = "2024-01-26T21:02:20.161025";
// const exampleDate = new Date();
// const result: string = getTimeDifference(exampleDate);
// console.log(result);
