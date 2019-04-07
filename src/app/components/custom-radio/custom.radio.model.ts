import { CustomFormFieldAbstract } from '../custom-form/custom-form-field.abstract';

export interface CustomRadio {
  canUncheck: boolean;
  className: string;
  disabled: boolean;
  errorMessage: string;
  id: string;
  label: string;
  name: string;
  options: Array<CustomRadioOption>;
  required: boolean;
  value: string;
}

export interface CustomRadioOption {
  content: string;
  value: string;
}
