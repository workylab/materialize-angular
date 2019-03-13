import { FormField } from '../custom-form/custom-form.model';

export interface ButtonToggle extends FormField {
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




