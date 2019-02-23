export const generateUid = () => {
  const currentDate = new Date();
  const currentDateMs = currentDate.valueOf();

  return currentDateMs.toString();
};
