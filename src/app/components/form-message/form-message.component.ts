import { Component, Input, OnInit } from '@angular/core';
import { FormMessageModel } from './form-message.model';

@Component({
  selector: 'materialize-form-message',
  styleUrls: ['./form-message.component.scss'],
  templateUrl: './form-message.component.html'
})
export class FormMessageComponent implements FormMessageModel, OnInit {
  static readonly defaultProps: FormMessageModel = {
    className: '',
    type: 'info'
  };

  @Input('className') classNameInput: string;
  @Input('type') typeInput: 'error' | 'info';

  public className: string;
  public type: 'error' | 'info';

  ngOnInit() {
    const { defaultProps } = FormMessageComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.type = this.typeInput || defaultProps.type;
  }
}
