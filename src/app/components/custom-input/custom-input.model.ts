import { FormField } from "../custom-form/custom-form.model";

export interface CustomInput extends FormField {
  autocomplete: string;
  floatLabel: string;
  hasCounter: boolean;
  iconName: string;
  maxLength: number;
  patternName: string;
  placeholder: string;
  textAlign: 'left' | 'right';
  type: string;
  validateOnBlur: boolean;
  validateOnChange: boolean;
  value: string;
}
