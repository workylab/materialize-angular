import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { config } from '../../config';
import { ListItemModel } from './list-item.model';
import { Router } from '@angular/router';

@Component({
  selector: `${ config.components.prefix }-list-item }`,
  styleUrls: ['./list-item.component.scss'],
  templateUrl: './list-item.component.html'
})
export class ListItemComponent implements OnInit {
  static readonly defaultProps: ListItemModel = {
    className: '',
    link: [],
    transitionDuration: 250
  };

  @Output('onClick') onClickEmitter: EventEmitter<void>;

  @Input('className') classNameInput: string;
  @Input('link') linkInput: Array<any>;
  @Input('transitionDuration') transitionDurationInput: number;

  public className: string;
  public isActive: boolean;
  public link: Array<any>;
  public transitionDuration: number;

  constructor(private router: Router) {
    this.onClickEmitter = new EventEmitter();
  }

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = ListItemComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.link = this.linkInput || defaultProps.link;
    this.transitionDuration = this.transitionDurationInput || defaultProps.transitionDuration;

    this.isActive = false;
  }

  onClick() {
    setTimeout(() => {
      this.isActive = true;
      this.onClickEmitter.emit();

      if (this.link.length) {
        this.router.navigate([this.link]);
      }
    }, this.transitionDuration / 2);
  }
}
