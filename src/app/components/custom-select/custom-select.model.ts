import { FormField } from "../custom-form/custom-form.model";

export interface CustomSelect extends FormField {
  floatLabel: boolean;
  iconName: string;
  isOpen: boolean;
  options: Array<CustomSelectOption>;
  selectedOption: CustomSelectOption;
  value: string;
}

export interface CustomSelectOption {
  content: string;
  value: string;
}
