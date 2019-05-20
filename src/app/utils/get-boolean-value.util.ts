export const getBooleanValue = (value: boolean, defaultValue: boolean): boolean => {
  if (typeof value === 'boolean') {
    return value;
  }

  return defaultValue;
};
