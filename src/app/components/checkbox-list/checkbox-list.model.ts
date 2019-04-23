export interface CheckboxListModel {
  checkAllLabel: string;
  className: string;
  disabled: boolean;
  errorMessage: string;
  id: string;
  items: Array<CheckboxListItemModel>;
  label: string;
  name: string;
  required: boolean;
  value: CheckboxListValueModel;
}

export interface CheckboxListValueModel {
  [key: string]: boolean;
}

export interface CheckboxListItemModel {
  disabled?: boolean;
  label: string;
  name: string;
  value: boolean;
}
