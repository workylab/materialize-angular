/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'materialize-swiper-item',
  styleUrls: ['./swiper-item.component.scss'],
  templateUrl: './swiper-item.component.html'
})
export class SwiperItemComponent implements OnInit {
  static readonly defaultProps = {
    className: ''
  };

  @ViewChild('swiperItemContainer', { static: true }) swiperItemContainerRef: ElementRef;

  @Input('className') classNameInput: string;

  public className: string;

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = SwiperItemComponent;

    this.className = this.classNameInput || defaultProps.className;
  }

  get swiperItemContainer(): HTMLElement {
    return this.swiperItemContainerRef.nativeElement;
  }
}
