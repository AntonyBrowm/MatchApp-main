export const getFormatDateYYYYMMDD = (
  targetDate: Date = new Date()
): string => {
  const month = targetDate.getMonth();
  const day = targetDate.getDate();
  return `${targetDate.getFullYear()}/${
    month < 9 ? '0' + (month + 1) : month + 1
  }/${day < 9 ? '0' + day : day}`;
};

export const yearsToMilliseconds = (years: number): number => {
  const days = years * 365;
  const millisecondsInADay = 24 * 3600 * 1000;
  return days * millisecondsInADay;
};

export const sleep = (milliseconds: number): Promise<void> =>
  new Promise((res) => {
    setTimeout(() => {
      res();
    }, milliseconds);
  });
