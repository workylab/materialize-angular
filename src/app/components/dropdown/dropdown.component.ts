import { Component, Input, OnInit } from '@angular/core';
import { DropdownItemModel, DropdownModel } from './dropdown.model';
import { config } from '../../config';

@Component({
  selector: `${ config.components.prefix }-dropdown }`,
  styleUrls: ['./dropdown.component.scss'],
  templateUrl: './dropdown.component.html'
})
export class DropdownComponent implements OnInit {
  static readonly defaultProps: DropdownModel = {
    iconName: 'more_vert',
    iconSize: 'lg',
    items: []
  };

  @Input('iconName') iconNameInput: string;
  @Input('iconSize') iconSizeInput: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  @Input('items') itemsInput: Array<DropdownItemModel>;

  public iconName: string;
  public iconSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  public isFocused: boolean;
  public items: Array<DropdownItemModel>;

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = DropdownComponent;

    this.iconName = this.iconNameInput || defaultProps.iconName;
    this.iconSize = this.iconSizeInput || defaultProps.iconSize;
    this.items = this.itemsInput || defaultProps.items;

    this.isFocused = false;
  }

  selectItem(selectedItem: DropdownItemModel) {
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
