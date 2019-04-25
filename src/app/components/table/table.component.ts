import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SortedColumnModel, TableHeaderCellModel, TableModel } from './table.model';

@Component({
  selector: 'materialize-table',
  styleUrls: ['./table.component.scss'],
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {
  static readonly defaultProps = {
    activeSortedColumn: '',
    data: {} as TableModel,
    title: ''
  };

  @Output('onSort') onSortEmitter: EventEmitter<SortedColumnModel>;

  @Input('activeSortedColumn') activeSortedColumnInput: string;
  @Input('data') dataInput: TableModel;
  @Input('title') titleInput: string;

  public activeSortedColumn: string;
  public data: TableModel;
  public title: string;

  constructor() {
    this.onSortEmitter = new EventEmitter();
  }

  ngOnInit() {
    this.initValues();
  }

  initValues(): void {
    const { defaultProps } = TableComponent;

    this.activeSortedColumn = this.activeSortedColumn;
    this.data = this.dataInput || defaultProps.data;
    this.title = this.titleInput || defaultProps.title;
  }

  sort(header: TableHeaderCellModel): void {
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
