import { Component, EventEmitter, Input, Output } from '@angular/core';
import { config } from '../../config';
import { IconModel } from './icon.model';

@Component({
  selector: `${ config.components.prefix }-icon }`,
  templateUrl: './icon.component.html'
})
export class IconComponent implements IconModel {
  static readonly defaultProps: IconModel = { className: '' };

  @Output('onClick') onClickEmitter: EventEmitter<void>;
  @Output('onBlur') onBlurEmitter: EventEmitter<void>;

  @Input() className: string = IconComponent.defaultProps.className;

  public prefix = config.components.prefix;

  constructor() {
    this.onClickEmitter = new EventEmitter();
    this.onBlurEmitter = new EventEmitter();
  }

  onClick() {
    this.onClickEmitter.emit();
  }

  onBlur() {
    this.onBlurEmitter.emit();
  }
}
