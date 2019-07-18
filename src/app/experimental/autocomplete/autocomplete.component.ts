import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AutocompleteModel } from './autocomplete.model';
import { getBooleanValue } from '../../utils/get-boolean-value.util';
import { InputComponent } from '../../components/input/input.component';

@Component({
  selector: 'materialize-autocomplete',
  styleUrls: ['./autocomplete.component.scss'],
  templateUrl: './autocomplete.component.html'
})
export class AutocompleteComponent implements OnInit {
  static readonly defaultProps: AutocompleteModel = {
    autocomplete: '',
    className: '',
    disabled: false,
    floatLabel: '',
    hasCounter: false,
    id: null,
    isMatchValue: false,
    maxLength: 500,
    name: '',
    placeholder: '',
    required: false,
    type: 'text',
    value: ''
  };

  @ViewChild('materializeInput') materializeInput: InputComponent;

  @Input('autocomplete') autocompleteInput: string;
  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('floatLabel') floatLabelInput: string;
  @Input('hasCounter') hasCounterInput: boolean;
  @Input('id') idInput: string | null;
  @Input('isMatchValue') isMatchValueInput: boolean;
  @Input('maxLength') maxLengthInput: number;
  @Input('name') nameInput: string;

  // @Input('options') optionsInput: Array<SelectOptionModel>;
  @Input('placeholder') placeholderInput: string;
  @Input('required') requiredInput: boolean;
  @Input('value') valueInput: string;

  public autocomplete: string;
  public className: string;
  public disabled: boolean;
  public errorMessage: string;
  public floatLabel: string;
  public hasCounter: boolean;
  public id: string | null;
  public isFocused: boolean;
  public isMatchValue: boolean;
  public maxLength: number;
  public name: string;
  public patternName: string;
  public placeholder: string;
  public required: boolean;
  public type: string;
  public validateOnBlur: boolean;
  public validateOnChange: boolean;
  public value: string;

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = AutocompleteComponent;

    this.autocomplete = this.autocompleteInput || defaultProps.autocomplete;
    this.className = this.classNameInput || defaultProps.className;
    this.disabled = getBooleanValue(this.disabledInput, defaultProps.disabled);
    this.floatLabel = this.floatLabelInput || defaultProps.floatLabel;
    this.hasCounter = getBooleanValue(this.hasCounterInput, defaultProps.hasCounter);
    this.id = this.idInput || defaultProps.id;
    this.isMatchValue = getBooleanValue(this.isMatchValueInput, defaultProps.isMatchValue);
    this.maxLength = this.maxLengthInput || defaultProps.maxLength;
    this.name = this.nameInput || defaultProps.name;
    this.placeholder = this.placeholderInput || defaultProps.placeholder;
    this.required = getBooleanValue(this.requiredInput, defaultProps.required);
    this.value = this.valueInput || defaultProps.value;

    // this.options = this.filterOptions(this.value);

    this.isFocused = false;
    this.type = defaultProps.type;
  }

  onInputFocus(event: any) {
    event.stopPropagation();
    event.stopImmediatePropagation();

    this.isFocused = true;
  }

  onInputChange(event: any) {
    const { value } = event.target;

    // this.options = this.filterOptions(value);
    this.value = value;
  }

  onInputBlur(event: any) {
    const { relatedTarget } = event;

    if (!relatedTarget || relatedTarget.className !== 'autocomplete-option') {
      this.closeMenu();

      this.materializeInput.isFocused = false;
    }
  }

  validate(value: string, required: boolean) {
    if (required && !value.length) {
      return false;
    }

    if (required && value.length && this.isMatchValue && !this.isValidOption(value)) {
      return false;
    }

    return true;
  }

  isValidOption(value: string): boolean {
    // for (let i = 0; i < this.options.length; i++) {
    //   const currentOption = this.options[i];
    //   const validatedContent = currentOption.content || '';

    //   if (value.toLowerCase() === validatedContent.toLowerCase()) {
    //     return true;
    //   }
    // }

    return false;
  }

  // filterOptions(value: string): Array<SelectOptionModel> {
  //   const validValue = value || '';
  //   const valueLowerCase = validValue.toLowerCase();

  //   return this.optionsInput.filter(item => {
  //     const content = item.content || '';
  //     const contentLowerCase = content.toLowerCase();

  //     if (contentLowerCase.includes(valueLowerCase)) {
  //       return item;
  //     }
  //   });
  // }

  selectOption(value: string) {
    this.value = value || '';

    this.closeMenu();
  }

  closeMenu() {
    this.isFocused = false;

    this.materializeInput.isFocused = false;
  }

  openMenu() {
    this.isFocused = true;
  }
}
