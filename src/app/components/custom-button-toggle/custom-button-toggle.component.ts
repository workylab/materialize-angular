import { ButtonToggle, ButtonToggleItem } from './custom-button-toggle.model';
import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { CustomFormFieldAbstract } from '../custom-form/custom-form-field.abstract';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  providers: [{
    provide: CustomFormFieldAbstract,
    useExisting: forwardRef(() => CustomButtonToggleComponent)
  }],
  selector: 'custom-button-toggle',
  templateUrl: './custom-button-toggle.component.html'
})
export class CustomButtonToggleComponent extends CustomFormFieldAbstract implements OnInit {
  static defaultProps: ButtonToggle = {
    className: '',
    disabled: false,
    id: '',
    isMultiple: false,
    items: [],
    label: '',
    name: '',
    required: false,
    value: {}
  };

  @Output('onClick') onClickEmitter: EventEmitter<string>;

  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('id') idInput: string;
  @Input('items') itemsInput: Array<ButtonToggleItem>;
  @Input('isMultiple') isMultipleInput: boolean;
  @Input('label') labelInput: string;
  @Input('name') nameInput: string;
  @Input('required') requiredInput: boolean;

  public className: string;
  public disabled: boolean;
  public errorMessage: string;
  public id: string;
  public isFocused: boolean;
  public isMultiple: boolean;
  public isTouched: boolean;
  public isValid: boolean;
  public items: Array<ButtonToggleItem>;
  public label: string;
  public name: string;
  public required: boolean;
  public value: {
    [key: string]: string;
  };

  constructor() {
    super();

    this.onClickEmitter = new EventEmitter();
  }

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = CustomButtonToggleComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.disabled = getBooleanValue(this.disabledInput, defaultProps.disabled);
    this.id = this.idInput || defaultProps.id;
    this.isMultiple = getBooleanValue(this.isMultipleInput, defaultProps.isMultiple);
    this.items = this.itemsInput || defaultProps.items;
    this.label = this.labelInput || defaultProps.label;
    this.name = this.nameInput || defaultProps.name;
    this.required = getBooleanValue(this.requiredInput, defaultProps.required);
    this.value = {};

    this.isFocused = false;
    this.isTouched = false;
    this.isValid = false;
  }

  onClick(item: ButtonToggleItem) {
    if (!this.disabled) {
      if (this.value[item.name]) {
        delete this.value[item.name];
      } else {
        this.value[item.name] = item.value;
      }

      this.onClickEmitter.emit(item.value);
    }
  }

  updateAndValidity() {
    this.isTouched = true;

    // TODO: this.isValid = this.validate(this.value, this.required);
  }
}
