export interface CustomCheckboxList {
  checkAllLabel: string;
  className: string;
  disabled: boolean;
  errorMessage: string;
  id: string;
  items: Array<CustomCheckboxListItem>;
  label: string;
  name: string;
  required: boolean;
  value: CustomCheckboxListValue;
}

export interface CustomCheckboxListValue {
  [key: string]: boolean;
}

export interface CustomCheckboxListItem {
  disabled?: boolean;
  label: string;
  name: string;
  value: boolean;
}
