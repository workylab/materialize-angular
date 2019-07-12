import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { supportedEvents, supportTouchEvents } from '../../utils/get-supported-events.util';
import { getBooleanValue } from '../../utils/get-boolean-value.util';
import { SliderModel } from './slider.model';
import { SliderOptionComponent } from '../slider-option/slider-option.component';
import { SupportedEventsModel } from '../common/models/supported-events.model';

@Component({
  providers: [{
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SliderComponent)
  }],
  selector: 'materialize-slider',
  styleUrls: ['./slider.component.scss'],
  templateUrl: './slider.component.html'
})
export class SliderComponent implements AfterContentInit, ControlValueAccessor, OnInit {
  static readonly tickClassName = 'slider-tick-interval';

  static readonly defaultProps: SliderModel = {
    className: '',
    disabled: false,
    labelsPosition: 'bottom',
    required: false,
    showLabels: true,
    showTicks: true,
    value: ''
  };

  @ContentChildren(SliderOptionComponent) options: QueryList<SliderOptionComponent>;

  @ViewChild('Slider') Slider: ElementRef;
  @ViewChild('sliderIndicatorContainer') sliderIndicatorContainer: ElementRef;
  @ViewChild('sliderTrack') sliderTrack: ElementRef;
  @ViewChild('sliderTrackBackground') sliderTrackBackground: ElementRef;
  @ViewChild('sliderTrackFill') sliderTrackFill: ElementRef;
  @ViewChild('sliderTrackInterval') sliderTrackInterval: ElementRef;

  @Output('onChange') onChangeEmitter: EventEmitter<number | string>;

  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('labelsPosition') labelsPositionInput: 'top' | 'bottom';
  @Input('required') requiredInput: boolean;
  @Input('showLabels') showLabelsInput: boolean;
  @Input('showTicks') showTicksInput: boolean;
  @Input('value') valueInput: number | string | boolean;

  public className: string;
  public disabled: boolean;
  public isFocused: boolean;
  public labelsPosition: 'top' | 'bottom';
  public required: boolean;
  public showLabels: boolean;
  public showTicks: boolean;
  public supportedEvents: SupportedEventsModel;
  public value: number | string | boolean;

  constructor(private renderer: Renderer2) {
    this.supportedEvents = supportedEvents();

    this.actionDown = this.actionDown.bind(this);
    this.actionMove = this.actionMove.bind(this);
    this.actionUp = this.actionUp.bind(this);
    this.renderPositions = this.renderPositions.bind(this);

    this.onChangeEmitter = new EventEmitter();

    window.addEventListener(this.supportedEvents.resize, this.renderPositions);
  }

  ngOnInit() {
    this.initValues();
  }

  ngAfterContentInit() {
    setTimeout(this.renderPositions, 0);

    this.options.changes.subscribe(this.renderPositions);
  }

  initValues() {
    const { defaultProps } = SliderComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.disabled = getBooleanValue(this.disabledInput, defaultProps.disabled);
    this.labelsPosition = this.labelsPositionInput || defaultProps.labelsPosition;
    this.required = getBooleanValue(this.requiredInput, defaultProps.required);
    this.showLabels = getBooleanValue(this.showLabelsInput, defaultProps.showLabels);
    this.showTicks = getBooleanValue(this.showTicksInput, defaultProps.showTicks);
    this.value = this.valueInput || defaultProps.value;

    this.isFocused = false;
    this.sliderTrack.nativeElement.addEventListener(this.supportedEvents.down, this.actionDown);
  }

  renderPositions() {
    const pixelInterval = this.getPixelInterval();

    this.removeTicks();

    this.options.forEach((option, index) => {
      const leftSpace = pixelInterval * index;

      this.renderer.setStyle(option.element.nativeElement, 'left', `${ leftSpace }px`);

      if (this.showTicks) {
        const tick = this.renderer.createElement('div');

        this.renderer.setStyle(tick, 'left', `${ leftSpace }px`);
        this.renderer.addClass(tick, SliderComponent.tickClassName);
        this.renderer.appendChild(this.sliderTrackInterval.nativeElement, tick);
      }
    });
  }

