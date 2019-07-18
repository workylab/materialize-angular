import { Component, Input, OnInit } from '@angular/core';
import { config } from '../../config';

@Component({
  selector: `${ config.components.prefix }-form-group`,
  styleUrls: ['./form-group.component.scss'],
  templateUrl: './form-group.component.html'
})
export class FormGroupComponent implements OnInit {
  @Input('className') classNameInput: string;
  @Input('iconName') iconNameInput: string;

  public className: string;
  public iconName: string;

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    this.className = this.classNameInput || '';
    this.iconName = this.iconNameInput || '';
  }
}
