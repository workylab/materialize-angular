import { CustomFormFieldAbstract } from '../custom-form/custom-form-field.abstract';

export interface ButtonToggle extends CustomFormFieldAbstract {
  className: string;
  disabled: boolean;
  items: Array<ButtonToggleItem>;
  isFocused: boolean;
  isTouched: boolean;
  isMultiple: boolean;
  name: string;
  value: {
    [key: string]: string;
  };
}

export interface ButtonToggleItem {
  content: string;
  disabled: boolean;
  iconName: string;
  name: string;
  value: string;
}
