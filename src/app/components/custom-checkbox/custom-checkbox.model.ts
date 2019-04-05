import { CustomFormFieldAbstract } from '../custom-form/custom-form-field.abstract';

export interface CustomCheckbox extends CustomFormFieldAbstract {
  iconName: string;
  indeterminate: boolean;
  value: boolean;
}
