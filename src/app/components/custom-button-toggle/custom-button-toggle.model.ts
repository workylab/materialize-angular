export interface ButtonToggle {
  className: string;
  disabled: boolean;
  id: string;
  items: Array<ButtonToggleItem>;
  isMultiple: boolean;
  label: string;
  name: string;
  required: boolean;
  value: {
    [key: string]: string;
  };
}

export interface ButtonToggleItem {
  content: string;
  disabled: boolean;
  iconName: string;
  name: string;
  value: string;
}
