import { SelectOptionModel } from '../select/select.model';
import { InputModel } from '../input/input.model';

export interface AutocompleteModel extends InputModel {
  isMatchValue: boolean;
  options: Array<SelectOptionModel>;
}
