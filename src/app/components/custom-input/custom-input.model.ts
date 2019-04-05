import { CustomFormFieldAbstract } from '../custom-form/custom-form-field.abstract';

export interface CustomInput extends CustomFormFieldAbstract {
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
