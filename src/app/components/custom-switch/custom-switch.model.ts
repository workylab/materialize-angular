import { CustomFormFieldAbstract } from '../custom-form/custom-form-field.abstract';

export interface CustomSwitch extends CustomFormFieldAbstract {
  iconName: string;
  value: boolean;
}
