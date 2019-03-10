export const cloneObject = (object: any): any => {
  const objectString = JSON.stringify(object);
  const parsedString = JSON.parse(objectString);

  return parsedString;
};
