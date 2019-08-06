export class DrawerModel {
  className: string;
  closeOnBackdrop: boolean;
  hasBackdrop: boolean;
  isOpen: boolean;
  position: DRAWER_POSITIONS;
  transitionDuration: number;
  type: DRAWER_TYPES;
}

export enum DRAWER_POSITIONS {
  RIGHT = 'right',
  LEFT = 'left'
}

export enum DRAWER_TYPES {
  OVER = 'over',
  PUSH = 'push',
  STATIC = 'static'
}
