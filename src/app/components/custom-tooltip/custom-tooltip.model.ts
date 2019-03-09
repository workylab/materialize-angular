export interface CustomTooltip {
  className: string;
  isFocused: boolean;
  isHovered: boolean;
  position: 'top' | 'bottom' | 'left' | 'right';
  text: string;
}
