/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { Component, Input, OnInit } from '@angular/core';
import { config } from '../../config';
import { TooltipModel } from './tooltip.model';

@Component({
  selector: `${ config.components.prefix }-tooltip }`,
  styleUrls: ['./tooltip.component.scss'],
  templateUrl: './tooltip.component.html'
})
export class TooltipComponent implements OnInit {
  static readonly defaultProps: TooltipModel = {
    className: '',
    isFocused: false,
    isHovered: false,
    position: 'top',
    text: ''
  };

  @Input('className') classNameInput: string;
  @Input('position') positionInput: 'top' | 'bottom' | 'left' | 'right';
  @Input('text') textInput: string;

  public className: string;
  public isFocused: boolean;
  public isHovered: boolean;
  public position: 'top' | 'bottom' | 'left' | 'right';
  public text: string;

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = TooltipComponent;

    this.text = this.textInput || defaultProps.text;
    this.position = this.positionInput || defaultProps.position;
    this.className = this.classNameInput || defaultProps.className;

    this.isFocused = defaultProps.isFocused;
    this.isHovered = defaultProps.isHovered;
  }

  onMouseEnter(event: Event) {
    this.isHovered = true;
  }

  onMouseLeave(event: Event) {
    this.isHovered = false;
  }

  onFocus(event: Event) {
    this.isFocused = true;
  }

  onBlur(event: Event) {
    this.isFocused = false;
  }
}
