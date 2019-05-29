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
    disabled: false,
    isActive: false,
    link: '',
    title: ''
  };

  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('isActive') isActiveInput: boolean;
  @Input('link') linkInput: string;
  @Input('title') titleInput: string;

  public className: string;
  public disabled: boolean;
  public isActive: boolean;
  public link: string;
  public title: string;

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = TabComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.disabled = this.disabledInput || defaultProps.disabled;
    this.isActive = getBooleanValue(this.isActiveInput, defaultProps.isActive);
    this.link = this.linkInput || defaultProps.link;
    this.title = this.titleInput || defaultProps.title;
  }
}
