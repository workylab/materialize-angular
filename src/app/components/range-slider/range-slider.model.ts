export interface RangeSliderModel {
  className: string;
  disabled: boolean;
  id: string | null;
  name: string;
  minValue: number;
  maxValue: number;
  required: boolean;
  showTicks: boolean;
  step: number;
  value: number;
}

export interface RangeSliderOptionModel {
  label: string;
  value: number;
}
