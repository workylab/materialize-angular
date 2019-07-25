export interface FormMessageModel {
  className: string;
  type: FORM_MESSAGE_TYPES;
}

export enum FORM_MESSAGE_TYPES {
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning'
}
