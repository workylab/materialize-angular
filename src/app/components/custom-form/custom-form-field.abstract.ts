import { File } from '../custom-input-file/custom-input-file.model';

export abstract class CustomFormFieldAbstract {
  public className: string;
  public disabled: boolean;
  public errorMessage: string;
  public id: string;
  public isFocused: boolean;
  public isTouched: boolean;
  public isValid: boolean;
  public label: string;
  public name: string;
  public required: boolean;
  public value: string | boolean | number | Array<File> | { [key: string]: boolean | string; };

  public updateAndValidity(): void {}
}
