import { CustomSelectOption } from '../custom-select/custom-select.model';
import { FormField } from '../custom-form/custom-form.model';

export interface CustomAutocomplete extends FormField {
  className: string;
  errorMessage: string;
  floatLabel: boolean;
  iconName: string;
  isMatchValue: boolean;
  maxLength: number;
  options: Array<CustomSelectOption>;
  placeholder: string;
  required: boolean;
  value: string;
}
