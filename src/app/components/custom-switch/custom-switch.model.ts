import { FormField } from "../custom-form/custom-form.model";

export interface CustomSwitch extends FormField {
  iconName: string;
  value: boolean;
}
