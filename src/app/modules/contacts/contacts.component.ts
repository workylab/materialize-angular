import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { NavbarOptionModel } from '../../components/navbar/navbar.model';
import { RadioOptionModel } from '../../components/radio/radio.model';
import { SelectOptionModel } from '../../components/select/select.model';

@Component({
  templateUrl: './contacts.component.html'
})
export class ContactsComponent {
  public navbarOptions: Array<NavbarOptionModel>;
  public radioOptions: Array<RadioOptionModel>;
  public stateOptions: Array<SelectOptionModel>;

  public form: FormGroup;

  constructor() {
    this.navbarOptions = [
      { iconName: 'search', type: 'search' },
      { iconName: 'more_vert', type: 'dropdown' }
    ];

    this.stateOptions = [{
      content: '',
      value: ''
    }, {
      content: 'Alabama',
      value: 'AL'
    }, {
      content: 'Hawaii',
      value: 'HI'
    }, {
      content: 'Pennsylvania',
      value: 'PA'
    }];

    this.radioOptions = [{
      content: 'Yes',
      value: '1'
    }, {
      content: 'No',
      value: '2'
    }];

    this.form = new FormGroup({
      hasLocation: new FormControl({ disabled: true, value: true }, Validators.requiredTrue),
      hasPhones: new FormControl({ disabled: false, value: {
        hasHousePhone: false,
        hasPersonalPhone: false,
        hasWorkPhone: false
      } }),
      isWorkPhone: new FormControl({ disabled: false, value: true }, Validators.requiredTrue),
      name: new FormControl({ disabled: false, value: 'MyName' }, Validators.pattern('[a-zA-Z]+'))
    });
  }
}
