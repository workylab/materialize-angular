export interface CustomButton {
  className: string;
  disabled: boolean;
  iconAtEnd: boolean;
  iconName: string;
  isRounded: boolean;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  text: string;
  type: 'button' | 'submit'
}
