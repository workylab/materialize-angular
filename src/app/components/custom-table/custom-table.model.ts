export interface CustomTable {
  body: Array<Array<CustomTableBodyCell>>,
  headers: Array<CustomTableHeaderCell>
}

export interface CustomTableHeaderCell {
  content: string | number | boolean;
  canSort: boolean;
  direction?: 'asc' | 'desc' | null;
  key: string;
  type: 'text' | 'icon' | 'checkbox';
}

export interface CustomTableBodyCell {
  content: string | number | boolean;
  type: 'text' | 'icon' | 'checkbox';
}
