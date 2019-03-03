import { Component, Input, OnInit } from '@angular/core';
import { CustomDropdown, CustomDropdownItem } from './custom-dropdown.model';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  selector: 'custom-dropdown',
  templateUrl: './custom-dropdown.component.html'
})
export class CustomDropdownComponent implements OnInit {
  static readonly defaultProps: CustomDropdown = {
    iconName: 'more_vert',
    iconSize: 'lg',
    isFocused: false,
    items: []
  };

  @Input('iconName') iconNameInput: string;
  @Input('iconSize') iconSizeInput: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  @Input('isFocused') isFocusedInput: boolean;
  @Input('items') itemsInput: Array<CustomDropdownItem>;

  public iconName: string;
  public iconSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  public isFocused: boolean;
  public items: Array<CustomDropdownItem>;

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = CustomDropdownComponent;

    this.iconName = this.iconNameInput || defaultProps.iconName;
    this.iconSize = this.iconSizeInput || defaultProps.iconSize;
    this.isFocused = getBooleanValue(this.isFocusedInput, defaultProps.isFocused);
    this.items = this.itemsInput || defaultProps.items;
  }

  selectItem(selectedItem: CustomDropdownItem) {
    if (selectedItem.callback) {
      selectedItem.callback();
    }

    this.isFocused = false;
  }

  onClickIcon() {
    this.isFocused = true;
  }

  onBlurIcon(event: any) {
    const { relatedTarget } = event;

    if (!relatedTarget || !relatedTarget.className.includes('dropdown-items-container')) {
      this.isFocused = false;
    }
  }
}
