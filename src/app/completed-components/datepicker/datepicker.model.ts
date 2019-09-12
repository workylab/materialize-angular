import { CalendarModel } from '../calendar/calendar.model';
import { InputModel } from '../input/input.model';

export interface DatePickerModel extends InputModel, CalendarModel {
  date: Date;
  format: string;
  fullSize: boolean;
}
