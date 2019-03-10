import { FormField } from '../custom-form/custom-form.model';

export interface CustomCheckboxList extends FormField {
  checkAllLabel: string;
  errorMessage: string;
  iconName: string;
  items: Array<CustomCheckboxListItem>;
  name: string;
  required: boolean;
  value: {
    [key: string]: boolean;
  };
}

export interface CustomCheckboxListItem {
  disabled?: boolean;
  label: string;
  name: string;
  value: boolean;
}
