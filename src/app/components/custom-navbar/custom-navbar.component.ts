import { Component, Input, OnInit } from '@angular/core';
import { CustomNavbarOption } from './custom-navbar.model';

interface defaultProps {
  className: string;
  menuIconName: string;
  options: Array<CustomNavbarOption>;
  title: string;
}

@Component({
  selector: 'custom-navbar',
  templateUrl: './custom-navbar.component.html'
})
export class CustomNavbarComponent implements OnInit {
  static readonly defaultProps: defaultProps = {
    className: 'navbar',
    menuIconName: 'menu',
    options: [],
    title: 'Navbar'
  };

  @Input() className: string;
  @Input() menuIconName: string;
  @Input() title: string;
  @Input() options: Array<CustomNavbarOption>;

  public _className: string;
  public _menuIconName: string;
  public _title: string;
  public _options: Array<CustomNavbarOption>

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = CustomNavbarComponent;

    this._className = this.className || defaultProps.className;
    this._menuIconName = this.menuIconName || defaultProps.menuIconName;
    this._options = this.options || defaultProps.options;
    this._title = this.title || defaultProps.title;
  }
}
