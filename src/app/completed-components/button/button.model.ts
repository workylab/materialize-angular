export interface ButtonModel {
  className: string;
  disabled: boolean;
  level: BUTTON_LEVELS;
  rippleDuration: number;
  type: BUTTON_TYPES;
}

export enum BUTTON_LEVELS {
  TEXT = 'text',
  ACCENT = 'accent',
  OUTLINE = 'outline'
}

export enum BUTTON_TYPES {
  BUTTON = 'button',
  SUBMIT = 'submit'
}
