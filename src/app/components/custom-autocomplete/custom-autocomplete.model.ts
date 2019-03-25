import { CustomSelectOption } from '../custom-select/custom-select.model';
import { CustomInput } from '../custom-input/custom-input.model';

export interface CustomAutocomplete extends CustomInput {
  isMatchValue: boolean;
  options: Array<CustomSelectOption>;
}
