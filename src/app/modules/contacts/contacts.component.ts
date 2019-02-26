import { Component } from '@angular/core';
import { CustomNavbarOption } from '../../components/custom-navbar/custom-navbar.model';
import { CustomSelectOption } from '../../components/custom-select/custom-select.model';

@Component({
  templateUrl: './contacts.component.html'
})
export class ContactsComponent {
  public navbarOptions: Array<CustomNavbarOption>;
  public stateOptions: Array<CustomSelectOption>;

  constructor() {
    this.navbarOptions = [
      { iconName: 'search', type: 'search' },
      { iconName: 'more_vert', type: 'dropdown' }
    ];

    this.stateOptions = [{
      content: null,
      value: null
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
  }
}
