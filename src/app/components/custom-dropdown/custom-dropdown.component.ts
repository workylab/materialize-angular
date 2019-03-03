import { Component, Input } from '@angular/core';
import { CustomDropdownItem } from './custom-dropdown.model';

@Component({
  selector: 'custom-dropdown',
  templateUrl: './custom-dropdown.component.html'
})
export class CustomDropdownComponent {
  @Input('items') itemsInput: Array<CustomDropdownItem>;
}
