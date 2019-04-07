import { CustomFormFieldAbstract } from '../custom-form/custom-form-field.abstract';

export interface CustomRadio extends CustomFormFieldAbstract {
  canUncheck: boolean;
  iconName: string;
  options: Array<CustomRadioOption>;
  value: string;
}

export interface CustomRadioOption {
  content: string;
  value: string;
}
