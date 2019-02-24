import { Component, Input, OnInit } from '@angular/core';
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
export class CustomIconComponent implements OnInit {
  static readonly defaultProps: defaultProps = {
    className: 'icon',
    isCircle: false,
    isPointer: false,
    name: '',
    size: 'sm'
  };

  @Input() onClick: () => void;

  @Input() className: string;
  @Input() isCircle: boolean;
  @Input() isPointer: boolean;
  @Input() name: string;
  @Input() size: string;

  public _className: string;
  public _isPointer: boolean;
  public _isCircle: boolean;
  public _name: string;
  public _size: string;

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = CustomIconComponent;
    const classNameBase = this.className || defaultProps.className;

    this._isCircle = getBooleanValue(this.isCircle, defaultProps.isCircle);
    this._isPointer = this.isPointer || defaultProps.isPointer;
    this._name = this.name || defaultProps.name;
    this._size = this.size || defaultProps.size;

    this._className = this.getClassName(classNameBase);
  }

  getClassName(classNameBase: string) {
    const classNames = [classNameBase];

    if (this._name) {
      classNames.push(`icon-${ this._name }`);
    }

    if (this._size) {
      classNames.push(`icon-${ this._size }`);
    }

    if (this._isPointer) {
      classNames.push('icon-pointer');
    }

    if (this._isCircle) {
      classNames.push('icon-circle');
    }

    return classNames.join(' ');
  }

  onIconClick() {
    if (this.onClick) {
      this.onClick();
    }
  }
}
