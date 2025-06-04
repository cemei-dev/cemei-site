export const generateYearOptions = (startYear: number, count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const year = startYear + i;
    return { value: year.toString(), label: year.toString() };
  });
};
