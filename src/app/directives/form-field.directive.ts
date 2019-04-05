import { CustomFormFieldAbstract } from '../components/custom-form/custom-form-field.abstract';
import { Directive } from '@angular/core';

@Directive({
  selector: '[customFormField]'
})
export class CustomFormFieldDirective {
  constructor(private formField: CustomFormFieldAbstract) {
  }

  get FormField() {
    return this.formField;
  }
}
