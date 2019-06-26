import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { NavbarOptionModel } from '../../components/navbar/navbar.model';

@Component({
  templateUrl: './contacts.component.html'
})
export class ContactsComponent {
  public navbarOptions: Array<NavbarOptionModel>;
  public form: FormGroup;

  constructor() {
    this.navbarOptions = [
      { iconName: 'search', type: 'search' },
      { iconName: 'more_vert', type: 'dropdown' }
    ];

    this.form = new FormGroup({
      amount: new FormControl({ disabled: false, value: 5 }, [
        Validators.min(3),
        Validators.max(7)
      ]),
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
      name: new FormControl({ disabled: false, value: 'MyName' }, Validators.pattern('[a-zA-Z]+')),
      state: new FormControl({ disabled: false, value: 'PA' }, Validators.required),
      stateNative: new FormControl({ disabled: false, value: 'IL' }, Validators.required)
    });
  }
}
