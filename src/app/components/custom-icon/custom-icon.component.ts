import { Component, Input, OnInit } from '@angular/core';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

interface defaultProps {
  className: string;
  isCircle: boolean;
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
    name: '',
    size: 'sm'
  };

  @Input() onClick: () => void;

  @Input() className: string;
  @Input() isCircle: boolean;
  @Input() name: string;
  @Input() size: string;

  public _className: string;
  public _isCircle: boolean;
  public _name: string;
  public _size: string;

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = CustomIconComponent;

    this._isCircle = getBooleanValue(this.isCircle, defaultProps.isCircle);
    this._name = this.name || defaultProps.name;
    this._size = this.size || defaultProps.size;
    this._className = this.className || defaultProps.className;
  }

  getClassName() {
    const classNames = ['icon'];

    if (this._isCircle) {
      classNames.push('icon-circle');
    }

    if (this._size) {
      classNames.push(`icon-${ this._size }`);
    }

    if (this._name) {
      classNames.push(`icon-${ this._name }`);
    }

    return classNames.join(' ');
  }

  onIconClick() {
    if (this.onClick) {
      this.onClick();
    }
  }
}
