export interface CheckboxListModel {
  checkAllLabel: string;
  className: string;
  disabled: boolean;
  id: string;
  name: string;
  required: boolean;
  value: CheckboxListValueModel;
}

export interface CheckboxListValueModel {
  [key: string]: boolean;
}
