/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

export interface CalendarModel {
  className: string;
  date: Date;
  displayOtherMonthDays: boolean;
}

export interface DateModel {
  date: Date;
  dayLabel: DateLabel;
  ISODate: string;
  isToday: boolean;
  isOutOfMonth: boolean;
  monthLabel: DateLabel;
  showSelected: boolean;
}

export interface MonthModel {
  label: DateLabel;
  number: number;
  year: number;
}

export interface DateLabel {
  name: string;
  shortName: string;
  shortestName: string;
}

export interface DayLabels {
  sunday: DateLabel;
  monday: DateLabel;
  tuesday: DateLabel;
  wednesday: DateLabel;
  thursday: DateLabel;
  friday: DateLabel;
  saturday: DateLabel;
}

export interface MonthLabels {
  january: DateLabel;
  february: DateLabel;
  march: DateLabel;
  april: DateLabel;
  may: DateLabel;
  june: DateLabel;
  july: DateLabel;
  august: DateLabel;
  september: DateLabel;
  october: DateLabel;
  november: DateLabel;
  december: DateLabel;
}
