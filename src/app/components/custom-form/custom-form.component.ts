import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { CustomCheckboxComponent } from '../custom-checkbox/custom-checkbox.component';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { CustomRadioComponent } from '../custom-radio/custom-radio.component';
import { CustomSelectComponent } from '../custom-select/custom-select.component';
import { CustomTextAreaComponent } from '../custom-textarea/custom-textarea.component';
import { FormField } from './custom-form.model';

@Component({
  selector: 'custom-form',
  templateUrl: './custom-form.component.html'
})
export class CustomFormComponent implements AfterContentInit {
  @ContentChildren(CustomCheckboxComponent) checkboxes: QueryList<CustomCheckboxComponent>;
  @ContentChildren(CustomInputComponent) inputs: QueryList<CustomInputComponent>;
  @ContentChildren(CustomSelectComponent) selects: QueryList<CustomSelectComponent>;
  @ContentChildren(CustomTextAreaComponent) textAreas: QueryList<CustomTextAreaComponent>;
  @ContentChildren(CustomRadioComponent) radios: QueryList<CustomRadioComponent>;

  private _fields: Array<any>;
  public _error: string;

  ngAfterContentInit() {
    const checkboxes = this.checkboxes.toArray();
    const inputs = this.inputs.toArray();
    const selects = this.selects.toArray();
    const textAreas = this.textAreas.toArray();
    const radios = this.radios.toArray();

    let fields: Array<FormField> = [];

    fields = fields.concat(checkboxes);
    fields = fields.concat(inputs);
    fields = fields.concat(selects);
    fields = fields.concat(textAreas);
    fields = fields.concat(radios);

    this._fields = fields;
  }

  validateForm() {
    const invalidElements = this._fields.filter((item: FormField) => !item.isValid);

    if (invalidElements.length > 0) {
      this._error = invalidElements.map((item: FormField) => item.isValid.toString()).join(', ');
    } else {
      this._error = 'success';
    }
  }
}
