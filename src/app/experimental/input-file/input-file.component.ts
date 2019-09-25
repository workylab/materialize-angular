/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { Component, Input, OnInit } from '@angular/core';
import { FileModel, InputFileModel } from './input-file.model';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

// TODO: preview - multifile - filesize (mb, kb, b)
@Component({
  selector: 'materialize-input-file',
  templateUrl: './input-file.component.html'
})
export class InputFileComponent implements OnInit {
  static readonly defaultProps: InputFileModel = {
    accept: ['application/pdf', 'image/*'],
    className: '',
    dataType: 'base64',
    disabled: false,
    floatLabel: '',
    id: '',
    isMultiple: false,
    maxSize: 2000,
    minSize: 0,
    name: '',
    required: false,
    value: []
  };

  @Input('accept') acceptInput: Array<string>;
  @Input('className') classNameInput: string;
  @Input('dataType') dataTypeInput: 'blob' | 'base64';
  @Input('disabled') disabledInput: boolean;
  @Input('files') filesInput: Array<FileModel>;
  @Input('floatLabel') floatLabelInput: string;
  @Input('id') idInput: string;
  @Input('isMultiple') isMultipleInput: boolean;
  @Input('name') nameInput: string;
  @Input('maxSize') maxSizeInput: number;
  @Input('minSize') minSizeInput: number;
  @Input('required') requiredInput: boolean;

  public accept: Array<string>;
  public className: string;
  public dataType: 'blob' | 'base64';
  public disabled: boolean;
  public floatLabel: string;
  public id: string;
  public isMultiple: boolean;
  public isFocused: boolean;
  public maxSize: number;
  public minSize: number;
  public name: string;
  public required: boolean;
  public value: Array<FileModel>;

  constructor() {
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = InputFileComponent;

    this.accept = this.acceptInput || defaultProps.accept;
    this.className = this.classNameInput || defaultProps.className;
    this.dataType = this.dataTypeInput || defaultProps.dataType;
    this.disabled = getBooleanValue(this.disabledInput, defaultProps.disabled);
    this.floatLabel = this.floatLabelInput || defaultProps.floatLabel;
    this.id = this.idInput || defaultProps.id;
    this.isMultiple = getBooleanValue(this.isMultipleInput, this.isMultiple);
    this.maxSize = this.maxSizeInput || defaultProps.maxSize;
    this.minSize = this.minSizeInput || defaultProps.minSize;
    this.name = this.nameInput || defaultProps.name;
    this.required = getBooleanValue(this.requiredInput, defaultProps.required);
    this.value = this.filesInput || defaultProps.value;

    this.isFocused = false;
  }

  onBlur() {
    this.isFocused = false;
  }

  onFocus() {
    this.isFocused = true;
  }

  onChange(event: any) {
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = event.target.files[i];
      const fileSize = this.generateFileSize(file.size);
      const isValidFileSize = this.validateFileSize(fileSize);

      if (isValidFileSize && this.dataType === 'base64') {
        this.generateFileBase64(file);
      }

      if (isValidFileSize && this.dataType === 'blob') {
        this.generateFileBlob(file);
      }
    }
  }

  generateFileBlob(file: FileModel) {
    const currentFile: FileModel = {
      file: URL.createObjectURL(file),
      name: file.name,
      size: this.generateFileSize(file.size),
      type: file.type
    };

    this.saveFile(currentFile);
  }

  generateFileBase64(file: FileModel) {
    const reader = new FileReader();

    reader.onload = () => {
      const currentFile: FileModel = {
        file: reader.result,
        name: file.name,
        size: this.generateFileSize(file.size),
        type: file.type
      };

      this.saveFile(currentFile);
    };

    reader.readAsDataURL(file as any);
  }

  saveFile(file: FileModel) {
    if (this.isMultiple) {
      this.value.push(file);
    } else {
      this.value = [file];
    }
  }

  generateFileSize(size: number) {
    const kb = 1000;

    return Math.floor(size / kb);
  }

  removeFile(key: number) {
    this.value.splice(key, 1);
  }

  validateFileSize(size: number) {
    if (size >= this.minSize && size <= this.maxSize) {
      return true;
    }

    /* TODO: alert('The file is bigger or smaller'); */

    return false;
  }
}
