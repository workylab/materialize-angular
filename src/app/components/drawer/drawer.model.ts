export class DrawerModel {
  className: string;
  closeOnBackdrop: boolean;
  hasBackdrop: boolean;
  isOpen: boolean;
  transitionDuration: number;
  type: DRAWER_TYPE
}

export enum DRAWER_TYPE {
  OVER = 'over',
  PUSH = 'push',
  STATIC = 'static'
}
