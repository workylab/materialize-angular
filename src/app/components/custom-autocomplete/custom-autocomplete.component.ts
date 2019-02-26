import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CustomSelectOption } from '../custom-select/custom-select.model';
import { FormField } from '../custom-form/custom-form.model';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  selector: 'custom-autocomplete',
  templateUrl: './custom-autocomplete.component.html'
})
export class CustomAutocompleteComponent implements FormField, OnInit, OnDestroy {
  @ViewChild('formFieldContainer') fieldContainer: ElementRef;

  @Input() floatLabel: boolean;
  @Input() iconName: string;
  @Input() label: string;
  @Input() options: Array<CustomSelectOption>;
  @Input() value: string;

  public _floatLabel: boolean;
  public _iconName: string;
  public _isFocused: boolean;
  public _isOpen: boolean;
  public _isTouched: boolean;
  public _isValid: boolean;
  public _label: string;
  public _maxLength: number;
  public _options: Array<CustomSelectOption>;
  public _placeholder: string;
  public _value: string;

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
    this._floatLabel = getBooleanValue(this.floatLabel, true);
    this._iconName = this.iconName;
    this._label = this.label;
    this._maxLength = 100;
    this._options = this.options;
    this._placeholder = '';
    this._value = '';
  }

  onInputFocus(event: any) {
    event.stopPropagation();
    event.stopImmediatePropagation();

    this._isFocused = true;
    this._isOpen = true;
    this._isTouched = true;
  }

  onInputChange(event: any) {
    const { value } = event.target;

    this.filterOptions(value);
    this._value = value;
  }

  filterOptions(value: string) {
    const validValue = value || '';
    const valueLowerCase = validValue.toLowerCase();

    this._options = this.options.filter(item => {
      const content = item.content || '';
      const contentLowerCase = content.toLowerCase();

      if (contentLowerCase.includes(valueLowerCase)) {
        return item;
      }
    });
  }

  selectOption(value: string) {
    // this._isValid = this.validate(this._value, this._required);

    this._value = value || '';
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
    this._isFocused = false;
    this._isOpen = false;
  }

  openMenu() {
    this._isFocused = true;
    this._isTouched = true;
  }
}
