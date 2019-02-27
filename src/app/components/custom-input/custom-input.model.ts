import { FormField } from "../custom-form/custom-form.model";

export interface CustomInput extends FormField {
  autocomplete: string;
  floatLabel: boolean;
  iconName: string;
  maxLength: number;
  placeholder: string;
  type: string;
  value: string;
}
