import { Component, Input, OnInit } from '@angular/core';
import { getBooleanValue } from '../../utils/get-boolean-value.util';
import { TabModel } from './tab.model';

@Component({
  selector: 'materialize-tab',
  templateUrl: './tab.component.html'
})
export class TabComponent implements OnInit {
  static readonly defaultProps: TabModel = {
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
    const { defaultProps } = TabComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.isActive = getBooleanValue(this.isActiveInput, defaultProps.isActive);
    this.title = this.titleInput || defaultProps.title;
  }
}
