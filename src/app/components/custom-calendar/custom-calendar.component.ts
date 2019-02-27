import { Component } from '@angular/core';

interface Day {
  dayNumber: number;
  isCurrent: boolean;
  isOutOfMonth: boolean;
  isoDate: string;
}

@Component({
  selector: 'custom-calendar',
  templateUrl: './custom-calendar.component.html'
})
export class CustomCalendarComponent {
  public days: Array<string>;
  public selectedDay: Day;
  public weeks: Array<Array<Day>>
  public date: Date;

  constructor() {
    this.showPrevMonth = this.showPrevMonth.bind(this);
    this.showNextMonth = this.showNextMonth.bind(this);

    this.date = new Date();
    this.days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    const month = this.date.getMonth();
    const year = this.date.getFullYear();

    this.weeks = this.generateWeeks(month, year);
  }

  generateWeeks(month: number, year: number) {
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

  createDay(date: Date, currentDayNumber: number): Day {
    const isOutOfMonth = (currentDayNumber <= 0 || Number(date) > Number(this.date));
    const isoDate = this.generateIsoDate(date);
    const isoCurrentDate = this.generateIsoDate(new Date());

    const day: Day = {
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
    const year = this.date.getFullYear();
    const prevMonth = month - 1;

    this.weeks = this.generateWeeks(prevMonth, year);
  }

  showNextMonth() {
    const month = this.date.getMonth();
    const year = this.date.getFullYear();
    const nextMonth = month + 1;

    this.weeks = this.generateWeeks(nextMonth, year);
  }

  generateIsoDate(date: Date) {
    const day = date.getDate() > 9
      ? date.getDate()
      : `0${ date.getDate() }`;
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const isoDate = `${ year }-${ month }-${ day }`;

    return isoDate;
  }

  selectDay(day: Day) {
    if (day.isOutOfMonth) {
      return;
    }

    this.selectedDay.isCurrent = false;
    this.selectedDay = day;
    this.selectedDay.isCurrent = true;
  }
}
