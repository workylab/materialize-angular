export interface CustomInput {
  autocomplete: string;
  className: string;
  disabled: boolean;
  errorMessage: string;
  floatLabel: string;
  id: string;
  hasCounter: boolean;
  label: string;
  name: string;
  maxLength: number;
  patternName: string;
  placeholder: string;
  required: boolean;
  textAlign: 'left' | 'right';
  type: string;
  validateOnBlur: boolean;
  validateOnChange: boolean;
  value: string;
}
