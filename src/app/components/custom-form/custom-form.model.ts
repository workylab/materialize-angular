import { File } from '../custom-input-file/custom-input-file.model';

export interface FormField {
  className: string;
  disabled: boolean;
  id: string;
  isFocused: boolean;
  isTouched: boolean;
  isValid: boolean;
  label: string;
  name: string;
  required: boolean;
  value: string | boolean | number | Array<File> | { [key: string]: boolean | string; };
}
