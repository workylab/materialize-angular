import { CustomSelectOption } from '../custom-select/custom-select.model';
import { FormField } from '../custom-form/custom-form.model';

export interface CustomAutocomplete extends FormField {
  floatLabel: boolean;
  iconName: string;
  maxLength: number;
  options: Array<CustomSelectOption>;
  placeholder: string;
  value: string;
}
