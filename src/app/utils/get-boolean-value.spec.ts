import { getBooleanValue } from './get-boolean-value.util';

it('should return default value when value is not boolean', () => {
  const defaultValue = false;

  expect(getBooleanValue(null, defaultValue)).toEqual(defaultValue);
  expect(getBooleanValue(undefined, defaultValue)).toEqual(defaultValue);
});

it('should return the value when value is boolean', () => {
  expect(getBooleanValue(true, null)).toEqual(true);
  expect(getBooleanValue(false, null)).toEqual(false);
});
