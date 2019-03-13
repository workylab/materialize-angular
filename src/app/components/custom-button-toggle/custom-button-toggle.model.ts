import { FormField } from '../custom-form/custom-form.model';

export interface ButtonToggle extends FormField {
  className: string;
  disabled: boolean;
  items: Array<ButtonToggleItem>;
  isFocused: boolean;
  isTouched: boolean;
  isMultiple: boolean;
  name: string;
  value: Array<string>;
}
export interface ButtonToggleItem {
  content: string;
  disabled: boolean;
  iconName: string;
  value: string;
}




