/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

export interface DropdownModel {
  iconName: string;
  iconSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  items: Array<DropdownItemModel>;
}

export interface DropdownItemModel {
  callback?: () => void;
  iconName?: string;
  text: string;
}
