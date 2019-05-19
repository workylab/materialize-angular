import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckboxListItemModel } from '../../components/checkbox-list/checkbox-list.model';
import { Component } from '@angular/core';
import { NavbarOptionModel } from '../../components/navbar/navbar.model';
import { RadioOptionModel } from '../../components/radio/radio.model';
import { SelectOptionModel } from '../../components/select/select.model';

@Component({
  templateUrl: './contacts.component.html'
})
export class ContactsComponent {
  public checkboxListItems: Array<CheckboxListItemModel>;
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

    this.checkboxListItems = [{
      label: 'Option 1',
      name: 'opt1',
      value: false
    }, {
      label: 'Option 2',
      name: 'opt2',
      value: false
    }, {
      disabled: true,
      label: 'Option 3',
      name: 'opt3',
      value: true
    }, {
      label: 'Option 4',
      name: 'opt4',
      value: false
    }];

    this.radioOptions = [{
      content: 'Yes',
      value: '1'
    }, {
      content: 'No',
      value: '2'
    }];

    this.form = new FormGroup({
      hasLocation: new FormControl({ disabled: false, value: true }, Validators.requiredTrue),
      isWorkPhone: new FormControl({ disabled: false, value: true }, Validators.requiredTrue),
      name: new FormControl({ disabled: false, value: 'MyName' }, Validators.pattern('[a-zA-Z]+'))
    });
  }
}
