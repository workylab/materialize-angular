import { FormField } from '../custom-form/custom-form.model';

export interface CustomRadio extends FormField {
  iconName: string;
  options: Array<CustomRadioOption>;
  selectedOption: CustomRadioOption;
  value: string;
}

export interface CustomRadioOption {
  content: string;
  value: string;
}
