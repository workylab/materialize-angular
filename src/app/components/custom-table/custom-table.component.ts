import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomTable, CustomTableHeaderCell, SortedColumn } from './custom-table.model';

@Component({
  selector: 'custom-table',
  templateUrl: './custom-table.component.html'
})
export class CustomTableComponent implements OnInit {
  static readonly defaultProps = {
    activeSortedColumn: '',
    data: {} as CustomTable,
    title: ''
  };

  @Output('onSort') onSortEmitter: EventEmitter<SortedColumn>;

  @Input('activeSortedColumn') activeSortedColumnInput: string;
  @Input('data') dataInput: CustomTable;
  @Input('title') titleInput: string;

  public activeSortedColumn: string;
  public data: CustomTable;
  public title: string;

  constructor() {
    this.onSortEmitter = new EventEmitter();
  }

  ngOnInit() {
    this.initValues();
  }

  initValues(): void {
    const { defaultProps } = CustomTableComponent;

    this.activeSortedColumn = this.activeSortedColumn;
    this.data = this.dataInput || defaultProps.data;
    this.title = this.titleInput || defaultProps.title;
  }

  sort(header: CustomTableHeaderCell): void {
    if (this.activeSortedColumn && header.key !== this.activeSortedColumn) {
      this.data.headers.forEach(item => {
        item.direction = null;
      });
    }

    this.activeSortedColumn = header.key;

    header.direction = this.getNewDirection(header.direction || null);

    this.onSortEmitter.emit({
      direction: header.direction,
      key: header.key
    });
  }

  getNewDirection(currentDirection: 'asc' | 'desc' | null): 'asc' | 'desc' | null {
    if (!currentDirection) {
      return 'desc';
    }

    if (currentDirection === 'desc') {
      return 'asc';
    }

    return null;
  }
}
