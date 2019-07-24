export interface InputModel {
  autocomplete: string;
  className: string;
  disabled: boolean;
  floatLabel: string;
  id: string | null;
  hasCounter: boolean;
  name: string;
  maxLength: number;
  placeholder: string;
  required: boolean;
  type: INPUT_TYPE;
  value: string;
}

export enum INPUT_TYPE {
  PASSWORD = 'password',
  TEXT = 'text'
}
