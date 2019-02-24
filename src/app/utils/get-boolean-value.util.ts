import { isBoolean } from './is-boolean.util';

export const getBooleanValue = (value: boolean, defaultValue: boolean): boolean => {
  if (isBoolean(value)) {
    return value;
  }

  return defaultValue;
};
