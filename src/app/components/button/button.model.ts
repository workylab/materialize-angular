export interface ButtonModel {
  className: string;
  disabled: boolean;
  iconAtEnd: boolean;
  iconName: string;
  isRounded: boolean;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  type: 'button' | 'submit'
}
