import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { CustomFormFieldAbstract } from './custom-form-field.abstract';
import { CustomFormFieldDirective } from '../../directives/form-field.directive';

@Component({
  selector: 'custom-form',
  templateUrl: './custom-form.component.html'
})
export class CustomFormComponent implements AfterContentInit {
  @ContentChildren(CustomFormFieldDirective) customFormFieldList: QueryList<CustomFormFieldDirective>;

  public fields: Array<CustomFormFieldAbstract> = [];
  public formData: any;
  public isValidForm: boolean;

  constructor() {
    this.validateForm = this.validateForm.bind(this);
  }

  ngAfterContentInit() {
    this.fields = this.customFormFieldList.toArray().map(item => item.FormField);
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

  validateFields(fields: Array<CustomFormFieldAbstract>) {
    let validFields = true;

    fields.map((item: CustomFormFieldAbstract) => {
      item.updateAndValidity();

      if (!item.isValid) {
        validFields = false;
      }
    });

    return validFields;
  }

  getFormData(fields: Array<CustomFormFieldAbstract>): any {
    const formData = {};

    fields.forEach((item: CustomFormFieldAbstract) => {
      formData[item.name] = item.value;
    });

    return formData;
  }
}
