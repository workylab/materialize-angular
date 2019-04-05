import { CustomFormFieldAbstract } from '../custom-form/custom-form-field.abstract';

export interface CustomDatePicker extends CustomFormFieldAbstract {
  floatLabel: boolean;
  iconName: string;
  value: string;
}
