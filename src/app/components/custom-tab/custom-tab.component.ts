import { Component, Input, OnInit } from '@angular/core';
import { CustomTab } from './custom-tab.model';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  selector: 'custom-tab',
  templateUrl: './custom-tab.component.html'
})
export class CustomTabComponent implements OnInit {
  static readonly defaultProps: CustomTab = {
    className: '',
    isActive: false,
    title: ''
  };

  @Input('className') classNameInput: string;
  @Input('title') titleInput: string;
  @Input('isActive') isActiveInput: boolean;

  public className: string;
  public isActive: boolean;
  public title: string;

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = CustomTabComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.isActive = getBooleanValue(this.isActiveInput, defaultProps.isActive);
    this.title = this.titleInput || defaultProps.title;
  }
}
