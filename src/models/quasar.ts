/* eslint-disable @typescript-eslint/no-explicit-any */
export interface QTableColumn {
  name: string;
  label: string;
  field: string | { (row: any): any };
  required?: boolean;
  align?: string;
  sortable?: boolean;
  sort?: { (a: any, b: any, rowA: any, rowB: any): number };
  format?: { (val: any, row: any): any };
  style?: string;
  classes?: string;
  headStyle?: string;
  headClasses?: string;
}

export interface QTablePagination {
  sortBy: string,
  descending: boolean,
  page: number,
  rowsPerPage: number,
  rowsNumber: number
}
