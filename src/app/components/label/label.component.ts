import { Component, Input, OnInit } from '@angular/core';
import { getBooleanValue } from '../../utils/get-boolean-value.util';
import { LabelModel } from './label.model';

@Component({
  selector: 'materialize-label',
  styleUrls: ['./label.component.scss'],
  templateUrl: './label.component.html'
})
export class LabelComponent implements LabelModel, OnInit {
  static readonly defaultProps: LabelModel = {
    className: '',
    isFloat: false
  };

  @Input('className') classNameInput: string;
  @Input('isFloat') isFloatInput: boolean;

  public className: string;
  public isFloat: boolean;

  ngOnInit() {
    const { defaultProps } = LabelComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.isFloat = getBooleanValue(this.isFloatInput, defaultProps.isFloat);
  }
}
