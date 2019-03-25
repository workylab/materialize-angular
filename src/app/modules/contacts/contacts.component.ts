import { Component } from '@angular/core';
import { CustomCheckboxListItem } from 'src/app/components/custom-checkbox-list/custom-checkbox-list.model';
import { CustomNavbarOption } from '../../components/custom-navbar/custom-navbar.model';
import { CustomRadioOption } from '../../components/custom-radio/custom.radio.model';
import { CustomSelectOption } from '../../components/custom-select/custom-select.model';

@Component({
  templateUrl: './contacts.component.html'
})
export class ContactsComponent {
  public checkboxListItems: Array<CustomCheckboxListItem>;
  public navbarOptions: Array<CustomNavbarOption>;
  public radioOptions: Array<CustomRadioOption>;
  public stateOptions: Array<CustomSelectOption>;

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
      content: 'Save',
      value: '1'
    }, {
      content: 'Not Save',
      value: '2'
    }];
  }
}
