/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

export interface InputFileModel {
  accept: Array<string>;
  className: string;
  dataType: 'blob' | 'base64';
  disabled: boolean;
  floatLabel: string;
  id: string;
  isMultiple: boolean;
  maxSize: number;
  minSize: number;
  name: string;
  required: boolean;
  value: Array<FileModel>;
}

export interface FileModel {
  file: string | ArrayBuffer | null;
  name: string;
  size: number;
  type: string;
}
