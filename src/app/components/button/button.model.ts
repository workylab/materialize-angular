export interface ButtonModel {
  className: string;
  disabled: boolean;
  type: BUTTON_TYPE;
}

export enum BUTTON_TYPE {
  BUTTON = 'button',
  SUBMIT = 'submit'
}
