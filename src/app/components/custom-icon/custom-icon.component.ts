import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

interface defaultProps {
  className: string;
  isCircle: boolean;
  isPointer: boolean;
  name: string;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

@Component({
  selector: 'custom-icon',
  templateUrl: './custom-icon.component.html'
})
export class CustomIconComponent implements OnChanges, OnInit {
  static readonly defaultProps: defaultProps = {
    className: '',
    isCircle: false,
    isPointer: false,
    name: '',
    size: 'sm'
  };

  @Output('onClick') onClickEmitter: EventEmitter<void>;

  @Input('className') classNameInput: string;
  @Input('isCircle') isCircleInput: boolean;
  @Input('isPointer') isPointerInput: boolean;
  @Input('name') nameInput: string;
  @Input('size') sizeInput: string;

  public className: string;
  public isPointer: boolean;
  public isCircle: boolean;
  public name: string;
  public size: string;

  constructor() {
    this.onClickEmitter = new EventEmitter();
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
}
