/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

export interface ButtonModel {
  className: string;
  disabled: boolean;
  level: BUTTON_LEVELS;
  rippleDuration: number;
  type: BUTTON_TYPES;
}

export enum BUTTON_LEVELS {
  TEXT = 'text',
  ACCENT = 'accent',
  OUTLINE = 'outline'
}

export enum BUTTON_TYPES {
  BUTTON = 'button',
  SUBMIT = 'submit'
}
