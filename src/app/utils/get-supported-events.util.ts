/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { SupportedEventsModel } from '../components/common/models/supported-events.model';

const MOUSE_EVENTS: SupportedEventsModel = {
  down: 'mousedown',
  move: 'mousemove',
  resize: 'resize',
  up: 'mouseup'
};

const TOUCH_EVENTS: SupportedEventsModel = {
  down: 'touchstart',
  move: 'touchmove',
  resize: 'resize',
  up: 'touchend'
};

export function supportTouchEvents(): boolean {
  return 'ontouchstart' in window;
}

export const supportedEvents = (): SupportedEventsModel => {
  const events: SupportedEventsModel = supportTouchEvents()
    ? TOUCH_EVENTS
    : MOUSE_EVENTS;

  return events;
};
