export interface CustomInputFile {
  accept: Array<string>;
  className: string;
  dataType: 'blob' | 'base64';
  disabled: boolean;
  errorMessage: string;
  floatLabel: string;
  id: string;
  isMultiple: boolean;
  label: string;
  maxSize: number;
  minSize: number;
  name: string;
  required: boolean;
  value: Array<File>;
};

export interface File {
  file: string | ArrayBuffer | null;
  name: string;
  size: number;
  type: string;
}
