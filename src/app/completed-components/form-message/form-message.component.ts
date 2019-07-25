import { Component, Input } from '@angular/core';
import { FORM_MESSAGE_TYPES, FormMessageModel } from './form-message.model';
import { config } from '../../config';

@Component({
  selector: `${ config.components.prefix }-form-message }`,
  templateUrl: './form-message.component.html'
})
export class FormMessageComponent implements FormMessageModel {
  static readonly defaultProps: FormMessageModel = {
    className: '',
    type: FORM_MESSAGE_TYPES.INFO
  };

  @Input('className') className: string = FormMessageComponent.defaultProps.className;
  @Input('type') type: FORM_MESSAGE_TYPES = FormMessageComponent.defaultProps.type;

  public prefix = config.components.prefix;
}
