export interface TableModel {
  body: Array<Array<TableBodyCellModel>>,
  headers: Array<TableHeaderCellModel>
}

export interface TableHeaderCellModel {
  content: string | number | boolean;
  canSort: boolean;
  direction?: 'asc' | 'desc' | null;
  key: string;
  type: 'text' | 'icon' | 'checkbox';
}

export interface TableBodyCellModel {
  content: string | number | boolean;
  type: 'text' | 'icon' | 'checkbox';
}

export interface SortedColumnModel {
  direction: 'asc' | 'desc' | null;
  key: string;
}

// TODO: Table { content: string; canSort: string; ... cells: Array<Array<TableBodyCell>>}
