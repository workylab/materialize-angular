import { CalendarModel, DateLabel, DateModel, DayLabels, MonthLabels, MonthModel } from './calendar.model';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { config } from '../../config';
import { days } from '../../fixtures/calendar-week-days';
import { months } from '../../fixtures/calendar-months';

@Component({
  selector: `${ config.components.prefix }-calendar }`,
  templateUrl: './calendar.component.html'
})
export class CalendarComponent implements OnInit, OnChanges {
  static readonly defaultProps: CalendarModel = {
    className: '',
    date: new Date(),
    displayOtherMonthDays: true
  };

  @ViewChild('yearsContainer', { static: false }) yearsContainerRef: ElementRef;

  @Output('onSelectDay') onSelectDayEmitter: EventEmitter<DateModel>;

  @Input() className: string = CalendarComponent.defaultProps.className;
  @Input() date: Date = CalendarComponent.defaultProps.date;
  @Input() displayOtherMonthDays: boolean = CalendarComponent.defaultProps.displayOtherMonthDays;

  public prefix = config.components.prefix;

  public dayLabels: Array<DateLabel>;
  public monthLabels: Array<DateLabel>;
  public selectedDate: DateModel;
  public selectedMonth: MonthModel;
  public showYears: boolean;
  public weeks: Array<Array<DateModel>>;
  public years: Array<number>;

  public selectYearAnimationDuration = 150;

  constructor() {
    this.scrollToActiveYear = this.scrollToActiveYear.bind(this);

    this.onSelectDayEmitter = new EventEmitter<DateModel>();

    this.dayLabels = this.getDayLabels(days);
    this.monthLabels = this.getMonthLabels(months);
  }

  ngOnInit() {
    this.init();
  }

  ngOnChanges() {
    this.init();
  }

  init() {
    const isToday = this.isTodayDate(this.date);
    const month = this.date.getMonth();
    const year = this.date.getFullYear();

    this.weeks = this.fillWeeks(month, year);
    this.years = this.fillYears(year);

    this.selectedDate = this.createDateModel(this.date, false, isToday);
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

  createDateObject(day: number, month: number, year: number): Date {
    const date = new Date();

    date.setDate(day);
    date.setMonth(month);
    date.setFullYear(year);

    return date;
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
      number: month,
      year: year
    };

    const finalMonthDay = this.createDateObject(0, month, year);
    const weeks = [];

    let initMonthDate = new Date(year, month, 1);
    let day = 0 - initMonthDate.getDay();
    let daysInWeek = [];

    while (initMonthDate.getDay() !== 0 || finalMonthDay >= initMonthDate) {
      ++day;

      initMonthDate = new Date(year, month, day);

      daysInWeek.push(this.createDayDate(initMonthDate, day, finalMonthDay));

      if (daysInWeek.length === 7) {
        weeks.push(daysInWeek);
        daysInWeek = [];
      }
    }

    return weeks;
  }

  isTodayDate(date: Date) {
    const ISOCurrentDate = this.generateISODate(new Date());
    const ISODate = this.generateISODate(date);
    const isToday = (ISODate === ISOCurrentDate);

    return isToday;
  }

  createDayDate(date: Date, dayNumber: number, finalMonthDay: Date): DateModel {
    const isToday = this.isTodayDate(date);
    const isOutOfMonth = (dayNumber <= 0 || date > finalMonthDay);

    return this.createDateModel(date, isOutOfMonth, isToday);
  }

  showPrevMonth() {
    const month = this.selectedMonth.number;
    const year = this.selectedMonth.year;

    const prevMonth = month >= 1
      ? month - 1
      : 11;

    const prevYear = month < 1
      ? year - 1
      : year;

    this.weeks = this.fillWeeks(prevMonth, prevYear);
  }

  showNextMonth() {
    const month = this.selectedMonth.number;
    const year = this.selectedMonth.year;

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
    this.onSelectDayEmitter.emit(this.selectedDate);
  }

  onSelectYear(year: number) {
    setTimeout(() => {
      const day = this.selectedDate.date.getDate();
      const month = this.selectedDate.date.getMonth();

      this.date = this.createDateObject(day, month, year);
      this.showYears = false;
      this.selectedDate = this.createDateModel(this.date, false, true);

      this.weeks = this.fillWeeks(month, year);
    }, this.selectYearAnimationDuration);
  }

  displayYears() {
    this.showYears = true;

    setTimeout(this.scrollToActiveYear, 0);
  }

  scrollToActiveYear() {
    const { nativeElement } = this.yearsContainerRef;
    const activeYear: HTMLElement = nativeElement.querySelector('.selected');

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
