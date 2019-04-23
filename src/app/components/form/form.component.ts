import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { FormFieldAbstract } from './form-field.abstract';
import { FormFieldDirective } from '../../directives/form-field.directive';

@Component({
  selector: 'materialize-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements AfterContentInit {
  @ContentChildren(FormFieldDirective, { descendants: true }) formFields: QueryList<FormFieldDirective>;

  public fields: Array<FormFieldAbstract> = [];
  public formData: any;
  public isValidForm: boolean;

  constructor() {
    this.validateForm = this.validateForm.bind(this);
  }

  ngAfterContentInit() {
    this.fields = this.formFields.toArray().map(item => item.FormField);
  }

  validateForm(event: Event) {
    event.preventDefault();

    this.isValidForm = this.validateFields(this.fields);

    if (this.isValidForm) {
      this.formData = this.getFormData(this.fields);
    } else {
      this.formData = null;
    }
  }

  validateFields(fields: Array<FormFieldAbstract>) {
    let validFields = true;

    fields.map((item: FormFieldAbstract) => {
      item.updateAndValidity();

      if (!item.isValid) {
        validFields = false;
      }
    });

    return validFields;
  }

  getFormData(fields: Array<FormFieldAbstract>): any {
    const formData = {};

    fields.forEach((item: FormFieldAbstract) => {
      formData[item.name] = item.value;
    });

    return formData;
  }
}
