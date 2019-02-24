import { Component, Input, OnInit } from '@angular/core';

interface defaultProps {
  isOpen: boolean;
  menuIconName: string;
  title: string;
  titleIconName: string;
}

@Component({
  selector: 'custom-sidenav',
  templateUrl: './custom-sidenav.component.html'
})
export class CustomSideNavComponent implements OnInit {
  static readonly defaultProps: defaultProps = {
    isOpen: false,
    menuIconName: 'menu',
    title: '',
    titleIconName: ''
  };

  @Input() isOpen: boolean;
  @Input() menuIconName: string;
  @Input() title: string;
  @Input() titleIconName: string;

  public _isOpen: boolean;
  public _menuIconName: string;
  public _title: string;
  public _titleIconName: string;

  constructor() {
    this.openSideNav = this.openSideNav.bind(this);
  }

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = CustomSideNavComponent;

    this._isOpen = this.isOpen || defaultProps.isOpen;
    this._menuIconName = this.menuIconName || defaultProps.menuIconName;
    this._title = this.title || defaultProps.title;
    this._titleIconName = this.titleIconName || defaultProps.titleIconName;
  }

  openSideNav() {
    this._isOpen = true;
  }

  closeSideNav() {
    this._isOpen = false;
  }
}
