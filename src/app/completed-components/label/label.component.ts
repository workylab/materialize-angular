import { Component, Input } from '@angular/core';
import { config } from '../../config';
import { LabelModel } from './label.model';

@Component({
  selector: `${ config.components.prefix }-label }`,
  templateUrl: './label.component.html'
})
export class LabelComponent implements LabelModel {
  static readonly defaultProps: LabelModel = {
    className: ''
  };

  @Input() className: string = LabelComponent.defaultProps.className;

  public prefix = config.components.prefix;
}
