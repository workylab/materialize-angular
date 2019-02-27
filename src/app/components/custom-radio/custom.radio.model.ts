import { FormField } from '../custom-form/custom-form.model';

export interface CustomRadio extends FormField {
  options: Array<CustomRadioOption>;
  value: string;
}

export interface CustomRadioOption {
  content: string;
  value: string;
}
