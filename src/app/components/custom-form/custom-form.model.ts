export interface FormField {
  className: string;
  disabled: boolean;
  isFocused: boolean;
  isTouched: boolean;
  isValid: boolean;
  label: string;
  name: string;
  required: boolean;
  value: string | boolean | number | Array<string> | { [key: string]: boolean; };
}
