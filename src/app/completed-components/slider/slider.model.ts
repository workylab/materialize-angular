/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

export interface SliderModel {
  className: string;
  disabled: boolean;
  required: boolean;
  showLabels: boolean;
  showTicks: boolean;
  value: number | string | boolean | null;
}
