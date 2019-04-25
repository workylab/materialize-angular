import { Component, Input, OnInit } from '@angular/core';
import { ErrorModel } from './error.model';

@Component({
  selector: 'materialize-error',
  styleUrls: ['./error.component.scss'],
  templateUrl: './error.component.html'
})
export class ErrorComponent implements ErrorModel, OnInit {
  static readonly defaultProps: ErrorModel = {
    className: ''
  };

  @Input('className') classNameInput: string;

  public className: string;

  ngOnInit() {
    const { defaultProps } = ErrorComponent;

    this.className = this.classNameInput || defaultProps.className;
  }
}
