import { Component, EventEmitter, Output } from '@angular/core';
import { CustomCalendarDay } from './custom-calendar.model';
import monthsJSON from '../../fixtures/calendar-months';
import weekDaysJSON from '../../fixtures/calendar-week-days';

@Component({
  selector: 'custom-calendar',
  templateUrl: './custom-calendar.component.html'
})
export class CustomCalendarComponent {
  @Output('onSelectDay') onSelectDayEmmiter: EventEmitter<CustomCalendarDay>;
  @Output('onBlur') onBlurEmitter: EventEmitter<void>;

  public currentMonth: string;
  public currentYear: number;
  public weekDays: Array<string>;
  public selectedDay: CustomCalendarDay;
  public weeks: Array<Array<CustomCalendarDay>>
  public date: Date;
  public months: Array<string>;

  constructor() {
    this.showNextMonth = this.showNextMonth.bind(this);
    this.showPrevMonth = this.showPrevMonth.bind(this);

    this.onSelectDayEmmiter = new EventEmitter();
    this.onBlurEmitter = new EventEmitter();

    this.date = new Date();
    this.weekDays = this.getWeekDays();
    this.months = this.getMonths();

    const month = this.date.getMonth();
    const year = this.date.getFullYear();

    this.weeks = this.generateWeeks(month, year);
  }

  getWeekDays(): Array<string> {
    const weekDays: Array<string> = [
      weekDaysJSON.sunday,
      weekDaysJSON.monday,
      weekDaysJSON.tuesday,
      weekDaysJSON.wednesday,
      weekDaysJSON.thursday,
      weekDaysJSON.friday,
      weekDaysJSON.saturday
    ];

    return weekDays;
  }

  getMonths(): Array<string> {
    const months: Array<string> = [
      monthsJSON.january,
      monthsJSON.february,
      monthsJSON.march,
      monthsJSON.april,
      monthsJSON.may,
      monthsJSON.june,
      monthsJSON.july,
      monthsJSON.august,
      monthsJSON.september,
      monthsJSON.october,
      monthsJSON.november,
      monthsJSON.december
    ];

    return months;
  }

  generateWeeks(month: number, year: number) {
    this.currentMonth = this.months[month];
    this.currentYear = year;

    this.date = new Date(year, month + 1, 0);

    let currentDate = new Date(year, month, 1);
    let currentDayNumber = (0 - currentDate.getDay());
    let currentWeek = [];

    const weeks = [];

    while (!(currentDate.getDay() === 0 && Number(this.date) < Number(currentDate))) {
      currentDayNumber = currentDayNumber + 1;

      if (currentDate.getDay() === 6) {
        if (currentWeek.length > 0) {
          weeks.push(currentWeek);
        }

        currentWeek = [];
      }

      currentDate = new Date(year, month, currentDayNumber);
      currentWeek.push(this.createDay(currentDate, currentDayNumber));
    }

    return weeks;
  }

  createDay(date: Date, currentDayNumber: number): CustomCalendarDay {
    const isOutOfMonth = (currentDayNumber <= 0 || Number(date) > Number(this.date));
    const isoDate = this.generateIsoDate(date);
    const isoCurrentDate = this.generateIsoDate(new Date());

    const day: CustomCalendarDay = {
      dayNumber: date.getDate(),
      isCurrent: isoDate === isoCurrentDate,
      isOutOfMonth: isOutOfMonth,
      isoDate: isoDate
    };

    if (isoDate === isoCurrentDate) {
      this.selectedDay = day;
    }

    return day;
  }

  showPrevMonth() {
    const month = this.date.getMonth();

    if (month === 0) {
      const prevMonth = 11;
      const previuosYear = this.date.getFullYear() - 1;

      this.weeks = this.generateWeeks(prevMonth, previuosYear);
    } else {
      const prevMonth = month - 1;
      const year = this.date.getFullYear();

      this.weeks = this.generateWeeks(prevMonth, year);
    }
  }

  showNextMonth() {
    const month = this.date.getMonth();

    if (month === 11) {
      const nextYear = this.date.getFullYear() + 1;
      const nextMonth = 0;

      this.weeks = this.generateWeeks(nextMonth, nextYear);
    } else {
      const year = this.date.getFullYear();
      const nextMonth = month + 1;

      this.weeks = this.generateWeeks(nextMonth, year);
    }
  }

  generateIsoDate(date: Date) {
    const day = date.getDate() > 9
      ? date.getDate()
      : `0${ date.getDate() }`;
    const month = date.getMonth() + 1 > 9
      ? date.getMonth() + 1
      : `0${ date.getMonth() + 1 }`;
    const year = date.getFullYear();
    const isoDate = `${ year }-${ month }-${ day }`;

    return isoDate;
  }

  onSelectDay(day: CustomCalendarDay) {
    if (day.isOutOfMonth) {
      return;
    }

    this.selectedDay = day;
    this.onSelectDayEmmiter.emit(day);
  }

  onBlur(event: any) {
    this.onBlurEmitter.emit(event);
  }
}
