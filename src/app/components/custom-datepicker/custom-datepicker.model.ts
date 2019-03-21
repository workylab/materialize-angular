import { FormField } from '../custom-form/custom-form.model';

export interface CustomDatePicker extends FormField {
  floatLabel: boolean;
  iconName: string;
  value: string;
}
