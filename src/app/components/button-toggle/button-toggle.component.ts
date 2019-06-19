import { ButtonToggleItemModel, ButtonToggleModel } from './button-toggle.model';
import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { FormFieldAbstract } from '../form/form-field.abstract';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  providers: [{
    provide: FormFieldAbstract,
    useExisting: forwardRef(() => ButtonToggleComponent)
  }],
  selector: 'materialize-button-toggle',
  styleUrls: ['./button-toggle.component.scss'],
  templateUrl: './button-toggle.component.html'
})
export class ButtonToggleComponent extends FormFieldAbstract implements OnInit {
  static defaultProps: ButtonToggleModel = {
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
  @Input('items') itemsInput: Array<ButtonToggleItemModel>;
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
  public isValid: boolean;
  public items: Array<ButtonToggleItemModel>;
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
    const { defaultProps } = ButtonToggleComponent;

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
    this.isValid = false;
  }

  onClick(item: ButtonToggleItemModel) {
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
    // TODO: this.isValid = this.validate(this.value, this.required);
  }
}
