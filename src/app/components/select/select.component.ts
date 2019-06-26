import {
  AfterContentChecked,
  Component,
  ContentChildren,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormFieldAbstract } from '../form/form-field.abstract';
import { getBooleanValue } from '../../utils/get-boolean-value.util';
import { SelectModel } from './select.model';
import { SelectOptionComponent } from '../select-option/select-option.component';

@Component({
  providers: [{
    provide: FormFieldAbstract,
    useExisting: forwardRef(() => SelectComponent)
  }, {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent)
  }],
  selector: 'materialize-select',
  styleUrls: ['./select.component.scss'],
  templateUrl: './select.component.html'
})
export class SelectComponent extends FormFieldAbstract implements ControlValueAccessor, OnInit, AfterContentChecked {
  static readonly defaultProps: SelectModel = {
    className: '',
    disabled: false,
    floatLabel: '',
    id: '',
    isNativeControl: false,
    name: '',
    required: false,
    value: ''
  };

  @ViewChild('backdrop') backdropRef: ElementRef;
  @ViewChild('labelContainer') labelContainerRef: ElementRef;

  @ContentChildren(SelectOptionComponent) optionsQueryList: QueryList<SelectOptionComponent>;

  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('floatLabel') floatLabelInput: string;
  @Input('id') idInput: string;
  @Input('isNativeControl') isNativeControlInput: boolean;
  @Input('name') nameInput: string;
  @Input('required') requiredInput: boolean;
  @Input('value') valueInput: string;

  public className: string;
  public disabled: boolean;
  public floatLabel: string;
  public id: string;
  public isFocused: boolean;
  public isNativeControl: boolean;
  public isOpen: boolean;
  public name: string;
  public options: Array<SelectOptionComponent>;
  public required: boolean;
  public valueLabel: string;
  public value: string;

  constructor(private renderer: Renderer2) {
    super();

    this.addBackdropListener = this.addBackdropListener.bind(this);
    this.onSelectOption = this.onSelectOption.bind(this);
  }

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = SelectComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.disabled = getBooleanValue(this.disabledInput, defaultProps.disabled);
    this.floatLabel = this.floatLabelInput || defaultProps.floatLabel;
    this.id = this.idInput || defaultProps.id;
    this.isNativeControl = getBooleanValue(this.isNativeControlInput, defaultProps.isNativeControl);
    this.name = this.nameInput || defaultProps.name;
    this.required = getBooleanValue(this.requiredInput, defaultProps.required);
    this.value = this.valueInput || defaultProps.value;

    this.isFocused = false;
    this.isOpen = false;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.onSelectOption(this.value);
    }, 0);
  }

  ngAfterContentChecked() {
    this.options = this.optionsQueryList.toArray();

    this.registerOptions();
  }

  registerOptions() {
    for (let i = 0; i < this.options.length; i++) {
      const currentOption = this.options[i];

      currentOption.isActive = (currentOption.value === this.value);

      currentOption.onClickEmitter.subscribe(this.onSelectOption);
    }
  }

  desactiveAllOptions() {
    this.options.forEach(option => {
      option.isActive = false;
    });
  }

  onSelectOption(value: string) {
    this.desactiveAllOptions();

    const selectOption = this.options.find(item => item.value === value);

    if (selectOption) {
      this.cloneOption(selectOption);

      this.value = value;
      this.isOpen = false;

      selectOption.isActive = true;

      this.onChange(this.value);
    }
  }

  cloneOption(selectedOption: SelectOptionComponent) {
    if (!this.labelContainerRef) {
      return;
    }

    const { nativeElement: labelContainer } = this.labelContainerRef;
    const { template } = selectedOption;

    if (labelContainer.firstChild) {
      this.renderer.removeChild(labelContainer, labelContainer.firstChild);
    }

    if (template) {
      const { firstChild } = template.nativeElement;
      const cloned = firstChild.cloneNode(true);

      this.renderer.appendChild(labelContainer, cloned);
    }
  }

  onChangeNativeOption(event: any) {
    const { selectedOptions } = event.target;
    const { value } = selectedOptions[0];

    this.value = value;

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

  writeValue(value: string): void {
    this.value = value;

    setTimeout(() => {
      this.onSelectOption(this.value);
    }, 0);
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
