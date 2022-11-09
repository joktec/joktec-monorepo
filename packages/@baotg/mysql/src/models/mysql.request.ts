export type WhereOperator = '=' | '>' | '>=' | '<' | '<=' | 'in' | 'like' | 'between';

export type BindingType = string | number | boolean | Date;
export type WhereRaw = { statement: string; binding: BindingType[] };
export type WhereField = [column: string, operation: WhereOperator, value: BindingType, not?: boolean];
export type Where = WhereField[];

export type SortDirection = 'asc' | 'desc';
export type SortFiled = {
  [key: string]: SortDirection;
};

export interface PageableRequest {
  columns?: string[];
  where?: Where;
  whereRaw?: WhereRaw;
  page: number;
  limit: number;
  sort?: SortFiled;
}
