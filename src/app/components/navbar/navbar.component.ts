import { Component, Input, OnInit } from '@angular/core';
import { NavbarOptionModel } from './navbar.model';

interface defaultProps {
  className: string;
  menuIconName: string;
  options: Array<NavbarOptionModel>;
  title: string;
  titleIconName: string;
}

@Component({
  selector: 'materialize-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  static readonly defaultProps: defaultProps = {
    className: 'navbar',
    menuIconName: 'menu',
    options: [],
    title: 'Navbar',
    titleIconName: ''
  };

  @Input() className: string;
  @Input() menuIconName: string;
  @Input() title: string;
  @Input() titleIconName: string;
  @Input() options: Array<NavbarOptionModel>;

  public _className: string;
  public _menuIconName: string;
  public _title: string;
  public _titleIconName: string;
  public _options: Array<NavbarOptionModel>

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = NavbarComponent;

    this._className = this.className || defaultProps.className;
    this._menuIconName = this.menuIconName || defaultProps.menuIconName;
    this._options = this.options || defaultProps.options;
    this._title = this.title || defaultProps.title;
    this._titleIconName = this.titleIconName || defaultProps.titleIconName;
  }
}
