import { InputModel } from '../../completed-components/input/input.model';

export interface DatePickerModel extends InputModel {
  date: Date;
  format: string;
  fullSize: boolean;
}
