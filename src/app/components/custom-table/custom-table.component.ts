import { Component, Input, OnInit } from '@angular/core';
import { CustomTable, CustomTableHeaderCell } from './custom-table.model';

@Component({
  selector: 'custom-table',
  templateUrl: './custom-table.component.html'
})
export class CustomTableComponent implements OnInit {
  static readonly defaultProps = {
    title: ''
  };

  @Input() onTableSort: (key: string, direction: string) => void;

  @Input() data: CustomTable;
  @Input() title: string;

  public _title: string;
  public _activeSortedColumn: string;

  constructor() {
    this._activeSortedColumn = null;
  }

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = CustomTableComponent;

    this._title = this.title || defaultProps.title;
  }

  sort(header: CustomTableHeaderCell) {
    if (this._activeSortedColumn && header.key !== this._activeSortedColumn) {
      this.data.headers.forEach(item => {
        item.direction = null;
      });
    }

    this._activeSortedColumn = header.key;

    header.direction = this.getNewDirection(header.direction);

    if (this.onTableSort) {
      this.onTableSort(header.key, header.direction);
    }
  }

  getNewDirection(currentDirection: string): 'asc' | 'desc' | null {
    if (!currentDirection) {
      return 'desc';
    }

    if (currentDirection === 'desc') {
      return 'asc';
    }

    return null;
  }
}
