import { CustomFormFieldAbstract } from '../custom-form/custom-form-field.abstract';

export interface CustomTextArea extends CustomFormFieldAbstract {
  floatLabel: string;
  hasCounter: boolean;
  iconName: string;
  maxLength: number;
  minLength: number;
  placeholder: string;
  rows: number;
  value: string;
}
