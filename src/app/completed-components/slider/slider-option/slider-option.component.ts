/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { config } from '../../../config';
import { SliderOptionModel } from './slider-option.model';

@Component({
  selector: `${ config.components.prefix }-slider-option }`,
  templateUrl: './slider-option.component.html'
})
export class SliderOptionComponent implements SliderOptionModel {
  static readonly defaultProps: SliderOptionModel = {
    className: '',
    value: null
  };

  @ViewChild('template', { static: true }) templateRef: ElementRef;

  @Input() className: string = SliderOptionComponent.defaultProps.className;
  @Input() value: number | string | boolean | null = SliderOptionComponent.defaultProps.value;

  @Output('onClick') onClickEmitter: EventEmitter<number | string | boolean | null>;

  public prefix = config.components.prefix;
  public isActive: boolean;

  constructor() {
    this.isActive = false;
    this.onClickEmitter = new EventEmitter();
  }

  onClick() {
    this.onClickEmitter.emit(this.value);
  }
}
