export const generateUid = (): string => {
  const currentDate = new Date();
  const currentDateMs = currentDate.valueOf();

  return currentDateMs.toString();
};
