import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { getBooleanValue } from '../../utils/get-boolean-value.util';
import { SelectOptionModel } from './select-option.model';

@Component({
  selector: 'materialize-select-option',
  styleUrls: ['./select-option.component.scss'],
  templateUrl: './select-option.component.html'
})
export class SelectOptionComponent {
  static readonly defaultProps: SelectOptionModel = {
    className: '',
    disabled: false,
    id: '',
    name: '',
    required: false,
    value: ''
  };

  @ViewChild('template') template: TemplateRef<any>;

  @Output('onClick') onClickEmitter: EventEmitter<string>;

  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('id') idInput: string;
  @Input('name') nameInput: string;
  @Input('required') requiredInput: boolean;
  @Input('value') valueInput: string;

  public className: string;
  public disabled: boolean;
  public id: string;
  public isActive: boolean;
  public isFocused: boolean;
  public name: string;
  public required: boolean;
  public value: string;

  constructor() {
    this.onClickEmitter = new EventEmitter();
  }

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = SelectOptionComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.disabled = getBooleanValue(this.disabledInput, defaultProps.disabled);
    this.id = this.idInput || defaultProps.id;
    this.name = this.nameInput || defaultProps.name;
    this.required = getBooleanValue(this.requiredInput, defaultProps.required);
    this.value = this.valueInput || defaultProps.value;

    this.isActive = false;
    this.isFocused = false;
  }

  onClick() {
    if (!this.disabled) {
      this.isActive = !this.isActive;
      this.isFocused = false;
      this.onClickEmitter.emit(this.value);
    }
  }
}
