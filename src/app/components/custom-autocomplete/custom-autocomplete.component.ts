import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CustomAutocomplete } from './custom-autocomplete.model';
import { CustomSelectOption } from '../custom-select/custom-select.model';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  selector: 'custom-autocomplete',
  templateUrl: './custom-autocomplete.component.html'
})
export class CustomAutocompleteComponent implements CustomAutocomplete, OnInit, OnDestroy {
  static readonly defaultProps: CustomAutocomplete = {
    className: '',
    disabled: false,
    floatLabel: true,
    iconName: '',
    isFocused: false,
    isTouched: false,
    isValid: false,
    label: '',
    maxLength: 200,
    name: '',
    options: [],
    placeholder: '',
    required: false,
    value: ''
  };

  @ViewChild('formFieldContainer') fieldContainer: ElementRef;

  @Input('disabled') disabledInput: boolean;
  @Input('floatLabel') floatLabelInput: boolean;
  @Input('iconName') iconNameInput: string;
  @Input('label') labelInput: string;
  @Input('maxLength') maxLengthInput: number;
  @Input('options') optionsInput: Array<CustomSelectOption>;
  @Input('placeholder') placeholderInput: string;
  @Input('value') valueInput: string;

  public className: string;
  public disabled: boolean;
  public floatLabel: boolean;
  public iconName: string;
  public isFocused: boolean;
  public isTouched: boolean;
  public isValid: boolean;
  public label: string;
  public maxLength: number;
  public name: string;
  public options: Array<CustomSelectOption>;
  public placeholder: string;
  public required: boolean;
  public value: string;

  constructor() {
    this.closeMenuListener = this.closeMenuListener.bind(this);
  }

  ngOnInit() {
    this.initValues();

    document.addEventListener('click', this.closeMenuListener);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.closeMenuListener);
  }

  initValues() {
    const { defaultProps } = CustomAutocompleteComponent;

    this.disabled = getBooleanValue(this.disabledInput, defaultProps.disabled);
    this.floatLabel = getBooleanValue(this.floatLabelInput, defaultProps.floatLabel);
    this.iconName = this.iconNameInput || defaultProps.iconName;
    this.label = this.labelInput || defaultProps.label;
    this.maxLength = this.maxLengthInput || defaultProps.maxLength;
    this.placeholder = this.placeholderInput || defaultProps.placeholder;
    this.value = this.valueInput || defaultProps.value;

    this.options = this.filterOptions(this.value);
  }

  onInputFocus(event: any) {
    event.stopPropagation();
    event.stopImmediatePropagation();

    this.isFocused = true;
    this.isTouched = true;
  }

  onInputChange(event: any) {
    const { value } = event.target;

    this.options = this.filterOptions(value);
    this.value = value;
  }

  filterOptions(value: string): Array<CustomSelectOption> {
    const validValue = value || '';
    const valueLowerCase = validValue.toLowerCase();

    return this.optionsInput.filter(item => {
      const content = item.content || '';
      const contentLowerCase = content.toLowerCase();

      if (contentLowerCase.includes(valueLowerCase)) {
        return item;
      }
    });
  }

  selectOption(value: string) {
    this.value = value || '';
    this.closeMenu();
  }

  closeMenuListener(event: any) {
    const { target } = event;
    const { nativeElement } = this.fieldContainer;
    const isClickInside = nativeElement.contains(target);

    if (!isClickInside) {
      this.closeMenu();
    }
  }

  onInputBlur(event: any) {
    const { relatedTarget } = event;

    if (relatedTarget) {
      this.closeMenu();
    }
  }

  closeMenu() {
    this.isFocused = false;
  }

  openMenu() {
    this.isFocused = true;
    this.isTouched = true;
  }
}
