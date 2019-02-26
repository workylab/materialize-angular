import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'custom-form-group',
  templateUrl: './custom-form-group.component.html'
})
export class CustomFormGroupComponent implements OnInit {
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
