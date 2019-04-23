import { Directive } from '@angular/core';
import { FormFieldAbstract } from '../components/form/form-field.abstract';

@Directive({
  selector: '[materializeFormField]'
})
export class FormFieldDirective {
  constructor(private formField: FormFieldAbstract) {
  }

  get FormField() {
    return this.formField;
  }
}
