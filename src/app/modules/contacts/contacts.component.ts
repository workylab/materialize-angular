import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { NavbarOptionModel } from '../../components/navbar/navbar.model';
import { SelectOptionModel } from '../../components/select/select.model';

@Component({
  templateUrl: './contacts.component.html'
})
export class ContactsComponent {
  public navbarOptions: Array<NavbarOptionModel>;
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

    this.form = new FormGroup({
      dateOfBirth: new FormControl({
        disabled: false,
        value: '25/12/1992'
      }, Validators.pattern('^[0-9]{2}/[0-9]{2}/[0-9]{4}$')),
      favorite: new FormControl({ disabled: false, value: 'b' }, Validators.required),
      hasLocation: new FormControl({ disabled: true, value: true }, Validators.requiredTrue),
      hasPhones: new FormControl({ disabled: false, value: {
        hasHousePhone: false,
        hasPersonalPhone: false,
        hasWorkPhone: false
      } }, Validators.required),
      isWorkPhone: new FormControl({ disabled: false, value: true }, Validators.requiredTrue),
      message: new FormControl({ disabled: false, value: 'My Message' }, Validators.required),
      name: new FormControl({ disabled: false, value: 'MyName' }, Validators.pattern('[a-zA-Z]+'))
    });
  }
}
