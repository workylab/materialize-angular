import { CalendarDayModel, CalendarModel, DayModel, MonthModel } from './calendar.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { days } from '../../fixtures/calendar-week-days';
import { months } from '../../fixtures/calendar-months';

@Component({
  selector: 'materialize-calendar',
  styleUrls: ['./calendar.component.scss'],
  templateUrl: './calendar.component.html'
})
export class CalendarComponent implements OnInit {
  static readonly defaultProps: CalendarModel = {
    displayOtherMonthDays: true
  };

  @Output('onSelectDay') onSelectDayEmmiter: EventEmitter<CalendarDayModel>;
  @Output('onBlur') onBlurEmitter: EventEmitter<void>;

  @Input('displayOtherMonthDays') displayOtherMonthDaysInput: boolean;

  public currentMonthLabel: MonthModel;
  public currentYearLabel: number;
  public date: Date;
  public dayLabels: Array<DayModel>;
  public displayOtherMonthDays: boolean;
  public monthLabels: Array<MonthModel>;
  public selectedISODate: string;
  public weeks: Array<Array<CalendarDayModel>>

  constructor() {
    this.onSelectDayEmmiter = new EventEmitter();
    this.onBlurEmitter = new EventEmitter();

    this.date = new Date();

    this.dayLabels = days;
    this.monthLabels = months;
  }

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = CalendarComponent;

    const month = this.date.getMonth();
    const year = this.date.getFullYear();

    this.currentMonthLabel = this.monthLabels[month];
    this.currentYearLabel = year;
    this.weeks = this.fillWeeks(month, year);

    this.displayOtherMonthDays = this.displayOtherMonthDaysInput || defaultProps.displayOtherMonthDays;
  }

  fillWeeks(month: number, year: number) {
    this.currentMonthLabel = this.monthLabels[month];
    this.currentYearLabel = year;

    this.date = new Date(year, month + 1, 0);

    let initDate = new Date(year, month, 1);
    let day = (0 - initDate.getDay());
    let daysInWeek = [];

    const weeks = [];

    while (initDate.getDay() !== 0 || Number(this.date) >= Number(initDate)) {
      ++day;

      initDate = new Date(year, month, day);
      daysInWeek.push(this.createDay(initDate, day));

      if (daysInWeek.length === 7) {
        weeks.push(daysInWeek);
        daysInWeek = [];
      }
    }

    return weeks;
  }

  createDay(date: Date, dayNumber: number): CalendarDayModel {
    const isOutOfMonth = (dayNumber <= 0 || Number(date) > Number(this.date));
    const ISODate = this.generateISODate(date);
    const ISOCurrentDate = this.generateISODate(new Date());

    const day: CalendarDayModel = {
      ISODate: ISODate,
      isCurrent: ISODate === ISOCurrentDate,
      isOutOfMonth: isOutOfMonth,
      numberInMonth: date.getDate()
    };

    return day;
  }

  showPrevMonth() {
    const month = this.date.getMonth();
    const year = this.date.getFullYear();

    const prevMonth = month >= 1
      ? month - 1
      : 11;

    const prevYear = month < 1
      ? year - 1
      : year;

    this.weeks = this.fillWeeks(prevMonth, prevYear);
  }

  showNextMonth() {
    const month = this.date.getMonth();
    const year = this.date.getFullYear();

    const nextMonth = month < 11
      ? month + 1
      : 0;

    const nextYear = month >= 11
      ? year + 1
      : year;

    this.weeks = this.fillWeeks(nextMonth, nextYear);
  }

  generateISODate(date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const dayString = day > 9
      ? day
      : `0${ day }`;

    const monthString = month > 9
      ? month
      : `0${ month }`;

    return `${ year }-${ monthString }-${ dayString }`;
  }

  onSelectDay(day: CalendarDayModel) {
    if (day.isOutOfMonth) {
      return;
    }

    this.selectedISODate = day.ISODate;
    this.onSelectDayEmmiter.emit(day);
  }

  onBlur(event: any) {
    this.onBlurEmitter.emit(event);
  }
}
