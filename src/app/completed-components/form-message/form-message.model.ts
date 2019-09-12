export interface FormMessageModel {
  className: string;
  level: FORM_MESSAGE_LEVELS;
}

export enum FORM_MESSAGE_LEVELS {
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning'
}
