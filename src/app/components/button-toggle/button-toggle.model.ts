export interface ButtonToggleModel {
  className: string;
  disabled: boolean;
  id: string;
  items: Array<ButtonToggleItemModel>;
  isMultiple: boolean;
  label: string;
  name: string;
  required: boolean;
  value: {
    [key: string]: string;
  };
}

export interface ButtonToggleItemModel {
  content: string;
  disabled: boolean;
  iconName: string;
  name: string;
  value: string;
}
