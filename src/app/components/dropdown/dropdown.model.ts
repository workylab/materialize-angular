export interface DropdownModel {
  iconName: string;
  iconSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  items: Array<DropdownItemModel>;
}

export interface DropdownItemModel {
  callback?: () => void,
  iconName?: string;
  text: string;
}
