import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  templateUrl: './contacts.component.html'
})
export class ContactsComponent {
  public form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      amount: new FormControl({ disabled: true, value: null }, Validators.required),
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
      stateNative: new FormControl({ disabled: false, value: 'IL' }, Validators.required),
      technology: new FormControl({ disabled: false, value: 'b'}, Validators.required)
    });
  }
}
