export interface SelectModel {
  className: string;
  disabled: boolean;
  errorMessage: string;
  floatLabel: string;
  id: string;
  label: string;
  name: string;
  options: Array<SelectOptionModel>;
  required: boolean;
  selectedOption: SelectOptionModel;
  value: string;
}

export interface SelectOptionModel {
  content: string;
  value: string;
}
