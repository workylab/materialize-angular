export interface SliderModel {
  className: string;
  disabled: boolean;
  labelsPosition: 'top' | 'bottom';
  required: boolean;
  showLabels: boolean;
  showTicks: boolean;
  value: number | string | boolean | null;
}
