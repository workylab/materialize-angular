import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RangeSliderModel, RangeSliderOptionModel } from './range-slider.model';
import { supportedEvents, supportTouchEvents } from '../../utils/get-supported-events.util';
import { getBooleanValue } from '../../utils/get-boolean-value.util';
import { SupportedEventsModel } from '../common/models/supported-events.model';

@Component({
  providers: [{
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RangeSliderComponent)
  }],
  selector: 'materialize-range-slider',
  styleUrls: ['./range-slider.component.scss'],
  templateUrl: './range-slider.component.html'
})
export class RangeSliderComponent implements ControlValueAccessor, OnInit {
  static readonly defaultProps: RangeSliderModel = {
    className: '',
    disabled: false,
    id: null,
    maxValue: 10,
    minValue: 0,
    name: '',
    required: false,
    showTicks: false,
    step: 1,
    value: 5
  };

  @ViewChild('rangeSlider') rangeSlider: ElementRef;
  @ViewChild('sliderIndicatorContainer') sliderIndicatorContainer: ElementRef;
  @ViewChild('sliderTrack') sliderTrack: ElementRef;
  @ViewChild('sliderTrackBackground') sliderTrackBackground: ElementRef;
  @ViewChild('sliderTrackFill') sliderTrackFill: ElementRef;
  @ViewChild('sliderTrackInterval') sliderTrackInterval: ElementRef;

  @Output('onChange') onChangeEmitter: EventEmitter<number>;

  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('id') idInput: string | null;
  @Input('maxValue') maxValueInput: number;
  @Input('minValue') minValueInput: number;
  @Input('name') nameInput: string;
  @Input('options') optionsInput: Array<RangeSliderOptionModel>;
  @Input('required') requiredInput: boolean;
  @Input('showTicks') showTicksInput: boolean;
  @Input('step') stepInput: number;
  @Input('value') valueInput: number;

  public className: string;
  public disabled: boolean;
  public id: string | null;
  public isFocused: boolean;
  public maxValue: number;
  public minValue: number;
  public name: string;
  public options: Array<RangeSliderOptionModel>;
  public required: boolean;
  public showTicks: boolean;
  public step: number;
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
    this.updateTrackByEvent = this.updateTrackByEvent.bind(this);

    this.onChangeEmitter = new EventEmitter();
  }

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = RangeSliderComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.disabled = getBooleanValue(this.disabledInput, defaultProps.disabled);
    this.id = this.idInput || defaultProps.id;
    this.maxValue = this.maxValueInput || defaultProps.maxValue;
    this.minValue = this.minValueInput || defaultProps.minValue;
    this.name = this.nameInput || defaultProps.name;
    this.required = getBooleanValue(this.requiredInput, defaultProps.required);
    this.showTicks = getBooleanValue(this.showTicksInput, defaultProps.showTicks);
    this.step = this.stepInput || defaultProps.step;
    this.value = this.valueInput || defaultProps.value;

    this.options = this.optionsInput || this.fillOptions(this.minValue, this.maxValue);
    this.isFocused = false;

    this.renderTrackInterval();

    this.sliderTrack.nativeElement.addEventListener(this.supportedEvents.down, this.actionDown);

    setTimeout(this.updateTrack, 0);

    window.addEventListener(this.supportedEvents.resize, this.updateTrackByEvent);
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
    if (!this.disabled) {
      const x = this.getXCoordinateByEvent(event);

      this.animateTrack(x, true);
      this.value = this.getValueFromXCoordinate(x);

      window.addEventListener(this.supportedEvents.up, this.actionUp);
      window.addEventListener(this.supportedEvents.move, this.actionMove);
    }
  }

  actionMove(event: any) {
    const x = this.getXCoordinateByEvent(event);

    this.animateTrack(x, false);
    this.value = this.getValueFromXCoordinate(x);
  }

  actionUp() {
    window.removeEventListener(this.supportedEvents.up, this.actionUp);
    window.removeEventListener(this.supportedEvents.move, this.actionMove);

    this.sliderTrackFill.nativeElement.style.transitionDuration = null;
    this.sliderIndicatorContainer.nativeElement.style.transitionDuration = null;
    this.onChangeEmitter.emit(this.value);

    this.onChange(this.value);
    this.updateTrack();
  }

  updateTrackByEvent() {
    const pixelInterval = this.getPixelInterval();
    const x = pixelInterval * this.value;

    this.animateTrack(x, false);
  }

  updateTrack() {
    const pixelInterval = this.getPixelInterval();
    const x = pixelInterval * this.value;

    this.animateTrack(x, true);
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
    const stepPercent = percent * this.step;

    if (this.showTicks) {
      this.sliderTrackInterval.nativeElement.style.backgroundSize = `${ stepPercent }% 1px`;
    }
  }

  animateTrack(x: number, hasAnimation: boolean) {
    this.sliderTrackFill.nativeElement.style.transitionDuration = hasAnimation
      ? null
      : '0ms';
    this.sliderIndicatorContainer.nativeElement.style.transitionDuration = hasAnimation
      ? null
      : '0ms';

    const { offsetWidth } = this.sliderIndicatorContainer.nativeElement;
    const sliderCenterHorizontal = offsetWidth / 2;
    const translate = `translate(${ x - sliderCenterHorizontal }px, -50%)`;

    this.sliderTrackFill.nativeElement.style.width = `${ x }px`;
    this.sliderIndicatorContainer.nativeElement.style.transform = translate;
  }

  onFocus(event: any): void {
    if (!this.disabled) {
      this.isFocused = true;

      this.onTouched();
    }
  }

  onBlur(event: any): void {
    this.isFocused = false;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: number): void {
    this.value = value;
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onChange(value: number): void {}

  onTouched(): void {}
}
