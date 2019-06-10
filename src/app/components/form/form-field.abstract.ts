import { FileModel } from '../input-file/input-file.model';

export abstract class FormFieldAbstract {
  public className: string;
  public disabled: boolean;
  public id: string | null;
  public isFocused: boolean;
  public isTouched: boolean;
  public isValid: boolean;
  public name: string;
  public required: boolean;
  public value: string | boolean | number | null | Date | Array<FileModel> | { [key: string]: boolean | string; };

  public updateAndValidity(): void {}
}
