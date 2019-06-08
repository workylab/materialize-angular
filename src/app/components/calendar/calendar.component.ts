import { CalendarModel, DateLabel, DateModel, DayLabels, MonthLabels, MonthModel } from './calendar.model';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { days } from '../../fixtures/calendar-week-days';
import { getBooleanValue } from '../../utils/get-boolean-value.util';
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

  @ViewChild('yearsContainer') yearsContainerRef: ElementRef;

  @Output('onSelectDay') onSelectDayEmmiter: EventEmitter<DateModel>;
  @Output('onBlur') onBlurEmitter: EventEmitter<void>;

  @Input('displayOtherMonthDays') displayOtherMonthDaysInput: boolean;

  public displayOtherMonthDays: boolean;
  public date: Date;
  public dayLabels: Array<DateLabel>;
  public monthLabels: Array<DateLabel>;
  public selectedDate: DateModel;
  public selectedMonth: MonthModel;
  public showYears: boolean;
  public weeks: Array<Array<DateModel>>
  public years: Array<number>;

  public selectYearAnimationDuration = 200;

  constructor() {
    this.scrollToActiveYear = this.scrollToActiveYear.bind(this);

    this.onSelectDayEmmiter = new EventEmitter();
    this.onBlurEmitter = new EventEmitter();

    this.dayLabels = this.getDayLabels(days);
    this.monthLabels = this.getMonthLabels(months);
  }

  ngOnInit() {
    this.initValues();
  }

  getDayLabels(dayLabels: DayLabels): Array<DateLabel> {
    return [
      dayLabels.sunday,
      dayLabels.monday,
      dayLabels.tuesday,
      dayLabels.wednesday,
      dayLabels.thursday,
      dayLabels.friday,
      dayLabels.saturday
    ];
  }

  getMonthLabels(monthLabels: MonthLabels): Array<DateLabel> {
    return [
      monthLabels.january,
      monthLabels.february,
      monthLabels.march,
      monthLabels.april,
      monthLabels.may,
      monthLabels.june,
      monthLabels.july,
      monthLabels.august,
      monthLabels.september,
      monthLabels.october,
      monthLabels.november,
      monthLabels.december
    ];
  }

  initValues() {
    const { defaultProps } = CalendarComponent;

    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();

    this.date = date;
    this.displayOtherMonthDays = getBooleanValue(this.displayOtherMonthDaysInput, defaultProps.displayOtherMonthDays);

    this.selectedDate = this.createDateModel(this.date, false, true);
    this.weeks = this.fillWeeks(month, year);
    this.years = this.fillYears(year);
  }

  createDateModel(date: Date, isOutOfMonth: boolean, isToday: boolean): DateModel {
    const weekDay = date.getDay();
    const month = date.getMonth();

    const dateModel: DateModel = {
      ISODate: this.generateISODate(date),
      date: date,
      dayLabel: this.dayLabels[weekDay],
      isOutOfMonth: isOutOfMonth,
      isToday: isToday,
      monthLabel: this.monthLabels[month]
    };

    return dateModel;
  }

  fillYears(currentYear: number): Array<number> {
    const firstYear = currentYear - 100;
    const lastYear = currentYear + 100;
    const years = [];

    for (let i = firstYear; i <= lastYear; i++) {
      years.push(i);
    }

    return years;
  }

  fillWeeks(month: number, year: number) {
    this.selectedMonth = {
      label: this.monthLabels[month],
      year: year
    };

    this.date = new Date(year, month + 1, 0);

    let initDate = new Date(year, month, 1);
    let day = (0 - initDate.getDay());
    let daysInWeek = [];

    const weeks = [];

    while (initDate.getDay() !== 0 || Number(this.date) >= Number(initDate)) {
      ++day;

      initDate = new Date(year, month, day);

      daysInWeek.push(this.createDayDate(initDate, day));

      if (daysInWeek.length === 7) {
        weeks.push(daysInWeek);
        daysInWeek = [];
      }
    }

    return weeks;
  }

  createDayDate(date: Date, dayNumber: number): DateModel {
    const ISODate = this.generateISODate(date);
    const ISOCurrentDate = this.generateISODate(new Date());

    const isOutOfMonth = (dayNumber <= 0 || date > this.date);
    const isToday = (ISODate === ISOCurrentDate);

    return this.createDateModel(date, isOutOfMonth, isToday);
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

  onSelectDay(date: DateModel) {
    if (date.isOutOfMonth) {
      return;
    }

    this.selectedDate = date;
    this.onSelectDayEmmiter.emit(this.selectedDate);
  }

  onSelectYear(year: number) {
    setTimeout(() => {
      const day = this.selectedDate.date.getDate();
      const month = this.selectedDate.date.getMonth();

      this.date = new Date(year, month, day);

      this.showYears = false;
      this.selectedDate = this.createDateModel(this.date, false, true);

      this.weeks = this.fillWeeks(month, year);
    }, this.selectYearAnimationDuration);
  }

  onBlur(event: any) {
    this.onBlurEmitter.emit(event);
  }

  displayYears() {
    this.showYears = true;

    setTimeout(this.scrollToActiveYear, 0);
  }

  scrollToActiveYear() {
    const { nativeElement } = this.yearsContainerRef;
    const activeYear: HTMLElement = nativeElement.querySelector('.current');

    if (activeYear) {
      const top = this.getScrollCenter(nativeElement, activeYear);

      nativeElement.scrollTop = top;
    }
  }

  getScrollCenter(container: HTMLElement, internalElement: HTMLElement): number {
    const yearTop = internalElement.offsetTop;
    const yearMiddleHeight = internalElement.offsetHeight / 2;

    const containerTop = container.offsetTop;
    const containerMiddleHeight = container.offsetHeight / 2;

    const elementRelativeTop = (yearTop - containerTop) - (containerMiddleHeight - yearMiddleHeight);

    if (elementRelativeTop < 0) {
      return 0;
    }

    return elementRelativeTop;
  }
}
