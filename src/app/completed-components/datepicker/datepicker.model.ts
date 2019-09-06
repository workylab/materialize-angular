import { InputModel } from '../input/input.model';
import { CalendarModel } from '../calendar/calendar.model';

export interface DatePickerModel extends InputModel, CalendarModel {
  date: Date;
  format: string;
  fullSize: boolean;
}
