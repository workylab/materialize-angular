/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  templateUrl: './contacts.component.html'
})
export class ContactsComponent {
  public form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      amount: new FormControl({ disabled: false, value: null }, Validators.required),
      dateOfBirth: new FormControl({
        disabled: false,
        value: new Date()
      }),
      favorite: new FormControl({ disabled: false, value: 'b' }, Validators.required),
      hasLocation: new FormControl({ disabled: false, value: true }, Validators.requiredTrue),
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
