import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'materialize-form-group',
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
