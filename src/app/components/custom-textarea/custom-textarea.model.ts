import { FormField } from '../custom-form/custom-form.model';

export interface CustomTextArea extends FormField {
  floatLabel: string;
  hasCounter: boolean;
  iconName: string;
  maxLength: number;
  minLength: number;
  placeholder: string;
  rows: number;
  value: string;
}
