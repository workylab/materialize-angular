export const generateUid = (): string => {
  const currentDate = new Date();
  const currentDateMs = currentDate.valueOf();
  const min = 0;
  const max = 100;
  const random = (Math.random() * max) + min;
  const integerRandom = Math.floor(random);

  return currentDateMs.toString() + integerRandom.toString();
};
