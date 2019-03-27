import { FormField } from '../custom-form/custom-form.model';

export interface CustomInputFile extends FormField {
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
