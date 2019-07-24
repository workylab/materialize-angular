import { AfterContentChecked, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { config } from '../../config';
import { SelectOptionModel } from './select-option.model';

@Component({
  selector: `${ config.components.prefix }-select-option }`,
  templateUrl: './select-option.component.html'
})
export class SelectOptionComponent implements AfterContentChecked {
  static readonly defaultProps: SelectOptionModel = {
    className: '',
    disabled: false,
    transitionDuration: 250,
    value: ''
  };

  @ViewChild('optionTemplate') optionTemplateRef: ElementRef;

  @Output('onClick') onClickEmitter: EventEmitter<string>;

  @Input() className: string = SelectOptionComponent.defaultProps.className;
  @Input() disabled: boolean = SelectOptionComponent.defaultProps.disabled;
  @Input() value: string = SelectOptionComponent.defaultProps.value;

  public prefix = config.components.prefix;

  public content: HTMLElement;
  public isActive: boolean;
  public transitionDuration: number;

  constructor() {
    this.transitionDuration = SelectOptionComponent.defaultProps.transitionDuration;
    this.isActive = false;
    this.onClickEmitter = new EventEmitter();

    this.emitClick = this.emitClick.bind(this);
  }

  ngAfterContentChecked() {
    this.content = this.optionTemplateRef.nativeElement
      ? this.optionTemplateRef.nativeElement.textContent
      : '';
  }

  onClick() {
    if (!this.disabled) {
      setTimeout(this.emitClick, this.transitionDuration);
    }
  }

  emitClick() {
    this.onClickEmitter.emit(this.value);
  }
}
