import { Component, Input, OnInit } from '@angular/core';
import { config } from '../../config';
import { NavbarModel } from './navbar.model';

@Component({
  selector: `${ config.components.prefix }-navbar }`,
  styleUrls: ['./navbar.component.scss'],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  static readonly defaultProps: NavbarModel = {
    className: 'navbar'
  };

  @Input() classNameInput: string;

  public className: string;

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = NavbarComponent;

    this.className = this.classNameInput || defaultProps.className;
  }
}
