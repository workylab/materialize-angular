/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

export interface InputModel {
  autocomplete: string;
  className: string;
  disabled: boolean;
  floatLabel: string;
  id: string | null;
  hasCounter: boolean;
  name: string;
  maxLength: number;
  placeholder: string;
  required: boolean;
  type: INPUT_TYPE;
  value: string;
}

export enum INPUT_TYPE {
  PASSWORD = 'password',
  TEXT = 'text'
}
