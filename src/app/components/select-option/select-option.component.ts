import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild, ElementRef } from '@angular/core';
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
    value: ''
  };

  @ViewChild('template') template: ElementRef;

  @Output('onClick') onClickEmitter: EventEmitter<string>;

  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('value') valueInput: string;

  public className: string;
  public disabled: boolean;
  public isActive: boolean;
  public value: string;

  constructor(private element: ElementRef) {
    this.onClickEmitter = new EventEmitter();
  }

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = SelectOptionComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.disabled = getBooleanValue(this.disabledInput, defaultProps.disabled);
    this.value = this.valueInput || defaultProps.value;

    this.isActive = false;
  }

  onClick() {
    if (!this.disabled) {
      this.onClickEmitter.emit(this.value);
    }
  }
}
