import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  QueryList
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ButtonToggleComponent } from '../button-toggle/button-toggle.component';
import { ButtonToggleGroupModel } from './button-toggle-group.model';
import { config } from '../../config';

@Component({
  providers: [{
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ButtonToggleGroupComponent)
  }],
  selector: `${ config.components.prefix }-button-toggle-group }`,
  templateUrl: './button-toggle-group.component.html'
})
export class ButtonToggleGroupComponent implements ControlValueAccessor, AfterContentInit, ButtonToggleGroupModel {
  static readonly defaultProps: ButtonToggleGroupModel = {
    canUncheck: false,
    className: '',
    disabled: false,
    value: ''
  };

  @ContentChildren(ButtonToggleComponent) buttonsQueryList: QueryList<ButtonToggleComponent>;

  @Output('onChange') onChangeEmitter: EventEmitter<string>;

  @Input() canUncheck: boolean = ButtonToggleGroupComponent.defaultProps.canUncheck;
  @Input() className: string = ButtonToggleGroupComponent.defaultProps.className;
  @Input() disabled: boolean = ButtonToggleGroupComponent.defaultProps.disabled;
  @Input() value: string = ButtonToggleGroupComponent.defaultProps.value;

  public prefix = config.components.prefix;

  public isFocused: boolean;

  constructor() {
    this.isFocused = false;
    this.onChangeEmitter = new EventEmitter();

    this.initButtons = this.initButtons.bind(this);
    this.registerButtons = this.registerButtons.bind(this);
    this.toggleButton = this.toggleButton.bind(this);
  }

  ngAfterContentInit() {
    this.initButtons();

    this.buttonsQueryList.changes.subscribe(this.initButtons);
  }

  initButtons() {
    if (this.disabled) {
      this.disableButtons(this.disabled);
    }

    setTimeout(this.registerButtons, 0);
  }

  disableButtons(disabled: boolean) {
    this.buttonsQueryList.forEach(item => {
      item.disabled = disabled;
    });
  }

  registerButtons() {
    this.buttonsQueryList.forEach(button => {
      button.isActive = (this.value.lastIndexOf(button.value) >= 0);

      button.onClickEmitter.subscribe(this.toggleButton);
    });
  }

  toggleButton(value: string) {
    this.setValueAllButtons(value);

    const currentButton = this.buttonsQueryList.find(item => item.value === value);

    this.value = currentButton && currentButton.isActive
      ? currentButton.value
      : '';

    this.onTouched();
    this.onChange(this.value);

    this.onChangeEmitter.emit(this.value);
  }

  setValueAllButtons(value: string) {
    this.buttonsQueryList.forEach(button => {
      if (button.value !== value) {
        button.isActive = false;
      }

      if (button.value === value && !this.canUncheck) {
        button.isActive = true;
      }
    });
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;

    this.disableButtons(this.disabled);
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onChange(value: string): void {}

  onTouched(): void {}
}
