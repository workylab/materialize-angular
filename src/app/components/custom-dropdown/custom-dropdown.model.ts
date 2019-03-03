export interface CustomDropdown {
  iconName: string;
  iconSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isFocused: boolean;
  items: Array<CustomDropdownItem>;
}

export interface CustomDropdownItem {
  callback?: () => void,
  iconName?: string;
  text: string;
}
