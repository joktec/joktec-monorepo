export type WhereOperator = '=' | '>' | '>=' | '<' | '<=' | 'in' | 'like' | 'between' | 'is';

export type BindingType = string | number | boolean | Date;
export type WhereRaw = { statement: string; binding: BindingType[] };
export type WhereField = [column: string, operation: WhereOperator, value: BindingType | BindingType[], not?: boolean];
export type Where = WhereField[];

export type SortDirection = 'asc' | 'desc';
export type SortFiled = {
  [key: string]: SortDirection;
};

export type SearchKeyword = {
  columns: string[];
  value: string;
};

export interface PageableRequest {
  keywords?: SearchKeyword;
  columns?: string[];
  where?: Where;
  whereRaw?: WhereRaw;
  page?: number;
  limit?: number;
  sort?: SortFiled;
  includeDeleted?: boolean;
}

export type ArrayBinding = Array<BindingType>;
export type DictBinding = { [key: string]: BindingType };
export type RawBinding = ArrayBinding | DictBinding;
