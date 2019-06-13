import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { RangeSliderModel, RangeSliderOptionModel } from './range-slider.model';
import { supportedEvents, supportTouchEvents } from '../../utils/get-supported-events.util';
import { SupportedEventsModel } from '../common/models/supported-events.model';

@Component({
  selector: 'materialize-range-slider',
  styleUrls: ['./range-slider.component.scss'],
  templateUrl: './range-slider.component.html'
})
export class RangeSliderComponent implements OnInit {
  static readonly defaultProps: RangeSliderModel = {
    className: '',
    maxValue: 10,
    minValue: 0,
    value: 5
  };

  @ViewChild('rangeSlider') rangeSlider: ElementRef;
  @ViewChild('sliderIndicatorContainer') sliderIndicatorContainer: ElementRef;
  @ViewChild('sliderTrack') sliderTrack: ElementRef;
  @ViewChild('sliderTrackBackground') sliderTrackBackground: ElementRef;
  @ViewChild('sliderTrackFill') sliderTrackFill: ElementRef;
  @ViewChild('sliderTrackInterval') sliderTrackInterval: ElementRef;

  @Output() onChange: EventEmitter<number>;

  @Input('maxValue') maxValueInput: number;
  @Input('minValue') minValueInput: number;
  @Input('value') valueInput: number;
  @Input('options') optionsInput: Array<RangeSliderOptionModel>;

  public isFocused: boolean;
  public maxValue: number;
  public minValue: number;
  public options: Array<RangeSliderOptionModel>;
  public supportTouchEvents: boolean;
  public supportedEvents: SupportedEventsModel;
  public value: number;

  constructor() {
    this.supportTouchEvents = supportTouchEvents();
    this.supportedEvents = supportedEvents();

    this.actionDown = this.actionDown.bind(this);
    this.actionMove = this.actionMove.bind(this);
    this.actionUp = this.actionUp.bind(this);
    this.updateTrack = this.updateTrack.bind(this);

    this.onChange = new EventEmitter();
    this.isFocused = false;
  }

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = RangeSliderComponent;

    this.maxValue = this.maxValueInput || defaultProps.maxValue;
    this.minValue = this.minValueInput || defaultProps.minValue;
    this.value = this.valueInput || defaultProps.value;
    this.options = this.optionsInput || this.fillOptions(this.minValue, this.maxValue);
    this.sliderTrack.nativeElement.addEventListener(this.supportedEvents.down, this.actionDown);

    this.updateTrack();
    this.renderTrackInterval();

    window.addEventListener(this.supportedEvents.resize, this.updateTrack);
  }

  fillOptions(minValue: number, maxValue: number): Array<RangeSliderOptionModel> {
    const options: Array<RangeSliderOptionModel> = [];

    for (let i = minValue; i <= maxValue; i++) {
      options.push({
        label: i.toString(),
        value: i
      });
    }

    return options;
  }

  actionDown(event: any) {
    if (!this.supportTouchEvents) {
      event.preventDefault();
    }

    this.isFocused = true;

    const x = this.getXCoordinateByEvent(event);

    this.animateTrack(x);
    this.value = this.getValueFromXCoordinate(x);

    window.addEventListener(this.supportedEvents.up, this.actionUp);
    window.addEventListener(this.supportedEvents.move, this.actionMove);
  }

  actionMove(event: any) {
    this.sliderIndicatorContainer.nativeElement.style.transitionDuration = '0ms';
    this.sliderTrackFill.nativeElement.style.transitionDuration = '0ms';

    const x = this.getXCoordinateByEvent(event);

    this.animateTrack(x);
    this.value = this.getValueFromXCoordinate(x);
  }

  actionUp() {
    window.removeEventListener(this.supportedEvents.up, this.actionUp);
    window.removeEventListener(this.supportedEvents.move, this.actionMove);

    this.isFocused = false;
    this.sliderTrackFill.nativeElement.style.transitionDuration = null;
    this.sliderIndicatorContainer.nativeElement.style.transitionDuration = null;
    this.onChange.emit(this.value);

    this.updateTrack();
  }

  updateTrack() {
    const pixelInterval = this.getPixelInterval();
    const x = pixelInterval * this.value;

    this.animateTrack(x);
  }

  getValueFromXCoordinate(x: number) {
    const pixelInterval = this.getPixelInterval();
    const value = x / pixelInterval;

    return Math.round(value);
  }

  getXCoordinateByEvent(event: any): number {
    const rect = this.sliderTrack.nativeElement.getBoundingClientRect();

    const x = this.supportTouchEvents
      ? event.touches[0].clientX - rect.left
      : event.clientX - rect.left;

    if (x < 0) {
      return 0;
    }

    if (x > this.sliderTrack.nativeElement.offsetWidth) {
      return this.sliderTrack.nativeElement.offsetWidth;
    }

    return x;
  }

  getPixelInterval() {
    const difference = this.options
      ? this.options.length - 1
      : this.maxValue - this.minValue;
    const pixelInterval = this.sliderTrack.nativeElement.offsetWidth / difference;

    return pixelInterval;
  }

  renderTrackInterval() {
    const percent = 100 / (this.options.length - 1);

    this.sliderTrackInterval.nativeElement.style.backgroundSize = `${ percent }% 2px`;
  }

  animateTrack(x: number) {
    const { offsetWidth } = this.sliderIndicatorContainer.nativeElement;
    const sliderCenterHorizontal = offsetWidth / 2;
    const translate = `translate(${ x - sliderCenterHorizontal }px, -50%)`;

    this.sliderTrackFill.nativeElement.style.width = `${ x }px`;
    this.sliderIndicatorContainer.nativeElement.style.transform = translate;
  }
}
