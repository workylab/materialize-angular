import { AfterContentChecked, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { getBooleanValue } from '../../utils/get-boolean-value.util';
import { SelectOptionModel } from './select-option.model';

@Component({
  selector: 'materialize-select-option',
  styleUrls: ['./select-option.component.scss'],
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

  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('value') valueInput: string;

  public className: string;
  public content: HTMLElement;
  public disabled: boolean;
  public isActive: boolean;
  public transitionDuration: number;
  public value: string;

  constructor(private element: ElementRef) {
    this.onClickEmitter = new EventEmitter();

    this.emitClick = this.emitClick.bind(this);
  }

  ngAfterContentChecked() {
    this.content = this.optionTemplateRef.nativeElement
      ? this.optionTemplateRef.nativeElement.textContent
      : '';
  }

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = SelectOptionComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.disabled = getBooleanValue(this.disabledInput, defaultProps.disabled);
    this.transitionDuration = defaultProps.transitionDuration;
    this.value = this.valueInput || defaultProps.value;

    this.isActive = false;
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
