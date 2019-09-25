/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  QueryList,
  Renderer2,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { supportedEvents, supportTouchEvents } from '../../utils/get-supported-events.util';
import { config } from '../../config';
import { SliderModel } from './slider.model';
import { SliderOptionComponent } from './slider-option/slider-option.component';
import { SupportedEventsModel } from '../../components/common/models/supported-events.model';

@Component({
  providers: [{
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SliderComponent)
  }],
  selector: `${ config.components.prefix }-slider }`,
  templateUrl: './slider.component.html'
})
export class SliderComponent implements AfterContentInit, AfterViewInit, ControlValueAccessor, SliderModel {
  static readonly tickClassName = config.components.prefix + '-slider-step';

  static readonly defaultProps: SliderModel = {
    className: '',
    disabled: false,
    required: false,
    showLabels: true,
    showTicks: true,
    value: null
  };

  @ContentChildren(SliderOptionComponent) options: QueryList<SliderOptionComponent>;

  @ViewChild('Slider', { static: true }) Slider: ElementRef;
  @ViewChild('sliderIndicatorContainer', { static: true }) sliderIndicatorContainer: ElementRef;
  @ViewChild('sliderTrack', { static: true }) sliderTrack: ElementRef;
  @ViewChild('sliderTrackBackground', { static: true }) sliderTrackBackground: ElementRef;
  @ViewChild('sliderTrackInterval', { static: true }) sliderTrackInterval: ElementRef;

  @Output('onChange') onChangeEmitter: EventEmitter<number | string | boolean | null>;

  @Input() className: string = SliderComponent.defaultProps.className;
  @Input() disabled: boolean = SliderComponent.defaultProps.disabled;
  @Input() required: boolean = SliderComponent.defaultProps.required;
  @Input() showLabels: boolean = SliderComponent.defaultProps.showLabels;
  @Input() showTicks: boolean = SliderComponent.defaultProps.showTicks;
  @Input() value: number | string | boolean | null = SliderComponent.defaultProps.value;

  public prefix = config.components.prefix;

  public isFocused: boolean;
  public supportedEvents: SupportedEventsModel;

  constructor(private renderer: Renderer2) {
    this.isFocused = false;
    this.supportedEvents = supportedEvents();
    this.onChangeEmitter = new EventEmitter();

    this.actionDown = this.actionDown.bind(this);
    this.actionMove = this.actionMove.bind(this);
    this.actionUp = this.actionUp.bind(this);
    this.update = this.update.bind(this);

    window.addEventListener(this.supportedEvents.resize, this.update);
  }

  ngAfterViewInit() {
    this.sliderTrack.nativeElement.addEventListener(this.supportedEvents.down, this.actionDown);
  }

  ngAfterContentInit() {
    this.update();

    this.options.changes.subscribe(this.update);
  }

  update() {
    setTimeout(() => {
      this.renderPositions();
      this.moveToValue(this.value, false);
    }, 0);
  }

  renderPositions() {
    const pixelInterval = this.getPixelInterval();

    this.removeTicks();

    this.options.forEach((option, index) => {
      const leftSpace = pixelInterval * index;
      const { nativeElement } = option.templateRef;

      this.renderer.setStyle(nativeElement, 'left', `${ leftSpace }px`);

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

    this.value = this.getValueFromXCoordinate(x);
    this.animate(x, false);
  }

  actionUp(event: any) {
    window.removeEventListener(this.supportedEvents.up, this.actionUp);
    window.removeEventListener(this.supportedEvents.move, this.actionMove);

    this.renderer.setStyle(this.sliderIndicatorContainer.nativeElement, 'transitionDuration', null);

    const x = this.getXCoordinate(event, this.supportedEvents.up);

    this.value = this.getValueFromXCoordinate(x);
    this.onChangeEmitter.emit(this.value);
    this.onChange(this.value);
    this.moveToValue(this.value, true);
  }

  moveToValue(value: number | string | boolean | null, hasAnimation: boolean) {
    const options = this.options.toArray();
    const index = options.findIndex(option => option.value === value);
    const validatedIndex = index >= 0
      ? index
      : 0;
    const pixelInterval = this.getPixelInterval();
    const nextXCoordinate = validatedIndex * pixelInterval;

    this.animate(nextXCoordinate, hasAnimation);
  }

  activeOption(value: number | string | boolean | null) {
    this.options.forEach(item => {
      item.isActive = (item.value === value);
    });
  }

  getValueFromXCoordinate(x: number) {
    const index = this.getIndexFromXCoordinate(x);
    const options = this.options.toArray();
    const value = options[index].value;

    return value;
  }

  getIndexFromXCoordinate(x: number) {
    const pixelInterval = this.getPixelInterval();

    if (pixelInterval) {
      const index = Math.round(x / pixelInterval);

      if (index >= 0 && index <= this.options.length) {
        return index;
      }
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
    this.activeOption(this.value);

    const transitionDuration = hasAnimation
      ? null
      : '0ms';

    this.renderer.setStyle(this.sliderIndicatorContainer.nativeElement, 'transitionDuration', transitionDuration);
    this.renderer.setStyle(this.sliderIndicatorContainer.nativeElement, 'left', `${ x }px`);
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

  writeValue(value: number | string | boolean | null): void {
    setTimeout(() => {
      this.value = value;

      this.moveToValue(value, false);
    }, 0);
  }

  registerOnChange(fn: (value: number | string | boolean | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onChange(value: number | string | boolean | null): void {}

  onTouched(): void {}
}
