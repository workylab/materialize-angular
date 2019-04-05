import { CustomFormFieldAbstract } from '../custom-form/custom-form-field.abstract';

export interface CustomSelect extends CustomFormFieldAbstract {
  floatLabel: string;
  iconName: string;
  options: Array<CustomSelectOption>;
  selectedOption: CustomSelectOption;
  value: string;
}

export interface CustomSelectOption {
  content: string;
  value: string;
}
