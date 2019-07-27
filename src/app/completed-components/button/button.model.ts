export interface ButtonModel {
  className: string;
  disabled: boolean;
  level: BUTTON_LEVEL;
  rippleDuration: number;
  type: BUTTON_TYPE;
}

export enum BUTTON_LEVEL {
  TEXT = 'text',
  ACCENT = 'accent',
  OUTLINE = 'outline'
}

export enum BUTTON_TYPE {
  BUTTON = 'button',
  SUBMIT = 'submit'
}
