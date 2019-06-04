export interface CalendarModel {
  displayOtherMonthDays: boolean;
}

export interface CalendarDayModel {
  numberInMonth: number;
  isCurrent: boolean;
  isOutOfMonth: boolean;
  ISODate: string;
}

export interface DayModel {
  name: string;
  shortName: string;
  shortestName: string;
}

export interface MonthModel {
  name: string;
  shortName: string;
}

export interface DateModel {
  day: number;
  month: number;
  year: number;
}
