/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import {
  AfterContentInit,
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
import { config } from '../../config';
import { SelectModel } from './select.model';
import { SelectOptionComponent } from './select-option/select-option.component';
import { SelectOptionModel } from './select-option/select-option.model';

@Component({
  providers: [{
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent)
  }],
  selector: `${ config.components.prefix }-select }`,
  templateUrl: './select.component.html'
})
export class SelectComponent implements ControlValueAccessor, AfterContentInit, SelectModel {
  static readonly defaultProps: SelectModel = {
    className: '',
    disabled: false,
    floatLabel: '',
    id: null,
    isNativeControl: false,
    name: '',
    required: false,
    value: null
  };

  @ViewChild('backdrop', { static: false }) backdropRef: ElementRef;
  @ViewChild('labelContainer', { static: false }) labelContainerRef: ElementRef;
  @ViewChild('selectElement', { static: false }) selectElementRef: ElementRef;

  @ContentChildren(SelectOptionComponent) options: QueryList<SelectOptionComponent>;

  @Output('onChange') onChangeEmitter: EventEmitter<string | number | boolean | null>;

  @Input() className: string = SelectComponent.defaultProps.className;
  @Input() disabled: boolean = SelectComponent.defaultProps.disabled;
  @Input() floatLabel: string = SelectComponent.defaultProps.floatLabel;
  @Input() id: string | null = SelectComponent.defaultProps.id;
  @Input() isNativeControl: boolean = SelectComponent.defaultProps.isNativeControl;
  @Input() name: string = SelectComponent.defaultProps.name;
  @Input() required: boolean = SelectComponent.defaultProps.required;
  @Input() value: string | number | boolean | null = SelectComponent.defaultProps.value;

  public prefix = config.components.prefix;

  public isFocused: boolean;
  public isOpen: boolean;
  public valueLabel: string;

  constructor(private renderer: Renderer2) {
    this.isFocused = false;
    this.isOpen = false;
    this.onChangeEmitter = new EventEmitter();

    this.addBackdropListener = this.addBackdropListener.bind(this);
    this.onChangeOption = this.onChangeOption.bind(this);
    this.registerOptions = this.registerOptions.bind(this);
  }

  ngAfterContentInit() {
    setTimeout(this.registerOptions, 0);

    this.options.changes.subscribe(changes => {
      setTimeout(this.registerOptions, 0);
    });
  }

  registerOptions() {
    this.options.forEach(option => {
      option.isActive = (option.value === this.value);

      option.onClickEmitter.subscribe(this.onChangeOption);
    });

    this.updateControl(this.value);
  }

  updateControl(value: string | number | boolean | null) {
    this.value = value;
    this.isOpen = false;

    this.activeSelectedOption(this.value);
  }

  onChangeOption(value: string | number | boolean | null) {
    this.updateControl(value);

    this.onChangeEmitter.emit(this.value);
    this.onChange(this.value);
  }

  activeSelectedOption(value: string | number | boolean | null) {
    this.options.forEach(option => {
      if (option.value === value) {
        option.isActive = true;

        this.activeSelectClass(option);

        this.cloneOption(option);
      } else {
        option.isActive = false;
      }
    });
  }

  cloneOption(selectedOption: SelectOptionComponent) {
    if (!this.labelContainerRef) {
      return;
    }

    const { nativeElement: labelContainer } = this.labelContainerRef;
    const { optionTemplateRef, disabled } = selectedOption;

    if (labelContainer.firstChild) {
      this.renderer.removeChild(labelContainer, labelContainer.firstChild);
    }

    if (optionTemplateRef) {
      const { firstChild } = optionTemplateRef.nativeElement;
      const cloned = firstChild.cloneNode(true);

      if (disabled) {
        this.renderer.addClass(cloned, 'option-disabled');
      }
      this.renderer.appendChild(labelContainer, cloned);
    }
  }

  onChangeNativeOption(event: any) {
    const { selectedOptions } = event.target;
    const { value } = selectedOptions[0];

    this.value = value;

    this.activeSelectClass(selectedOptions[0]);

    this.onChangeEmitter.emit(this.value);
    this.onChange(this.value);
  }

  onBlur(): void {
    this.isFocused = false;
  }

  onFocus(): void {
    if (!this.disabled) {
      this.isFocused = true;

      this.onTouched();
    }
  }

  onClick() {
    if (!this.disabled) {
      this.isFocused = true;
      this.isOpen = true;

      if (!this.isNativeControl) {
        setTimeout(this.addBackdropListener, 0);
      }
    }
  }

  addBackdropListener() {
    this.backdropRef.nativeElement.addEventListener('click', () => {
      this.isOpen = false;
    });
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: string | number | boolean | null): void {
    this.value = value;

    setTimeout(() => {
      this.updateControl(this.value);
    }, 0);
  }

  registerOnChange(fn: (value: string | number | boolean | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onChange(value: string | number | boolean | null): void {}

  onTouched(): void {}

  activeSelectClass(selectedOption: SelectOptionModel) {
    if (this.selectElementRef && selectedOption.disabled) {
      this.renderer.addClass(this.selectElementRef.nativeElement, 'option-disabled');
    } else if (this.selectElementRef && !selectedOption.disabled) {
      this.renderer.removeClass(this.selectElementRef.nativeElement, 'option-disabled');
    }
  }
}
