import { InputModel } from '../input/input.model';

export interface DatePickerModel extends InputModel {
  format: string;
  fullSize: boolean;
}
