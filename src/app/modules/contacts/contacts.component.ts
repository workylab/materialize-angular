import { Component } from '@angular/core';
import { CustomNavbarOption } from '../../components/custom-navbar/custom-navbar.model';

@Component({
  templateUrl: './contacts.component.html'
})
export class ContactsComponent {
  public navbarOptions: Array<CustomNavbarOption>;

  constructor() {
    this.navbarOptions = [
      { iconName: 'search', type: 'search' },
      { iconName: 'more_vert', type: 'dropdown' }
    ];
  }
}
