import { Component, Input } from '@angular/core';
import { FORM_MESSAGE_LEVELS, FormMessageModel } from './form-message.model';
import { config } from '../../config';

@Component({
  selector: `${ config.components.prefix }-form-message }`,
  templateUrl: './form-message.component.html'
})
export class FormMessageComponent implements FormMessageModel {
  static readonly defaultProps: FormMessageModel = {
    className: '',
    level: FORM_MESSAGE_LEVELS.INFO
  };

  @Input('className') className: string = FormMessageComponent.defaultProps.className;
  @Input('type') level: FORM_MESSAGE_LEVELS = FormMessageComponent.defaultProps.level;

  public prefix = config.components.prefix;
}
