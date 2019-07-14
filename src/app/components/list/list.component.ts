import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { ListModel } from './list.model';

@Component({
  selector: 'materialize-list',
  styleUrls: ['./list.component.scss'],
  templateUrl: './list.component.html'
})
export class ListComponent implements AfterContentInit, OnInit {
  static readonly defaultProps: ListModel = {
    className: ''
  };

  @ContentChildren(ListItemComponent) items: QueryList<ListItemComponent>;

  @Input('className') classNameInput: string;

  public className: string;

  constructor() {
    this.loadItems = this.loadItems.bind(this);
  }

  ngOnInit() {
    this.initValues();
  }

  ngAfterContentInit() {
    setTimeout(this.loadItems, 0);

    this.items.changes.subscribe(this.loadItems);
  }

  initValues() {
    const { defaultProps } = ListComponent;

    this.className = this.classNameInput || defaultProps.className;
  }

  loadItems() {
    this.items.forEach((item, index) => {
      item.onClickEmitter.subscribe(() => {
        this.onItemClick(index);
      });
    });
  }

  onItemClick(currentIndex: number) {
    this.items.forEach((item, index) => {
      item.isActive = (currentIndex === index);
    });
  }
}
