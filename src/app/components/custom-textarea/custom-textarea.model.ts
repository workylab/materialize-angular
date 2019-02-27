import { FormField } from '../custom-form/custom-form.model';

export interface CustomTextArea extends FormField {
  floatLabel: boolean;
  iconName: string;
  maxLength: number;
  minLength: number;
  placeholder: string;
  value: string;
}
