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

  public fields: Array<any> = [];
  public isFormValid: boolean;
  public formData: any;

  ngAfterContentInit() {
    const checkboxes = this.checkboxes.toArray();
    const inputs = this.inputs.toArray();
    const selects = this.selects.toArray();
    const textAreas = this.textAreas.toArray();
    const radios = this.radios.toArray();

    this.fields = this.fields.concat(checkboxes);
    this.fields = this.fields.concat(inputs);
    this.fields = this.fields.concat(selects);
    this.fields = this.fields.concat(textAreas);
    this.fields = this.fields.concat(radios);
  }

  validateForm() {
    this.formData = {};
    this.isFormValid = true;

    this.fields.filter((item: FormField) => {
      this.formData[item.name] = item.value;
      item.isTouched = true;

      if (!item.isValid) {
        this.isFormValid = false;
      }
    });
  }
}
