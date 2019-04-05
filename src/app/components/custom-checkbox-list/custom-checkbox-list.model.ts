import { CustomFormFieldAbstract } from '../custom-form/custom-form-field.abstract';

export interface CustomCheckboxList extends CustomFormFieldAbstract {
  checkAllLabel: string;  
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
