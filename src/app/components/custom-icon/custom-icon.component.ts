import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CustomIcon } from './custom-icon.model';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  selector: 'custom-icon',
  templateUrl: './custom-icon.component.html'
})
export class CustomIconComponent implements OnChanges, OnInit {
  static readonly defaultProps: CustomIcon = {
    className: '',
    isCircle: false,
    isPointer: false,
    name: '',
    size: 'sm'
  };

  @Output('onClick') onClickEmitter: EventEmitter<void>;
  @Output('onBlur') onBlurEmitter: EventEmitter<Event>;

  @Input('className') classNameInput: string;
  @Input('isCircle') isCircleInput: boolean;
  @Input('isPointer') isPointerInput: boolean;
  @Input('name') nameInput: string;
  @Input('size') sizeInput: string;
  @Input('tabIndex') tabIndexInput: string;

  public className: string;
  public isPointer: boolean;
  public isCircle: boolean;
  public name: string;
  public size: string;

  constructor() {
    this.onClickEmitter = new EventEmitter();
    this.onBlurEmitter = new EventEmitter();
  }

  ngOnInit() {
    this.initValues();
  }

  ngOnChanges(changes: SimpleChanges) {
    const { nameInput } = changes;

    if (nameInput && nameInput.currentValue !== nameInput.previousValue) {
      this.name = nameInput.currentValue;
    }
  }

  initValues() {
    const { defaultProps } = CustomIconComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.isCircle = getBooleanValue(this.isCircleInput, defaultProps.isCircle);
    this.isPointer = this.isPointerInput || defaultProps.isPointer;
    this.name = this.nameInput || defaultProps.name;
    this.size = this.sizeInput || defaultProps.size;
  }

  onClick() {
    this.onClickEmitter.emit();
  }

  onBlur(event: Event) {
    this.onBlurEmitter.emit(event);
  }
}
