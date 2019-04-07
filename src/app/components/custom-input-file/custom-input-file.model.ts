import { CustomFormFieldAbstract } from '../custom-form/custom-form-field.abstract';

export interface CustomInputFile extends CustomFormFieldAbstract {
  accept: Array<string>;
  dataType: 'blob' | 'base64';
  floatLabel: boolean;
  iconName: string;
  isMultiple: boolean;
  maxSize: number;
  minSize: number;
  value: Array<File>;
};

export interface File {
  file: string | ArrayBuffer | null;
  name: string;
  size: number;
  type: string;
}
