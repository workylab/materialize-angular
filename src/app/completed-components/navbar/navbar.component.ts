import { Component, Input } from '@angular/core';
import { config } from '../../config';
import { NavbarModel } from './navbar.model';

@Component({
  selector: `${ config.components.prefix }-navbar }`,
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  static readonly defaultProps: NavbarModel = {
    className: 'navbar'
  };

  @Input() classNameInput: string = NavbarComponent.defaultProps.className;

  public prefix = config.components.prefix;
  public className: string;
}
