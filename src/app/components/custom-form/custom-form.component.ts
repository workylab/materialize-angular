import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { CustomAutocompleteComponent } from '../custom-autocomplete/custom-autocomplete.component';
import { CustomCheckboxComponent } from '../custom-checkbox/custom-checkbox.component';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { CustomRadioComponent } from '../custom-radio/custom-radio.component';
import { CustomSelectComponent } from '../custom-select/custom-select.component';
import { CustomSwitchComponent } from '../custom-switch/custom-switch.component';
import { CustomTextAreaComponent } from '../custom-textarea/custom-textarea.component';
import { FormField } from './custom-form.model';

@Component({
  selector: 'custom-form',
  templateUrl: './custom-form.component.html'
})
export class CustomFormComponent implements AfterContentInit {
  @ContentChildren(CustomAutocompleteComponent) autocompletes: QueryList<CustomAutocompleteComponent>;
  @ContentChildren(CustomCheckboxComponent) checkboxes: QueryList<CustomCheckboxComponent>;
  @ContentChildren(CustomInputComponent) inputs: QueryList<CustomInputComponent>;
  @ContentChildren(CustomSelectComponent) selects: QueryList<CustomSelectComponent>;
  @ContentChildren(CustomTextAreaComponent) textAreas: QueryList<CustomTextAreaComponent>;
  @ContentChildren(CustomRadioComponent) radios: QueryList<CustomRadioComponent>;
  @ContentChildren(CustomSwitchComponent) switches: QueryList<CustomSwitchComponent>;

  public fields: Array<any> = [];
  public formData: any;
  public isValidForm: boolean;

  ngAfterContentInit() {
    const autocompletes = this.autocompletes.toArray();
    const checkboxes = this.checkboxes.toArray();
    const inputs = this.inputs.toArray();
    const selects = this.selects.toArray();
    const textAreas = this.textAreas.toArray();
    const radios = this.radios.toArray();
    const switches = this.switches.toArray();

    this.fields = this.fields.concat(autocompletes);
    this.fields = this.fields.concat(checkboxes);
    this.fields = this.fields.concat(inputs);
    this.fields = this.fields.concat(selects);
    this.fields = this.fields.concat(textAreas);
    this.fields = this.fields.concat(radios);
    this.fields = this.fields.concat(switches);
  }

  validateForm() {
    this.isValidForm = this.validateFields(this.fields);

    if (this.isValidForm) {
      this.formData = this.getFormData(this.fields);
    } else {
      this.formData = null;
    }
  }

  validateFields(fields: Array<FormField>) {
    let validFields = true;

    fields.map((item: FormField) => {
      item.isTouched = true;

      if (!item.isValid) {
        validFields = false;
      }
    });

    return validFields;
  }

  getFormData(fields: Array<FormField>): any {
    const formData = {};

    fields.map((item: FormField) => {
      formData[item.name] = item.value;
    });

    return formData;
  }
}
