import { Component, Input, OnInit } from '@angular/core';
import { CustomInputFile, File } from './custom-input-file.model';
import fieldValidations from '../../fixtures/field-validations';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

// TODO: preview - multifile - filesize (mb, kb, b)
@Component({
  selector: 'custom-input-file',
  templateUrl: './custom-input-file.component.html'
})
export class CustomInputFileComponent implements OnInit, CustomInputFile {
  static readonly defaultProps: CustomInputFile = {
    accept: ['application/pdf', 'image/*'],
    className: '',
    dataType: 'base64',
    disabled: false,
    errorMessage: '',
    floatLabel: true,
    iconName: '',
    id: '',
    isFocused: false,
    isMultiple: false,
    isTouched: false,
    isValid: false,
    label: '',
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
  @Input('errorMessage') errorMessageInput: string;
  @Input('files') filesInput: Array<File>;
  @Input('floatLabel') floatLabelInput: boolean;
  @Input('iconName') iconNameInput: string;
  @Input('id') idInput: string;
  @Input('isMultiple') isMultipleInput: boolean;
  @Input('isTouched') isTouchedInput: boolean;
  @Input('label') labelInput: string;
  @Input('name') nameInput: string;
  @Input('maxSize') maxSizeInput: number;
  @Input('minSize') minSizeInput: number;
  @Input('required') requiredInput: boolean;

  public accept: Array<string>;
  public className: string;
  public dataType: 'blob' | 'base64';
  public disabled: boolean;
  public errorMessage: string;
  public floatLabel: boolean;
  public iconName: string;
  public id: string;
  public isMultiple: boolean;
  public isFocused: boolean;
  public isTouched: boolean;
  public isValid: boolean;
  public label: string;
  public maxSize: number;
  public minSize: number;
  public name: string;
  public required: boolean;
  public value: Array<File>;

  constructor() {
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = CustomInputFileComponent;

    this.accept = this.acceptInput || defaultProps.accept;
    this.className = this.classNameInput || defaultProps.className;
    this.dataType = this.dataTypeInput || defaultProps.dataType;
    this.disabled = getBooleanValue(this.disabledInput, defaultProps.disabled);
    this.errorMessage = this.errorMessageInput || defaultProps.errorMessage;
    this.floatLabel = getBooleanValue(this.floatLabelInput, defaultProps.floatLabel);
    this.iconName = this.iconNameInput || defaultProps.iconName;
    this.id = this.idInput || defaultProps.id;
    this.isMultiple = getBooleanValue(this.isMultipleInput, this.isMultiple);
    this.label = this.labelInput || defaultProps.label;
    this.maxSize = this.maxSizeInput || defaultProps.maxSize;
    this.minSize = this.minSizeInput || defaultProps.minSize;
    this.name = this.nameInput || defaultProps.name;
    this.required = getBooleanValue(this.requiredInput, defaultProps.required);
    this.value = this.filesInput || defaultProps.value;

    this.isTouched = defaultProps.isTouched;
    this.isFocused = defaultProps.isFocused;
    this.isValid = this.validate(this.value);
  }

  validate(files: Array<File>) {
    if (this.required && !files.length) {
      return false;
    }

    return true;
  }

  onBlur() {
    this.isTouched = true;
    this.isFocused = false;

    if (this.isValid) {
      this.errorMessage = '';
    } else {
      const fieldValidation = fieldValidations['required'];

      this.errorMessage = fieldValidation.errorMessage;
    }
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

  generateFileBlob(file: File) {
    const currentFile = {
      file: URL.createObjectURL(file),
      name: file.name,
      size: this.generateFileSize(file.size),
      type: file.type
    };

    this.saveFile(currentFile);
  }

  generateFileBase64(file: File) {
    const reader = new FileReader();

    reader.onload = () => {
      const currentFile: File = {
        file: reader.result,
        name: file.name,
        size: this.generateFileSize(file.size),
        type: file.type
      };

      this.saveFile(currentFile);
    };

    reader.readAsDataURL(file as any);
  }

  saveFile(file: File) {
    if (this.isMultiple) {
      this.value.push(file);
    } else {
      this.value = [file];
    }

    this.isValid = this.validate(this.value);
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
