/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

export class DrawerModel {
  className: string;
  closeOnBackdrop: boolean;
  hasBackdrop: boolean;
  isOpen: boolean;
  position: DRAWER_POSITIONS;
  transitionDuration: number;
  type: DRAWER_TYPES;
}

export enum DRAWER_POSITIONS {
  RIGHT = 'right',
  LEFT = 'left'
}

export enum DRAWER_TYPES {
  OVER = 'over',
  PUSH = 'push',
  STATIC = 'static'
}
