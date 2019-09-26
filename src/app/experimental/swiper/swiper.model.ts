/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

export interface SwiperEventsModel {
  click: string;
  down: string;
  move: string;
  out: string;
  up: string;
}

export interface SwiperModel {
  animationMs: number;
  autoplayMs: number;
  className: string;
  displayControls: boolean;
  displayDots: boolean;
  isAutoplay: boolean;
  isCarousel: boolean;
  isChangePerPage: boolean;
  isReverse: boolean;
  itemSwipePercentAdjust: number;
  maxSwipeOutPercent: number;
}
