export interface CustomSelect {
  className: string;
  disabled: boolean;
  errorMessage: string;
  floatLabel: string;
  id: string;
  label: string;
  name: string;
  options: Array<CustomSelectOption>;
  required: boolean;
  selectedOption: CustomSelectOption;
  value: string;
}

export interface CustomSelectOption {
  content: string;
  value: string;
}