  removeTicks() {
    const { nativeElement } = this.sliderTrackInterval;

    while (nativeElement.firstChild) {
      this.renderer.removeChild(nativeElement, nativeElement.firstChild);
    }
  }

  actionDown(event: any) {
    if (!this.disabled) {
      const x = this.getXCoordinate(event, this.supportedEvents.down);

      this.animate(x, true);

      window.addEventListener(this.supportedEvents.up, this.actionUp);
      window.addEventListener(this.supportedEvents.move, this.actionMove);
    }
  }

  actionMove(event: any) {
    const x = this.getXCoordinate(event, this.supportedEvents.move);

    this.animate(x, false);
  }

  actionUp(event: any) {
    window.removeEventListener(this.supportedEvents.up, this.actionUp);
    window.removeEventListener(this.supportedEvents.move, this.actionMove);

    this.renderer.setStyle(this.sliderTrackFill.nativeElement, 'transitionDuration', null);
    this.renderer.setStyle(this.sliderIndicatorContainer.nativeElement, 'transitionDuration', null);

    const x = this.getXCoordinate(event, this.supportedEvents.up);
    const index = this.getIndexFromXCoordinate(x);
    const pixelInterval = this.getPixelInterval();
    const nextXCoordinate = index * pixelInterval;
    const options = this.options.toArray();

    this.value = options[index] && options[index].value;
    this.onChangeEmitter.emit(this.value);
    this.onChange(this.value);
    this.animate(nextXCoordinate, true);
  }

  getIndexFromXCoordinate(x: number) {
    const pixelInterval = this.getPixelInterval();

    if (pixelInterval) {
      return Math.round(x / pixelInterval);
    }

    return 0;
  }

  getXCoordinateByEventType(event: any, eventType: string): number {
    if (supportTouchEvents()) {
      if (eventType === this.supportedEvents.up) {
        return event.changedTouches[0].clientX;
      }

      return event.touches[0].clientX;
    }

    return event.clientX;
  }

  getXCoordinate(event: any, eventType: string) {
    const rect = this.sliderTrack.nativeElement.getBoundingClientRect();
    const xCoordinateEvent = this.getXCoordinateByEventType(event, eventType);
    const x = xCoordinateEvent - rect.left;

    if (x < 0) {
      return 0;
    }

    if (x > this.sliderTrack.nativeElement.offsetWidth) {
      return this.sliderTrack.nativeElement.offsetWidth;
    }

    return x;
  }

  getPixelInterval() {
    const maxOptionsSize = this.options.length - 1;

    if (maxOptionsSize > 0) {
      return this.sliderTrack.nativeElement.offsetWidth / maxOptionsSize;
    }

    return 0;
  }

  animate(x: number, hasAnimation: boolean) {
    const { offsetWidth } = this.sliderIndicatorContainer.nativeElement;
    const sliderCenterHorizontal = offsetWidth / 2;
    const transform = `translate(${ x - sliderCenterHorizontal }px, -50%)`;
    const transitionDuration = hasAnimation
      ? null
      : '0ms';

    this.renderer.setStyle(this.sliderTrackFill.nativeElement, 'transitionDuration', transitionDuration);
    this.renderer.setStyle(this.sliderTrackFill.nativeElement, 'width', `${ x }px`);
    this.renderer.setStyle(this.sliderIndicatorContainer.nativeElement, 'transitionDuration', transitionDuration);
    this.renderer.setStyle(this.sliderIndicatorContainer.nativeElement, 'transform', transform);
  }

  onFocus(): void {
    if (!this.disabled) {
      this.isFocused = true;

      this.onTouched();
    }
  }

  onBlur(): void {
    this.isFocused = false;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: number | string | boolean): void {
    this.value = value;
  }

  registerOnChange(fn: (value: number | string | boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onChange(value: number | string | boolean): void {}

  onTouched(): void {}
}
