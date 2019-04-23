export interface RadioModel {
  canUncheck: boolean;
  className: string;
  disabled: boolean;
  errorMessage: string;
  id: string;
  label: string;
  name: string;
  options: Array<RadioOptionModel>;
  required: boolean;
  value: string;
}

export interface RadioOptionModel {
  content: string;
  value: string;
}
