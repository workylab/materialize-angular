export const cloneObject = (object: Array<any> | { [key: string]: any }): any => {
  if (typeof object === 'undefined') {
    return null;
  }

  const objectString = JSON.stringify(object);
  const parsedString = JSON.parse(objectString);

  return parsedString;
};
