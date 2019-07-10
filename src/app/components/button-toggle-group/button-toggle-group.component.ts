import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  QueryList
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ButtonToggleComponent } from '../button-toggle/button-toggle.component';
import { ButtonToggleGroupModel } from './button-toggle-group.model';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  providers: [{
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ButtonToggleGroupComponent)
  }],
  selector: 'materialize-button-toggle-group',
  styleUrls: ['./button-toggle-group.component.scss'],
  templateUrl: './button-toggle-group.component.html'
})
export class ButtonToggleGroupComponent implements ControlValueAccessor, OnInit, AfterContentInit {
  static readonly defaultProps: ButtonToggleGroupModel = {
    canUncheck: false,
    className: '',
    disabled: false,
    value: ''
  };

  @ContentChildren(ButtonToggleComponent) buttonsQueryList: QueryList<ButtonToggleComponent>;

  @Output('onChange') onChangeEmitter: EventEmitter<string>;

  @Input('canUncheck') canUncheckInput: boolean;
  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('value') valueInput: string;

  public canUncheck: boolean;
  public className: string;
  public disabled: boolean;
  public isFocused: boolean;
  public value: string;

  constructor() {
    this.registerButtons = this.registerButtons.bind(this);
    this.toggleButton = this.toggleButton.bind(this);

    this.onChangeEmitter = new EventEmitter();
  }

  ngOnInit() {
    this.initValues();
  }

  ngAfterContentInit() {
    this.initButtons();

    this.buttonsQueryList.changes.subscribe(changes => {
      this.initButtons();
    });
  }

  initValues() {
    const { defaultProps } = ButtonToggleGroupComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.disabled = this.disabledInput || defaultProps.disabled;
    this.canUncheck = getBooleanValue(this.canUncheckInput, defaultProps.canUncheck);
    this.value = this.valueInput || defaultProps.value;

    this.isFocused = false;
  }

  initButtons() {
    this.disableButtons(this.disabled);

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
